<template>
  <div class="container flex flex-wrap">
    <!-- sheetMusic樂譜   -->

    <!-- 功能列 -->
    <div class="w-full">
      <div class="flex justify-between pt-3 pl-1 pr-1">
        <div class="mb-5">
          檔案名稱: <input type="text" class="mr-2" v-model="filename" required
            @focus="enableKeyEvent = false" @blue="enableKeyEvent = true">
          <button type="button" class="btn btn-green mr-3" @click="download">Download</button>

          <button class="btn btn-green" @click="$refs.fileRef.click()">
            <input type="file" ref="fileRef" name="file" class="hidden" @change="loadTextFromFile" />
            <i class="fa fa-cloud-upload"></i> 上傳樂譜
          </button>
        </div>

        <div>
          <button
            class="btn btn-green mb-1 mr-3 md:mb-0"
            @click="print"
          >Print</button>
          <button v-if="showLib"
            class="btn btn-green"
            @click="showLib = !showLib"
          >Hide</button>
          <button v-else
            class="btn btn-green"
            @click="showLib = !showLib"
          >Show</button>
        </div>
      </div>

      <!-- 譜 -->
      <div v-for="(line, lineIdx) in sheetMusic" :key="lineIdx">
        <div class="ml-1 mb-3">
          <div v-if="showLib" class="flex justify-between">
            <input class="text-xl font-bold w-auto" v-model="line.main" @focus="enableKeyEvent = false" @blur="enableKeyEvent = true">
            <div class="w-auto">
              節奏：<input class="text-xl font-bold" v-model="line.tempo" @change="changeTempo(lineIdx)" @focus="enableKeyEvent = false" @blur="enableKeyEvent = true">
            </div>
            <input class="text-xl font-bold w-auto" v-model="line.repeat" @focus="enableKeyEvent = false" @blur="enableKeyEvent = true">
          </div>
          <div v-else class="flex justify-between">
              <span class="text-xl font-bold w-auto">{{ line.main }}</span>
              <span class="text-xl font-bold w-auto">{{ line.repeat }}</span>
          </div>
        </div>

        <div class="flex flex-wrap">
          <!-- 一小節 -->
          <template v-for="(subsection, subsectionIdx) in splitTemple(line)" :key="subsectionIdx">
            <div class="backImage mb-3">
              <!-- 每一拍 -->
              <!-- <div class="imageContent" v-for="(beat, beatIdx) in subsection"
                :key="beatIdx"
                :class="chkIsSelected(lineIdx, subsectionIdx, beatIdx)"
                @click="selectBeat(lineIdx, subsectionIdx, beatIdx)"
              >
                <img :src="beatLayer1Img(beat)" class="imageLayerMain">
                <img :src="beatLayer2Img(lineIdx, subsectionIdx, beatIdx).src"
                  :class="beatLayer2Img(lineIdx, subsectionIdx, beatIdx).class"
                >
              </div> -->
              <el-popover
                placement="bottom"
                :width="120"
                :close-delay="10"
                :key="beatIdx"
                v-for="(beat, beatIdx) in subsection"
                trigger="click"
              >
                <template #reference>
                  <div class="imageContent"
                    :class="chkIsSelected(lineIdx, subsectionIdx, beatIdx)"
                    @click="selectBeat(lineIdx, subsectionIdx, beatIdx)"
                  >
                    <img :src="beatLayer1Img(beat)" class="imageLayerMain">
                  </div>
                </template>
                <el-table
                  :data="tempoLibLayer1"
                  @row-click="handleSelect"
                  stripe
                  height="300px"
                >
                  <el-table-column width="50" property="value" label="按鍵"></el-table-column>
                  <!-- <el-table-column width="100" property="display" label="節奏"></el-table-column> -->
                  <el-table-column width="50" property="image" label="圖片">
                    <template #default="scope">
                      <img width='30' :src="scope.row.image">
                    </template>
                  </el-table-column>
                </el-table>
              </el-popover>
            </div>
          </template>
          <div v-show="showLib" style="display:flex;align-items: center;">
            <div style="padding: 10px;">
              <div @click="insertAt(lineIdx, 'add')"><i class="fas fa-plus fa-1x"></i></div>
              <div @click="delLine(lineIdx)"><i class="fas fa-minus fa-1x"></i></div>
              <div @click="insertAt(lineIdx, 'copy')"><i class="fas fa-copy fa-1x"></i></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch, ref, nextTick } from 'vue'
import BeatUtils from '@/components/common/BeatUtils'
import GlobalListener from '@/components/common/GlobalListener'
import tempoLib from '@/components/tempoLib'
import { IBeatType, ILine } from '@/interface/IBeatLib'
import Point from '@/components/Point'

