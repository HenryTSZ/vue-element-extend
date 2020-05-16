<!--
 * @Author: HenryTSZ
 * @Date: 2020-05-07 13:30:49
 * @Description:
 * @LastEditors: HenryTSZ
 * @LastEditTime: 2020-05-16 11:54:23
-->
<template>
  <component
    :is="item.component"
    v-model="model[item.prop]"
    :key="item.prop"
    v-bind="item"
    v-focus="item.focus"
    :placeholder="item.placeholder || `${handlePlaceholder(item.type)}${item.label}`"
    v-on="{ ...$listeners, ...item.events }"
  >
    {{ item.type === 'info' ? model[item.prop] : '' }}
    <el-option
      v-for="option in item.select"
      :key="option[item.selectProps ? item.selectProps.value : 'value']"
      :value="option[item.selectProps ? item.selectProps.value : 'value']"
      :label="option[item.selectProps ? item.selectProps.label : 'label']"
    ></el-option>
    <el-radio
      v-for="radio in item.radio"
      :key="radio[item.radioProps ? item.radioProps.value : 'value']"
      :label="radio[item.radioProps ? item.radioProps.value : 'value']"
    >
      {{ radio[item.radioProps ? item.radioProps.label : 'label'] }}
    </el-radio>
    <el-checkbox v-for="checkbox in item.checkbox" :key="checkbox" :label="checkbox"></el-checkbox>
    <slot v-for="(value, key) in item.slots" :name="key" :slot="key">{{ value }}</slot>
  </component>
</template>

<script>
import { handlePlaceholder } from 'utils'

export default {
  name: 'EditableElements',
  components: {
    NumberInput: resolve => require(['plugins/NumberInput'], resolve),
    SelectTree: resolve => require(['plugins/SelectTree'], resolve)
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    },
    model: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    handlePlaceholder
  },
  directives: {
    focus: {
      // [vue v-focus v-show控制input的显示聚焦，第二次不生效问题_JavaScript_宣城-CSDN博客](https://blog.csdn.net/qq_37361812/article/details/93782340)
      // [页面一刷新让文本框自动获取焦点-- 和自定义v-focus指令 - 明月人倚楼 - 博客园](https://www.cnblogs.com/IwishIcould/p/12006378.html)
      update(el, { value }) {
        if (value) {
          // 重点注意这里 当前元素是 div  所以要查到子元素中的 input
          const dom = el.querySelector('input') || el.querySelector('textarea')
          dom && dom.focus()
        }
      },
      inserted(el, { value }) {
        if (value) {
          // 重点注意这里 当前元素是 div  所以要查到子元素中的 input
          const dom = el.querySelector('input') || el.querySelector('textarea')
          dom && dom.focus()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.editable-elements {
  .el-select {
    width: 100%;
  }
}
</style>
