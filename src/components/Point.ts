export default class Point {
  row: number
  col: number
  totalLine: number

  constructor () {
    this.row = 0
    this.col = 0
    this.totalLine = 1
  }

  setPoint (row: number, col: number): void {
    this.row = row
    this.col = col
  }

  setTotalLine (total: number): void {
    this.totalLine = total
  }

  getPoint (): { row: number; col: number } {
    return { row: this.row, col: this.col }
  }

  moveRight (isAutoNextLine = true): boolean {
    let tmpRow = this.row
    let tmpCol = this.col
    let isAddNewLine = false
    if (this.col + 1 > 15) {
      if (isAutoNextLine && this.totalLine - 1 === this.row) {
        this.totalLine += 1
        isAddNewLine = true
      }

      if (this.totalLine - 1 === this.row && this.row + 1 >= this.totalLine) {
        tmpCol = this.col
        tmpRow = this.row
      } else {
        tmpCol = 0
        tmpRow = this.row + 1
      }
    } else {
      tmpCol = this.col + 1
    }

    this.setPoint(tmpRow, tmpCol)
    return isAddNewLine
  }

  moveLeft (isAutoDelLine = true): boolean {
    let tmpRow = this.row
    let tmpCol = this.col
    let isDelLine = false
    if (this.col - 1 < 0) {
      if (this.row - 1 < 0) {
        tmpRow = 0
        tmpCol = 0
      } else {
        tmpCol = 15
        tmpRow = this.row - 1
        if (isAutoDelLine) this.totalLine -= 1
        isDelLine = isAutoDelLine
      }
    } else {
      tmpCol = this.col - 1
    }

    this.setPoint(tmpRow, tmpCol)
    return isDelLine
  }

  moveUp (): void {
    const tmpRow = this.row - 1 < 0 ? 0 : this.row - 1
    this.setPoint(tmpRow, this.col)
  }

  moveDown (): void {
    const tmpRow = this.row + 1 >= this.totalLine ? this.row : this.row + 1
    this.setPoint(tmpRow, this.col)
  }
}
