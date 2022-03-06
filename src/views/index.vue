<template>
  <div class="container w-full mx-auto text-center">
    <div class="w-auto inline-block">
      <!-- 功能列 -->
      <div class="flex justify-between pt-3 pb-3">
        <!-- 下載/上傳區 -->
        <div class="flex items-center">
          <div class="mr-1">
            <input required v-model="filename"
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="fileName" type="text"
              placeholder="File Name"
              @focus="enableKeyEvent = false"
              @blue="enableKeyEvent = true"
            />
          </div>

          <div class="inline-flex">
            <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" @click="download">
              <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
              <span>Download</span>
            </button>

            <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center ml-1" @click="$refs.fileRef.click()">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
              <span>Upload</span>
            </button>
          </div>
        </div>
        <!-- 列印區 -->
        <div class="flex items-cente">
          <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mr-1" @click="print">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z" clip-rule="evenodd" />
            </svg>
            <span>Print</span>
          </button>

          <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" v-show="showLib" @click="showLib = !showLib">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clip-rule="evenodd" />
              <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
            </svg>
            <span>Hide</span>
          </button>
          <button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center" v-show="!showLib" @click="showLib = !showLib">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" />
            </svg>
            <span>Show</span>
          </button>
        </div>
      </div>

      <!-- 譜區 -->
      <div v-for="(line, lineIndex) in notation" :key="lineIndex">
        <!-- 每一個段落 -->
        <!-- 標題 -->
        <div v-show="showLib" class="flex justify-between items-center">
          <div class="flex-1">
            <input
              v-model="line.main"
              class="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text"
            />
          </div>
          <div class="flex-1">
            <input
              v-model="line.tempo"
              class="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text"
              placeholder="節奏"
              id="tempo"
            />
          </div>
          <div class="flex-1">
            <input
              v-model="line.repeat"
              class="appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" type="text"
            />
          </div>
        </div>
        <div v-show="!showLib" class="flex justify-between">
            <span class="text-xl font-bold w-auto">{{ line.main }}</span>
            <span class="text-xl font-bold w-auto">{{ line.repeat }}</span>
        </div>
        <!-- /標題 -->

        <!-- 節奏區 -->
        <div class="flex flex-wrap mb-1 mt-1">
          <!-- 一小節 -->
          <div class="backImage" v-for="(bar, barIndex) in splitTemple(line)" :key="barIndex">
            <!-- 4拍 -->
            <div class="imageContent cursor-pointer" v-for="(note, noteIndex) in bar" :key="noteIndex"
              @click="selectBeat(lineIndex, barIndex, noteIndex)"
            >
              <div :class="chkIsSelected(lineIndex, barIndex, noteIndex)"></div>
              <img :src="layer1Image(note)" class="imageLayerMain">
              <img :src="layer2Image(lineIndex, barIndex, noteIndex).src"
              :class="layer2Image(lineIndex, barIndex, noteIndex).class">
            </div>
          </div>
          <div v-show="showLib" class="flex align-center ml-2">
            <div>
              <div><i class="fas fa-plus fa-1x"></i></div>
              <div><i class="fas fa-minus fa-1x"></i></div>
              <div><i class="fas fa-copy fa-1x"></i></div>
            </div>
          </div>
        </div>
        <!-- /節奏區 -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import tempoLib from '@/components/tempoLib'
import { IBeatType, ILine } from '@/interface/IBeatLib'
import { computed, defineComponent, nextTick, ref, watch } from 'vue'
import BeatUtils from '@/components/common/BeatUtils'
import Point from '@/components/Point'
import GlobalListener from '@/components/common/GlobalListener'

