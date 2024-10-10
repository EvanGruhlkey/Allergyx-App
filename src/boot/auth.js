import { boot } from 'quasar/wrappers'
import { LocalStorage } from 'quasar'

export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const isAuthenticated = LocalStorage.getItem('auth_token')

    if (requiresAuth && !isAuthenticated) {
      next('/login')
    } else {
      next()
    }
  })
})