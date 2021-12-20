//data
import strings from '@/data/Strings.json'
import Vue from 'vue'

export default{
    install(){
        Vue.prototype.$strings=strings;
        Vue.prototype.$starColors=[
            "gray",
            "brown",
            "green",
            "blue",
            "red",
            "orange"
        ]
    }
}