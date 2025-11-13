// Settings screen component

import { useStore } from '../state/store';
import { GameSettings } from '../utils/storage';

export function Settings() {
  const { settings, updateSettings, goToMenu } = useStore();

  const handleChange = (key: keyof GameSettings, value: string | number | boolean) => {
    updateSettings({ [key]: value });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-white">⚙️ Settings</h1>
          <button
            onClick={goToMenu}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            ← Back
          </button>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 space-y-6">
          {/* Speed */}
          <div>
            <label className="block text-white font-semibold mb-2">
              Speed: {settings.speed} TPS
            </label>
            <input
              type="range"
              min="5"
              max="20"
              value={settings.speed}
              onChange={(e) => handleChange('speed', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-400 mt-1">
              <span>Slow</span>
              <span>Fast</span>
            </div>
          </div>

          {/* Grid Width */}
          <div>
            <label className="block text-white font-semibold mb-2">
              Grid Width: {settings.gridWidth}
            </label>
            <input
              type="range"
              min="20"
              max="40"
              value={settings.gridWidth}
              onChange={(e) => handleChange('gridWidth', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Grid Height */}
          <div>
            <label className="block text-white font-semibold mb-2">
              Grid Height: {settings.gridHeight}
            </label>
            <input
              type="range"
              min="15"
              max="30"
              value={settings.gridHeight}
              onChange={(e) => handleChange('gridHeight', parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Wall Mode */}
          <div>
            <label className="block text-white font-semibold mb-2">Wall Mode</label>
            <div className="grid grid-cols-3 gap-3">
              {(['normal', 'wrap', 'obstacles'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => handleChange('wallMode', mode)}
                  className={`px-4 py-3 rounded-lg font-semibold transition-colors ${
                    settings.wallMode === mode
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  {mode === 'normal' && '🧱 Normal'}
                  {mode === 'wrap' && '🔄 Wrap'}
                  {mode === 'obstacles' && '⚠️ Obstacles'}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-400 mt-2">
              {settings.wallMode === 'normal' &&
                'Hit the wall and you die'}
              {settings.wallMode === 'wrap' &&
                'Wrap around to the other side'}
              {settings.wallMode === 'obstacles' &&
                'Random obstacles on the grid'}
            </p>
          </div>

          {/* Sound */}
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold">🔊 Sound Effects</span>
            <label className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => handleChange('soundEnabled', e.target.checked)}
                className="opacity-0 w-0 h-0"
              />
              <span
                className={`absolute cursor-pointer inset-0 rounded-full transition-colors ${
                  settings.soundEnabled ? 'bg-green-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.soundEnabled ? 'translate-x-6' : ''
                  }`}
                />
              </span>
            </label>
          </div>

          {/* Vibration */}
          <div className="flex items-center justify-between">
            <span className="text-white font-semibold">📳 Vibration</span>
            <label className="relative inline-block w-12 h-6">
              <input
                type="checkbox"
                checked={settings.vibrationEnabled}
                onChange={(e) => handleChange('vibrationEnabled', e.target.checked)}
                className="opacity-0 w-0 h-0"
              />
              <span
                className={`absolute cursor-pointer inset-0 rounded-full transition-colors ${
                  settings.vibrationEnabled ? 'bg-green-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    settings.vibrationEnabled ? 'translate-x-6' : ''
                  }`}
                />
              </span>
            </label>
          </div>
        </div>

        <div className="mt-6 bg-blue-900 bg-opacity-30 border border-blue-500 rounded-lg p-4">
          <p className="text-blue-300 text-sm">
            ℹ️ Settings will take effect on your next game
          </p>
        </div>
      </div>
    </div>
  );
}

