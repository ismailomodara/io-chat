import { createRouter, createWebHistory } from 'vue-router'
const Index =  import('../pages/index.vue');
const Chats =  import('../pages/chats.vue');

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: () => Index
    },
    {
      path: '/chats',
      name: 'chats',
      component: () => Chats,
      beforeEnter: (to, from, next) => {
        const store = localStorage.getItem('io-chat');
        const user = store && JSON.parse(store);

        console.log("Got er")
        if (!user) {
          next({ name: "index" })
        } else {
          next()
        }
      }
    }
  ],
})

router.beforeEach((to, from, next) => {
  const storage = localStorage.getItem('io-chat');
  const user = storage && JSON.parse(storage);

  const authenticated = user && user.token;

  if (authenticated && to.name !== 'chats') {
    next({name: "chats"})
    return;
  }

  next()
});

export default router
