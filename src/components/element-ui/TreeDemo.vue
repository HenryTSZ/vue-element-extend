<template>
  <div class="tree-demo">
    <pre><code>
  在保持 el-tree 全部功能的基础上增加了全选功能和展开到 level 级的功能

  1. 全选功能 prop: show-check-all(需配合 show-checkbox), Boolean

  2. 展开到 level 级 prop: level, Number: 0: 展开全部, 1: 展开到一级, ...

  3. 其余所有 props / Event / 方法 均与 el-tree 一样

  4. 具体实现请移步 <el-link
      type="primary"
      :underline="false"
      href="https://tsz.now.sh/2020/01/02/based-on-element-ui-encapsulation-tree/"
      target="_blank"
      >基于 ElementUI 封装的 Tree | Henry</el-link
    > 和 <el-link
      type="primary"
      :underline="false"
      href="https://tsz.now.sh/2020/01/31/based-on-element-ui-encapsulation-tree-2/"
      target="_blank"
      >基于 ElementUI 封装的 Tree2 | Henry</el-link
    >

  5. <el-link
      type="primary"
      :underline="false"
      href="https://github.com/HenryTSZ/vue-element-extend/blob/master/src/plugins"
      target="_blank"
      >源码</el-link> 页面的 Tree1.vue, Tree2.vue, Tree3.vue       <el-link
      type="primary"
      :underline="false"
      href="https://github.com/HenryTSZ/vue-element-extend/blob/master/src/components/element-ui/TreeDemo.vue"
      target="_blank"
    >Demo 示例</el-link>

    </code></pre>
    <el-radio-group v-model="treeName">
      <el-radio label="Tree1">Tree1</el-radio>
      <el-radio label="Tree2">Tree2</el-radio>
      <el-radio label="Tree3">Tree3</el-radio>
    </el-radio-group>
    展开到
    <el-input-number v-model="level" :min="0" :max="maxLevel" label="描述文字"></el-input-number>
    级

    <div class="buttons">
      <el-button @click="load(1)">加载数据一</el-button>
      <el-button @click="load(2)">加载数据二</el-button>
      <el-button @click="load()">清空数据</el-button>
    </div>

    <div class="buttons">
      <el-button @click="getCheckedNodes">通过 node 获取</el-button>
      <el-button @click="getHalfCheckedNodes">通过 node 获取半选中</el-button>
      <el-button @click="getCheckedKeys">通过 key 获取</el-button>
      <el-button @click="getHalfCheckedKeys">通过 key 获取半选中</el-button>
      <el-button @click="setCheckedNodes">通过 node 设置</el-button>
      <el-button @click="setCheckedKeys">通过 key 设置</el-button>
      <el-button @click="resetChecked">清空</el-button>
    </div>
    <component
      :is="treeName"
      ref="tree"
      v-bind="treeProps"
      :level="level"
      @max-level="getMaxLevel"
      @check="check"
      @check-change="handleCheckChange"
      @current-change="handleCurrentChange"
      @node-click="handleNodeClick"
    ></component>
  </div>
</template>

<script>
import Tree1 from 'plugins/Tree1'
import Tree2 from 'plugins/Tree2'
import Tree3 from 'plugins/Tree3'
const data1 = [
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
        menuName: '二级 3-1',
        disabled: true
      },
      {
        menuId: 8,
        menuName: '二级 3-2'
      }
    ]
  }
]
const data2 = [
  {
    menuId: 21,
    menuName: '一级 21',
    childrenList: [
      {
        menuId: 24,
        menuName: '二级 21-1',
        childrenList: [
          {
            menuId: 29,
            menuName: '三级 21-1-1'
          },
          {
            menuId: 210,
            menuName: '三级 21-1-2'
          }
        ]
      }
    ]
  },
  {
    menuId: 22,
    menuName: '一级 22',
    childrenList: [
      {
        menuId: 25,
        menuName: '二级 22-1'
      },
      {
        menuId: 26,
        menuName: '二级 22-2'
      }
    ]
  },
  {
    menuId: 23,
    menuName: '一级 23',
    childrenList: [
      {
        menuId: 27,
        menuName: '二级 23-1'
      },
      {
        menuId: 28,
        menuName: '二级 23-2'
      }
    ]
  }
]
export default {
  name: 'BaseTree',
  components: { Tree1, Tree2, Tree3 },
  props: {},
  data() {
    return {
      maxLevel: 0,
      treeName: 'Tree2',
      level: 1,
      treeProps: {
        data: [],
        props: {
          children: 'childrenList',
          label: 'menuName',
          disabled(data) {
            return data.menuId === 5
          }
        },
        showCheckbox: true,
        highlightCurrent: true,
        showCheckAll: true,
        'default-checked-keys': [2, 8],
        // 'check-strictly': true,
        defaultExpandAll: true,
        nodeKey: 'menuId'
      }
    }
  },
  methods: {
    load(type) {
      const data = type ? (type === 1 ? data1 : data2) : []
      this.treeProps.data = data
    },
    getMaxLevel(maxLevel) {
      this.maxLevel = maxLevel
    },
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
    },
    handleCurrentChange(data, node) {
      console.log('handleCurrentChange -> data, node', data, node)
    },
    handleNodeClick(data, node, self) {
      console.log('handleNodeClick -> data, node, self', data, node, self)
    }
  }
}
</script>

<style lang="less">
.tree-demo {
  .buttons {
    margin-top: 20px;
  }
  .el-col {
    padding: 0 10px;
  }
  .b-tree {
    margin-top: 20px;
  }
  .el-radio-group {
    display: block;
    margin-bottom: 20px;
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
