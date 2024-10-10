const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: 'track',
        name: 'track',
        component: () => import('pages/TrackPage.vue')
      },
      {
        path: 'history',
        name: 'history',
        component: () => import('pages/HistoryPage.vue')
      },
      {
        path: 'predictions',
        name: 'predictions',
        component: () => import('pages/PredictionsPage.vue')
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('pages/SettingsPage.vue')
      }
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('pages/LoginPage.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('pages/RegisterPage.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes