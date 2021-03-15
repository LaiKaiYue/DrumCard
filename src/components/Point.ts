import { ref, Ref, UnwrapRef } from 'vue'
export default class Point {
  row: Ref<UnwrapRef<number>>
  col: Ref<UnwrapRef<number>>
  totalLine: Ref<UnwrapRef<number>>

  constructor () {
    this.row = ref(0)
    this.col = ref(0)
    this.totalLine = ref(1)
  }

  setPoint (row: number, col: number): void {
    this.row.value = row
    this.col.value = col
  }

  getPoint (): { row: number; col: number } {
    return { row: this.row.value, col: this.col.value }
  }

  setTotalLine (total: number): void {
    this.totalLine.value = total
  }

  moveRight (isAutoNextLine = true): boolean {
    let tmpRow = this.row.value
    let tmpCol = this.col.value
    let isAddNewLine = false
    if (this.col.value + 1 > 15) {
      if (isAutoNextLine && this.totalLine.value - 1 === this.row.value) {
        this.totalLine.value += 1
        isAddNewLine = true
      }

      if (this.totalLine.value - 1 === this.row.value && this.row.value + 1 >= this.totalLine.value) {
        tmpCol = this.col.value
        tmpRow = this.row.value
      } else {
        tmpCol = 0
        tmpRow = this.row.value + 1
      }
    } else {
      tmpCol = this.col.value + 1
    }

    this.setPoint(tmpRow, tmpCol)
    return isAddNewLine
  }

  moveLeft (isAutoDelLine = true): boolean {
    let tmpRow = this.row.value
    let tmpCol = this.col.value
    let isDelLine = false
    if (this.col.value - 1 < 0) {
      if (this.row.value - 1 < 0) {
        tmpRow = 0
        tmpCol = 0
      } else {
        tmpCol = 15
        tmpRow = this.row.value - 1
        if (isAutoDelLine) this.totalLine.value -= 1
        isDelLine = isAutoDelLine
      }
    } else {
      tmpCol = this.col.value - 1
    }

    this.setPoint(tmpRow, tmpCol)
    return isDelLine
  }

  moveUp (): void {
    const tmpRow = this.row.value - 1 < 0 ? 0 : this.row.value - 1
    this.setPoint(tmpRow, this.col.value)
  }

  moveDown (): void {
    const tmpRow = this.row.value + 1 >= this.totalLine.value ? this.row.value : this.row.value + 1
    this.setPoint(tmpRow, this.col.value)
  }
}
