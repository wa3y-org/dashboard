<template>
  {{ formattedDate }}
</template>

<script lang="ts" setup>
import moment from "moment";

const props = defineProps(['date', 'showTime']);

const formattedDate = computed(() => {
  let formatted = 'N/A'
  if (props.date) {
    formatted = moment(props.date).format('DD/MM/YYYY');
    if (props.showTime) {
      formatted += ' - ' + moment(props.date).format('HH:mm');
    }
  }
  return formatted;
});
</script>

<style></style>