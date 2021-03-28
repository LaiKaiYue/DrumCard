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
    <div v-for="(line, lineIdx) in sheetMusic" :key="lineIdx">
      <div v-if="editState" class="textCol">
        <input class="textSize" v-model="line.main" @focus="enableKeyEvent = false" @blur="enableKeyEvent = true">
        節奏：<input class="textSize" v-model="line.tempo" @change="changeTempo(lineIdx)" @focus="enableKeyEvent = false" @blur="enableKeyEvent = true">
        <input class="textSize" v-model="line.repeat" @focus="enableKeyEvent = false" @blur="enableKeyEvent = true">
      </div>
      <div v-else class="textCol">
        <span class="textSize">{{ line.main }}</span>
        <span class="textSize">{{ line.repeat }}</span>
      </div>
      <div style="display: flex;margin: 20px 0px;">
        <!-- 一小節 -->
        <template v-for="(subsection, subsectionIdx) in splitTemple(line)" :key="subsectionIdx">
          <div style="display: flex; flex-direction: column;">
<!--            <div>-->
<!--              <input type="radio" name="tempo" value="4"> 4拍-->
<!--              <input type="radio" name="tempo" value="6"> 6拍-->
<!--            </div>-->
            <div class="backImage">
              <!-- 每一拍 -->
              <div class="imageContent" v-for="(beat, beatIdx) in subsection"
                   :key="beatIdx"
                   :class="chkIsSelected(lineIdx, subsectionIdx, beatIdx)"
                   @click="selectBeat(lineIdx, subsectionIdx, beatIdx)"
              >
                <img :src="beatLayer1Img(beat)" class="imageLayerMain">
                <img :src="beatLayer2Img(lineIdx, subsectionIdx, beatIdx).src"
                     :class="beatLayer2Img(lineIdx, subsectionIdx, beatIdx).class">
              </div>
            </div>
          </div>
        </template>
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
import { defineComponent, computed, watch, ref } from 'vue'
import BeatUtils from '@/components/common/BeatUtils'
import GlobalListener from '@/components/common/GlobalListener'
import tempoLib from './tempoLib'
import { ILine } from '@/interface/IBeatLib'

export default defineComponent({
  props: {
    editState: {
      type: Boolean
    },
    layerType: {
      type: String,
      required: true
    }
  },
  setup (props, context) {
    const beatUtils = new BeatUtils()
    const sheetMusic = beatUtils.getSheetMusic()
    const _GlobalListenser = new GlobalListener(beatUtils, context)
    const filename = ref<string>('')
    const enableKeyEvent = ref<boolean>(true)

    // 監聽 layerType 上下層事件
    watch(() => props.layerType, (layerType: string) => {
      beatUtils.setLayer(layerType)
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

    // download 路徑
    const url = computed(() => {
      const _line = JSON.stringify(sheetMusic.value)
      const data = new Blob([_line], { type: 'text/plain' })
      return URL.createObjectURL(data)
    })
    // download檔名
    const downloadFilename = computed(() => `${filename.value}.txt`)
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
    // 選中的位置
    const chkIsSelected = beatUtils.chkIsSelected

    const changeTempo = (row: number) => {
      beatUtils.changeTempo(row)
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

    return {
      sheetMusic,
      url,
      enableKeyEvent,
      splitTemple,
      chkIsSelected,
      beatLayer1Img,
      beatLayer2Img,
      filename,
      downloadFilename,
      changeTempo,
      loadTextFromFile,
      selectBeat,
      insertAt,
      delLine
    }
  }
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
