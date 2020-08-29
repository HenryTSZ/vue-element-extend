<template>
  <el-container class="h100 body">
    <el-header height="80px">
      <div class="logo"></div>
      <el-menu :default-active="rootActive" mode="horizontal" @select="rootSelect">
        <el-menu-item v-for="(value, name) in routers" :key="name" :index="name">
          {{ name }}
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-container class="content">
      <el-aside class="h100" width="200px">
        <el-scrollbar>
          <el-menu router :default-active="active" class="el-menu-vertical-demo">
            <el-menu-item
              v-for="item in routers[rootActive]"
              :key="item"
              :index="`/${rootActive}/${item}`"
              >{{ item }}</el-menu-item
            >
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main class="h100">
        <el-scrollbar>
          <component :is="name" class="home-content"></component>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      routers: {
        readme: ['Readme'],
        'third-party': ['vue-canvas-poster', 'wl-gantt'],
        vue: ['Modifiers'],
        'element-ui': [
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
        ],
        'vue-echarts': [
          'Readme',
          'BaseLineChart',
          'BaseBarChart',
          'BasePieChart',
          'ProgressBarChart',
          'ProgressPieChart',
          'BarArrowChart'
        ],
        ueditor: ['Ue']
      },
      rootActive: '',
      active: ''
    }
  },
  asyncComputed: {
    name() {
      const { rootPath = 'readme', path = 'Readme' } = this.$route.params
      let activePath = `${rootPath}/${path}`
      return import(/* webpackChunkName: "[request]" */ `components/${activePath}`)
        .then(res => {
          this.active = `/${activePath}`
          this.rootActive = `${rootPath}`
          return res.default
        })
        .catch(err => {
          console.log('TCL: name -> err', err)
          this.$router.push('/404')
        })
    }
  },
  methods: {
    rootSelect(index) {
      this.rootActive = index
      this.active = `/${index}/${this.routers[index][0]}`
      this.$router.push(this.active)
    }
  }
}
</script>

<style lang="less">
.body {
  width: 1140px;
  margin: 0 auto;
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
  .content {
    overflow: auto;
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
