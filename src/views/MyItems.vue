<template>
  <main>
    <div><BackButton /></div>
    <!--content-->
    <div class="flex flex-wrap mt-10">
      <ItemShap
        v-for="item in store.state.myItems"
        :key="item._id"
        :item="item"
      />
    </div>
  </main>
</template>
<script setup>
import BackButton from "../components/BackButton.vue";
import ItemShap from "../components/ItemShap.vue";

import { useStore } from "vuex";
import { onMounted } from "vue";

const store = useStore();
onMounted(async () => {
  //if there is no items in the store, get them from the server
  if (store.state.myItems.length == 0) {
    const res = await store.dispatch("getItems", {
      ownerId: store.state.user._id,
    });
    store.commit("setMyItems", res);
  }
});
</script>
