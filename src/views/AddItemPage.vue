<template>
  <main class="px-5">
    <BackButton />
    <div class="flex justify-center max-w-screen flex-wrap mt-2">
      <input
        accept=".jpg, .png"
        class="hidden"
        id="fileInput"
        type="file"
        @change="fileSelect"
      />

      <img
        v-for="img in images"
        :key="img._id"
        :id="img._id"
        @click="clickFileInput(img._id)"
        class="w-28 h-28 m-1 rounded cursor-pointer"
        src="../assets/default_photo.png"
        :alt="img._id"
      />
    </div>
    <div class="flex p-2 pt-10">
      <!--right part-->
      <div class="w-1/2 flex justify-center">
        <div>
          <label for="title">عنوان</label>
          <br />
          <input
            v-model="title"
            class="border-2 border-green-300 p-1 m-1"
            type="text"
            placeholder="غسالة اوتوماتيك"
          />
        </div>
      </div>
      <!--left part-->
      <div class="w-1/2 flex justify-center">
        <!--category-->
        <div>
          <label for="category">فئة</label>
          <br />
          <select
            required
            v-model="category"
            class="border-2 border-green-300 p-1"
          >
            <option
              v-for="category in categories"
              :key="category.value"
              :value="category.text"
            >
              {{ category.text }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <hr />
    <!--location-->
    <div class="flex justify-between px-10 my-2">
      <!--country-->
      <div>
        <label for="location">بلد</label>
        <br />
        <select
          required
          v-model="country"
          class="border-2 border-green-300 p-1"
        >
          <option
            v-for="country in countries"
            :key="country.name"
            :value="country.text"
          >
            {{ country.text }}
          </option>
        </select>
      </div>
      <!--region-->
      <div>
        <label for="region">منطقة</label>
        <br />
        <select v-model="region" class="border-2 border-green-300 p-1">
          <option
            v-for="region in getRegions()"
            :key="region"
            :value="region.text"
          >
            {{ region.text }}
          </option>
        </select>
      </div>
      <!--city-->
      <div>
        <label for="region">مدينة</label>
        <br />
        <select v-model="city" class="border-2 border-green-300 p-1">
          <option v-for="city in getCities()" :key="city" :value="city?.text">
            {{ city?.text }}
          </option>
        </select>
      </div>
    </div>
    <hr />
    <!--price-->
    <div class="p-2 flex items-center justify-center">
      <!--price number-->
      <div>
        <label for="price">السعر</label><br />
        <input
          v-model="price"
          type="number"
          class="border-2 border-green-300 p-1 m-1"
        />
        <br />
        <small>العملة المستخدمة تكون عملة الدولة </small>
      </div>
      <!--negociable price or not-->
      <div class="sm:mr-10">
        <input v-model="isNegociablePrice" type="checkbox" class="m-2" />
        <label for="isNegociablePrice" class="underline text-sm sm:text-lg">
          قابل للنقاش
        </label>
      </div>
    </div>
    <hr />
    <!--description-->
    <div>
      <label for="description"> وصف</label>
      <br />
      <textarea
        v-model="description"
        class="border-2 border-green-300 w-full p-1 m-1"
        placeholder="وصف"
      ></textarea>
    </div>
    <!--submit button-->
    <div class="flex justify-center">
      <button
        @click="addItem"
        type="button"
        class="bg-turc-600 hover:bg-turc-500 w-full p-2 my-2"
      >
        نشر
      </button>
    </div>
  </main>
</template>
<style scoped></style>
<script setup>
import BackButton from "../components/BackButton.vue";
import { ref } from "vue";
import { countriesData, categoriesData } from "../store/searchStore";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();

const categories = categoriesData;
const title = ref("");
const category = ref("كهربائيات");
const countries = countriesData;
const country = ref("سوريا");
const region = ref("درعا");
const city = ref("جاسم");
const price = ref(0);
const isNegociablePrice = ref(true);
const description = ref("");
//number of images
const numberOfImages = 5;
//add item
const addItem = async () => {
  if (
    !title.value ||
    !category.value ||
    !country.value ||
    !region.value ||
    !city.value
  ) {
    alert("الرجاء ملئ كل الحقول");
    return;
  }

  //create item object
  const item = {
    ownerId: store.state.user._id,
    title: title.value,
    description: description.value,
    category: category.value,
    country: country.value,
    region: region.value,
    city: city.value,
    price: price.value,
    isNegociablePrice: isNegociablePrice.value,
    images: images.value.map((img) => img.url),
  };

  const res = await store.dispatch("addItem", item);
  if (res) {
    store.commit("addToMyItems", res);
  }

  //upload images
  for (let i = 0; i < files.value.length; i++) {
    const file = files.value[i];
    if (file) {
      const formData = new FormData();
      formData.append("itemImage", file);
      const ext = file.name.split(".").pop();
      const name = res._id + "-" + i + "." + ext;
      const url = store.state.serverUrl + "/getItemImage/" + name;
      images.value[i].url = url;
      await store.dispatch("uploadImagesOfItem", {
        _id: name,
        formData,
      });
    }
  }
  //update item with images
  const updated = await store.dispatch("updateItem", {
    _id: res._id,
    item: { images: images.value.map((img) => img.url) },
  });

  router.push("/admin/home");
};

const getRegions = () => {
  const selectedCountry = countries.find((c) => c.text === country.value);
  if (selectedCountry) {
    const regions = selectedCountry.regions;
    return regions;
  } else {
    return [];
  }
};

// Add a function to get cities based on the selected region
function getCities() {
  const selectedCountry = countries.find((c) => c.text === country.value);
  const selectedRegion = selectedCountry?.regions.find(
    (r) => r.text === region.value
  );

  return selectedRegion ? selectedRegion.cities : [];
}
//photos stuff
const clickFileInput = (_idImg) => {
  imgSelected.value = _idImg;
  document.getElementById("fileInput").click();
};

const images = ref([]);
for (let i = 0; i < numberOfImages; i++) {
  images.value.push({
    url: `${store.state.serverUrl}/getItemImage/default_photo.png`,
    _id: i,
  });
}
const imgSelected = ref(0);
const files = ref([]);
const fileSelect = (e) => {
  const filesFromeInput = e.target.files;
  const img = document.getElementById(imgSelected.value);
  img.src = URL.createObjectURL(filesFromeInput[0]);
  files.value[imgSelected.value] = filesFromeInput[0];
};
</script>
