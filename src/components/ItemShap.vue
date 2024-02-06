<template>
  <main
    id="main1"
    class="bg-gray-400 cursor-pointer min-w-28 max-w-28 min-h-44 max-h-max m-1 rounded"
  >
    <div @click="$router.push(`/admin/item/${item._id}`)">
      <img
        crossorigin="anonymous"
        :src="getImage()"
        class="w-full min-h-28 max-h-28"
        alt=""
      />

      <div class="text-center mt-1 truncate">{{ item.title }}</div>
      <div class="font-medium p-1">
        {{ item.price + " " + getMoneytype() }}
      </div>
    </div>
    <div
      v-if="item.ownerId == store.state.user._id"
      class="flex justify-between px-2"
    >
      <!--delete item button-->
      <button
        @click="confirmDelete = true"
        class="bg-red-600 hover:bg-red-500 m-1 p-1 rounded"
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
            d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
          />
        </svg>
      </button>
      <!--confirm delete-->
      <div
        v-if="confirmDelete"
        class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      >
        <div class="bg-white rounded">
          <div class="text-center underline m-3">
            هل انت متاكد من حذف العنصر
          </div>
          <div class="flex justify-between p-5 rounded-sm">
            <button
              @click="deleteItem"
              class="bg-blue-600 hover:bg-blue-500 p-1 mx-2 rounded"
            >
              تاكيد
            </button>
            <button
              @click="confirmDelete = false"
              class="bg-orange-600 hover:bg-orange-500 p-1 mx-2 rounded"
            >
              الغاء
            </button>
          </div>
        </div>
      </div>

      <!--update item button-->
      <button
        @click="updateItemBool = !updateItemBool"
        class="bg-green-600 hover:bg-green-500 m-1 p-1 rounded"
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
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          />
        </svg>
      </button>
      <!--update form-->
      <div
        v-if="updateItemBool"
        class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
      >
        <form class="bg-white w-11/12 p-2 rounded">
          <div class="flex justify-center flex-wrap mt-2">
            <input
              accept=".jpg, .png"
              class="hidden"
              id="fileInput"
              type="file"
              @change="fileSelect"
            />
            <div v-for="(img, index) in images" :key="index">
              <img
                :id="index"
                @click="clickFileInput(index)"
                class="w-28 h-28 m-1 rounded cursor-pointer"
                crossorigin="anonymous"
                :src="img"
              />
            </div>
          </div>
          <div class="flex p-2 pt-10">
            <!--right part-->
            <div class="w-1/2 flex justify-center">
              <div>
                <label for="title">عنوان</label>
                <br />
                <input
                  v-model="title"
                  class="border-2 border-green-300 w-32 sm:w-52 p-1 m-1"
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
                <option
                  v-for="city in getCities()"
                  :key="city"
                  :value="city?.text"
                >
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
              <label
                for="isNegociablePrice"
                class="underline text-sm sm:text-lg"
              >
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
              @click="updateItem"
              type="button"
              class="bg-turc-600 hover:bg-turc-500 w-full p-2 my-2"
            >
              تحديث
            </button>
            <button
              @click="updateItemBool = false"
              type="button"
              class="bg-red-600 hover:bg-red-500 w-full p-2 my-2"
            >
              الغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>
<style scoped></style>
<script setup>
import { defineProps } from "vue";
import { useStore } from "vuex";
import { ref, onMounted } from "vue";
import { categoriesData, countriesData } from "../store/searchStore";
const store = useStore();
const { item } = defineProps(["item"]);
const confirmDelete = ref(false);
const updateItemBool = ref(false);
const getMoneytype = () => {
  if (item.country === "سوريا") {
    return "ل.س";
  }
  return "USD";
};
const getImage = () => {
  let res = `${store.state.serverUrl}/getItemImage/default_photo.png`;
  if (images.value.length > 0) {
    const firstImg = images.value.find(
      (img) => img !== `${store.state.serverUrl}/getItemImage/default_photo.png`
    );
    if (firstImg) {
      res = firstImg;
    }
  }
  return res;
};
const deleteItem = async () => {
  confirmDelete.value = false;
  const res = await store.dispatch("deleteItem", item._id);
  if (res) {
    store.commit("deleteFromMyItems", item._id);
    let main1 = document.getElementById("main1");
    main1.style.display = "none";
  }
};

//update stuff
const updateItem = async () => {
  //update images
  for (let i = 0; i < files.value.length; i++) {
    const file = files.value[i];
    if (file) {
      const formData = new FormData();
      formData.append("itemImage", file);
      const ext = file.name.split(".").pop();
      const name = item._id + "-" + i + "." + ext;
      const url = store.state.serverUrl + "/getItemImage/" + name;
      images.value[i] = url;
      console.log(name);
      await store.dispatch("uploadImagesOfItem", {
        _id: name,
        formData,
      });
    }
  }
  //update item
  const itemUpdated = {
    title: title.value,
    category: category.value,
    country: country.value,
    region: region.value,
    city: city.value,
    price: price.value,
    isNegociablePrice: isNegociablePrice.value,
    description: description.value,
    images: images.value,
  };
  const res = await store.dispatch("updateItem", {
    _id: item._id,
    item: itemUpdated,
  });
  store.commit("updateFromMyItems", {
    _id: item._id,
    item: res,
  });
  updateItemBool.value = !updateItemBool.value;
};
const categories = categoriesData;
const countries = countriesData;
const title = ref(item.title);
const category = ref(item.category);
const country = ref(item.country);
const region = ref(item.region);
const city = ref(item.city);
const price = ref(item.price);
const isNegociablePrice = ref(item.isNegociablePrice);
const description = ref(item.description);
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
//update images stuff
//photos stuff
const clickFileInput = (_idImg) => {
  imgSelected.value = _idImg;
  document.getElementById("fileInput").click();
};
const images = ref(item.images);
for (let i = 0; i < images.value.length; i++) {
  const image = images.value[i];
  images.value[i] = image;
}
const imgSelected = ref(0);
const files = ref([]);
const fileSelect = (e) => {
  const filesFromeInput = e.target.files;
  const img = document.getElementById(imgSelected.value);
  img.src = URL.createObjectURL(filesFromeInput[0]);

  files.value[imgSelected.value] = filesFromeInput[0];
};
onMounted(() => {
  // images.forEach((img) => {
  //   let element = document.getElementById(img._id);
  //   if (element) element.src = img.url;
  // });
});
</script>
