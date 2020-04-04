<template>
  <el-table class="tree-table" :ref="ref" v-bind="$attrs"><slot></slot></el-table>
</template>

<script>
export default {
  name: 'TreeTable',
  components: {},
  props: {
    level: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      ref: 'elTable',
      maxLevel: 0,
      treeData: {}
    }
  },
  computed: {
    bind() {
      return {}
    }
  },
  watch: {
    level: {
      handler: 'init',
      immediate: true
    }
  },
  methods: {
    init() {
      this.$nextTick(() => {
        if (!this.$refs[this.ref]) return
        if (!this.maxLevel) {
          this.handleData()
        }
        let level = 0
        if (this.level <= 0) {
          level = this.maxLevel - 2
        } else {
          level = this.level - 2
        }
        for (const key in this.treeData) {
          if (this.treeData.hasOwnProperty(key)) {
            this.treeData[key].expanded = this.treeData[key].level <= level
          }
        }
      })
    },
    handleData() {
      this.treeData = this.$refs[this.ref].store.states.treeData
      this.maxLevel =
        Math.max.apply(
          null,
          Object.values(this.treeData).map(({ level }) => level)
        ) + 2
      this.$emit('max-level', this.maxLevel)
    }
  },
  mounted() {
    for (let key in this.$refs[this.ref]) {
      if (!(key in this) && typeof this.$refs[this.ref][key] === 'function') {
        this[key] = this.$refs[this.ref][key].bind(this.$refs[this.ref])
      }
    }
  }
}
</script>
