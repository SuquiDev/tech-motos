<template>
  <div v-if="!allImagesLoaded">
    <Loader></Loader>
  </div>
  <swiper
      :cssMode="true"
      :navigation="true"
      :pagination="true"
      :keyboard="true"
      :loop="true"
      :auto-height="true"
      :modules="modules"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
      }"
      class="mySwiper"
      v-if="allImagesLoaded"
  >
    <swiper-slide
      v-for="myNew in news"
      class="mySwiper-slide"
      :style="{ backgroundImage: `url(${imageUrls[myNew.featured_media]})` }"
    >
      <div class="container">
        <div
          class="mySlide-content">
          <div class="overlay"></div>
          <h2 class="mySlide-content__subtitle">
            {{ title }}
          </h2>
          <h3 class="mySlide-content__title">
            {{ myNew.title.rendered }}
          </h3>
          <p class="mySlide-content__text">
            {{ myNew.content.rendered }}
          </p>
          <a
            :href="myNew.link"
            class="myButton"
          >
            Adelante
          </a>

        </div>

      </div>
    </swiper-slide>
  </swiper>
</template>
<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Keyboard, Autoplay} from 'swiper/modules';

import {defineProps, onMounted, ref, watchEffect} from 'vue';
import {BACK_BASE_URL} from "../constants.js";
import Loader from "./Loader.vue";

// Props
const { news, title } = defineProps(['news', 'title']);
const modules = [ Autoplay, Navigation, Pagination, Keyboard];

//  Para no cargar el slider antes de las imágenes
const allImagesLoaded = ref(false);
// Variable de referencia para almacenar las URL de las imágenes
const imageUrls = ref({});

// Método para obtener la URL de la imagen
const getImageUrlFromId = async (imgId) => {
  try {
    if (!imageUrls.value[imgId]) {
      const imageUrl = `${BACK_BASE_URL}/wp-json/wp/v2/media/${imgId}`;
      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error('No se pudo obtener la URL de la imagen.');
      }

      const data = await response.json();
      const myFinalUrl = data.source_url;
      imageUrls.value[imgId] = myFinalUrl;
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
};

// Lifecycle hook para pre-cargar las URL de las imágenes al montar el componente
// HAY QUE REFACTORIZAR
onMounted(async () => {
   watchEffect(async () => {
    if (news) {
      await Promise.all(news.map((myNew) => getImageUrlFromId(myNew.featured_media)));
      allImagesLoaded.value = true;
    }
  });
});
</script>

<style>
   /* Media querys */
  @media (width < 600px) {
    .mySlide-content{
      width: 100%;
      max-width: 90%;
      padding: 2rem;
    }
  }
</style>
