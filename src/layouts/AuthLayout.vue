<script setup>
import { useRouter } from "vue-router";
import { logout as logoutAuth }  from "@/firebase/auth";

const router = useRouter();


const storage = localStorage.getItem("io-chat");
const user = storage && JSON.parse(storage);

const logout = async () => {
  try {
    const response = await logoutAuth()
    console.log(response)
  } catch (e) {
    console.log(e)
  }
}
</script>

<template>
  <ElContainer direction="horizontal">
    <ElRow type="flex" :gutter="100">
      <ElCol :md="8">
        <h2>@{{ user && user.username }}</h2>
        <ElButton type="primary" @click="logout">Logout</ElButton>
      </ElCol>
      <ElCol :md="16">
        <router-view />
      </ElCol>
    </ElRow>
  </ElContainer>
</template>

<style scoped lang="scss"></style>
