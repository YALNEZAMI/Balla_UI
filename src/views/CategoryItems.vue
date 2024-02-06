<template>
  <main>
    <BackButton />
    <!--content-->
    <div class="flex flex-wrap mt-10">
      <ItemShap v-for="item in items" :key="item._id" :item="item" />
    </div>
  </main>
</template>
<style scoped></style>
<script setup>
import { categoriesData } from "../store/searchStore";
import { ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import ItemShap from "../components/ItemShap.vue";
import BackButton from "../components/BackButton.vue";
const route = useRoute();
const store = useStore();

const categories = ref(categoriesData);
const getCategoryById = (id) => {
  return categories.value.find((category) => category._id === parseInt(id));
};
const items = ref([]);
onMounted(async () => {
  const categoryId = route.params._id;
  const categoryText = getCategoryById(categoryId).text;
  const res = await store.dispatch("getItems", { category: categoryText });
  items.value = res;
});
</script>
