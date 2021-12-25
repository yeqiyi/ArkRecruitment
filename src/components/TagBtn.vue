<template>
    <label
    class="label"
    :class="TagStyle"
    >
    <input
    type="checkbox"
    style="display:none;"
    :disabled="!canChecked"
    :checked="checked"
    @change="canChecked?$emit('change',$event.target.checked):false"
    @click="UpdateST"
    >
    <slot></slot>
    </label>
</template>
<script>
export default {
    name:"tag-btn",
    model:{
        prop:'checked',
        event:'change',
    },
    props:{
        isLabel:Boolean,
        checked:Boolean,
        canChecked:Boolean,
        checkColor:String,
        tagPos:Object,
    },
    data:()=>({
        
    }),
    computed:{
        TagStyle(){
            if(this.isLabel){
                return ['pink lighten-1','white--text'];
            }else {
                return this.checked?[`${this.checkColor}`,'tag-btn','white--text']:['brown','tag-btn','lighten-3'];
            }
        }
    },
    methods: {
        UpdateST(){
            this.$emit('update',this.tagPos??{},this.checked);
        }
    },
}
</script>
<style lang="scss" scoped>
.tag-btn{
    cursor: pointer;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    transition: background-color 500ms;
    transition: color 300ms;
}
.label{
    display: inline-block;
    height:36px;
    margin:5px 3px;
    border-radius: 5px;
    padding:0px 10px;
    line-height: 36px;
    min-width: 62px;
    text-align: center;
}
.tag-btn:hover{
    box-shadow: 0px 0px 5px;
}
</style>