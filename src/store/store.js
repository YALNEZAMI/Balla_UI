import { createStore } from "vuex";
// import axios from 'axios'
const api = "http://localhost:3030";
import { feathers } from "@feathersjs/feathers";
import rest from "@feathersjs/rest-client";
import authentication from "@feathersjs/authentication-client";
//deathers client
const app = feathers();

// Connect to a different URL
const restClient = rest(api);

// Configure an AJAX library (see below) with that client
app.configure(restClient.fetch(window.fetch.bind(window)));

// Configure authentication
app.configure(authentication());
//define the services
const userService = app.service("users");
const itemService = app.service("item");

export const store = createStore({
  state() {
    return {
      user: JSON.parse(localStorage.getItem("user")) || null,
      accessToken: localStorage.getItem("accessToken") || null,
      myItems: [],
      serverUrl: api,
      languages: [
        {
          value: "fr",
          name: "Français",
        },
        {
          value: "ar",
          name: "العربية",
        },
      ],
      language: "fr",
    };
  },
  mutations: {
    setLanguage(state, l) {
      state.language = l;
      localStorage.setItem("language", l);
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    setAccessToken(state, accessToken) {
      state.accessToken = accessToken;
      localStorage.setItem("accessToken", accessToken);
    },
    setMyItems(state, items) {
      state.myItems = items;
    },
    deleteFromMyItems(state, id) {
      state.myItems = state.myItems.filter((item) => item._id !== id);
    },
    addToMyItems(state, item) {
      state.myItems.push(item);
    },
    updateFromMyItems(state, { _id, item }) {
      state.myItems = state.myItems.map((i) => (i._id === _id ? item : i));
    },
  },
  actions: {
    async getUser({ commit, state }, id) {
      const res = await userService.get(id);
      return res;
    },
    async login({ commit }, { email, password }) {
      try {
        const res = await app.authenticate({
          strategy: "local",
          email,
          password,
        });
        commit("setAccessToken", res.accessToken);
        commit("setUser", res.user);
        return true;
      } catch (error) {
        return false;
      }
    },
    async register({ commit }, body) {
      try {
        const res = await userService.create(body);
        return true;
      } catch (error) {
        return false;
      }
    },
    async updateProfile({ commit, state }, body) {
      const res = await userService.patch(state.user._id, body);
      commit("setUser", res);
      return true;
    },
    async logout({ commit }) {
      // await app.logout();
      commit("setUser", null);
      commit("setAccessToken", null);
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      return true;
    },
    async uploadProfileImage({ commit, state }, formData) {
      let oldImage = state.user.imageUrl;
      oldImage = oldImage.split("/").pop();
      const res = await fetch(
        `${api}/uploadProfileImage?oldImg=${oldImage}&_id=${state.user._id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${state.accessToken}`,
          },
          body: formData,
        }
      );
      const data = await res.json();
      //data {imageUrl,message}
      return data;
    },
    async addItem({ commit, state }, body) {
      const res = await itemService.create(body);
      return res;
    },
    async getItems({}, query) {
      const res = await itemService.find({ query });
      return res.data;
    },
    async getItem({ commit, state }, id) {
      const res = await itemService.get(id);
      return res;
    },
    async searchItems({ commit, state }, query) {
      const res = await itemService.find({ query });
      return res.data;
    },
    async deleteItem({ commit, state }, id) {
      const res = await itemService.remove(id);
      return res;
    },
    async updateItem({ commit, state }, { _id, item }) {
      const res = await itemService.patch(_id, item);
      console.log(res);
      return res;
    },
    async uploadImagesOfItem({ commit, state }, { formData, _id }) {
      const res = await fetch(`${api}/uploadImagesOfItem?_id=${_id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${state.accessToken}`,
        },
        body: formData,
      });
      const data = await res.json();
      return data;
    },
    async likeItem({ commit, state }, idItem) {
      const userId = state.user._id;
      const res = await itemService.patch(idItem, {
        $push: { likes: userId },
      });
      return res;
    },
    async removeLikeItem({ commit, state }, idItem) {
      const userId = state.user._id;
      const res = await itemService.patch(idItem, {
        $pull: { likes: userId },
      });
      return res;
    },
    async getItemsLiked({ commit, state }) {
      const res = await itemService.find({
        query: {
          likes: state.user._id,
        },
      });
      return res.data;
    },
  },
});
