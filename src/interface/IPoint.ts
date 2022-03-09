export default interface IPoint {
  setPoint (row: number, col: number): void;
  getPoint (): { row: number; col: number };

  moveRight (isAutoNextLine: boolean): boolean;
  moveLeft (isAutoDelLine: boolean): boolean;
  moveUp (): void;
  moveDown (): void;

  setTotalLine (total: number): void;
  setTotalBeat (totalBeat: number): void;
}
