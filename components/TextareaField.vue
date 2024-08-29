<template>
  <v-textarea v-bind="props.props" class="font-weight-bold" :error-messages="errors" rounded="lg" v-model="model" variant="outlined" hide-details="auto"
    :placeholder="placeholder" auto-grow>
    <template v-slot:prepend-inner>
      <div class="mx-2 text-primary text-no-wrap">
        <v-icon v-if="icon">{{ icon }}</v-icon>
        {{ name }} :
      </div>
    </template>
  </v-textarea>
</template>

<script lang="ts" setup>
const model = defineModel();

const props = defineProps(['errors', 'placeholder', 'name', 'icon', 'props'])

</script>

<style></style>