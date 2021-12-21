<template>
<div id="recruiment">
    <!-- 标签栏 -->
        <v-simple-table
        class="tags-container"
        >
            <template v-slot:default>
                <tbody>
            <tr v-for="tagType in tagTypes" :key="tagType">
                <td><tag-btn :canChecked=false :isLabel=true>{{tagType}}</tag-btn></td>
                <td v-if="tagType=='星级'">
                    <tag-btn  v-model="selectAll" @update="SelectAll" :canChecked="canChecked" :checkColor="'brown'">全选</tag-btn>
                    <tag-btn  v-for="i in allTags[tagType].length" :key="i" v-model="starfilter[6-i]"  :canChecked="canChecked" :checkColor="starColors[6-i]">{{allTags[String(tagType)][6-i]}}</tag-btn>
                    </td>
                <td v-else>
                    <tag-btn v-for="i in allTags[tagType].length" :key="i" v-model="tagsStat[tagType][i-1]" @update="updatest" :tagPos="tagPos(tagType,i-1)" :canChecked="canChecked" :checkColor="'brown'">{{allTags[String(tagType)][i-1]}}</tag-btn>
                    </td>
            </tr>
                </tbody>
            </template>
        </v-simple-table>
        <p>{{starfilter}}</p>
        {{SelectedTags}}
</div>
</template>
<script>
import _ from 'lodash'
import TagBtn from '@/components/TagBtn.vue'
import strings from '@/data/Strings.json'
const MaxNum=5;
class tagPos{
    constructor(tagType='',idx=0){
        this.tagType=tagType;
        this.idx=idx;
    }
}
export default {
    name:'recruitment',
    components:{
        TagBtn
    },
    data:()=>({
        tagsStat:_.mapValues(strings.tags,(o)=>Array(o.length).fill(false)),
        starfilter:Array(6).fill(true),
        selectAll:true,
        SelectedTags:[],
        lastSelect:new tagPos(),
        canChecked:true,
        starColors:[
            "grey",
            "brown",
            "green",
            "blue",
            "red",
            "orange"
        ]
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
        tagPos:function(tagType,idx){
            return new tagPos(tagType,idx);
        },
        updatest:function(pos,checked){
            var {tagType,idx}=pos;
            this.lastSelect=pos;
            //console.log(tagType,idx,checked,this.allTags[tagType][idx]);
            if(false==checked&&this.SelectedTags.length==MaxNum){
                alert("最多只能选择5个标签喔");
                return;
            }
            if(checked==false){
                this.SelectedTags.push(this.allTags[tagType][idx]);
            }else{
                _.remove(this.SelectedTags,(i)=>(i==this.allTags[tagType][idx]));
            }        
             console.log(this.SelectedTags);
        },
        SelectAll:function(pos,checked){
            for(let i=0;i<this.starfilter.length;i++){
                this.starfilter[i]=!checked;
            }
        }
    },
    watch:{
        tagsStat:{
            handler(tagsStat){
                /*
                    for(let tagType of Object.keys(tagsStat)){
                       for(let i=0;i<tagsStat[tagType].length;i++){
                           tagsStat[tagType][i]=false;
                            for(let tag of this.SelectedTags){
                                if(tag==this.allTags[tagType][i]){
                                    tagsStat[tagType][i]=true;
                                    break;
                                }
                            }
                       }
                    }
                */
               const {tagType,idx}=this.lastSelect;
               //console.log(this.lastSelect);
               tagsStat[tagType][idx]=_.includes(this.SelectedTags,this.allTags[tagType][idx]);
            },
            deep:true,
        },
        starfilter:{
            handler(starfilter){
                for(let i=0;i<starfilter.length;i++){
                    if(!starfilter[i]){
                        this.selectAll=false;
                        return
                    }
                }
                this.selectAll=true;
            },
            deep:true,
        }
    }
}
</script>
<style lang="scss">
.v-data-table__wrapper{
    border:thin solid rgba(0,0,0,.12);
    padding:0px 10px;
    border-radius: 15px;
    width:fit-content;
    margin:10px auto;
    background-color: rgba(255,255,255,.36);
}
tr:hover{
    background-color: rgba(255,255,255,0) !important;
}
.theme--light.v-data-table {
    background:none;
}
</style>