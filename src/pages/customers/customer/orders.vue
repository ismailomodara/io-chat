<script setup>
defineProps({
  id: Number,
  name: String
})
</script>
<template>
  <ElContainer>
    <ElRow>
      <ElCol :span="24">
        <h1>Customer Orders</h1>
        <h1>Id {{ id }}</h1>
        <h1>Name {{ name }}</h1>
      </ElCol>
    </ElRow>
  </ElContainer>
</template>
