<template>
  <div class="base-form-demo">
    <pre><code>
  简化 el-form 重复代码, 最少仅需要一行代码即可

  支持 单行文本、文本域、Switch 开关、选择器等 ElementUI form 大部分组件和本项目自定义组件: 整数、小数、SelectTree;

  并且支持这些组件的 Attributes 和 Slots

  Attributes:

    支持 el-form 全部 Attributes

    form-items: Array

      字段说明:

      label: el-form label

      prop: el-form prop

      keyProps: 映射 label 和 prop, 默认为 { label: 'label', prop: 'prop' }

      其余参见 <el-link
      type="primary"
      :underline="false"
      href="#/element-ui/EditableElementsDemo"
      >EditableElementsDemo</el-link>

      其他字段: 参见 ElementUI

  Slots:

    prev: 前置 slot

    -: 后置 slot

  具体实现请移步 <el-link
      type="primary"
      :underline="false"
      href="https://tsz.now.sh/2020/05/16/based-on-element-ui-encapsulation-table-form/"
      target="_blank"
      >基于 ElementUI 封装的基础 table 和 form | Henry</el-link
    >

  <el-link
      type="primary"
      :underline="false"
      href="https://github.com/HenryTSZ/vue-element-extend/blob/master/src/plugins/BaseForm.vue"
      target="_blank"
      >源码</el-link>       <el-link
    type="primary"
    :underline="false"
    href="https://github.com/HenryTSZ/vue-element-extend/blob/master/src/components/element-ui/BaseFormDemo.vue"
    target="_blank"
  >Demo 示例</el-link>

    </code></pre>
    <base-form :model="model" :ref="ref" :form-items="formItems" label-width="auto">
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </base-form>
  </div>
</template>

<script>
export default {
  name: 'BasesForm',
  components: { BaseForm: resolve => require(['plugins/BaseForm'], resolve) },
  data() {
    return {
      model: {
        text: '',
        textarea: '',
        integer: '',
        decimal: '',
        select: '',
        info: '只展示, 不可编辑'
      },
      ref: 'form',
      formItems: [
        { label: '单行文本', prop: 'text', type: 'text', component: 'el-input', focus: true },
        {
          label: '前置',
          prop: 'prepend',
          type: 'text',
          component: 'el-input',
          slots: { prepend: 'http://' }
        },
        {
          label: '后置',
          prop: 'append',
          type: 'text',
          component: 'el-input',
          slots: { append: '.com' }
        },
        { label: '文本域', prop: 'textarea', type: 'textarea', component: 'el-input' },
        { label: '整数', prop: 'integer', type: 'integer', component: 'number-input' },
        { label: '小数', prop: 'decimal', type: 'decimal', component: 'number-input' },
        {
          label: '选择器',
          prop: 'select',
          type: 'select',
          component: 'el-select',
          select: [
            { label: '选项一', value: 'select1' },
            { label: '选项二', value: 'select2' },
            { label: '选项三', value: 'select3' },
            { label: '选项四', value: 'select4' }
          ]
        },
        { label: '不可编辑', prop: 'info', type: 'info', component: 'span', noRequired: true }
      ]
    }
  },
  methods: {
    submitForm() {
      this.$refs[this.ref].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      this.$refs[this.ref].resetFields()
    }
  }
}
</script>
