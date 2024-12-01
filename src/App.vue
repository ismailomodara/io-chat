<script setup>
import { ref, computed } from "vue";

import GuestLayout from "@/layouts/GuestLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";

import { useRouter } from "vue-router";
import { getAuth, onAuthStateChanged} from "firebase/auth";

const auth = getAuth();
const router = useRouter();

const user = ref(null);
const layout = computed(() => {
  console.log(user.value)
  return user.value ? AuthLayout : GuestLayout;
})


onAuthStateChanged(auth, (data) => {
  if (data) {
    console.log("In")

    const newData = {
      ...data,
      username: data.email && data.email.split("@")[0]
    }
    user.value = newData;
    localStorage.setItem('io-chat', JSON.stringify(newData))
  } else {
    console.log("Out");
    user.value = null;
    localStorage.removeItem("io-chat");
    // router.push({ name: "index" })
  }
});

</script>

<template>
  <main>
    <component :is="layout">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </component>
  </main>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
