module.exports = function (/* ctx */) {
  return {
    boot: [
      'auth'
    ],

    css: [
      'app.scss'
    ],

    extras: [
      'roboto-font',
      'material-icons'
    ],

    build: {
      vueRouterMode: 'history'
    },

    framework: {
      config: {},

      components: [
        'QLayout',
        'QHeader',
        'QDrawer',
        'QPageContainer',
        'QPage',
        'QToolbar',
        'QToolbarTitle',
        'QBtn',
        'QIcon',
        'QList',
        'QItem',
        'QItemSection',
        'QItemLabel',
        'QAvatar',
        'QScrollArea',
        'QCard',
        'QCardSection',
        'QSeparator',
        'QInput',
        'QForm'
      ],

      directives: [
        'Ripple'
      ],

      plugins: [
        'Notify',
        'LocalStorage'
      ]
    }
  }
}