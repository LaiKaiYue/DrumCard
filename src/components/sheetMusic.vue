<template>
    <div>
        <!--        <button @click="createFile">Create file</button>-->
        <!--        <a v-show="downloadState" download="info.txt" :href="url">Download</a>-->
        <div v-if="editState" style="padding: 10px;">
            檔案名稱: <input type="text" v-model="filename" required>
            <a :download="downloadFilename" :href="url">
                <button type="button">Download</button>
            </a>
            <input type="file" name="file" id="file" @change="loadTextFromFile">
        </div>
        <div v-for="(line, lineIdx) in line" :key="lineIdx">
            <div v-if="editState" class="textCol">
                <input class="textSize" v-model="line.main" @focus="enableKeyEvent = false" @blur="enableKeyEvent = true">
                <input class="textSize" v-model="line.repeat" @focus="enableKeyEvent = false" @blur="enableKeyEvent = true">
            </div>
            <div v-else class="textCol">
                <span class="textSize">{{line.main}}</span>
                <span class="textSize">{{line.repeat}}</span>
            </div>
            <div style="display: flex;margin: 20px 0px;">
                <!-- 一小節 -->
                <div class="backImage" v-for="(bar, barIdx) in splitTemple(line.layer1)" :key="barIdx">
                    <!-- 每一拍 -->
                    <div class="imageContent" v-for="(beat, beatIdx) in bar"
                         :key="beatIdx"
                         :class="chkIsSelected(lineIdx, barIdx, beatIdx)"
                         @click="selectBeat(lineIdx, barIdx, beatIdx)"
                    >
                        <img :src="beatLayer1Img(beat)" class="imageLayerMain">
                        <img :src="beatLayer2Img(line.layer2, barIdx, beatIdx).src" :class="beatLayer2Img(line.layer2, barIdx, beatIdx).class">
                    </div>
                </div>
                <div v-show="editState" style="display:flex;align-items: center;">
                    <div style="padding: 10px;">
                        <div @click="insertAt(lineIdx, 'add')"><i class="fas fa-plus fa-1x"></i></div>
                        <div @click="delLine(lineIdx)"><i class="fas fa-minus fa-1x"></i></div>
                        <div @click="insertAt(lineIdx, 'copy')"><i class="fas fa-copy fa-1x"></i></div>
                    </div>
                </div>
            </div>
            <!--未來放字-->
            <!--<div style="display: flex;">-->
            <!--<div class="backImage" v-for="(one,idx) in temple.down" :key="idx" v-show="idx%4===0">-->
            <!--<img src="/images/tom1.png" class="imageBox">-->
            <!--<img src="/images/tom2.png" class="imageBox">-->
            <!--<img src="/images/tom3.png" class="imageBox">-->
            <!--<img src="/images/tom1.png" class="imageBox">-->
            <!--</div>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, inject, computed, ref } from 'vue'
import { IStore } from '@/store'
import { ItxtLayer, Ibeat } from '@/interface/Itempo'
import tempoLib from './tempoLib'
import Point from './Point'

