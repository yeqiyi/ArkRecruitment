<template>
    <v-btn
    class="char-label"
    :color="slotColor"
    height="45px"
    min-width="0px"
    >
    <v-avatar
    size="36"
    rounded
    >
    <img :src="avatar"/>
    </v-avatar>
    <span class="text-button charname">{{character.Cn_name}}</span>
    </v-btn>
</template>
<script>
const colors=[
            "grey",
            "brown",
            "green",
            "blue",
            "red",
            "orange"
        ]
export default {
    name:'char-slot',
    props:{
        character:Object
    },
    data:()=>({
        
    }),
    computed: {
        avatar(){
            return `assets/avatar/${this.character.Id}.png`;
        },
        slotColor(){
            return colors[this.character.Star-1];
        }
    },
}
</script>
<style lang="scss" scoped>
.char-label{
    padding:3px !important;
    margin:2px 3px;
}
.charname{
    margin-left: 5px;
    text-transform: capitalize !important;
    color: white;
}
</style>