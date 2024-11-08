const routes = [
  {
    path: '/',
    redirect: '/dashboard'
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
  {
    path: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/IndexPage.vue')
      },
      {
        path: 'track',
        component: () => import('pages/TrackPage.vue')
      },
      {
        path: 'predictions',
        component: () => import('pages/PredictionsPage.vue')
      },
      {
        path: 'history',
        component: () => import('pages/HistoryPage.vue')
      }
    ]
  }
]

export default routes