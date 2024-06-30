interface Point {
  x: number;
  y: number;
}

interface Size {
  width: number;
  height: number;
}

interface Background {
  img: string;
  position: Point;
  move: Point;
  paralax: Point;
}

interface EquipmentItemDefinition {
  id: string;
  type: string;
}

interface RequireDefinition {
  equipment_item?: EquipmentItemDefinition;
}

interface RemoveActionDefinition {
  id: string;
  require?: RequireDefinition;
}

interface OnTouchDefinition {
  remove?: RemoveActionDefinition;
}

interface Wall extends Point, Size {
  id: string;
  type: string;
  isMoving: boolean;
  move: {
    moveDirection: Point;
    from: Point;
    to: Point;
  },
  color?: string;
  gif?: string;
  frameIndex?: number;
  frameDelay?: number;
  lastFrameTime?: number;
  repeat?: 'repeat-x' | 'repeat-y' | 'repeat';
  onTouch: OnTouchDefinition
}

interface Item extends Point, Size {
  id: string;
  type: string;
  image: string;
}

interface Checkpoint extends Point, Size {
  visited: boolean;
}

interface Level {
  name: string;
  startPoint: Point;
  size: Size;
  backgrounds: Background[];
  foregrounds: Background[];
  walls: Wall[];
  items: Item[];
  checkpoints: Checkpoint[];
}

export interface GameType {
  level: Level | null;
  currentLevel: number | null;
  isGameStarted: boolean;
  gameFieldTop: number;
  gravity: number;
}
