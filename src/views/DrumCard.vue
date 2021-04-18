<template>
  <div class="flex flex-wrap">
    <!-- midi檔 轉換功能   -->
    <!--        <div>-->
    <!--            <input type="file" accept="audio/midi" @change="getFile">-->
    <!--            <textarea COLS="60" ROWS="35" v-model="midRowData" placeholder="json output..."></textarea>-->
    <!--&lt;!&ndash;            <tone-play-toggle disabled></tone-play-toggle>&ndash;&gt;-->
    <!--        </div>-->

    <!-- sheetMusic樂譜   -->
    <div class="w-full">
      <sheetMusic
        v-model:layerType="layerType"
        :layer-type="layerType" />
    </div>

    <!--  tempoSideBar  -->
    <div v-if="false" class="">
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
import { defineComponent, ref } from 'vue'
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
    const barArea = ref<boolean>(true)

    return {
      layerType,
      barArea
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
</style>
