import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import VueGoogleMaps from 'vue-google-maps-community-fork';

const app = createApp(App)
app.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDIoMticg0nJZsyKT0fgAd3_veIUPMUbYs', // Replace with your actual API key
  },
});

app.use(router)
app.mount('#app')
