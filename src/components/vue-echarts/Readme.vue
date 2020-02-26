<template>
  <div class="vue-echarts-readme">
    <pre><code>
  本插件是在 <el-link
      type="primary"
      :underline="false"
      href="https://github.com/ecomfe/vue-echarts"
      target="_blank"
      >vue-echarts<i class="el-icon-folder el-icon--right"></i
    ></el-link> 的基础上再次封装

  目前只是把基础配置提取出来, 减少重复代码, 只支持简单图表

    </code></pre>
  </div>
</template>

<script>
export default {
  name: 'VueEchartsReadme',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    init() {}
  },
  created() {
    this.init()
  },
  mounted() {}
}
</script>

<style lang="less"></style>
