<template>
  <main>
    <div
      class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
    >
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          class="mx-auto h-32 w-32 rounded-md"
          src="../assets/logo2.png"
          alt="Your Company"
        />
        <h2
          class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
        >
          انشئ حسابك على موقع البالة
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <!--alert-->
        <p
          v-if="alreadyMember"
          class="text-center p-2 bg-red-500 text-white rounded-md"
        >
          هناك حساب مسجل بهذا البريد الالكتروني
        </p>
        <form class="space-y-2">
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
                type="text"
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
              @click="register"
              type="button"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              انشاء
            </button>
          </div>
        </form>

        <p class="mt-5 text-center text-sm text-gray-500">
          عندك حساب؟
          <router-link
            class="text-blue-500 hover:text-blue-700"
            to="/auth/login"
          >
            سجل دحول فورا
          </router-link>
        </p>
      </div>
    </div>
  </main>
</template>
<style scoped>
input {
  padding-right: 10px;
}
</style>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const router = useRouter();
const store = useStore();
//user data
const name = ref("");
const number = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

//other data
const alreadyMember = ref(false);
//create user
const register = async () => {
  //check if password and confirmPassword are the same
  if (password.value != confirmPassword.value) {
    alert("كلمة السر غير متطابقة");
    return;
  }
  //check if password is less than 6 characters
  if (password.value.length < 6) {
    alert("كلمة السر يجب ان تكون اكثر من 6 احرف");
    return;
  }
  try {
    await store.dispatch("register", {
      name: name.value,
      email: email.value,
      password: password.value,
      number: number.value,
    });
    const res = await store.dispatch("login", {
      email: email.value,
      password: password.value,
    });

    //if user created successfully, redirect to login page
    if (res) {
      router.push("/admin/home");
    } else {
      alreadyMember.value = true;
      setTimeout(() => {
        alreadyMember.value = false;
      }, 3000);
    }
  } catch (error) {}
};
</script>
