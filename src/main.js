import Vue from 'vue'
import App from './App.vue'

import VueChatScroll from 'vue-chat-scroll';
import VueMoment from 'vue-moment';
Vue.use(VueChatScroll)
Vue.use(VueMoment)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')