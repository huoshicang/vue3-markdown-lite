<template>
  <div class="hello">
    <h3>{{ title }}</h3>
    <p>{{ content }}</p>
  </div>
</template>

<script setup>
// 定义组件接收的props
const props = defineProps({
  title: {
    type: String,
    default: "默认标题"
  },
  content: {
    type: String,
    default: "默认内容"
  }
});
</script>

<style scoped>
.hello {
  padding: 1rem;
  border: 1px solid #eee;
  border-radius: 4px;
}
</style>
