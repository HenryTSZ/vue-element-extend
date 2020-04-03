<template>
  <div class="level-table-demo">
    <level-table></level-table>
  </div>
</template>

<script>
import LevelTable from 'plugins/LevelTable'
export default {
  name: 'LevelTableDemo',
  components: { LevelTable },
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

<style lang="less">
.level-table-demo {
}
</style>
