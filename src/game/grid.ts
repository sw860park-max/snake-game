// Grid coordinate utilities

export interface Point {
  x: number;
  y: number;
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export const DIRECTION_VECTORS: Record<Direction, Point> = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

export const OPPOSITE_DIRECTIONS: Record<Direction, Direction> = {
  UP: 'DOWN',
  DOWN: 'UP',
  LEFT: 'RIGHT',
  RIGHT: 'LEFT',
};

export function addPoints(a: Point, b: Point): Point {
  return { x: a.x + b.x, y: a.y + b.y };
}

export function equalPoints(a: Point, b: Point): boolean {
  return a.x === b.x && a.y === b.y;
}

export function wrapPoint(p: Point, width: number, height: number): Point {
  let { x, y } = p;
  if (x < 0) x = width - 1;
  if (x >= width) x = 0;
  if (y < 0) y = height - 1;
  if (y >= height) y = 0;
  return { x, y };
}

export function isOutOfBounds(p: Point, width: number, height: number): boolean {
  return p.x < 0 || p.x >= width || p.y < 0 || p.y >= height;
}

export function pointToKey(p: Point): string {
  return `${p.x},${p.y}`;
}

export function getRandomEmptyPoint(
  width: number,
  height: number,
  occupiedPoints: Point[]
): Point | null {
  const occupied = new Set(occupiedPoints.map(pointToKey));
  const empty: Point[] = [];

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const key = pointToKey({ x, y });
      if (!occupied.has(key)) {
        empty.push({ x, y });
      }
    }
  }

  if (empty.length === 0) return null;
  return empty[Math.floor(Math.random() * empty.length)];
}

