export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/main/index.vue')
    // meta: { title: '首页' }
  },
  {
    path: '/pins/:id',
    name: 'pins',
    component: () => import('@/views/pins/index.vue')
  }
]
