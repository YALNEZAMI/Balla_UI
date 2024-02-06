<template>
  <main class="flex p-1 bg-turc-500 justify-between space-x-2">
    <!--right part-->
    <div class="flex p-1 bg-turc-500 space-x-2 items-center">
      <!--profile-->
      <div class="navItem" @click="$router.push('profile/main')">
        <!--profile tooltip-->
        <div
          class="toolTip absolute hidden truncate max-w-16 top-8 bg-white text-black rounded-md p-1 text-sm"
        >
          {{ store.state.user?.name }}
        </div>
        <svg
          v-if="store.state.user.imageUrl.includes('default_user')"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
        <img
          v-else
          class="w-8 h-8 rounded-full"
          crossorigin="anonymous"
          :src="store.state.user.imageUrl"
          alt="profile"
        />
      </div>
      <!--search-->
      <div @click="$router.push('/admin/search')" class="navItem">
        <!--search tooltip-->
        <div
          class="toolTip absolute hidden truncate top-8 bg-white text-black rounded-md p-1 text-sm"
        >
          بحث
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
      <!--add item-->
      <div class="navItem" @click="$router.push('/admin/add')">
        <!--add tooltip-->
        <div
          class="toolTip absolute hidden truncate top-8 bg-white text-black rounded-md p-1 text-sm"
        >
          اضافة
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-8"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
    </div>
    <!--left part-->
    <div>
      <img class="h-16 w-32 rounded-full" src="../assets/logo2.png" alt="" />
    </div>
  </main>
</template>
<style scoped>
.navItem {
  position: relative;
  cursor: pointer;
  margin: 5px;
  margin-bottom: 13px;
  width: 40px;
  height: 40px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.navItem:hover {
  background-color: black;
  color: white;
  border-radius: 50%;
}
.navItem:hover .toolTip {
  display: block;
}
</style>
<script setup>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const store = useStore();
</script>
