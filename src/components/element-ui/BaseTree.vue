<template>
  <div class="base-tree">
    <pre><code>
  在保持 el-tree 全部功能的基础上增加了全选功能和展开到 level 级的功能

  1. 全选功能 prop: show-check-all(需配合 show-checkbox), Boolean

  2. 展开到 level 级 prop: level, Number: 0: 展开全部, 1: 展开到一级, ...

  3. 其余所有 props/Event/方法 均与 el-tree 一样

  4. 具体实现请移步 <el-link
      type="primary"
      :underline="false"
      href="https://tsz.now.sh/2020/01/02/based-on-element-ui-encapsulation-tree/"
      target="_blank"
      >基于 ElementUI 封装的 Tree | Henry</el-link>

  5. <el-link
      type="primary"
      :underline="false"
      href="https://github.com/HenryTSZ/vue-element-extend/blob/master/src/plugins/Tree.vue"
      target="_blank"
      >源码</el-link>

    </code></pre>
    展开到
    <el-input-number v-model="level" :min="0" :max="levels" label="描述文字"></el-input-number>
    级

    <div class="buttons">
      <el-button @click="getCheckedNodes">通过 node 获取</el-button>
      <el-button @click="getHalfCheckedNodes">通过 node 获取半选中</el-button>
      <el-button @click="getCheckedKeys">通过 key 获取</el-button>
      <el-button @click="getHalfCheckedKeys">通过 key 获取半选中</el-button>
      <el-button @click="setCheckedNodes">通过 node 设置</el-button>
      <el-button @click="setCheckedKeys">通过 key 设置</el-button>
      <el-button @click="resetChecked">清空</el-button>
    </div>
    <tree
      ref="tree"
      v-bind="treeProps"
      :level="level"
      @check="check"
      @check-change="handleCheckChange"
    ></tree>
  </div>
</template>

<script>
import Tree from 'plugins/Tree3'
const data = [
  {
    menuId: 1,
    menuName: '一级 1',
    childrenList: [
      {
        menuId: 4,
        menuName: '二级 1-1',
        childrenList: [
          {
            menuId: 9,
            menuName: '三级 1-1-1'
          },
          {
            menuId: 10,
            menuName: '三级 1-1-2'
          }
        ]
      }
    ]
  },
  {
    menuId: 2,
    menuName: '一级 2',
    childrenList: [
      {
        menuId: 5,
        menuName: '二级 2-1'
      },
      {
        menuId: 6,
        menuName: '二级 2-2'
      }
    ]
  },
  {
    menuId: 3,
    menuName: '一级 3',
    childrenList: [
      {
        menuId: 7,
        menuName: '二级 3-1'
      },
      {
        menuId: 8,
        menuName: '二级 3-2'
      }
    ]
  }
]
export default {
  name: 'BaseTree',
  components: { Tree },
  props: {},
  data() {
    return {
      level: 0,
      treeProps: {
        data,
        props: { children: 'childrenList', label: 'menuName' },
        showCheckbox: true,
        showCheckAll: true,
        'default-checked-keys': [2, 8],
        // 'check-strictly': true,
        nodeKey: 'menuId'
      }
    }
  },
  computed: {
    levels() {
      return this.$utils.getTreeMaxLevel(data, 'childrenList') + 1
    }
  },
  watch: {},
  methods: {
    init() {},
    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes())
    },
    getHalfCheckedNodes() {
      console.log(this.$refs.tree.getHalfCheckedNodes())
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys())
    },
    getHalfCheckedKeys() {
      console.log(this.$refs.tree.getHalfCheckedKeys())
    },
    setCheckedNodes() {
      this.$refs.tree.setCheckedNodes([
        {
          menuId: 5,
          menuName: '二级 2-1'
        },
        {
          menuId: 9,
          menuName: '三级 1-1-1'
        }
      ])
    },
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys([3], true)
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([])
    },
    check(data, checked) {
      console.log('TCL: check -> data, checked', data, checked)
    },
    handleCheckChange(data, checked, indeterminate) {
      console.log(
        'TCL: handleCheckChange -> data, checked, indeterminate',
        data,
        checked,
        indeterminate
      )
    }
  },
  created() {
    this.init()
  },
  mounted() {}
}
</script>

<style lang="less">
.base-tree {
  .buttons {
    margin-top: 20px;
  }
  .el-col {
    padding: 0 10px;
  }
  .b-tree {
    margin-top: 20px;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
}
</style>
