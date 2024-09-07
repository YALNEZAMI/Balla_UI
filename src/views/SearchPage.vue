<template>
  <main>
    <div><BackButton /></div>
    <div
      v-if="searchFiltering"
      class="flex flex-col justify-center p-3 pt-10 space-y-2"
    >
      <div class="">
        <label for="searchKey">كلمة مفتاحية</label>
        <br />
        <input
          class="p-2 w-full border-2 border-green-200 rounded"
          placeholder="شاشة تلفاز..."
          type="text"
          v-model="searchKey"
        />
      </div>
      <hr />
      <div class="flex justify-between my-2">
        <!--category-->
        <div>
          <div>
            <label for="category">فئة</label>
            <br />
            <select
              required
              v-model="category"
              class="border-2 border-green-300 p-1"
            >
              <!--all categories-->
              <option value="الكل">الكل</option>
              <option
                v-for="category in categories"
                :key="category.text"
                :value="category.text"
              >
                {{ category.text }}
              </option>
            </select>
          </div>
        </div>
        <!--prix-->
        <div class="space-y-2">
          <!--min-->
          <div>
            <label for="price" class="ml-2">السعر الأدنى</label>
            <input
              v-model="priceMin"
              class="border-2 w-20 sm:w-full border-green-300 p-1"
              type="number"
              placeholder="الحد الأدنى"
            />
          </div>
          <!--max-->
          <div>
            <label for="price">السعر الأقصى</label>
            <input
              v-model="priceMax"
              class="border-2 w-20 sm:w-full border-green-300 p-1"
              type="number"
              placeholder="الحد الأقصى"
            />
          </div>
          <!--is negociable-->
          <div class="my-2">
            <label class="px-2" for="isNegociable">قابل للتفاوض</label>
            <select
              v-model="isNegociablePrice"
              class="border-2 border-green-400"
            >
              <option value="true">نعم</option>
              <option value="false">لا</option>
              <option value="noProblem">لا يهم</option>
            </select>
          </div>
        </div>
      </div>

      <hr />
      <!--location-->
      <div class="flex justify-between px-10">
        <!--country-->
        <div>
          <label for="location">بلد</label>
          <br />
          <select
            required
            v-model="country"
            class="border-2 border-green-300 p-1"
          >
            <!--all countries-->
            <option value="الكل">الكل</option>
            <option
              v-for="country in countries"
              :key="country.text"
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
            <!--all regions-->
            <option value="الكل">الكل</option>
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
            <!--all cities-->
            <option value="الكل">الكل</option>
            <option v-for="city in getCities()" :key="city" :value="city.text">
              {{ city.text }}
            </option>
          </select>
        </div>
      </div>
      <hr />
      <button @click="search" class="w-full bg-turc-600 hover:bg-turc-500 p-2">
        بحث
      </button>
    </div>
    <!--filtering-->
    <div
      v-else
      @click="searchFiltering = true"
      class="flex bg-turc-500 w-max h-max p-2 fixed top-1 cursor-pointer right-3 items-center rounded-md text-center"
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
          d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
        />
      </svg>
    </div>
    <hr />
    <!--results-->
    <div class="pt-16" v-if="items.length > 0">
      <span>نتائج البحث :</span>
      <div class="justify-center flex w-full flex-wrap">
        <ItemShapElement v-for="item in items" :key="item" :item="item" />
      </div>
    </div>
  </main>
</template>
<script setup>
import BackButton from "../components/BackButton.vue";
import { ref } from "vue";
import { countriesData, categoriesData } from "../store/searchStore";
import { useStore } from "vuex";
import ItemShapElement from "../components/ItemShap.vue";
const store = useStore();
const searchFiltering = ref(true);
const searchKey = ref("");

//category data
const categories = categoriesData;
const category = ref("الكل");

//location data
const countries = countriesData;
const country = ref("الكل");
const region = ref("الكل");
const city = ref("الكل");

//price range
const priceMin = ref(0);
const priceMax = ref(1000);
const isNegociablePrice = ref("noProblem");

const items = ref([]);
//search function
const search = async () => {
  const searchKeyLowerCase = searchKey.value.toLocaleLowerCase();
  const searchKeyUpperCase = searchKey.value.toLocaleUpperCase();
  const searchQuery = {
    $or: [
      { title: { $regex: searchKeyLowerCase } },
      { description: { $regex: searchKeyLowerCase } },
      { title: { $regex: searchKeyUpperCase } },
      { description: { $regex: searchKeyUpperCase } },
    ],
    category: category.value,
    country: country.value,
    region: region.value,
    city: city.value,
    isNegociablePrice: isNegociablePrice.value,
    price: { $gte: priceMin.value, $lte: priceMax.value },
  };
  //set isNegociablePrice to boolean
  switch (isNegociablePrice.value) {
    case "true":
      isNegociablePrice.value = true;
      break;
    case "false":
      isNegociablePrice.value = false;
      break;
    default:
      delete searchQuery.isNegociablePrice;
      break;
  }
  //delete category if it's "all"
  if (category.value === "الكل") {
    delete searchQuery.category;
  }
  //delete country if it's "all"
  if (country.value === "الكل") {
    delete searchQuery.country;
  }
  //delete region if it's "all"
  if (region.value === "الكل") {
    delete searchQuery.region;
  }
  //delete city if it's "all"
  if (city.value === "الكل") {
    delete searchQuery.city;
  }
  const res = await store.dispatch("searchItems", searchQuery);
  items.value = res;
  searchFiltering.value = false;
};
//get regions of a country
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
</script>
