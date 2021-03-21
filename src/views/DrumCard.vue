<template>
  <div id="app" style="display: flex;">
    <!-- midi檔 轉換功能   -->
    <!--        <div>-->
    <!--            <input type="file" accept="audio/midi" @change="getFile">-->
    <!--            <textarea COLS="60" ROWS="35" v-model="midRowData" placeholder="json output..."></textarea>-->
    <!--&lt;!&ndash;            <tone-play-toggle disabled></tone-play-toggle>&ndash;&gt;-->
    <!--        </div>-->

    <!-- sheetMusic樂譜   -->
    <div  style="margin-right: 150px;">
      <div style="padding: 10px;">
        <button @click="print" style="margin-right: 10px;">Print</button>
        <button v-if="showLib" @click="showLib = !showLib">Hide</button>
        <button v-else @click="showLib = !showLib">Show</button>
      </div>
      <div>
        <sheetMusic
            v-model:layerType="layerType"
            :editState="showLib"
            :layer-type="layerType" />
      </div>
    </div>

    <!--  tempoSideBar  -->
    <div v-if="showLib" class="tempoLib">
      <div class="hamburger" @click="barArea = !barArea">☰</div>
      <div id="barArea" :style="[ barArea ? { 'display': 'none' } : { 'display': 'block' } ]">
        <div :editState="showLib">
          <div @click="layerType='layer1'" class="changeBtn" :class="{'setChangeBtn':layerType==='layer1'}">下圖(alt+1)</div>
          <div @click="layerType='layer2'" class="changeBtn" :class="{'setChangeBtn':layerType==='layer2'}">上圖(alt+2)</div>
          <div style="clear:both;"></div>
        </div>
        <tempo-side-bar />
      </div>
    </div>

    <!--<div>-->
    <!--<input v-model="sheetName">-->
    <!--<input v-model="sheet">-->
    <!--<button @click="saveData()">新增資料</button>-->
    <!--<button @click="updateData()">儲存修改資料</button>-->
    <!--</div>-->
    <!--<div v-for="(d,idx) in orders" :key="idx">-->
    <!--<div>-->
    <!--{{d.sheetName}}-->
    <!--<button @click="setEdit(d)">修改資料</button>-->
    <!--<button @click="deleteData(d.id)">刪除資料</button>-->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from 'vue'
import sheetMusic from '@/components/sheetMusic.vue'
import tempoSideBar from '@/components/tempoSideBar.vue'

export default defineComponent({
  name: 'DrumCard',
  components: {
    sheetMusic,
    tempoSideBar
  },
  setup () {
    const layerType = ref<string>('layer1')
    const showLib = ref<boolean>(true)
    const barArea = ref<boolean>(true)

    const print = () => {
      showLib.value = false
      nextTick(() => {
        window.print()
      })
    }

    return {
      layerType,
      barArea,
      showLib,
      print
    }
  }
})
</script>

<style scoped>

</style>
