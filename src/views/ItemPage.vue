<template>
  <main class="w-full">
    <div><BackButton class="z-20" /></div>
    <div>
      <!--photo slider-->
      <div class="relative sm:justify-center sm:flex">
        <div class="absolute top-0 right-0">{{ photoOrder() }}</div>
        <!--previous photo btn-->
        <button @click="prev" class="bg-turc-500 p-2 absolute left-0 top-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
            />
          </svg>
        </button>
        <!--next photo btn-->
        <button @click="next" class="bg-turc-500 p-2 absolute right-0 top-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z"
            />
          </svg>
        </button>
        <img
          class="w-full sm:w-1/2 h-56"
          :src="img"
          alt=""
          crossorigin="anonymous"
        />
      </div>
      <!--title slider-->
      <div class="relative">
        <h1 class="bg-turc-500 font-bold text-center text-2xl truncate p-2">
          {{ item.title }}
        </h1>
        <!--like-->
        <span
          @click="likeorDislike"
          :class="{
            'cursor-pointer absolute top-1/4 left-2': true,
          }"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            :class="{
              'w-6 h-6': true,
              'text-red-500': isliked(),
            }"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
            />
          </svg>
        </span>
      </div>

      <hr />
      <p class="p-1 text-center">{{ item.description }}</p>
      <hr />
      <p class="font-light p-2">
        السعر :
        {{ item.price + " " + getMoneytype(item.country) }}
        {{ item.isNegociablePrice ? "(قابل للنقاش)" : "(غير قابل للنقاش)" }}
      </p>
      <hr />
      <p class="my-2">
        المكان : {{ item.country }},{{ item.region }},{{ item.city }}
      </p>
      <hr />
      <p>المالك : {{ owner.name }}</p>
      <p>رقمه: {{ owner.number }}</p>
    </div>
  </main>
</template>
<style scoped></style>
<script setup>
import { useRoute } from "vue-router";
import BackButton from "../components/BackButton.vue";
import { useStore } from "vuex";
import { ref, onMounted } from "vue";
const store = useStore();
const route = useRoute();
const item = ref({});
const owner = ref({});
let indexImg = 0;
onMounted(async () => {
  const itemId = route.params._id;
  const res = await store.dispatch("getItem", itemId);
  item.value = res;
  owner.value = await store.dispatch("getUser", res.ownerId);
  //filter default photos
  if (item.value.images != undefined) {
    item.value.images = item.value.images.filter((img) => {
      return !img.includes("default");
    });
  }
  img.value = item.value.images[indexImg];
});
const next = () => {
  if (indexImg < item.value.images.length - 1) {
    indexImg++;
    img.value = item.value.images[indexImg];
  } else {
    indexImg = 0;
    img.value = item.value.images[indexImg];
  }
};
const prev = () => {
  if (indexImg > 0) {
    indexImg--;
    img.value = item.value.images[indexImg];
  } else {
    indexImg = item.value.images.length - 1;
    img.value = item.value.images[indexImg];
  }
};
const getMoneytype = (country) => {
  if (country === "سوريا") {
    return "ل.س";
  }
  return "USD";
};
const isliked = () => {
  if (item.value.likes == undefined) {
    return false;
  }
  return item.value.likes.includes(store.state.user._id);
};
const likeorDislike = async () => {
  if (isliked()) {
    //remove like
    await store.dispatch("removeLikeItem", item.value._id);
    item.value.likes = item.value.likes.filter(
      (id) => id != store.state.user._id
    );
  } else {
    //like
    await store.dispatch("likeItem", item.value._id);
    if (item.value.likes == undefined) {
      ///be sure the likes array is defined
      item.value.likes = [];
    }
    item.value.likes.push(store.state.user._id);
  }
};
const photoOrder = () => {
  if (item.value.images != undefined)
    return indexImg + 1 + "/" + item.value.images.length;
};
const img = ref(`${store.state.serverUrl}/getItemImage/default_photo.png`);
</script>
