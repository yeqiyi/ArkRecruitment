<template>
    <v-btn
    class="char-label"
    :color="colors[4]"
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
export default {
    name:'char-slot',
    props:{
        character:Object
    },
    data:()=>({
        colors:[
            "gray",
            "brown",
            "green",
            "blue",
            "red",
            "orange"
        ],
    }),
    computed: {
        avatar(){
            return `assets/avatar/${this.character.Id}.png`;
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