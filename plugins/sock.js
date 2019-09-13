import Vue from 'vue';
import VueNativeSock from 'vue-native-websocket'

Vue.use(VueNativeSock, 'ws://127.0.0.1:8000', {
    connectManually: true,
    reconnection: true,
    reconnectionAttempts: 5, // default to infinity
    reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
    //store: store,
    //protocol: '',
    format: 'json',
})