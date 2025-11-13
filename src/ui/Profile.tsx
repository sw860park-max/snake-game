// Profile and statistics screen

import { useStore } from '../state/store';

export function Profile() {
  const { profile, rankings, goToMenu } = useStore();

  const completedMissions = profile.missions.filter((m) => m.completed);
  const totalMissions = profile.missions.length;
  const unlockedAchievements = profile.achievements.filter((a) => a.unlocked);
  const totalAchievements = profile.achievements.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-white">👤 Profile</h1>
          <button
            onClick={goToMenu}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            ← Back
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-green-400">{profile.highScore}</div>
            <div className="text-sm text-gray-400 mt-1">High Score</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-400">{profile.gamesPlayed}</div>
            <div className="text-sm text-gray-400 mt-1">Games Played</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-400">
              {unlockedAchievements.length}/{totalAchievements}
            </div>
            <div className="text-sm text-gray-400 mt-1">Achievements</div>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <div className="text-3xl font-bold text-yellow-400">
              {completedMissions.length}/{totalMissions}
            </div>
            <div className="text-sm text-gray-400 mt-1">Missions</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Missions */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">📋 Missions</h2>
            <div className="space-y-3">
              {profile.missions.map((mission) => (
                <div
                  key={mission.id}
                  className={`p-4 rounded-lg ${
                    mission.completed ? 'bg-green-900 bg-opacity-30' : 'bg-gray-900'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-white">{mission.title}</h3>
                      <p className="text-sm text-gray-400">{mission.description}</p>
                    </div>
                    {mission.completed && <span className="text-2xl">✅</span>}
                  </div>
                  <div className="mt-2">
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full transition-all"
                        style={{
                          width: `${Math.min((mission.current / mission.target) * 100, 100)}%`,
                        }}
                      />
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {mission.current} / {mission.target}
                      {mission.completed && ` (+${mission.reward} pts)`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-white mb-4">🏆 Achievements</h2>
            <div className="space-y-3">
              {profile.achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-4 rounded-lg flex items-start justify-between ${
                    achievement.unlocked ? 'bg-purple-900 bg-opacity-30' : 'bg-gray-900'
                  }`}
                >
                  <div>
                    <h3
                      className={`font-semibold ${
                        achievement.unlocked ? 'text-white' : 'text-gray-500'
                      }`}
                    >
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-gray-400">{achievement.description}</p>
                    {achievement.unlocked && achievement.unlockedAt && (
                      <p className="text-xs text-gray-500 mt-1">
                        Unlocked: {new Date(achievement.unlockedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <span className="text-2xl">{achievement.unlocked ? '🏆' : '🔒'}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rankings */}
        {rankings.length > 0 && (
          <div className="bg-gray-800 p-6 rounded-lg mt-8">
            <h2 className="text-2xl font-bold text-white mb-4">📊 Top 10 Rankings</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="pb-2 text-gray-400">Rank</th>
                    <th className="pb-2 text-gray-400">Score</th>
                    <th className="pb-2 text-gray-400">Length</th>
                    <th className="pb-2 text-gray-400">Mode</th>
                    <th className="pb-2 text-gray-400">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {rankings.map((rank, idx) => (
                    <tr key={idx} className="border-b border-gray-700">
                      <td className="py-2 text-white font-bold">{idx + 1}</td>
                      <td className="py-2 text-green-400">{rank.score}</td>
                      <td className="py-2 text-blue-400">{rank.length}</td>
                      <td className="py-2 text-gray-300">{rank.wallMode}</td>
                      <td className="py-2 text-gray-400 text-sm">{rank.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