export default defineComponent({
  name: 'DrumCard',
  setup (props, context) {
    const notation = ref<Array<ILine>>([{ layer1: '0000000000000000', layer2: ']]]]]]]]]]]]]]]]', tempo: '4444', main: 'line1', repeat: '*4' }])

    const beatUtils = new BeatUtils(new Point(), notation)
    const sheetMusic = beatUtils.getSheetMusic()
    const _GlobalListenser = new GlobalListener(beatUtils, context)
    const filename = ref<string>('')
    const enableKeyEvent = ref<boolean>(true)
    const showLib = ref<boolean>(true)
    const layerType = ref<string>('layer1')
    const barArea = ref<boolean>(true)

    const print = () => {
      showLib.value = false
      nextTick(() => {
        window.print()
      })
    }

    // 監聽 layerType 上下層事件
    watch(() => layerType.value, (_layerType: string) => {
      beatUtils.setLayer(_layerType)
    })
    // 監聽是否在編輯中
    watch(() => enableKeyEvent.value, (value) => {
      _GlobalListenser.setDisabled(value)
    })

    /**
     * 設定拍子
     * @param beatType {string} - 節拍屬性
     * @param [moveAction="next"] {string} - 選前一格或後一格
     */
    const setBeatType = (beatType: string, moveAction = 'next'): void => {
      beatUtils.setBeatType(beatType, moveAction)
    }

    // 設定key event
    _GlobalListenser.setup(setBeatType)

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
    // 轉換上下層圖片
    const beatLayer1Img = computed(() => {
      return (beat: string) => {
        const _obj = tempoLib.layer1.find(temp => temp.value === beat)
        if (!_obj) return ''
        return `/images/${_obj.image}`
      }
    })
    const beatLayer2Img = computed(() => {
      return (line: number, subsection: number, beatIdx: number) => {
        const col = beatUtils.getCol(line, subsection, beatIdx)
        const layer2 = sheetMusic.value[line].layer2
        const image = tempoLib.layer2.find(temp => temp.value === layer2[col]) || { image: '', classList: [] }
        const img_src = `/images/${image.image}`
        const img_class = image.classList
        return { src: img_src, class: img_class }
      }
    })

    // const tempoLibLayer1 = tempoLib.layer1
    const tempoLibLayer1 = computed(() => {
      return tempoLib.layer1.map((_layer1) => {
        return {
          display: _layer1.display,
          value: _layer1.value,
          image: `/images/${_layer1.image}`
        }
      })
    })

    // 選中的位置
    const chkIsSelected = beatUtils.chkIsSelected

    const changeTempo = (row: number) => {
      beatUtils.changeTempo(row)
    }

    const handleSelect = (row: IBeatType, column: object, event: object) => {
      setBeatType(row.value, 'next')
    }

    /**
     * click選位置
     * @param line {array} - 行數
     * @param subsection {string} - 小節
     * @param beatIdx {number} - 節拍
     */
    const selectBeat = (line: number, subsection: number, beatIdx: number): void => {
      beatUtils.selectBeat(line, subsection, beatIdx)
    }

    // 讀入檔案
    const loadTextFromFile = (ev: any) => {
      const file = ev.target.files[0]
      const reader = new FileReader()

      reader.onload = (e: any) => {
        sheetMusic.value = JSON.parse(e.target.result)
        beatUtils.setTotalLine(sheetMusic.value.length)
        beatUtils.setPoint(0, 0)
      }
      reader.readAsText(file)
      ev.target.value = null
    }

    /**
     * 新增、複製Line
     * @param lineIdx {number} - 哪一列
     * @param type {string} - 新增或複製
     */
    const insertAt = (lineIdx: number, type: string) => {
      if (type === 'add') {
        sheetMusic.value.splice(lineIdx + 1, 0, {
          layer1: '0000000000000000',
          layer2: ']]]]]]]]]]]]]]]]',
          main: '',
          repeat: '',
          tempo: '4444'
        })
      } else {
        const newLine = sheetMusic.value[lineIdx]
        sheetMusic.value.splice(lineIdx + 1, 0, JSON.parse(JSON.stringify(newLine)))
      }
      beatUtils.setTotalLine(sheetMusic.value.length)
    }

    /**
     * 刪除Line
     * @param lineIdx {number} - 要刪除的列
     */
    const delLine = (lineIdx: number) => {
      if (sheetMusic.value.length === 1) return
      sheetMusic.value.splice(lineIdx, 1)
      const col = beatUtils.getPoint().col
      beatUtils.setPoint(sheetMusic.value.length - 1, col)
      beatUtils.setTotalLine(sheetMusic.value.length)
    }

    const download = () => {
      const _line = JSON.stringify(sheetMusic.value)
      const data = new Blob([_line], { type: 'text/plain' })
      const a = document.createElement('a')
      a.href = URL.createObjectURL(data)
      a.download = filename.value
      a.click()
    }

    return {
      layerType,
      barArea,
      sheetMusic,
      enableKeyEvent,
      splitTemple,
      tempoLibLayer1,
      chkIsSelected,
      beatLayer1Img,
      beatLayer2Img,
      filename,
      download,
      changeTempo,
      loadTextFromFile,
      selectBeat,
      insertAt,
      delLine,
      print,
      showLib,
      handleSelect
    }
  }
})
</script>

<style scoped>

.hamburger{
  margin: 10px;
  position: fixed;
  top: 0px;
  right: 0;
}

.changeBtn {
  float:left;
  width: 100px;
  border: 1px black solid;
  border-radius: 20px;
  text-align: center;
  padding: 5px;
  margin: 5px;
}

.setChangeBtn {
  background-color: deepskyblue;
}

.btn {
  @apply px-4 font-semibold rounded-lg shadow-md;
}
.btn-green {
  @apply text-white bg-green-500 hover:bg-green-700;
}
.textSize {
  @apply text-xl font-bold;
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
  @apply flex m-1 bg-contain;
  @apply border border-solid border-black;
}
</style>
