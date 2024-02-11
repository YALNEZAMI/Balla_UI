<template>
  <main>
    <div><BackButton /></div>
    <!--default message-->
    <div v-if="items.length == 0" class="text-center mt-10">
      <p>لم تعحب باي اعلان حتى الان</p>
    </div>
    <!--content-->
    <div class="flex flex-wrap mt-10">
      <ItemShap v-for="item in items" :key="item._id" :item="item" />
    </div>
  </main>
</template>
<script setup>
import BackButton from "../components/BackButton.vue";
import ItemShap from "../components/ItemShap.vue";

import { useStore } from "vuex";
import { onMounted, ref } from "vue";
const items = ref([]);

const store = useStore();
onMounted(async () => {
  //if there is no items in the store, get them from the server
  const res = await store.dispatch("getItemsLiked");
  items.value = res;
});
</script>
