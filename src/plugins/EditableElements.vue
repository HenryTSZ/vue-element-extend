<template>
  <div class="editable-elements">
    <slot name="prev"></slot>
    <component
      :is="item.component"
      v-model="model[item.prop]"
      :key="item.prop"
      v-bind="item"
      v-focus="item.focus"
      :placeholder="item.placeholder || `${handlePlaceholder(item.type)}${item.label}`"
      @change="change(model, $event)"
    >
      <el-option
        v-for="option in item.select"
        :key="option.value"
        :value="option.value"
        :label="option.label"
      ></el-option>
      <slot v-for="(value, key) in item.slots" :name="key" :slot="key">{{ value }}</slot>
    </component>
    <slot></slot>
  </div>
</template>

<script>
import { handlePlaceholder } from 'utils'

export default {
  name: 'EditableElements',
  components: { NumberInput: resolve => require(['plugins/NumberInput'], resolve) },
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
    handlePlaceholder,
    change(row, e) {
      this.$emit('change', row, e)
    }
  },
  directives: {
    focus: {
      // [vue v-focus v-show控制input的显示聚焦，第二次不生效问题_JavaScript_宣城-CSDN博客](https://blog.csdn.net/qq_37361812/article/details/93782340)
      // [页面一刷新让文本框自动获取焦点-- 和自定义v-focus指令 - 明月人倚楼 - 博客园](https://www.cnblogs.com/IwishIcould/p/12006378.html)
      update(el, { value }) {
        if (value) {
          // 重点注意这里 当前元素是 div  所以要查到子元素中的 input
          const dom = el.querySelector('input') || el.querySelector('textarea')
          dom.focus()
        }
      },
      inserted(el, { value }) {
        if (value) {
          // 重点注意这里 当前元素是 div  所以要查到子元素中的 input
          const dom = el.querySelector('input') || el.querySelector('textarea')
          dom.focus()
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
