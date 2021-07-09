<template>
  <div>
    <header class="header">
      <div class="header__element">
        <img src="../public/img/logo.png" srcset="../public/img/logo.png 1x" alt="Логотип">
      </div>
      <div class="header__element">
        <p>Ermolin</p>
      </div>
      <div class="header__element">
        <button @click.prevent="" class="header__change-button button-colors">Сменить тему</button>
      </div>
    </header>

    <section class="main-part">

      <div class="main-part__add">
        <button class="main-part__add-button button-colors" @click="showModal = true">
        ДОБАВИТЬ
        </button>
        <div v-show="showModal">
          <div class="add__modal-background">
          </div>
          <div class="add__modal">

            <form class="add__form" @submit.prevent="">
              <p>Выберите приоритет задачи</p>
              <select class="add__select" size="1" v-model="newResultPriority">
                <option value="1">Низший</option>
                <option value="2">Средний</option>
                <option value="3">Высший</option>

              </select>

              <p>Введите описание задачи</p>

              <textarea v-model="desc" class="add_desc" maxlength="70"></textarea>

              <br>
              <input  type="submit" @click.prevent="send()" value="Отправить" class="form_button button-colors"  v-bind:class="{ shakeit: isShaked }" >

              <button @click="close()" class="form_button button-colors">
                Отменить изменения
              </button>

            </form>
          </div>
        </div>
      </div>
      <p>{{this.getItems.length}}</p>
      <div class="cards">
        <Card v-for="item in getItems"
              :key="item.id"
              :id="item.id"
              :description="item.description"
              :categoryId="item.categoryId"
        >
        </Card>
      </div>

    </section>
    <footer class="footer">
      <div class="footer__block">
        <p>Ермолин Алексей Александрович</p>
        <p>Группа 191-361</p>
        <p>Дата экзамена: 09.07.2021</p>
      </div>
    </footer>
  </div>
</template>

<script>
import Card from './components/Card.vue'
import {mapGetters, mapMutations} from 'vuex'

export default {
  components: {
    Card
  },
  computed:{
    ...mapGetters(['getItems']),
  },
  data(){
    return {
      showModal: false,
      newResultPriority: 0,
      desc: "",
      isShaked: false
    }
  },

  methods: {
    ...mapMutations(["addItem"]),
    send(){
      if(this.newResultPriority === 0 || this.desc === ""){
        this.isShaked = true;
      }
      else{
        this.addItem({
          desc : this.desc,
         category: this.newResultPriority
        });
        this.newResultPriority = 0;
        this.showModal = false;
        this.desc = "";
        this.isShaked = false;
      }

    },
    close(){
      this.newResultPriority = 0;
      this.showModal = false;
      this.desc = "";
      this.isShaked = false;
    }
  }
}
</script>

<style>
.header{
  margin-left: 5%;
  margin-right: 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
  padding-bottom: 50px;
  border-bottom: 1px solid black;
}
.header__change-button {
  font-size: 30px;
  width: 300px;
  height: 50px;
  border-radius: 50px;

}
.header__element{
  width: 33%;
  text-align: center;
}

.footer__block{
  border-top: 1px solid black;
  display: flex;
  font-size: 30px;
  justify-content: space-between;
  margin-left: 5%;
  margin-right: 5%;
}

.main-part__add{
  text-align: center;
}

.main-part__add-button{
  width: 1000px;
  font-size: 30px;
  height: 100px;
  margin: 30px;
  border-radius: 100px;

}

.button-colors{
  color: darkblue;
  border: 1px solid darkblue;
  background-color: white;
}

.button-colors:hover{
  color: white;
  border: 1px solid white;
  background-color: darkblue;
}


.add__modal-background{
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.7;

}
.add__modal{
  position: absolute;
  width: 100%;


}

.add__form{
  background-color: white;
  border: 3px darkblue solid;
  width: 800px;
  padding-top: 10px;
  margin: 0 auto;
  font-size: 40px;

}

.add_desc{
  width: 80%;
  font-size: 20px;
  height: 200px;
  resize: none;
}

.add__select{
  width: 80%;
  height: 50px;
  font-size: 30px;
}

.form_button{
  width: 80%;
  height: 50px;
  font-size: 30px;
  margin-bottom: 20px;
  margin-top: 20px;
  border-radius: 20px;
}
.shakeit{

  animation: shake 2s;
  animation-iteration-count: infinite;

}

.cards{
  display: flex;
  flex-wrap: wrap;
}

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}


@media (max-width: 1200px) {
  .footer__block{
    display: block;
    text-align: center;
  }
  .main-part__add-button{
    width: 600px;
  }


}

@media (max-width: 1000px) {
  .add__form{
    width: 500px;
    font-size: 20px;
  }

  .form_button{
    font-size: 20px;
  }
}

@media (max-width: 800px) {

  .main-part__add-button{
    width:250px;
    margin-left: 0;
    margin-right: 0;
    font-size: 24px;
  }
  .header{
    display: block;
    text-align: center;
  }
  .header__element{
    width: 100%;
  }
  .header__change-button {
    width: 250px;
  }
}

@media (max-width: 700px) {
  .add__form{
    width: 270px;
  }
}


</style>
