import BeatUtils from '@/components/common/BeatUtils'
import { ref, SetupContext } from 'vue'

export default class GlobalListener {
  private _BeatUtils: BeatUtils
  private altKey = ref<boolean>(false)
  private enableKeyEvent = true
  private context: SetupContext

  constructor (_BeatUtils: BeatUtils, context: SetupContext) {
    this._BeatUtils = _BeatUtils
    this.context = context
  }

  setup = (setBeatType: (beatType: string, moveAction?: string) => void) => {
    window.addEventListener('keypress', (e) => {
      if (!this.enableKeyEvent) return
      const key = e.key
      const keyCharCode = key.charCodeAt(0)

      // 0-9
      if (keyCharCode >= 48 && keyCharCode <= 57) {
        setBeatType((keyCharCode % 48).toString(), 'next')
      } else {
        setBeatType(key, 'next')
      }
    })

    window.addEventListener('keydown', (e) => {
      if (!this.enableKeyEvent) return
      const key = e.key
      const keyCharCode = key.charCodeAt(0)

      // press alt
      if (keyCharCode === 65) this.altKey.value = true

      // alt + 1
      if (this.altKey.value && (keyCharCode === 161)) this.context.emit('update:layerType', 'layer1')
      // alt + 2
      if (this.altKey.value && (keyCharCode === 8482)) this.context.emit('update:layerType', 'layer2')

      if (key === 'Backspace') {
        setBeatType('0', 'back')
      } else if (key === 'ArrowRight') {
        this._BeatUtils.moveRight()
      } else if (key === 'ArrowLeft') {
        this._BeatUtils.moveLeft()
      } else if (key === 'ArrowUp') this._BeatUtils.moveUp()
      else if (key === 'ArrowDown') this._BeatUtils.moveDown()
    })

    window.addEventListener('keyup', (e) => {
      if (!this.enableKeyEvent) return
      const key = e.key
      const keyCharCode = key.charCodeAt(0)

      // alt
      if (keyCharCode === 65) this.altKey.value = false
    })
  }

  setDisabled = (isDisabled: boolean): void => {
    this.enableKeyEvent = isDisabled
  }
}
