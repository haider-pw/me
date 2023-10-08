<template>
  Hello This is home page test

  <pre>
  {{ data }}
  </pre>

</template>
<script setup lang="ts">
import { SfButton } from '@storefront-ui/vue';
const { data, getCmsBlocks } = useCmsBlocks();

const fetchedData = await getCmsBlocks({ identifiers: ['main_menu'] });
console.log('fetchedData', fetchedData)

// const { cmsBlocks, cmsPages } = useCmsStore();


// console.log('cmsBlocks444', cmsBlocks, cmsPages)
</script>
