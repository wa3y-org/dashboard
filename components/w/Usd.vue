<template>
  <span class="mx-1 text-success font-weight-bold" :props="props.props"> {{ amount || 'N/A' }} USD</span>
</template>

<script lang="ts" setup>
const props = defineProps(['amount', 'props'])
</script>

<style></style>