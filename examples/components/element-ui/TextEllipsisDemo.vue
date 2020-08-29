<!--
 * @Author: HenryTSZ
 * @Date: 2020-08-18 16:55:45
 * @Description:
 * @LastEditors: HenryTSZ
 * @LastEditTime: 2020-08-25 14:07:01
-->
<template>
  <div class="text-ellipsis-demo">
    <pre><code>
  基于 el-tooltip 封装的文本溢出效果

  1. 当文本内容未溢出, 不做任何处理

  2. 当文本内容溢出, 显示省略号, 并悬浮弹出 tooltip

  3. Attributes

    content: 内容

    其余属性参见 el-tooltip, 兼容大部分属性

  4. <el-link
      type="primary"
      :underline="false"
      href="https://github.com/HenryTSZ/vue-element-extend/blob/master/src/plugins/TextEllipsis.vue"
      target="_blank"
      >源码</el-link>       <el-link
      type="primary"
      :underline="false"
      href="https://github.com/HenryTSZ/vue-element-extend/blob/master/src/components/element-ui/TextEllipsisDemo.vue"
      target="_blank"
    >Demo 示例</el-link>

    </code></pre>
    <text-ellipsis v-for="text in texts" :key="text" :content="text"></text-ellipsis>
  </div>
</template>

<script>
export default {
  name: 'TextEllipsisDemo',
  data() {
    return {
      texts: [
        '在我的后园，可以看见墙外有两株树，一株是枣树，还有一株也是枣树。',
        '孔乙己是站着喝酒而穿长衫的唯一的人。他身材很高大；青白脸色，皱纹间时常夹些伤痕；一部乱蓬蓬的花白的胡子。穿的虽然是长衫，可是又脏又破，似乎十多年没有补，也没有洗。他对人说话，总是满口之乎者也，教人半懂不懂的。因为他姓孔，别人便从描红纸上的“上大人孔乙己”这半懂不懂的话里，替他取下一个绰号，叫作孔乙己。孔乙己一到店，所有喝酒的人便都看着他笑，有的叫道，“孔乙己，你脸上又添上新伤疤了！”他不回答，对柜里说，“温两碗酒，要一碟茴香豆。”便排出九文大钱。他们又故意的高声嚷道，“你一定又偷了人家的东西了！”孔乙己睁大眼睛说，“你怎么这样凭空污人清白……”“什么清白？我前天亲眼见你偷了何家的书，吊着打。”孔乙己便涨红了脸，额上的青筋条条绽出，争辩道，“窃书不能算偷……窃书！……读书人的事，能算偷么？”接连便是难懂的话，什么“君子固穷”，什么“者乎”之类，引得众人都哄笑起来：店内外充满了快活的空气。',
        '希望本无所谓有，也无所谓无，这就像地上的路，其实地上本没有路，走的人多了，也便成了路。'
      ]
    }
  }
}
</script>

<style lang="less">
.text-ellipsis-demo {
  .text-ellipsis {
    margin-bottom: 20px;
  }
}
</style>
