importScripts('/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/_nuxt/0c0e9dfaa9e4f4ddcf63.js",
    "revision": "dda3b3cfac17ffee67e37d5e9de9431a"
  },
  {
    "url": "/_nuxt/0e1eef7adf6e4bc2c59f.js",
    "revision": "d73c053b758ad2f17d779404f63de3de"
  },
  {
    "url": "/_nuxt/24930ce8c6f5859dd294.js",
    "revision": "478bc3374f92bd2d4e08c241f906746f"
  },
  {
    "url": "/_nuxt/2bc01a97c679de16ff7d.js",
    "revision": "2c491b8e93a1714d7475c516270bac6c"
  },
  {
    "url": "/_nuxt/3f9eb7d0ad9de14c27c2.js",
    "revision": "a206e121acb22dfc2f630e4f56f0f1ca"
  },
  {
    "url": "/_nuxt/4687a21d796b0104a7bb.js",
    "revision": "d92f5544b2e323dc404ab7beddc322d3"
  },
  {
    "url": "/_nuxt/5cc0037b66c781dd9a88.js",
    "revision": "8a1b5f7a9eb392b784a37119fd82de32"
  },
  {
    "url": "/_nuxt/8de5ea1237f1872cb19f.js",
    "revision": "19276fc1dc31783ed936579068d3a3d3"
  },
  {
    "url": "/_nuxt/9a48746313d6ba23bb3f.js",
    "revision": "8bf0811002857ac1da3b7cc9dc507906"
  },
  {
    "url": "/_nuxt/a50d853e2cdb997535b5.js",
    "revision": "38becb69b18003cc1e30453fbf24892e"
  },
  {
    "url": "/_nuxt/a8474ab3223a764fac8f.js",
    "revision": "541bd444aa29eccfd8155f3451422f21"
  },
  {
    "url": "/_nuxt/ec2a6cb506a5a28c230a.js",
    "revision": "2753d9872bcd7050e9b0aa9e8fc6469f"
  },
  {
    "url": "/_nuxt/f38027e10e2883328e99.js",
    "revision": "d20725fae80a5c01cc3393199cfa5cf8"
  },
  {
    "url": "/_nuxt/f5226a649ff81b87fe38.js",
    "revision": "c2ee3c29eb1de9c34ac1209528a87d80"
  },
  {
    "url": "/_nuxt/fb25e6d252901224e9ae.js",
    "revision": "8b468c9cf74dd6cac9b5e8284e9cbc5f"
  }
], {
  "cacheId": "hellowo",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
