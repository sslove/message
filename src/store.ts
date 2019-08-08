/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-26 19:51:43
 * @LastEditTime: 2019-08-08 20:57:03
 * @LastEditors: Please set LastEditors
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    info:{
      authorId:"",
      authorName: "",
      fansCount: "",
      password: "",
      photo: "",
      qianMing: "",
    }
  },
  mutations: {
    newAuthor(state,msg){
      state.info=msg
    }
  },
  actions: {}
});
