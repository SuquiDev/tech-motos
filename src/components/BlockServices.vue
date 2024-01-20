<template>
  <section>
    <div v-if="!allImagesLoaded">
      <Loader></Loader>
    </div>
    <p v-if="error">{{ error.message }}</p>
    <div class="container">
      <div class="services">
        <h3 class="services__subtitle">
          {{ layout.subtitle }}
        </h3>
        <h2 class="services__title">
          {{ layout.title }}
        </h2>
        <p class="services__text">
          {{ layout.text }}
        </p>
        <ul class="services__list">
          <li
            v-for="service in services"
            class="services__service-card"
            :style="{ backgroundImage: `url(${imageUrls[service.image]})` }"
          >
            <a
              :href="service.link"
              class="no-decoration"
            >
              {{ service.title.rendered }}
            </a>
          </li>
        </ul>

      </div>

    </div>
  </section>
</template>

<script setup>
// IMPORTS
import {onMounted, defineProps, watchEffect, ref, onBeforeMount} from 'vue';
import { useServicesStore } from "/src/stores/servicesStore";
import {BACK_BASE_URL} from "../constants.js";

// PROPS
const { layout } = defineProps(['layout']);

// VARIABLES
const { fetchServiceInfo, services, service, loading, error } = useServicesStore();

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
    if (services) {
      await Promise.all(services.map((myService) => getImageUrlFromId(myService.featured_media)));
      allImagesLoaded.value = true;
    }
  });
});


// LIFECYCLE HOOK
onBeforeMount(async () => {
  // Bucle sobre los servicios obtenidos y realizar fetchServiceInfo para cada uno
  await Promise.all(layout.services.map(async (service) => {
    await fetchServiceInfo(service);
  }));
});

</script>