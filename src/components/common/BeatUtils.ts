import { IBeatType, ILine } from '@/interface/IBeatLib'
import Point from '@/components/Point'
import tempoLib from '@/components/tempoLib'

export interface IBeatUtils {
  setBeatType: (line: string, beatType: string, moveAction: string) => void;
  replaceBeat: (line: string, beatType: string) => void;
  setLayer: (layer: string) => void;
}

export default class BeatUtils implements IBeatUtils {
  private selectedBeat: Point
  private layer: string
  private isAddNewLine: boolean

  constructor () {
    this.selectedBeat = new Point()
    this.isAddNewLine = false
    this.layer = 'layer1'
  }

  replaceBeat = (line: string, beatType: string): string => {
    if (!beatType) beatType = '0'
    const { col } = this.selectedBeat.getPoint()

    return `${line.substring(0, col)}${beatType}${line.substring(col + 1)}`
  }

  setBeatType = (line: string, beatType: string, moveAction = 'next'): string => {
    if (!beatType) {
      return line
    }

    const isLayerBeatExist = tempoLib[this.layer].some((_beatType: IBeatType) => _beatType.value === beatType)
    if (!isLayerBeatExist) return line

    const _line = this.replaceBeat(line, beatType)
    if (moveAction === 'next') {
      this.isAddNewLine = this.selectedBeat.moveRight()
    } else {
      this.selectedBeat.moveLeft()
    }
    return _line
  }

  setLayer = (layer: string) => {
    this.layer = layer
  }

  getPoint = (): { row: number; col: number } => {
    return this.selectedBeat.getPoint()
  }

  setPoint = (row: number, col: number): void => {
    this.selectedBeat.setPoint(row, col)
  }

  getIsAddNewLine = (): boolean => {
    const isAddNewLine = this.isAddNewLine
    this.isAddNewLine = false
    return isAddNewLine
  }

  moveRight = () => {
    this.selectedBeat.moveRight(false)
  }

  moveLeft = () => {
    this.selectedBeat.moveLeft(false)
  }

  moveUp = () => {
    this.selectedBeat.moveUp()
  }

  moveDown = () => {
    this.selectedBeat.moveDown()
  }

  setTotalLine = (total: number) => {
    this.selectedBeat.setTotalLine(total)
  }
}
