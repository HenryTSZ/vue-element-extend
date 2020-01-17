<template>
  <div class="select-tree">
    <el-select
      ref="select"
      v-model="selectData"
      v-bind="selectProps"
      @visible-change="handleVisibleChange"
      @remove-tag="handleRemoveTag"
      @clear="handleClear"
    >
      <el-option
        v-for="item in selectOptions"
        :key="item.value"
        :value="item.value"
        :label="item.label"
      ></el-option>
      <el-tree
        :key="treeKey"
        ref="tree"
        v-bind="treeBind"
        @current-change="handleCurrentChange"
        @check-change="handleCheckChange"
      ></el-tree>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'SelectTree',
  props: {
    value: {
      type: [String, Number, Array],
      required: true
    },
    selectProps: {
      type: Object,
      default() {
        return {}
      },
      required: true
    },
    treeProps: {
      type: Object,
      default() {
        return {}
      },
      required: true
    },
    // 单选时是否只能选择叶子节点
    currentIsLeaf: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      treeKey: Math.random(),
      selectData: '',
      selectOptions: []
    }
  },
  computed: {
    treeBind() {
      return {
        showCheckbox: this.selectProps.multiple,
        highlightCurrent: !this.selectProps.multiple,
        expandOnClickNode: this.expandOnClickNode,
        nodeKey: 'id',
        ...this.treeProps,
        defaultCheckedKeys: this.selectProps.multiple ? this.value : [],
        currentNodeKey: this.selectProps.multiple ? '' : this.value
      }
    },
    multiple() {
      return this.selectProps.multiple
    },
    expandOnClickNode() {
      return this.multiple ? true : this.currentIsLeaf ? true : false
    }
  },
  watch: {
    value() {
      // 为了检测 v-model 的变化
      // 多选的时候, value 和 selectData 是同一个引用, 所以 v-model 不变的话这个判断就进不去
      if (this.value !== this.selectData) {
        this.treeKey = Math.random()
        this.init()
      }
    }
  },
  methods: {
    init() {
      this.$nextTick(() => {
        if (this.multiple) {
          this.handleCheckChange()
        } else {
          this.handleCurrentChange()
        }
      })
    },
    // select 下拉框出现/隐藏
    handleVisibleChange(val) {
      if (!val) {
        this.$emit('input', this.selectData)
        this.$emit('change', this.selectData)
      }
      this.$emit('visible-change', val)
    },
    // select 清空
    handleClear() {
      if (this.$refs.tree.showCheckbox) {
        this.selectData = []
        this.$refs.tree.setCheckedKeys([])
      } else {
        this.selectData = ''
        this.$refs.tree.setCurrentKey(null)
      }
      this.$emit('input', this.selectData)
      this.$emit('change', this.selectData)
      this.$emit('clear')
    },
    // select 移除 tag
    handleRemoveTag(val) {
      this.$refs.tree.setChecked(val, false)
      let node = this.$refs.tree.getNode(val)
      if (!this.$refs.tree.checkStrictly && node.childNodes.length > 0) {
        this.tree2List(node).map(item => {
          if (item.childNodes.length <= 0) {
            this.$refs.tree.setChecked(item, false)
          }
        })
        this.handleCheckChange()
      }
      this.$emit('input', this.selectData)
      this.$emit('change', this.selectData)
      this.$emit('remove-tag', val)
    },
    // 单选, 节点被点击时的回调, 返回被点击的节点数据
    handleCurrentChange() {
      // 如果多选, 不处理
      if (this.multiple) return
      // 给 selectOptions 一个默认值, 防止出现无数据, 从而无法显示 tree
      this.selectOptions = [{}]
      this.selectData = ''
      const currentNode = this.$refs.tree.getCurrentNode()
      // 初始值为空
      if (!currentNode) return
      const node = this.$refs.tree.getNode(currentNode)
      // 判断叶子节点
      if (this.currentIsLeaf && !node.isLeaf) return
      this.selectOptions = []
      this.selectData = ''
      const value = node.key
      const label = node.label
      this.selectOptions.push({
        value,
        label
      })
      this.selectData = value
      this.$refs.select.blur()
    },
    // 多选, 节点勾选状态发生变化时的回调
    handleCheckChange() {
      this.selectOptions = [{}]
      this.selectData = []
      const checkedKeys = this.$refs.tree.getCheckedKeys(
        this.treeProps.leafOnly,
        this.treeProps.includeHalfChecked
      )
      checkedKeys.forEach(key => {
        const checkedNode = this.$refs.tree.getNode(key)
        const value = checkedNode.key
        this.selectOptions.push({
          value,
          label: checkedNode.label
        })
        this.selectData.push(value)
      })
    },
    tree2List(tree) {
      let queen = []
      let out = []
      queen = queen.concat(tree)
      while (queen.length) {
        let first = queen.shift()
        if (first.childNodes) {
          queen = queen.concat(first.childNodes)
        }
        out.push(first)
      }
      return out
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less" scoped>
.select-tree {
  display: inline-block;
  .el-select {
    width: 100%;
  }
}
.el-select-dropdown__item {
  display: none;
}
</style>
