<template>
  <main
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 sm:px-8"
  >
    <!--language select-->
    <div class="flex flex-col mb-3">
      Language | 语
      <select
        @change="setLanguage()"
        v-model="language"
        class="w-44 my-1 bg-blue-300 rounded p-1 cursor-pointer"
      >
        <option
          v-for="lang of languages"
          :key="lang"
          :value="lang.value"
          class="bg-blue-300"
        >
          {{ lang.name }}
        </option>
      </select>
    </div>

    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-32 w-32 rounded-md"
        src="../assets/logo2.png"
        alt="Your Company"
      />
      <h2
        class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900"
      >
        {{ connectTitle() }}
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <!--alert-->
        <p
          v-show="alert"
          class="bg-red-600 p-2 rounded-md text-center text-white"
        >
          العنوان الالكتروني او كلمة السر غير صحيحة
        </p>
        <div>
          <label
            for="email"
            class="block text-sm font-medium leading-6 text-gray-900"
          >
            {{ emailLabel() }}
          </label>
          <div class="mt-2">
            <input
              v-model="email"
              placeholder="balaAlbala@gmail.com"
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required=""
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              {{ passwordLabel() }}
            </label>
            <!-- <div class="text-sm">
                <a
                  href="#"
                  class="font-semibold text-indigo-600 hover:text-indigo-500"
                  >Forgot password?</a
                >
              </div>
              -->
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

        <div>
          <button
            @click="login"
            type="button"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {{ connectButton() }}
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500" style="direction: rtl">
        {{ noAccount() }}
        <router-link
          class="text-blue-500 hover:text-blue-700"
          to="/auth/register"
        >
          {{ createAccount() }}
        </router-link>
      </p>
    </div>
  </main>
</template>
<style scoped>
input {
  padding-right: 10px;
}
</style>
<script setup>
//imports
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
//objects init
const router = useRouter();
const store = useStore();
//user data
const email = ref("");
const password = ref("");
//other data
const alert = ref(false);
//language select
const language = ref(store.state.language);
const setLanguage = () => {
  store.commit("setLanguage", language.value);
};
//function to login
const login = async () => {
  const user = {
    email: email.value,
    password: password.value,
  };
  const res = await store.dispatch("login", user);
  if (res) {
    router.push("/admin/home");
  } else {
    alert.value = true;
    setTimeout(() => {
      alert.value = false;
    }, 3000);
  }
};
const languages = ref(store.state.languages);
const connectTitle = () => {
  switch (store.state.language) {
    case "fr":
      return "Connectez-vous à votre compte Balla";
    case "ar":
      return "اتصل بحسابك على موقع البالة";
    default:
      break;
  }
};
const emailLabel = () => {
  switch (store.state.language) {
    case "fr":
      return "Adresse email";
    case "ar":
      return " عنوانك الالكتروني";
    default:
      break;
  }
};
const passwordLabel = () => {
  switch (store.state.language) {
    case "fr":
      return "Mot de passe";
    case "ar":
      return " كلمة السر";
    default:
      break;
  }
};
const connectButton = () => {
  switch (store.state.language) {
    case "fr":
      return "Se connecter";
    case "ar":
      return "اتصال";
    default:
      break;
  }
};
const noAccount = () => {
  switch (store.state.language) {
    case "fr":
      return "Encore sans compte ?";
    case "ar":
      return "لسا بلا حساب؟";
    default:
      break;
  }
};
const createAccount = () => {
  switch (store.state.language) {
    case "fr":
      return "Créez-en un ! ";
    case "ar":
      return "انشئ حسابك فورا";
    default:
      break;
  }
};
</script>
