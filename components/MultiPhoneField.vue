<template>
  <v-combobox v-model="model" v-bind="props.props" multiple hide-details="auto" rounded="lg" variant="outlined" class="font-weight-bold"
    :placeholder="placeholder">
    <template v-slot:prepend-inner>
      <div class="mx-2 text-primary text-no-wrap">
        <v-icon v-if="icon">{{ icon }}</v-icon>
        {{ name }} :
      </div>
    </template>
    <template v-slot:chip="data">
      <v-chip label :key="JSON.stringify(data.item)" v-bind="data.item.props" class="font-weight-bold">
        
        {{ data.item.title }}
      </v-chip>
    </template>
  </v-combobox>
</template>

<script lang="ts" setup>
const model = defineModel()

const props = defineProps(['errors', 'placeholder', 'name', 'icon', 'props'])
</script>

<style></style>