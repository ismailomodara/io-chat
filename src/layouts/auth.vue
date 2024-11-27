<script setup>
import { useRouter } from "vue-router";
import { logout as logoutAuth }  from "@/firebase/auth";

const router = useRouter();

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
  <ElButton type="primary" @click="logout">Logout</ElButton>
  <router-view />
</template>

<style scoped lang="scss"></style>
