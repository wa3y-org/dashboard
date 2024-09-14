<template>
  <span class="mx-1 text-success font-weight-black" :props="props.props"> {{ formattedAmount }} USD</span>
</template>

<script lang="ts" setup>
const props = defineProps(['amount', 'props'])

const formattedAmount = computed(() => {
  if (!props.amount) return 'N/A';
  return Number(props.amount).toFixed(2)
});
</script>

<style></style>