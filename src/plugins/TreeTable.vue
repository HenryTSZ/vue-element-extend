<template>
  <el-table
    class="tree-table"
    :ref="ref"
    :data="data"
    v-bind="$attrs"
    v-on="{ ...$listeners, select, 'select-all': selectAll, 'selection-change': selectionChange }"
  >
    <slot name="prev"></slot>
    <template v-for="(column, index) in columns">
      <el-table-column v-if="column.editable" :key="column.prop" v-bind="column">
        <editable-elements
          slot-scope="{ row, $index }"
          :model="row"
          :item="{ ...column, focus: index === focusCol && $index === focusRow }"
          @change="change(row, $event, column)"
        ></editable-elements>
      </el-table-column>
      <el-table-column v-else :key="column.prop" v-bind="column"> </el-table-column>
    </template>
    <slot></slot>
  </el-table>
</template>

<script>
export default {
  name: 'TreeTable',
  components: {
    EditableElements: resolve => require(['plugins/EditableElements'], resolve)
  },
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    columns: {
      type: Array,
      default() {
        return []
      }
    },
    focusRow: {
      type: Number,
      default: 0
    },
    focusCol: {
      type: Number,
      default: 0
    },
    level: {
      type: Number,
      default: 1
    },
    checkStrictly: {
      type: Boolean,
      default: false
    },
    checkAll: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      ref: 'elTable',
      maxLevel: 0,
      treeData: {},
      children: '',
      timeout: null
    }
  },
  watch: {
    level: {
      handler: 'expandToLevel',
      immediate: true
    }
  },
  methods: {
    expandToLevel() {
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

      this.children = this.$refs[this.ref].treeProps.children
    },

    select(selection, row) {
      if (!this.checkStrictly) {
        const selected = selection.some(item => item === row)
        this.selectChildren(row, selected)
      }
      this.$emit('select', selection, row)
    },
    selectAll(selection) {
      if (this.checkAll) {
        // tableData 第一层只要有在 selection 里面就是全选
        const isSelect = this.data.some(item => selection.includes(item))
        if (isSelect) {
          selection.forEach(item => {
            this.selectChildren(item, isSelect)
          })
        } else {
          this.data.forEach(item => {
            this.selectChildren(item, isSelect)
          })
        }
      }
      this.$nextTick(() => {
        this.$emit('select-all', selection)
      })
    },
    selectChildren(row, selected) {
      if (row[this.children] && Array.isArray(row[this.children])) {
        row[this.children].forEach(item => {
          this.toggleSelection(item, selected)
          this.selectChildren(item, selected)
        })
      }
    },
    selectionChange(selection) {
      this.debounce(this.emitSelectionChange, 100, selection)
    },
    emitSelectionChange(selection) {
      this.$emit('selection-change', selection)
    },
    toggleSelection(row, select) {
      row &&
        this.$nextTick(() => {
          this.$refs[this.ref] && this.$refs[this.ref].toggleRowSelection(row, select)
        })
    },
    cancelAll() {
      this.$refs[this.ref] && this.$refs[this.ref].clearSelection()
    },
    // 防抖
    debounce(fun, wait, params) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(fun, wait, params)
    },
    change(row, e, column) {
      this.$emit('row-change', row, e, column.prop)
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

<style lang="less" scoped>
.tree-table {
  /deep/ .el-table__body-wrapper {
    .cell {
      display: flex;
      align-items: center;
    }
  }
}
</style>
