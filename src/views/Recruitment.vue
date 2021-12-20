<template>
<div id="recruiment">
    <!-- 标签栏 -->
        <v-simple-table
        class="tags-container"
        >
            <template v-slot:default>
                <tbody>
            <tr v-for="tagType in tagTypes" :key="tagType">
                <td><tag-btn :canChecked=false>{{tagType}}</tag-btn></td>
                <td><tag-btn v-for="i in allTags[tagType].length" :key="i" v-model="tagsStat[tagType][i-1]" :update-st="updatest" :tagType=tagType :tagIdx=i :canChecked=true :checkColor="'brown'">{{allTags[String(tagType)][i-1]}}</tag-btn></td>
            </tr>
                </tbody>
            </template>
        </v-simple-table>
        {{SelectedTags}}
</div>
</template>
<script>
import _ from 'lodash'
import TagBtn from '@/components/TagBtn.vue'
import strings from '@/data/Strings.json'
const Max_Selects=5;
export default {
    name:'recruitment',
    components:{
        TagBtn
    },
    data:()=>({
        checked:false,
        tagsStat:_.mapValues(strings.tags,(o)=>Array(o.length).fill(false)),
        SelectedTags:[]
    }),
    computed:{
        tagTypes(){
            return strings.tagTypes;
        },
        allTags(){
            return strings.tags;
        },
    },
    methods: {
        updatest:function(type,idx){
            if(this.SelectedTags.length==Max_Selects){
                alert('最多只能选择5个标签哦!');
                return
            }
            if(true==this.tagsStat[type][idx]){
                this.SelectedTags.push(this.allTags[type][idx]);
            }else{
                alert('lalalal...');
            }     
        }
    },
}
</script>
<style lang="scss">
.v-data-table__wrapper{
    border:thin solid rgba(0,0,0,.12);
    padding:0px 10px;
    border-radius: 15px;
    width:fit-content;
    margin:auto;
    background-color: rgba(255,255,255,.36);
}
tr:hover{
    background-color: rgba(255,255,255,0) !important;
}
.theme--light.v-data-table {
    background:none;
}
</style>