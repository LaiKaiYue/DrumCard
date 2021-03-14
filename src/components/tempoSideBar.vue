<template>
    <div style="display:flex;">
        <div style="display:flex;flex-direction: column;" v-for="(layer,idx) in beatTypeList" :key="idx">
            <div v-for="beatType in layer" :key="beatType.value" class="buttonBox"
                 @click="setBeatType(beatType.value)">
                <span style="padding-left: 5px;">{{beatType.value}}</span>
                <img :src="`/images/${beatType.image}`" class="sideBarImage" style="padding: 5px;">
                <span style="padding-left: 5px;">{{beatType.display}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import beatTypeList from './tempoLib.ts'

export default {
  inject: ['store'],
  name: 'tempoSideBar',
  props: {
    msg: String
  },
  data: function () {
    return {
      beatTypeList
    }
  },
  methods: {
    setBeatType (beatType) {
      this.store.beatType.value = beatType
    }
  }
}
</script>

<style>
    .sideBarImage {
        width: 40px;
        height: 40px;
    }

    .buttonBox {
        padding:3px;
        /*width: 170px;*/
        height: 50px;
        border: 1px black solid;
        display: flex;
        align-items: center;
    }
</style>
