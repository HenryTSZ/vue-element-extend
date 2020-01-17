<template>
  <div class="body h100">
    <el-container class="h100">
      <el-aside class="h100" width="200px">
        <el-scrollbar>
          <el-menu router :default-active="activeIndex" class="el-menu-vertical-demo">
            <el-menu-item-group v-for="item in router" :key="item.name" :title="item.name">
              <el-menu-item v-for="ele in item.child" :key="ele" :index="`/${item.name}/${ele}`">{{
                ele
              }}</el-menu-item>
            </el-menu-item-group>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main class="h100">
        <el-scrollbar>
          <component :is="name"></component>
        </el-scrollbar>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
      router: [
        {
          name: 'readme',
          child: ['Readme']
        },
        {
          name: 'vue',
          child: ['Modifiers']
        },
        {
          name: 'element-ui',
          child: ['TreeCheckboxs', 'EditableTable', 'Upload']
        },
        {
          name: 'vue-echarts',
          child: [
            'BaseLineChart',
            'BaseBarChart',
            'BasePieChart',
            'ProgressBarChart',
            'ProgressPieChart',
            'BarArrowChart'
          ]
        },
        {
          name: 'ueditor',
          child: ['Ue']
        }
      ],
      activeIndex: ''
    }
  },
  asyncComputed: {
    name() {
      const rootPath = this.$route.params.rootPath
      const path = this.$route.params.path
      if (rootPath || path) {
        const activePath = `${rootPath}/${path}`
        return import(/* webpackChunkName: "[request]" */ `components/${activePath}`)
          .then(res => {
            this.activeIndex = `/${activePath}`
            return res.default
          })
          .catch(err => {
            console.log('TCL: name -> err', err)
            this.$router.push('/404')
          })
      }
    }
  }
}
</script>

<style lang="less">
.body {
  h2 {
    display: block;
    font-size: 1.5em;
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
  h3 {
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
  p {
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
  }
  .el-aside {
    border-right: solid 1px #e6e6e6;
    .el-menu {
      border-right: none;
    }
  }
  .el-scrollbar {
    height: 100%;
  }
  .el-scrollbar__wrap {
    overflow: auto;
  }
}
</style>
