import { boot } from 'quasar/wrappers'
import { LocalStorage } from 'quasar'

export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    const isAuthenticated = LocalStorage.getItem('isLoggedIn')
    const isAuthRoute = to.path.startsWith('/auth/')

    if (!isAuthenticated && !isAuthRoute && to.meta.requiresAuth) {
      next('/auth/login')
    } else if (isAuthenticated && isAuthRoute) {
      next('/dashboard')
    } else {
      next()
    }
  })
})