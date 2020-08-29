<!--
 * @Author: HenryTSZ
 * @Date: 2020-02-04 11:13:42
 * @Description:
 * @LastEditors: HenryTSZ
 * @LastEditTime: 2020-08-25 14:08:02
-->
<template>
  <div>
    <img :src="src" alt="" class="share-image" />
    <vue-canvas-poster
      class="poster"
      :widthPixels="1000"
      :painting="painting"
      @success="success"
      @fail="fail"
    ></vue-canvas-poster>
  </div>
</template>
<script>
import { drawPoster } from './painter'
export default {
  name: 'app',
  data() {
    return {
      src: '',
      painting: {}
    }
  },
  mounted() {
    const params = {
      // type: 'pro' // 尝试换一下base,image
      // type: 'base' // 尝试换一下base,image
      type: 'bridge' // 尝试换一下base,image
    }
    drawPoster(params).then(res => {
      this.painting = res
    })
  },
  methods: {
    // 保存
    success(src) {
      this.src = src
    },
    fail(err) {
      console.log('fail', err)
    }
  }
}
</script>

<style>
.header {
  width: 100%;
  height: 45px;
  line-height: 45px;
  text-align: center;
}
.share-image {
  width: 100%;
  height: auto;
}
</style>
