import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        items: [
        ],
        length: 0
    },
    mutations: {
        addItem(state, payload) {
            state.items.push({
                id: state.length,
                description: payload.desc,
                categoryId: payload.category
            })
            state.length += 1;
        },
        deleteItem(state, payload){

            var a = this.state.items.find(x => x.id === payload.id)

            this.state.items.splice(a.id, 1);
        }
    },
    getters:{
        getItems(state){
            return  state.items.sort((a, b) => b.id - a.id)
        },
    }

})