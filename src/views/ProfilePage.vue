<template>
  <main>
    <!--back button-->
    <div><BackButton /></div>
    <div class="bg-turc-600 p-2">
      <button
        @click="router.push('my-items')"
        class="underline bg-white p-1 mx-1 rounded-md hover:text-white hover:bg-black"
      >
        اعلاناتي
      </button>
      <button
        @click="router.push('items-liked')"
        class="underline bg-white p-1 rounded-md hover:text-white hover:bg-black"
      >
        المعحب به
      </button>
    </div>
    <!--alert-->
    <p v-show="alertBool" class="bg-green-300 text-center rounded p-1">
      تم التعديل بنجاح
    </p>
    <!--profile-->
    <form class="space-y-2 px-3 mt-2">
      <!--image-->
      <div>
        <div class="flex justify-center">
          <img
            crossorigin="anonymous"
            @click="selectImg"
            class="rounded-full w-32 h-32 cursor-pointer"
            :src="store.state.user.imageUrl"
            alt="hello"
          />
        </div>
        <div class="text-center">{{ file ? file.name : "" }}</div>

        <input
          accept=".png, .jpg"
          class="hidden"
          id="imageInput"
          type="file"
          @change="changeFile"
        />
      </div>
      <!--name-->
      <div>
        <label
          for="name"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          الاسم</label
        >
        <div class="mt-2">
          <input
            v-model="name"
            placeholder="محمد المحمد"
            id="name"
            name="name"
            type="TEXT"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <!--email-->
      <div>
        <label
          for="email"
          class="block text-sm font-medium leading-6 text-gray-900"
          >عنوانك الالكتروني</label
        >
        <div class="mt-2">
          <input
            v-model="email"
            placeholder="balaAlbala@gmail.com"
            id="email"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <!--number-->
      <div>
        <label
          for="name"
          class="block text-sm font-medium leading-6 text-gray-900"
        >
          رقم الهاتف</label
        >
        <div class="mt-2">
          <input
            v-model="number"
            placeholder="0999999999"
            id="number"
            name="number"
            type="number"
            required
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <!--password-->
      <div>
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900"
            >كلمة السر</label
          >
        </div>
        <div class="mt-2">
          <input
            v-model="password"
            placeholder="1234"
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required=""
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <!--confirmPassword-->
      <div>
        <div class="flex items-center justify-between">
          <label
            for="password"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            تاكيد كلمة السر</label
          >
        </div>
        <div class="mt-2">
          <input
            v-model="confirmPassword"
            placeholder="123456"
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            autocomplete="current-password"
            required=""
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          @click="updateProfile"
          type="button"
          class="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          تعديل
        </button>
        <button
          @click="logout"
          type="button"
          class="my-2 flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
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
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
            />
          </svg>
        </button>
      </div>
    </form>
  </main>
</template>
<style scoped>
input {
  padding-right: 10px;
}
</style>
<script setup>
import BackButton from "../components/BackButton.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import { ref } from "vue";

//init store
const store = useStore();
const router = useRouter();

//user data
const name = ref(store.state.user.name);
const number = ref(store.state.user.number);
const email = ref(store.state.user.email);
const password = ref("");
const confirmPassword = ref("");
const file = ref(null);
const changeFile = (e) => {
  file.value = e.target.files[0];
  const img = document.querySelector("img");
  img.src = URL.createObjectURL(e.target.files[0]);
};

//other data
const alertBool = ref(false);

const updateProfile = async () => {
  //check if password and confirmPassword are the same
  if (password.value != confirmPassword.value) {
    alert("كلمة السر غير متطابقة");
    return;
  }
  //check if password is less than 6 characters
  if (password.value.length < 6 && password.value.length > 0) {
    alert("كلمة السر يجب ان تكون اكثر من 6 احرف");
    return;
  }
  //file upload request
  let imageUrl = store.state.user.imageUrl;
  if (file.value) {
    const formData = new FormData();
    formData.append("file", file.value);
    const res = await store.dispatch("uploadProfileImage", formData);
    if (res) {
      imageUrl = res.imageUrl;
    }
  }
  //update profile request
  const newUser = {
    name: name.value,
    email: email.value,
    password: password.value,
    imageUrl: imageUrl,
  };
  if (password.value == "") {
    delete newUser.password;
  }

  const res = await store.dispatch("updateProfile", newUser);

  if (res) {
    alertBool.value = true;
    setTimeout(() => {
      alertBool.value = false;
    }, 3000);
  }
};
const logout = async () => {
  const res = await store.dispatch("logout");
  if (res) {
    router.push("/auth/login");
  }
};
const selectImg = () => {
  let input = document.getElementById("imageInput");
  input.click();
};
</script>