export default defineComponent({
  props: {
    editState: {
      type: Boolean
    },
    layerType: {
      type: String,
      // default: 'layer1'
      required: true
    }
  },
  setup (props, context) {
    const lineTmp = ref<Array<ItxtLayer>>([
      { layer1: '1234567890-=0000', layer2: 'qwertyuiqwertyui', main: 'A1', repeat: '*3' }
    ])
    const filename = ref<string>('')
    const selected_beat = new Point()
    const altKey = ref<boolean>(false)
    const enableKeyEvent = ref<boolean>(true)
    const store = inject<IStore>('store')

    /**
    * 點擊換拍子, 取代字串
    * @param replace {string} - 要取代的數字
    */
    const replaceAt = (replace: string) => {
      if (!replace) replace = '0'

      const { row, col } = selected_beat.getPoint()
      const _line: string = lineTmp.value[row][props.layerType]
      lineTmp.value[row][props.layerType] = `${_line.substring(0, col)}${replace}${_line.substring(col + 1)}`

      if (store) {
        store.beatType.value = ''
      }
    }

    /**
     * 設定拍子
     * @param beatType {string} - 節拍屬性
     * @param [keyType="next"] {string} - 選前一格或後一格
     */
    const setBeatType = (beatType: string, keyType = 'next'): void => {
      if (!beatType) {
        return
      }

      const isLayerBeatExist = tempoLib[props.layerType].some((layer: Ibeat) => layer.value === beatType)
      if (!isLayerBeatExist) return

      replaceAt(beatType)

      if (keyType === 'next') {
        const isAddNewLine = selected_beat.moveRight()
        if (isAddNewLine) {
          lineTmp.value.push({
            layer1: '0000000000000000',
            layer2: ']]]]]]]]]]]]]]]]',
            main: '',
            repeat: ''
          })
        }
      } else {
        const isDelLine = selected_beat.moveLeft()
        if (isDelLine) {
          // lineTmp.value.splice(lineTmp.value.length - 1, 1)
        }
      }
    }

    window.addEventListener('keypress', (e) => {
      if (!enableKeyEvent.value) return
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
      if (!enableKeyEvent.value) return
      const key = e.key
      const keyCharCode = key.charCodeAt(0)

      // press alt
      if (keyCharCode === 65) altKey.value = true

      // alt + 1
      if (altKey.value && (keyCharCode === 161)) context.emit('update:layerType', 'layer1')
      // alt + 2
      if (altKey.value && (keyCharCode === 8482)) context.emit('update:layerType', 'layer2')

      if (key === 'Backspace') {
        setBeatType('0', 'back')
      } else if (key === 'ArrowRight') {
        selected_beat.moveRight(false)
      } else if (key === 'ArrowLeft') {
        selected_beat.moveLeft(false)
      } else if (key === 'ArrowUp') selected_beat.moveUp()
      else if (key === 'ArrowDown') selected_beat.moveDown()
    })

    window.addEventListener('keyup', (e) => {
      if (!enableKeyEvent.value) return
      const key = e.key
      const keyCharCode = key.charCodeAt(0)

      // alt
      if (keyCharCode === 65) altKey.value = false
    })

    const line = computed(() => {
      let _beatType = '0'
      if (store) {
        _beatType = store.beatType.value
      }
      setBeatType(_beatType, 'next')

      return lineTmp.value
    })

    // const url = computed(() => {
    //   const _line = JSON.stringify(line)
    //   const data = new Blob([_line], { type: 'text/plain' })
    //   return window.URL.createObjectURL(data)
    // })
    const downloadFilename = computed(() => `${filename.value}.txt`)
    const splitTemple = computed(() => {
      return (template = '') => {
        return template.match(/.{1,4}/g)
      }
    })
    const beatLayer1Img = computed(() => {
      return (beat: string) => {
        const _obj = tempoLib.layer1.find(temp => temp.value === beat)
        if (!_obj) return ''
        return `/images/${_obj.image}`
      }
    })
    const beatLayer2Img = computed(() => {
      return (layer2: string, barIdx: number, beatIdx: number) => {
        const layer2Idx = (barIdx * 4) + beatIdx
        const image = tempoLib.layer2.find(temp => temp.value === layer2[layer2Idx]) || { image: '', classList: [] }
        const img_src = `/images/${image.image}`
        const img_class = image.classList
        return { src: img_src, class: img_class }
      }
    })
    const chkIsSelected = computed(() => {
      return (line: number, measure: number, beatIdx: number) => {
        const row: number = line
        const col = measure * 4 + beatIdx
        const Point = selected_beat.getPoint()
        if (row === Point.row && col === Point.col) return 'chooseItem'
      }
    })

    /**
     * click選位置
     * @param line {array} - 行數
     * @param measure {string} - 小節
     * @param beatIdx {number} - 節拍
     */
    const selectBeat = (line: number, measure: number, beatIdx: number): void => {
      console.log(line, measure * 4 + beatIdx)
      selected_beat.setPoint(line, measure * 4 + beatIdx)
    }

    // const loadTextFromFile = (ev: any) => {
    //   const file = ev.target.files[0]
    //   const reader = new FileReader()
    //
    //   reader.onload = (e: any) => {
    //     if (e.target) {
    //       lineTmp.value = JSON.parse(<string>e.target.result)
    //       selected_beat.setTotalLine(lineTmp.value.length)
    //       selected_beat.setPoint(0, 0)
    //     }
    //   }
    //
    //   reader.readAsText(file)
    // }

    return {
      line,
      enableKeyEvent,
      splitTemple,
      // loadTextFromFile,
      selectBeat,
      chkIsSelected,
      beatLayer1Img,
      beatLayer2Img,
      filename,
      downloadFilename
    }
  }

  // created () {
  //   window.addEventListener('keypress', (e) => {
  //     if (!this.enableKeyEvent) return
  //     const key = e.key
  //     const keyCharCode = key.charCodeAt(0)
  //
  //     // 0-9
  //     if (keyCharCode >= 48 && keyCharCode <= 57) {
  //       this.setBeatType(keyCharCode % 48, 'next')
  //     } else {
  //       this.setBeatType(key, 'next')
  //     }
  //   })
  //
  //   window.addEventListener('keydown', (e) => {
  //     if (!this.enableKeyEvent) return
  //     const key = e.key
  //     const keyCharCode = key.charCodeAt(0)
  //
  //     // press alt
  //     if (keyCharCode === 65) this.altKey = true
  //
  //     // alt + 1
  //     if (this.altKey && (keyCharCode === 161)) this.$emit('update', 'layer1')
  //     // alt + 2
  //     if (this.altKey && (keyCharCode === 8482)) this.$emit('update', 'layer2')
  //
  //     if (key === 'Backspace') {
  //       this.setBeatType('0', 'back')
  //     } else if (key === 'ArrowRight') {
  //       this.selected_beat.moveRight(false)
  //     } else if (key === 'ArrowLeft') {
  //       this.selected_beat.moveLeft(false)
  //     } else if (key === 'ArrowUp') this.selected_beat.moveUp()
  //     else if (key === 'ArrowDown') this.selected_beat.moveDown()
  //   })
  //
  //   window.addEventListener('keyup', (e) => {
  //     if (!this.enableKeyEvent) return
  //     const key = e.key
  //     const keyCharCode = key.charCodeAt(0)
  //
  //     // alt
  //     if (keyCharCode === 65) this.altKey = false
  //   })
  // },
  //
  // methods: {
  //
  //   loadTextFromFile (ev) {
  //     const file = ev.target.files[0]
  //     const reader = new FileReader()
  //
  //     reader.onload = e => {
  //       this.line = JSON.parse(e.target.result)
  //       this.selected_beat.setTotalLine(this.line.length)
  //       this.selected_beat.setPoint(0, 0)
  //     }
  //
  //     reader.readAsText(file)
  //   },
  //
  //   /**
  //        * click選位置
  //        * @param line {array} - 行數
  //        * @param measure {string} - 小節
  //        * @param beatIdx {number} - 節拍
  //        */
  //   selectBeat (line, measure, beatIdx) {
  //     this.selected_beat.setPoint(line, measure * 4 + beatIdx)
  //   },
  //
  //   /**
  //            * 新增、複製Line
  //            * @param lineIdx {number} - 哪一列
  //            * @param type {string} - 新增或複製
  //            */
  //   insertAt (lineIdx, type) {
  //     if (type === 'add') {
  //       this.line.splice(lineIdx + 1, 0, {
  //         layer1: '0000000000000000',
  //         layer2: ']]]]]]]]]]]]]]]]',
  //         main: '',
  //         repeat: ''
  //       })
  //     } else {
  //       const newLine = this.line[lineIdx]
  //       this.line.splice(lineIdx + 1, 0, JSON.parse(JSON.stringify(newLine)))
  //     }
  //     this.selected_beat.setTotalLine(this.line.length)
  //   },
  //
  //   /**
  //            * 刪除Line
  //            * @param lineIdx {number} - 要刪除的列
  //            */
  //   delLine (lineIdx) {
  //     if (this.line.length === 1) return
  //     this.line.splice(lineIdx, 1)
  //     const col = this.selected_beat.getPoint()[1]
  //     this.selected_beat.setPoint(this.line.length - 1, col)
  //     this.selected_beat.setTotalLine(this.line.length)
  //   }
  // }
})
</script>

<style>

    .textSize {
        font-size: 20px;
        font-weight: bold;
    }

    .textCol {
        display: flex;
        justify-content: space-between;
        margin: 10px 45px 5px 10px;
    }

    .imageContent {
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 60px;
        height: 100px;
    }

    .chooseItem {
        border: 2px brown solid;
    }

    .imageLayerMain {
        position: absolute;
        width: 70px;
        height: 70px;
    }

    .imageLayerSubMain {
        position: absolute;
        width: 70px;
        height: 70px;
    }

    .imageLayerSubMainUp {
        position: absolute;
        width: 70px;
        margin-top: -16px;
    }

    .imageLayerSubMainDown {
        position: absolute;
        width: 70px;
        margin-top: 16px;
    }

    .backImage {
        background-image: url('/images/background.jpg');
        background-size: 256px 70px;
        width: 256px;
        height: 70px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin: 4px;
        border: 1px black solid;
    }

</style>