export default defineComponent({
  name: 'index',
  setup (props, context) {
    const notation = ref<Array<ILine>>([{ layer1: '0000000000000000', layer2: ']]]]]]]]]]]]]]]]', tempo: '4444', main: 'line1', repeat: '*4' }])
    const point: Point = new Point()
    const beatUtils = new BeatUtils(point, notation)
    const globalListenser = new GlobalListener(beatUtils, context)
    const showLib = ref(true)
    const filename = ref('')
    const layerType = ref<string>('layer1')

    beatUtils.setPoint(0, 0)

    const print = () => {
      showLib.value = false
      nextTick(() => {
        window.print()
      })
    }

    /**
     * 設定拍子
     * @param beatType {string} - 節拍屬性
     * @param [moveAction="next"] {string} - 選前一格或後一格
     */
    const setBeatType = (beatType: string, moveAction = 'next'): void => {
      if (!beatType) {
        return
      }

      const isLayerBeatExist = tempoLib[layerType.value].some((_beatType: IBeatType) => _beatType.value === beatType)
      if (!isLayerBeatExist) return

      const row = point.getPoint().row
      const line = notation.value[row][layerType.value]

      notation.value[row][layerType.value] = beatUtils.replaceBeat(line, beatType)
      if (moveAction === 'next') {
        const isAddNewLine = beatUtils.moveRight()
        if (isAddNewLine) {
          notation.value.push({
            layer1: '0000000000000000',
            layer2: ']]]]]]]]]]]]]]]]',
            main: '',
            repeat: '',
            tempo: '4444'
          })
        }
      } else {
        beatUtils.moveLeft()
      }
      // if (this.store) {
      //   this.store.beatType.value = ''
      // }
    }

    // 設定key event
    globalListenser.setup(setBeatType)

    // 切換節奏
    const splitTemple = computed(() => {
      return (line: ILine) => {
        const _ary: Array<string> = []
        const tempo = line.tempo
        let from = 0
        tempo.split('').forEach(char => {
          _ary.push(line.layer1.substr(from, Number(char)))
          from += Number(char)
        })
        return _ary
      }
    })

    const getTempo = (lineIndex: number, barIndex: number): number => {
      return Number(notation.value[lineIndex].tempo.split('')[barIndex])
    }

    const getCol = (line: number, subsection: number, beat: number) => {
      if (subsection === 0) {
        return beat
      }
      let col = 0

      for (let _sub = 0; _sub < subsection; _sub++) {
        const tempo = getTempo(line, _sub)
        col += tempo
      }
      col += beat
      return col
    }

    // 選中的位置
    const chkIsSelected = computed(() => {
      return (line: number, barIndex: number, noteIndex: number) => {
        const col = getCol(line, barIndex, noteIndex)
        const _point = point.getPoint()
        if (line === _point.row && col === _point.col) return 'chooseItem'
      }
    })

    /**
     * click選位置
     * @param line {array} - 行數
     * @param subsection {string} - 小節
     * @param beatIdx {number} - 節拍
     */
    const selectBeat = (lineIndex: number, barIndex: number, noteIndex: number): void => {
      const col = getCol(lineIndex, barIndex, noteIndex)
      point.setPoint(lineIndex, col)
    }

    // 轉換第一層圖片
    const layer1Image = computed(() => {
      return (beat: string) => {
        const _obj = tempoLib.layer1.find(temp => temp.value === beat)
        if (!_obj) return ''
        return `/images/${_obj.image}`
      }
    })

    // 轉換第二層圖片
    const layer2Image = computed(() => {
      return (line: number, barIndex: number, noteIndex: number) => {
        const col = beatUtils.getCol(line, barIndex, noteIndex)
        const layer2 = notation.value[line].layer2
        const image = tempoLib.layer2.find(temp => temp.value === layer2[col]) || { image: '', classList: [] }
        const img_src = `/images/${image.image}`
        const img_class = image.classList
        return { src: img_src, class: img_class }
      }
    })

    return {
      showLib,
      filename,
      notation,
      splitTemple,
      selectBeat,
      layer1Image,
      layer2Image,
      print,
      chkIsSelected
    }
  }
})
</script>

<style scoped>
.backImage {
  background-image: url('/images/background.jpg');
  @apply flex mr-1 ml-1 bg-contain;
  @apply border border-solid border-black;
  height: 80px;
}
.imageContent {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 60px;
  height: 100%;
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
.chooseItem {
  z-index: 9999;
  border: 3px brown solid;
  width: 70px;
  height: 70px;
}
</style>
