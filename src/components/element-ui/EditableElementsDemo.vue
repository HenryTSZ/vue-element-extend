<template>
  <div class="editable-elements-demo">
    <pre><code>
  封装 ElementUI 支持 v-model 的组件和本项目自定义组件

  支持 单行文本、文本域、Switch 开关、选择器等 ElementUI form 大部分组件和本项目自定义组件: 整数、小数、SelectTree;

  并且支持这些组件的 Attributes 和 Slots

  Attributes:

    model: v-model 对象

    item: 组件的 Attributes. 字段如下:

      label: 组件关联的 label 文字

      prop: 必填, v-model 绑定值

      type: 取值范围: ['text', 'textarea', 'integer', 'decimal', 'select', 'radio', 'checkbox', 'info']

      select: type 为 select 必填, 选择器数据

      selectProps: 配置 label 和 value 字段, 默认为: { label: 'label', value: 'value' }

      radio: type 为 radio 必填, 单选框数据

      radioProps: 配置 label 和 value 字段, 默认为: { label: 'label', value: 'value' }

      checkbox: type 为 checkbox 必填, 多选框数据

      component: 组件名称, ElementUI 组件名称和本项目自定义组件名称. 如: 'el-input'

      type 为 info 时, 只做展示使用, 只支持文字; component 为不可编辑的组件, 如: div, p, span 等

      focus: 聚焦

      slots: 当前组件的 slot, 仅支持简单的文字

      events: 事件. 如: { change: this.change }, this.change 为 methods 中的事件

      其他字段: 参见 ElementUI 对应组件字段

  <el-link
    type="primary"
    :underline="false"
    href="https://github.com/HenryTSZ/vue-element-extend/blob/master/src/plugins/EditableElements.vue"
    target="_blank"
    >源码</el-link>       <el-link
    type="primary"
    :underline="false"
    href="https://github.com/HenryTSZ/vue-element-extend/blob/master/src/components/element-ui/EditableElementsDemo.vue"
    target="_blank"
  >Demo 示例</el-link>

    </code></pre>

    <editable-elements
      v-for="item in components"
      :key="item.prop"
      :item="item"
      :model="form"
    ></editable-elements>
  </div>
</template>

<script>
export default {
  name: 'EditableElementsDemo',
  components: { EditableElements: resolve => require(['plugins/EditableElements'], resolve) },
  props: {},
  data() {
    return {
      form: {
        name: 'tsz',
        age: 18,
        gender: 'man',
        skills: 'js',
        info: '只展示, 不可编辑'
      },
      components: [
        {
          label: '姓名',
          prop: 'name',
          type: 'text',
          component: 'el-input'
        },
        {
          label: '年龄',
          prop: 'age',
          type: 'integer',
          component: 'number-input'
        },
        {
          label: '性别',
          prop: 'gender',
          type: 'radio',
          component: 'el-radio-group',
          radio: ['man', 'woman']
        },
        {
          label: '技能',
          prop: 'skills',
          type: 'select',
          component: 'el-select',
          select: [
            { label: 'js', value: 'js' },
            { label: 'css', value: 'css' },
            { label: 'html', value: 'html' },
            { label: 'vue', value: 'vue' }
          ]
        },
        {
          prop: 'info',
          type: 'info',
          component: 'p'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  methods: {
    init() {}
  },
  created() {
    this.init()
  },
  mounted() {}
}
</script>

<style lang="less">
.editable-elements-demo {
  .el-input {
    margin-bottom: 10px;
  }
  .el-radio-group {
    display: block;
    margin-bottom: 10px;
  }
}
</style>
