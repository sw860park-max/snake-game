// Input handling for keyboard and touch

import { Direction } from '../game/grid';

export type InputCallback = (direction: Direction) => void;

export class InputHandler {
  private callback: InputCallback;
  private touchStartX: number = 0;
  private touchStartY: number = 0;
  private keyboardEnabled: boolean = true;
  private touchEnabled: boolean = true;

  constructor(callback: InputCallback) {
    this.callback = callback;
  }

  enable(): void {
    if (this.keyboardEnabled) {
      window.addEventListener('keydown', this.handleKeyDown);
    }
    if (this.touchEnabled) {
      window.addEventListener('touchstart', this.handleTouchStart);
      window.addEventListener('touchend', this.handleTouchEnd);
    }
  }

  disable(): void {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('touchstart', this.handleTouchStart);
    window.removeEventListener('touchend', this.handleTouchEnd);
  }

  private handleKeyDown = (e: KeyboardEvent): void => {
    let direction: Direction | null = null;

    // Check for arrow keys and WASD
    switch (e.key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        direction = 'UP';
        break;
      case 'ArrowDown':
      case 's':
      case 'S':
        direction = 'DOWN';
        break;
      case 'ArrowLeft':
      case 'a':
      case 'A':
        direction = 'LEFT';
        break;
      case 'ArrowRight':
      case 'd':
      case 'D':
        direction = 'RIGHT';
        break;
    }

    if (direction) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Key pressed:', e.key, '→ Direction:', direction);
      this.callback(direction);
    }
  };

  private handleTouchStart = (e: TouchEvent): void => {
    this.touchStartX = e.touches[0].clientX;
    this.touchStartY = e.touches[0].clientY;
  };

  private handleTouchEnd = (e: TouchEvent): void => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;

    const deltaX = touchEndX - this.touchStartX;
    const deltaY = touchEndY - this.touchStartY;

    const minSwipeDistance = 30;

    if (Math.abs(deltaX) < minSwipeDistance && Math.abs(deltaY) < minSwipeDistance) {
      return;
    }

    let direction: Direction;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      direction = deltaX > 0 ? 'RIGHT' : 'LEFT';
    } else {
      direction = deltaY > 0 ? 'DOWN' : 'UP';
    }

    this.callback(direction);
  };

  setKeyboardEnabled(enabled: boolean): void {
    this.keyboardEnabled = enabled;
  }

  setTouchEnabled(enabled: boolean): void {
    this.touchEnabled = enabled;
  }
}

