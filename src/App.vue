<template>
  <div class="app">
    <header class="header header__line">
      <div class="header__element">
        <img src="../public/img/logo.png" srcset="../public/img/logo.png 1x" alt="Логотип">
      </div>
      <div class="header__element">
        <p>Ermolin</p>
      </div>
      <div class="header__element" aria-label="Сменить тему" >
        <button @click.prevent="darkThemeSwitch" class="header__change-button button-colors">Сменить тему</button>
      </div>
    </header>

    <section class="main-part">

      <div class="main-part__add">

        <button aria-label="Добавить новую задачу" class="main-part__add-button button-colors" @click="showModal = true">
        ДОБАВИТЬ
        </button>

          <div v-show="showModal">
          <div class="add__modal-background">
          </div>
          <div class="add__modal">

            <form class="add__form add__form-colors" @submit.prevent="">

              <p>Выберите приоритет задачи</p>
              <select aria-label="Выбрать приоритет"  class="add__select" size="1" v-model="newResultPriority">
                <option value="1">Низший</option>
                <option value="2">Средний</option>
                <option value="3">Высший</option>

              </select>


              <p>Введите описание задачи</p>

              <textarea v-model="desc" aria-label="Введите описание задачи"  class="add_desc" maxlength="70"></textarea>

                <br>
              <input  aria-label="Сохранить задачу"  type="submit" @click.prevent="send()" value="Добавить" class="form_button button-colors"  v-bind:class="{ shakeit: isShaked }" >

              <button @click="close()" aria-label="Отменить изменения"  class="form_button button-colors">
                Отменить изменения
              </button>

            </form>
          </div>
        </div>
      </div>

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
    <footer class="footer footer__line">
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
    },

    _addDarkTheme() {
      let darkThemeLinkEl = document.createElement("link");
      darkThemeLinkEl.setAttribute("rel", "stylesheet");
      darkThemeLinkEl.setAttribute("href", "/css/darktheme.css");
      darkThemeLinkEl.setAttribute("id", "dark-theme-style");

      let docHead = document.querySelector("head");
      docHead.append(darkThemeLinkEl);
    },
    _removeDarkTheme() {
      let darkThemeLinkEl = document.querySelector("#dark-theme-style");
      let parentNode = darkThemeLinkEl.parentNode;
      parentNode.removeChild(darkThemeLinkEl);
    },
    darkThemeSwitch() {
      let darkThemeLinkEl = document.querySelector("#dark-theme-style");
      if (!darkThemeLinkEl) {
        this._addDarkTheme()
      } else {
        this._removeDarkTheme()
      }
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
  font-size: 2em;
  padding-bottom: 50px;

}

.footer__line{
  border-top: 1px solid black;
}

.header__change-button {
  font-size: 1em;
  width: 300px;
  height: 50px;
  border-radius: 50px;

}
.header__element{
  width: 33%;
  text-align: center;
}

.footer__block{

  display: flex;
  font-size: 2em;
  justify-content: space-between;
  margin-left: 5%;
  margin-right: 5%;
}

.main-part__add{
  text-align: center;

}

.add__form-colors{
  background-color: white;
  color: black;
  border: 3px darkblue solid;
}
.main-part__add-button{
  width: 1000px;
  font-size: 2em;
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

  width: 800px;
  padding-top: 10px;
  margin: 0 auto;
  font-size: 2em;

}

.add_desc{
  width: 80%;
  font-size: 1em;
  height: 200px;
  resize: none;
}

.add__select{
  width: 80%;
  height: 50px;
  font-size: 1.5em;
}

.form_button{
  width: 80%;
  height: 50px;
  font-size: 1em;
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
.app{
  margin: 0;
  padding: 0;
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
.main-part{
 min-height: 85vh;
}
.header, .footer{
  max-height: 5vh;
}

.header__line{
  border-bottom: 1px solid black;
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
    font-size: 1.5em;
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
    font-size: 1em;
  }
  .header{
    max-height: none;
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
