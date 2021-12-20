import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

const opt={
    theme:{
        dark:true,
    },
    icons:{
        iconfont:'mdi'
    }
};

export default new Vuetify({opt});


