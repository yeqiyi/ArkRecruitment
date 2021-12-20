import Vue from 'vue'
import App from '@/App.vue'
import vuetify from '@/plugins/vuetify.js'
//views
import HelloWorld from '@/views/HelloWorld.vue'
import vuetifytest from '@/views/VuetifyTest.vue'
import recruitment from '@/views/Recruitment.vue'

Vue.config.productionTip=false;
Vue.component('hello-world',HelloWorld);
Vue.component('vuetify-test',vuetifytest);
Vue.component(recruitment.name,recruitment);
const vm=new Vue({
  vuetify,
  render: h => h(App),
  data:()=>({
  })
});
vm.$mount('#app');
