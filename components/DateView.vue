<template>
  <span>
    {{ formattedDate }}
  </span>
</template>

<script lang="ts" setup>
import moment from "moment";

const props = defineProps(['date']);

const formattedDate = computed(() => {
  let formatted = ''
  if (props.date) {
    formatted = moment(props.date).format('DD/MM/YYYY');
  }
  return formatted;
});
</script>

<style></style>