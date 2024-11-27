<script setup>
import { computed } from "vue";

import GuestLayout from "@/layouts/guest.vue";
import AuthLayout from "@/layouts/auth.vue";

import { useRouter } from "vue-router";
import { getAuth, onAuthStateChanged} from "firebase/auth";

const auth = getAuth();
const router = useRouter();

const authenticated = !!auth;
const layout = computed(() => {
  return authenticated ? AuthLayout : GuestLayout;
})

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user)
    const { uid, accessToken, email, photoURL, displayName } = user;
    localStorage.setItem('io-chat', JSON.stringify({
      id: uid,
      token: accessToken,
      email,
      username: email && email.split("@")[0],
      avatar: photoURL,
      name: displayName
    }))
    console.log("In")
    // router.push({ name: "chats" })
  } else {
    // User is signed out
    // ...
    console.log("Out")
    localStorage.removeItem("io-chat");
    router.push({ name: "index" })
  }
});

</script>

<template>
  <main>
    <component :is="layout">
      <router-view />
    </component>
  </main>
</template>

<style scoped lang="scss"></style>
