<template>
    <label
    class="tag-btn"
    :class="TagStyle"
    >
    <input
    type="checkbox"
    style="display:none;"
    :checked="checked"
     @change="canChecked?$emit('change',$event.target.checked):false"
     @click="$emit('update-st',tagType,tagIdx)"
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
        checked:Boolean,
        canChecked:Boolean,
        checkColor:String,
        tagType:String,
        tagIdx:Number
    },
    data:()=>({
        
    }),
    computed:{
        TagStyle(){
            if(!this.canChecked){
                return ['pink lighten-1','white--text'];
            }else{
                return this.checked?[`${this.checkColor}`,'white--text']:['brown','lighten-3'];
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.tag-btn{
    display: inline-block;
    height:36px;
    margin:5px 3px;
    border-radius: 5px;
    padding:0px 10px;
    line-height: 36px;
    min-width: 62px;
    text-align: center;
    cursor: pointer;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.tag-btn:hover{
    box-shadow: 0px 0px 5px;
}
</style>