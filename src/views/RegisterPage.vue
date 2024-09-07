<template>
  <main>
    <div
      class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"
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
          {{ createTitle() }}
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <!--alert-->
        <p
          v-if="alreadyMember"
          class="text-center p-2 bg-red-500 text-white rounded-md"
        >
          {{ alertUsedMail() }}
        </p>
        <form class="space-y-2">
          <!--name-->
          <div>
            <label
              for="name"
              class="block text-sm font-medium leading-6 text-gray-900"
            >
              {{ nameLabel() }}</label
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
              {{ numberLabel() }}</label
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
            >
              {{ emailLabel() }}</label
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
              >
                {{ passwordLabel() }}
              </label>
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
                {{ confirmPasswordLabel() }}
              </label>
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
              {{ createButton() }}
            </button>
          </div>
        </form>

        <p class="mt-5 text-center text-sm text-gray-500">
          {{ alreadyAccount() }}
          <router-link
            class="text-blue-500 hover:text-blue-700"
            to="/auth/login"
          >
            {{ loginLabel() }}
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
const language = ref(store.state.language);
const languages = ref(store.state.languages);
const setLanguage = () => {
  store.commit("setLanguage", language.value);
};
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
const createTitle = () => {
  switch (store.state.language) {
    case "fr":
      return "Créer un compte Balla";
    case "ar":
      return "انشئ حساب على موقع البالة";
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
const nameLabel = () => {
  switch (store.state.language) {
    case "fr":
      return "Nom";
    case "ar":
      return " الاسم";
    default:
      break;
  }
};
const numberLabel = () => {
  switch (store.state.language) {
    case "fr":
      return "Numéro de téléphone ";
    case "ar":
      return " رقم هاتف";
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
const confirmPasswordLabel = () => {
  switch (store.state.language) {
    case "fr":
      return "Confirmation du mot de passe";
    case "ar":
      return "تاكيد كلمة السر";
    default:
      break;
  }
};
const createButton = () => {
  switch (store.state.language) {
    case "fr":
      return "Se connecter";
    case "ar":
      return "اتصال";
    default:
      break;
  }
};
const alreadyAccount = () => {
  switch (store.state.language) {
    case "fr":
      return "Déjà un compte ?";
    case "ar":
      return "لديكم حساب ? ";
    default:
      break;
  }
};
const loginLabel = () => {
  switch (store.state.language) {
    case "fr":
      return "Connectez-vous ";
    case "ar":
      return "سجل دخول";
    default:
      break;
  }
};
const alertUsedMail = () => {
  switch (store.state.language) {
    case "fr":
      return "Mail déjà utilisé ! ";
    case "ar":
      return "هناك حساب مسجل بهذا البريد الالكتروني";
    default:
      break;
  }
};
</script>
