<template>
  <div id="app" style="display: flex;">
    <!--        <div>-->
    <!--            <input type="file" accept="audio/midi" @change="getFile">-->
    <!--            <textarea COLS="60" ROWS="35" v-model="midRowData" placeholder="json output..."></textarea>-->
    <!--&lt;!&ndash;            <tone-play-toggle disabled></tone-play-toggle>&ndash;&gt;-->
    <!--        </div>-->
    <div  style="margin-right: 150px;">
      <div style="padding: 10px;">
        <button @click="print" style="margin-right: 10px;">Print</button>
        <button v-if="showLib" @click="showLib = !showLib">Hide</button>
        <button v-else @click="showLib = !showLib">Show</button>
      </div>
      <div>
        <sheetMusic :editState="showLib" :layer-type="layerType"
                    v-model:layerType="layerType"></sheetMusic>
      </div>
    </div>

    <div v-if="showLib" class="tempoLib">
      <div class="hamburger" @click="barArea = !barArea">☰</div>
      <div id="barArea" :style="[ barArea ? { 'display': 'none' } : { 'display': 'block' } ]">
        <div :editState="showLib">
          <div @click="layerType='layer1'" class="changeBtn" :class="{'setChangeBtn':layerType==='layer1'}">下圖(alt+1)</div>
          <div @click="layerType='layer2'" class="changeBtn" :class="{'setChangeBtn':layerType==='layer2'}">上圖(alt+2)</div>
          <div style="clear:both;"></div>
        </div>
        <tempo-side-bar></tempo-side-bar>
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

<style>
.tempoLib {
  margin: 10px;
  position: fixed;
  top: 30px;
  right: 10px;
}

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

<script lang="ts">
import { defineComponent, ref } from 'vue'
import tempoSideBar from './components/tempoSideBar.vue'
import sheetMusic from './components/sheetMusic.vue'

export default defineComponent({
  name: 'App',
  components: {
    sheetMusic,
    tempoSideBar
  },
  setup () {
    const layerType = ref<string>('layer1')
    const showLib = ref<boolean>(true)
    const barArea = ref<boolean>(true)

    return {
      layerType,
      barArea,
      showLib
    }
  }
})

// export default {
//   name: 'App',
//   data: function () {
//     return {
//       what: '',
//       currentMidi: null,
//       midRowData: null,
//       layerType: 'layer1',
//       // sheet: '',
//       // sheetName: '',
//       // docId: '',
//       showLib: true,
//       barArea: true
//       // orders: []
//     }
//   },
//   // watch: {
//   //     windowHeight(newHeight, oldHeight) {
//   //         console.log(newHeight)
//   //         console.log(oldHeight)
//   //     }
//   // },
//   // firestore: {
//   //     orders: fStore.collection('question'),
//   // },
//   components: {
//     tempoSideBar,
//     sheetMusic
//   },
//   methods: {
//     setLayerType (layerType) {
//       this.layerType = layerType
//     },
//     print () {
//       this.showLib = false
//       setTimeout(() => {
//         window.print()
//       }, 100)
//     },
//     getFile (e) {
//       // get the files
//       const files = e.target.files
//       if (files.length > 0) {
//         const file = files[0]
//         this.parseFile(file)
//       }
//     },
//     // parseFile (file) {
//     //   // read the file
//     //   const reader = new FileReader()
//     //   reader.onload = (e) => {
//     //     const midi = new Midi(e.target.result)
//     //     this.midRowData = JSON.stringify(midi, undefined, 2)
//     //     // document.querySelector("#ResultsText").value = JSON.stringify(midi, undefined, 2)
//     //     // document.querySelector('tone-play-toggle').removeAttribute('disabled')
//     //     this.currentMidi = midi
//     //   }
//     //   reader.readAsArrayBuffer(file)
//     // },
//     openTempoBar () {
//       // let state = ;
//       document.getElementById('barArea').style.display = this.barArea ? 'none' : 'block'
//       this.barArea = !this.barArea
//     }
//     // showMessage(msg) {
//     //     alert(msg);
//     // },
//     // setEdit(doc) {
//     //     this.sheetName = doc.sheetName;
//     //     this.sheet = doc.content;
//     //     this.docId = doc.id;
//     // },
//     // saveData() {
//     //     fStore.collection('question').add({
//     //         'content': this.sheet,
//     //         'sheetName': this.sheetName,
//     //         'createTime': new Date()
//     //         // 'createTime': firebase.firestore.Timestamp.fromDate(new Date())
//     //     })
//     //         .then(() => {
//     //             // this.showMessage("Success");
//     //         })
//     // },
//     // deleteData(id) {
//     //     fStore.collection('question').doc(id).delete()
//     //         .then(() => {
//     //             // this.showMessage("Success");
//     //         })
//     // },
//     // updateData() {
//     //     fStore.collection('question').doc(this.docId).set({
//     //         'content': this.sheet,
//     //         'sheetName': this.sheetName,
//     //         'updateTime': new Date()
//     //         // 'createTime': firebase.firestore.Timestamp.fromDate(new Date())
//     //     })
//     //         .then(() => {
//     //             // this.showMessage("Success");
//     //         })
//     // }
//   }
// }
</script>
