const pkg = require('./package')


module.exports = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: "Bubbly",
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/icon?family=Material+Icons+Round" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" },
    ],
    script: [
    ],
  },

  loading: { color: '#fff' },

  css: [
    '@/assets/css/main.css'
  ],

  plugins: [ // loads before mounting the app
    '@/plugins/filters', // global filters
    '@/plugins/sock',
    '@/mixins/_global', // global mixin
    '@/mixins/s3upload'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/onesignal',
    '@nuxtjs/pwa'
  ],

  axios: {
    // See https://github.com/nuxt-community/axios-module#options
    baseURL: 'http://localhost:8000',
  },
  oneSignal: {
    cdn: true,
    async: true,
    init: {
      appId: "4378f3a9-be31-4736-9064-f81654754711",
      allowLocalhostAsSecureOrigin: true,
      welcomeNotification: {
        disable: false,
        "message": "This is how you will be notified",
      },
      promptOptions: {
        actionMessage: "🔔 Stay up to date by allowing push notifications", // max 90 characters
        acceptButtonText: "ALLOW", // max 15 characters
        cancelButtonText: "LATER"
      },
    }
  },
  pwa: {
    workbox: {
      importScripts: [
          './offlineWorker.js'
      ],
      runtimeCaching: [
        {
          urlPattern: 'https://fonts.googleapis.com/.*',
          handler: 'cacheFirst',
          method: 'GET',
          strategyOptions: {cacheableResponse: {statuses: [0, 200]}}
        },
      ],
    },
    meta: {
      nativeUI: true,
      mobileApp: true,
      mobileAppIOS: true,
      // lang: 
    },
    manifest: {
      name: 'Bubbly',
      lang: 'en',
      categories: ["social", "chat"]
    }
  },

  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  },
  
  router: {
    middleware: ['requireAuth', 'appBar'],
  }
}
