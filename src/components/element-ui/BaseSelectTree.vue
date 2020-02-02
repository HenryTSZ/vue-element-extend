<template>
  <div class="el-select-tree">
    <select-tree
      v-model="defaultCurrentKey"
      :select-props="selectProps"
      :tree-props="treeProps"
      @change="change"
    ></select-tree>
  </div>
</template>

<script>
import SelectTree from 'plugins/SelectTree'
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
  components: { SelectTree },
  props: {},
  data() {
    return {
      level: 1,
      defaultCurrentKey: 9,
      selectProps: {
        // multiple: true,
        // 'collapse-tags': true,
        collapseTags: true,
        clearable: true
      },
      treeProps: {
        data,
        // expandOnClickNode: false,
        props: { children: 'childrenList', label: 'menuName' },
        nodeKey: 'menuId'
      },
      filterText: '',
      props: {
        label: 'name',
        children: 'zones',
        isLeaf: 'leaf'
      }
    }
  },
  computed: {},
  watch: {
    filterText(val) {
      console.log('TCL: filterText -> this.$refs.tree', this.$refs.tree)
      this.$refs.tree.filter(val)
      this.$nextTick(() => {})
    }
  },
  methods: {
    init() {},
    change(data) {
      console.log('TCL: change -> data', data)
    },
    filterNode(value, data) {
      if (!value) return true
      return data.menuName.indexOf(value) !== -1
    },
    getCheckedNodes() {
      console.log('TCL: getCheckedNodes -> this.$refs.tree', this.$refs.tree)
      console.log('TCL: getCheckedNodes -> this.$refs.tree', this.$refs.tree.getCheckedNodes)
      console.log(this.$refs.tree.getCheckedNodes())
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys())
    },
    setCheckedNodes() {
      this.$refs.tree.setCheckedNodes([
        {
          id: 5,
          label: '二级 2-1'
        },
        {
          id: 9,
          label: '三级 1-1-1'
        }
      ])
    },
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys([3])
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([])
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button size="mini" type="text" on-click={() => this.append(data)}>
              Append
            </el-button>
            <el-button size="mini" type="text" on-click={() => this.remove(node, data)}>
              Delete
            </el-button>
          </span>
        </span>
      )
    },
    loadNode(node, resolve) {
      // console.log('TCL: loadNode -> node, resolve', node, resolve)
      if (node.level === 0) {
        return resolve([{ name: 'region' }, { name: 'aa' }])
      }
      if (node.level > 1) return resolve([])

      setTimeout(() => {
        const data = [
          {
            name: 'leaf',
            leaf: true
          },
          {
            name: 'zone'
          }
        ]

        resolve(data)
      }, 500)
    },
    checkChange(data, state, leaf) {
      console.log('TCL: checkChange -> data, state, leaf', data, state, leaf)
    },
    check(data, checked) {
      console.log('TCL: check -> data, checked', data, checked)
    }
  },
  created() {
    this.init()
  },
  mounted() {}
}
</script>

<style lang="less"></style>
