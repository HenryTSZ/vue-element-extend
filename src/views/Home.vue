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
          <component :is="name" class="home-content"></component>
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
          name: 'third-party',
          child: ['vue-canvas-poster', 'wl-gantt']
        },
        {
          name: 'vue',
          child: ['Modifiers']
        },
        {
          name: 'element-ui',
          child: [
            'BaseFormDemo',
            'BaseTableDemo',
            'EditableElementsDemo',
            // 'EditableTable1',
            'NumberInputDemo',
            'RegInputDemo',
            'SelectTreeDemo',
            // 'TreeCheckboxs',
            'TreeDemo',
            'TreeTableDemo',
            'UploadFileDemo',
            'TextEllipsisDemo'
          ]
        },
        {
          name: 'vue-echarts',
          child: [
            'Readme',
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
      let activePath = 'readme/Readme'
      if (rootPath || path) {
        activePath = `${rootPath}/${path}`
      }
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
  .el-main {
    padding-right: 0;
    .home-content {
      padding-right: 20px;
    }
  }
  .el-scrollbar {
    height: 100%;
  }
  .el-scrollbar__wrap {
    overflow: auto;
  }

  .base-chart {
    padding: 10px;
    .chart-col {
      height: 450px;
    }
  }
}
</style>
