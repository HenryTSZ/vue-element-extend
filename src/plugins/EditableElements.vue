<template>
  <div class="editible-elements">
    <slot name="prev"></slot>
    <component
      :is="item.is"
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
      <slot v-for="(value, key) in item.slot" :name="key" :slot="key">{{ value }}</slot>
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
      inserted(el, binding) {
        if (binding.value) {
          el.children[0].focus()
          console.log('inserted -> el', el)
          console.log('inserted -> el', el.children)
        }
      }
    }
  }
}
</script>
