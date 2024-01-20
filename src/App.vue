<template>
  <p v-if="loading">
    <Loader></Loader>
  </p>
  <p v-if="error">{{ error.message }}</p>
  <div v-if="pageData">
    <div v-html="pageData.content.rendered"></div>
  </div>
  <template v-for="layout in acfLayoutsArray">
    <Flexible :layout="layout" />
  </template>
</template>

<script>
// IMPORTS
import Flexible from"./components/Flexible.vue"
import {ref, onMounted, onBeforeMount} from 'vue';
import { BACK_BASE_URL } from './constants.js';
import Loader from "./components/Loader.vue";

export default {
  components: {Loader, Flexible},
  setup() {
    const pageData = ref(null);
    const loading = ref(false);
    const error = ref(null);
    const myCustomPosts = ref([]);
    const acfLayoutsArray = ref([]);

    onBeforeMount(async () => {
      try {
        loading.value = true;
        const response = await fetch(`${BACK_BASE_URL}/wp-json/wp/v2/pages?slug=home`);

        if (!response.ok) {
          throw new Error('No se pudo obtener la página.');
        }

        const result = await response.json();
        pageData.value = result[0];
        // Obtén el array de .acf.flexible y asígnalo a acfLayoutsArray
        acfLayoutsArray.value = pageData.value.acf.flexible || [];


      } catch (err) {
        error.value = err;
      } finally {
        loading.value = false;
      }
    });

    return {
      pageData,
      loading,
      error,
      acfLayoutsArray,
    };
  },
};
</script>

<style scoped>

</style>
