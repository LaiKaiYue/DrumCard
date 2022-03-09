import { computed, inject, Ref, ref, UnwrapRef, watch } from 'vue'
import { IBeatType, ILine } from '@/interface/IBeatLib'
import IPoint from '@/interface/IPoint'
import tempoLib from '@/components/tempoLib'
import { IStore } from '@/store'

export interface IBeatUtils {
  setBeatType (beatType: string, moveAction: string): void;
  replaceBeat (line: string, beatType: string): void;
  setLayer (layer: string): void;
  getIsAddNewLine(): boolean;
}

export default class BeatUtils implements IBeatUtils {
  private point: IPoint
  private layer: string
  private isAddNewLine: boolean
  private notation: Ref<UnwrapRef<Array<ILine>>>;
  private store: IStore | undefined;

  constructor (_point: IPoint, _notation: Ref<UnwrapRef<Array<ILine>>>) {
    this.point = _point
    this.isAddNewLine = false
    this.layer = 'layer1'
    this.store = inject<IStore>('store')
    this.notation = _notation

    watch(() => this.store?.beatType.value, (beatType = '0') => {
      this.setBeatType(beatType, 'next')
    })
  }

  getSheetMusic (): Ref<UnwrapRef<Array<ILine>>> {
    return this.notation
  }

  changeTempo (row: number): void {
    const line = this.notation.value[row]
    const tempo = line.tempo
    let totalBeat = 0
    tempo.split('').forEach(eachTempo => {
      totalBeat += Number(eachTempo)
    })
    this.notation.value[row].layer1.padEnd(totalBeat, '0')
    this.notation.value[row].layer2.padEnd(totalBeat, ']')
  }

  replaceBeat = (line: string, beatType: string): string => {
    if (!beatType) beatType = '0'
    const { col } = this.point.getPoint()

    console.log(col)
    console.log(line)
    console.log(`${line.substring(0, col)}${beatType}${line.substring(col + 1)}`)
    return `${line.substring(0, col)}${beatType}${line.substring(col + 1)}`
  }

  setBeatType = (beatType: string, moveAction = 'next'): void => {
    if (!beatType) {
      return
    }

    const isLayerBeatExist = tempoLib[this.layer].some((_beatType: IBeatType) => _beatType.value === beatType)
    if (!isLayerBeatExist) return

    const row = this.point.getPoint().row
    const line = this.notation.value[row][this.layer]

    this.notation.value[row][this.layer] = this.replaceBeat(line, beatType)
    if (moveAction === 'next') {
      const isAddNewLine = this.moveRight()
      if (isAddNewLine) {
        this.notation.value.push({
          layer1: '0000000000000000',
          layer2: '0000000000000000',
          main: '',
          repeat: '',
          tempo: '4444'
        })
      }
    } else {
      this.moveLeft()
    }
    if (this.store) {
      this.store.beatType.value = ''
    }
  }

  setLayer (layer: string): void {
    this.layer = layer
  }

  getTempo (line: number, subsection: number): number {
    return Number(this.notation.value[line].tempo.split('')[subsection])
  }

  selectBeat (line: number, subsection: number, beat: number): void {
    const col = this.getCol(line, subsection, beat)
    this.point.setPoint(line, col)
  }

  getIsAddNewLine (): boolean {
    const isAddNewLine = this.isAddNewLine
    this.isAddNewLine = false
    return isAddNewLine
  }

  private setTotalBeat () {
    const line = this.point.getPoint().row
    const tempoList = this.notation.value[line].tempo.split('')
    let totalBeat = 0
    for (let list = 0; list < tempoList.length; list++) {
      totalBeat += Number(tempoList[list])
    }
    this.point.setTotalBeat(totalBeat)
  }

  moveRight = (isAutoNextLine = true): boolean => {
    this.setTotalBeat()
    return this.point.moveRight(isAutoNextLine)
  }

  moveLeft = () => {
    this.setTotalBeat()
    this.point.moveLeft(false)
  }

  moveUp = () => {
    this.point.moveUp()
  }

  moveDown = () => {
    this.point.moveDown()
  }

  setTotalLine = (total: number) => {
    this.point.setTotalLine(total)
  }

  getCol (line: number, subsection: number, beat: number) {
    if (subsection === 0) {
      return beat
    }
    let col = 0

    for (let _sub = 0; _sub < subsection; _sub++) {
      const tempo = this.getTempo(line, _sub)
      col += tempo
    }
    col += beat
    return col
  }

  // 選中的位置
  chkIsSelected = computed(() => {
    return (line: number, subsection: number, beat: number) => {
      const col = this.getCol(line, subsection, beat)
      const Point = this.point.getPoint()
      if (line === Point.row && col === Point.col) return 'chooseItem'
    }
  })
}
