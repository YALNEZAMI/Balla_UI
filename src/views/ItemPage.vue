<template>
  <main>
    <div><BackButton /></div>
    <div>
      <h1 class="bg-turc-500 font-bold text-center text-2xl truncate p-2">
        {{ item.title }}
      </h1>
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

onMounted(async () => {
  const itemId = route.params._id;
  const res = await store.dispatch("getItem", itemId);
  item.value = res;
  owner.value = await store.dispatch("getUser", res.ownerId);
});
const getMoneytype = (country) => {
  if (country === "سوريا") {
    return "ل.س";
  }
  return "USD";
};
</script>
