<template>
  <p v-if="isLoading">
    <Loader></Loader>
  </p>
  <p v-if="error">{{ error.message }}</p>
  <section v-if="!isLoading">
    <div class="container">
      <header class="featured__header">
        <h2 class="featured__title">
          {{ layout.title }}
        </h2>
        <a
            href="#"
            class="myButton"
        >
          Ver más modelos
        </a>
      </header>
      <main>
        <ul class="featured__items" >
          <li
            v-for="product in products"
            class="featured__item"
          >
            <article class="featured__article">
              <p
                v-if="product.featured"
               class="featured__item__header"
              >
                <span>
                  Nueva
                </span>
              </p>
              <a
                :href="product.permalink"
                class="no-decoration"
              >
                <figure
                  v-if="imageUrls"
                >
                  <img
                    class="featured__item__image"
                    :src="imageUrls[product.images[0].id]"
                    alt="">
                </figure>

              </a>
              <h3 class="featured__item__title">
                <a
                    :href="product.permalink"
                    class="no-decoration"
                >
                  {{ product.name }}
                </a>
              </h3>
              <div>
                <ul
                  v-for="attribute in product.attributes"
                  class=featured__item__colors-list
                >
                  <li
                    v-for="color in attribute.options"
                    class=featured__item__color
                    :style="{ 'background-color': color }"
                  >
                  </li>
                </ul>
              </div>
              <div>
                <a
                    :href="product.permalink"
                    class="no-decoration"
                >
                  <p class="featured__item__old-price">
                    <span
                      v-if="product.regular_price != product.price"
                      class="add-euro"
                    >
                      {{ product.regular_price }}
                    </span>
                  </p>
                  <p class="featured__item__price">
                    <strong class="add-euro">
                      {{ product.price }}
                    </strong>
                  </p>
                </a>
              </div>
            </article>
          </li>
        </ul>
      </main>
    </div>
  </section>
</template>


<script setup>
/* Expected params
  props: {
    title: '',
    products: ''
  }
 */
// IMPORTS
import {onMounted, defineProps, watchEffect, ref} from 'vue';
import { useProductsStore } from "/src/stores/productsStore";
import {BACK_BASE_URL} from "../constants.js";
import Loader from "./Loader.vue";

// PROPS
const { layout } = defineProps(['layout']);

// VARIABLES
const { fetchProductInfo, products, product, loading, error } = useProductsStore();

// Variable de referencia para almacenar las URL de las imágenes
const imageUrls = ref({});
const isLoading = ref(false);

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

// LIFECYCLE HOOK
onMounted(async () => {
  isLoading.value = true;

  try {
    // Fetch de información de productos
    await Promise.all(layout.products.map(async (product) => {
      await fetchProductInfo(product);
    }));

    // Fetch de URL de imágenes
    await Promise.all(products.map(async (product) => {
      await getImageUrlFromId(product.images[0].id);
    }));

  } catch (error) {
    console.error('Error en la carga de productos:', error);
  } finally {
    isLoading.value = false;
  }

});
</script>

<style>



</style>