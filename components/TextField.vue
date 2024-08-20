<template>
  <v-text-field v-bind="props.props" rounded="lg" v-model="model" variant="outlined" hide-details="auto" :placeholder="placeholder"
    class="font-weight-bold" :error-messages="errors" label="">
    <template v-slot:prepend-inner>
      <div class="mx-2 text-primary text-no-wrap ">
        <v-icon v-if="icon">{{ icon }}</v-icon>
        {{ name }} :
      </div>
    </template>
  </v-text-field>
</template>

<script lang="ts" setup>
const model = defineModel()

const props = defineProps(['errors', 'placeholder', 'name', 'icon', 'props'])
</script>

<style></style>