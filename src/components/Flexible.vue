<template>
  <template v-if="layout.acf_fc_layout == 'hero-slider'">
    <HeroSlider :layout="layout" />
  </template>
  <template v-if="layout.acf_fc_layout == 'featured'">
    <Featured :layout="layout" />
  </template>
  <template v-if="layout.acf_fc_layout == 'block-services'">
    <BlockServices :layout="layout" />
  </template>
</template>

<script setup>
import BlockServices from "./BlockServices.vue";
import HeroSlider from "./HeroSlider.vue";
import Featured from "./Featured.vue";

const props = defineProps({
  layout: Object
})
</script>
