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
                <tr>
                    <td><tag-btn :canChecked=false :isLabel=true>Option</tag-btn></td>
                    <td><v-btn
                        class="char-label purple white--text"
                        height="36px"
                        min-width="0px"
                        @click="tagClean"
                        >
                        <span class="text-button charname">重置</span>
                        </v-btn>
                    </td>
                </tr>
                </tbody>
            </template>
            </v-simple-table>
        <div id="result-list">
            <!--<char-slot v-for="i in Object.keys(characters)" :key="i" :character="characters[i]"/>-->
            <v-simple-table
            fixed-header
            class="result-container"
            >
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th >词条</th>
                            <th >可能出现的干员</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="i in finalResults.length" :key="`comb-${i}`">
                            <td>{{i}}</td>
                            <td>
                                <tag-btn v-for="tag in finalResults[i-1].comb" :key="tag" :canChecked=false :isLabel=true>{{tag}}</tag-btn>
                            </td>
                            <td>
                                <char-slot v-for="char_id in finalResults[i-1].chars" :key="char_id" :character="characters[char_id]"/>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-simple-table>
        </div>
</div>
</template>
<script>
import _ from 'lodash'
import TagBtn from '@/components/TagBtn.vue'
import CharSlot from '@/components/CharacterSlot.vue'
import strings from '@/data/Strings.json'
import Characters from '@/data/CharacterData.json'
import Tag2Char from '@/data/TagtoChar.json'

const MaxNum=5;
class tagPos{
    constructor(tagType='',idx=0){
        this.tagType=tagType;
        this.idx=idx;
    }
}

class comb2char{
    constructor(comb,chars){
        this.comb=comb;
        this.chars=chars;
    }
}

export default {
    name:'recruitment',
    components:{
        TagBtn,
        CharSlot
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
        ],

        characters:Characters,
    }),
    computed:{
        tagTypes(){
            return strings.tagTypes;
        },
        allTags(){
            return strings.tags;
        },
        //找出所有标签组合
        tagCombination(){
            var size=2**this.SelectedTags.length;
            var allComb=[];
            for(let i=1;i<size;i++){
                let l=i;
                var comb=[];
                var idx=0;
                while(l>0){
                    var t=l&1;
                    if(t==1){
                        comb.push(this.SelectedTags[idx]);
                    }
                    l>>=1;
                    idx++;
                }
                allComb.push(comb);
            }
            return allComb.sort((a,b)=>(b.length-a.length));//按词条结合长度从大到小排序
        },
        filterResults(){
            var result=[];
            for(let comb of this.tagCombination){
                console.log('comb',comb);
                if(comb.length<1){
                    continue;
                }
                var charSet=Tag2Char[comb[0]];
                for(let tag of comb){
                    charSet=charSet.filter((v)=>(Tag2Char[tag].indexOf(v)>-1))
                }
                charSet=charSet.filter((v)=>(Characters[v].Approach==1));//排除非公招干员
                if(comb.indexOf("高级资深干员")!=-1){
                    charSet=charSet.filter((v)=>(Characters[v].Star==6));
                }else if(comb.indexOf("资深干员")!=-1){
                    charSet=charSet.filter((v)=>(Characters[v].Star==5));
                }else{
                    charSet=charSet.filter((v)=>(Characters[v].Star!=6));
                }
                charSet.sort((a,b)=>(this.characters[b].Star-this.characters[a].Star))
                if(charSet.length){
                    result.push(new comb2char(comb,charSet));
                }
            }
            console.log(result);
            return result;
        },
        finalResults(){
            var fres=[];
            this.filterResults.forEach((v)=>{
                var tmp=v.chars.filter((v)=>(this.starfilter[Characters[v].Star-1]));
                if(tmp.length>0){
                    fres.push(new comb2char(v.comb,tmp));
                }
            })
            return fres;
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
                this.SelectedTags=_.remove(this.SelectedTags,(i)=>(i!=this.allTags[tagType][idx]));
            }        
            //console.log(this.SelectedTags);
        },
        SelectAll:function(pos,checked){
            for(let i=0;i<this.starfilter.length;i++){
                this.starfilter[i]=!checked;
            }
        },
        tagClean:function(){
            this.SelectedTags=[];
            this.tagsStat=_.mapValues(strings.tags,(o)=>Array(o.length).fill(false));
        }
    },
    watch:{
        tagsStat:{
            handler(tagsStat){
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
    border-radius: 15px;
    width:95%;
    margin:10px auto;
    background-color: rgba(255,255,255,0.40);
    backdrop-filter: blur(2px);
}
.result-container tr:hover{
    background-color: rgba(255,255,255,0) !important;
}
th{
    background-color: rgba(0,0,0,.20) !important;
    &:nth-child(1){
        width: 5%;
    }
    &:nth-child(2){
        width: 20%;
    }
    &:nth-child(3){
        width: 75%;
    }
}
.theme--light.v-data-table{
    background:none;
}
</style>