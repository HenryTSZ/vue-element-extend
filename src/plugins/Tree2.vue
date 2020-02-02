<template>
  <div class="b-tree">
    <el-checkbox
      v-if="showCheckAll && showCheckbox"
      class="b-tree-check-all"
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleCheckAllChange"
      >全选</el-checkbox
    >
    <el-tree
      :ref="ref"
      v-bind="$attrs"
      :show-checkbox="showCheckbox"
      v-on="$listeners"
      @check-change="handleCheckChange"
    >
      <slot slot-scope="{ node, data }" v-bind="{ node, data }"> {{ node.label }} </slot>
    </el-tree>
  </div>
</template>

<script>
export default {
  name: 'Tree',
  props: {
    showCheckAll: {
      type: Boolean,
      default: false
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    level: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      ref: 'elTree',
      isIndeterminate: false,
      checkAll: false,
      time: 0
    }
  },
  watch: {
    level: {
      handler: 'expandToLevel',
      immediate: true
    },
    defaultCheckedKeys: {
      handler: 'handleCheckChange',
      immediate: true
    }
  },
  methods: {
    /**
     * @method 展开至指定层级
     * @param {Number} level 要展开至几级？0, 1, 2, 3...
     **/
    expandToLevel(level) {
      this.$nextTick(() => {
        const elTreeStore = this.$refs[this.ref].store
        const allNodes = elTreeStore._getAllNodes().sort((a, b) => b.level - a.level)
        if (level === 0) {
          // 展开全部
          allNodes.forEach(node => {
            node.isLeaf && node.expand(null, true)
          })
        } else {
          allNodes.forEach(node => {
            if (node.level >= level) {
              node.expanded = false
            } else {
              node.expanded = true
            }
          })
        }
      })
    },
    // 处理全选
    handleCheckAllChange() {
      this.isIndeterminate = false
      let checkedKeys = []
      if (this.checkAll) {
        const elTreeStore = this.$refs[this.ref].store
        const checkedNodes = elTreeStore._getAllNodes().filter(({ visible }) => visible)
        checkedKeys = checkedNodes.map(({ key }) => key)
        this.$emit(
          'check',
          { [this.$refs[this.ref].props.label || 'label']: '全选' },
          {
            checkedNodes,
            checkedKeys,
            halfCheckedNodes: [],
            halfCheckedKeys: []
          }
        )
      } else {
        this.$emit(
          'check',
          { [this.$refs[this.ref].props.label || 'label']: '全选' },
          {
            checkedNodes: [],
            checkedKeys: [],
            halfCheckedNodes: [],
            halfCheckedKeys: []
          }
        )
      }
      this.$refs[this.ref].setCheckedKeys(checkedKeys)
    },
    handleCheckChange() {
      console.log(444)
      if (!this.showCheckAll || !this.showCheckbox) {
        return
      }
      // 节流
      if (Date.now() - this.time > 100) {
        this.time = Date.now()
      } else {
        console.log('return')
        return
      }
      this.$nextTick(() => {
        this.handleCheckAllStatus()
      })
    },
    handleCheckAllStatus() {
      const elTreeStore = this.$refs[this.ref].store
      const allNodes = elTreeStore
        ._getAllNodes()
        .filter(({ level, visible }) => level === 1 && visible)
      // 关于 filter 的说明:
      // 全选的状态其实只和根节点的状态有关, 而且也处理了 set 方法中 leafOnly 为 true 的情况
      // visible 结合过滤使用
      this.checkAll = allNodes.every(({ checked }) => checked)
      this.isIndeterminate =
        allNodes.some(({ indeterminate }) => indeterminate) ||
        (allNodes.some(({ checked }) => checked) && !this.checkAll)
    }
  },
  mounted() {
    // 绑定 el-tree 方法
    for (let key in this.$refs[this.ref]) {
      if (!(key in this) && typeof this.$refs[this.ref][key] === 'function') {
        this[key] = this.$refs[this.ref][key].bind(this.$refs[this.ref])
      }
    }
  }
}
</script>

<style lang="less">
.b-tree {
  color: #606266;
  .b-tree-check-all {
    padding-left: 8px;
    font-weight: normal;
    .el-checkbox__label {
      color: #606266;
    }
  }
}
</style>
