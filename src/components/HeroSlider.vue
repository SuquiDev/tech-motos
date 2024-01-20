<template>
  <section>
    <p v-if="loading">
      <Loader></Loader>
    </p>
    <p v-if="error">{{ error.message }}</p>
    <MySwiper
        v-if="news"
      :news="news"
      :title="layout.title"
    >
    </MySwiper>
  </section>
</template>

<script setup>
// IMPORTS
import {onMounted, defineProps, watchEffect, onBeforeMount} from 'vue';
import { useNewsStore } from "/src/stores/newsStore";
import MySwiper from "./MySwiper.vue";

// PROPS
const { layout } = defineProps(['layout']);

// VARIABLES
const { fetchNewsInfo, news, loading, error } = useNewsStore();

// LIFECYCLE HOOK
onMounted(async () => {
  // Ponemos el watcher para estar atento a cambios
  // HAY QUE REFACTORIZAR ESTO
  watchEffect(() => {
    // Bucle sobre las novedades obtenidas y realizar fetchNewsInfo para cada una
    layout.news.forEach(async (myNew) => {
      await fetchNewsInfo(myNew);
    });
  });
});
</script>