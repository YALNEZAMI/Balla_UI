<template>
  <main>
    <div><NavBarElement /></div>
    <div class="flex flex-col">
      <!--sections-->
      <div v-for="category of categories" :key="category._id">
        <div v-if="getItemsOf(category.text).length > 0">
          <span
            @click="$router.push('/admin/category/' + category._id)"
            class="category text-gray-600 hover:text-gray-500 font-semibold p-2 text-lg underline cursor-pointer"
            >{{ category.text }}</span
          >
          <div class="p-2 pl-3 flex overflow-x-auto w-screen">
            <Item
              v-for="item in getItemsOf(category.text)"
              :key="item._id"
              :item="item"
            />
          </div>
          <hr />
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
/* width */
::-webkit-scrollbar {
  width: 10px;
  height: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #34be49;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #1a752f;
}
</style>
<script setup>
import NavBarElement from "../components/NavBar.vue";
import Item from "../components/ItemShap.vue";
import { useStore } from "vuex";
import { categoriesData } from "../store/searchStore";
import { ref, onMounted } from "vue";

//categories list
const categories = ref(categoriesData);
const store = useStore();
const items = ref([]);
const limit = 10;

const getItemsOf = (category) => {
  const res = items.value
    .filter((item) => item.category === category)
    .slice(0, limit);

  return res;
};

onMounted(async () => {
  const itemsData = await store.dispatch("getItems", {});
  items.value = itemsData;
});
</script>
