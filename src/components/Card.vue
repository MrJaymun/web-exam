<template>
  <div class="card"  :class="[(this.categoryId === '1') ? 'lowest' : ((this.categoryId === '2') ? 'medium' : 'highest')]">
    <button class="card__button button-colors" @click="this.delete">
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
  background-color: palevioletred;
  width: 200px;
  height: 200px;
  font-size: 18px;
}
.medium{
  background-color: lightyellow;
  width: 400px;
  height: 200px;
  font-size: 18px;
}
.highest{
  background-color: lightgreen;
  width: 600px;
  height: 200px;
  font-size: 18px;
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
    font-size: 12px;
  }
  .medium{
   
    width: 195px;
    height: 130px;
    font-size: 12px;
  }
  .highest{
    width: 260px;
    height: 130px;
    font-size: 12px;
  }
}
</style>