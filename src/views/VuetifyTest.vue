<template>
<div>
   <character-slot :character="characterList['55']"/>
  <tag-btn v-model="check"/>
  <p>{{check}}</p>
</div>
</template>

<script>
import CharacterList from '@/data/CharacterData.json'
import CharacterSlot from '@/components/CharacterSlot.vue'
  export default {
    components:{
        CharacterSlot,
    },
   data: () => ({
      check:false,
      characterList:CharacterList,
      showMenu: false,
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
      select:Array(3).fill(true)
    }),
  }
</script>
<style lang="scss" scoped>
</style>