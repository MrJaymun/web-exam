<template>
  <div class="card"  :class="[(this.categoryId === '1') ? 'lowest lowest-colors' : ((this.categoryId === '2') ? 'medium medium-colors' : 'highest highest-colors')]">

      <button aria-label="Удалить эту задачу" class="card__button button-colors" @click="this.delete">
      Удалить
    </button>

    <div class="text">
     {{this.description}}
    </div>


  </div>
</template>

<script>

import { mapMutations} from 'vuex'
export default {
  props: ["id", "description", "categoryId"],
  data() {
    return {

    }
  },
  methods:{
    ...mapMutations(["deleteItem"]),
    delete(){
      this.deleteItem({
        id: this.id
      })
    }
  }
}
</script>

<style scoped>
.card{
  margin: 10px;
  border: 1px solid black;
  word-break: break-word;
  display: flex;
  flex-direction: column-reverse;
}
.lowest{
  width: 200px;
  height: 200px;
  font-size: 1em;
}
.medium{
  width: 400px;
  height: 200px;
  font-size: 1em;
}
.highest{

  width: 600px;
  height: 200px;
  font-size: 1.5em;
}

.highest-colors{
  background-color: lightgreen;
  color: black;
}
.medium-colors{
  background-color: lightyellow;
  color: black;
}
.lowest-colors{
  background-color: palevioletred;
  color: black;
}
.text{
  text-align: center;
  vertical-align: center;
  height: 90%;
  padding-top: 10px;
}
.card__button{
  width: 100%;
  font-size: 18px;

}

@media (max-width: 900px) {
  .lowest{
  
    width: 130px;
    height: 130px;
    font-size: 0.75em;
  }
  .medium{
   
    width: 195px;
    height: 130px;
    font-size: 0.75em;
  }
  .highest{
    width: 260px;
    height: 130px;
    font-size: 1em;
  }
}
</style>