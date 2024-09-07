<template>
  <v-select :error-messages="errors" v-model="model" v-bind="props.props" hide-details="auto" rounded="lg"
    variant="outlined" :items="items" class="font-weight-bold" :placeholder="placeholder">
    <template v-slot:prepend-inner>
      <div class="mx-2 text-primary text-no-wrap">
        <v-icon v-if="icon">{{ icon }}</v-icon>
        {{ name }} :
      </div>
    </template>
  </v-select>
</template>

<script lang="ts" setup>
const model = defineModel()

const props = defineProps(['errors', 'placeholder', 'name', 'icon', 'props', 'items'])
</script>

<style></style>