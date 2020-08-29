<template>
  <div class="select-tree-demo">
    <pre><code>
  将 el-select 和 el-tree 的全部功能整合到一起

  Attributes:

    v-model: [String, Number, Array]

    selectProps: el-select 的 Attributes; 可不传此参数, 可按照 el-select 的传参方式传入

    treeProps: el-tree 的 Attributes

    currentIsLeaf: 单选时是否只能选择叶子节点, 默认 false

    isLeafFun:

    /**
     * @description: 自定义单选时只能选择子节点方法; 优先级高于 currentIsLeaf

     * @param {data: Object}: 当前节点数据

     * @param {node: Object}: 当前节点 Node 对象

     * @return: Boolean
     */

  具体实现请移步 <el-link
      type="primary"
      :underline="false"
      href="https://tsz.now.sh/2019/11/29/based-on-element-ui-encapsulation-select-tree/"
      target="_blank"
      >基于 ElementUI 封装的 SelectTree | Henry</el-link
    >

  <el-link
    type="primary"
    :underline="false"
    href="https://github.com/HenryTSZ/vue-element-extend/blob/master/src/plugins/SelectTree.vue"
    target="_blank"
    >源码</el-link>       <el-link
    type="primary"
    :underline="false"
    href="https://github.com/HenryTSZ/vue-element-extend/blob/master/src/components/element-ui/SelectTreeDemo.vue"
    target="_blank"
  >Demo 示例</el-link>

    </code></pre>

    单选:
    <select-tree
      v-model="defaultCurrentKey"
      :select-props="selectProps"
      :tree-props="treeProps"
      @change="change"
    ></select-tree>

    单选(只选子节点):
    <select-tree
      v-model="defaultCurrentKey"
      :select-props="selectProps"
      :tree-props="treeProps"
      current-is-leaf
      @change="change"
    ></select-tree>

    多选:
    <select-tree
      v-model="defaultCurrentKeys"
      :select-props="selectProps1"
      :tree-props="treeProps"
      @change="change"
    ></select-tree>
  </div>
</template>

<script>
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
  name: 'BsseSelectTree',
  props: {},
  data() {
    return {
      defaultCurrentKey: 9,
      defaultCurrentKeys: [5, 9],
      selectProps: {
        // multiple: true,
        // 'collapse-tags': true,
        collapseTags: true,
        clearable: true
      },
      selectProps1: {
        multiple: true,
        // 'collapse-tags': true,
        collapseTags: true,
        clearable: true
      },
      treeProps: {
        data,
        props: { children: 'childrenList', label: 'menuName' },
        nodeKey: 'menuId'
      }
    }
  },
  methods: {
    change(data) {
      console.log('TCL: change -> data', data)
    }
  }
}
</script>
