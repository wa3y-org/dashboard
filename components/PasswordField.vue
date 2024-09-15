<template>
  <v-text-field  color="primary"
    :append-inner-icon="isPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'" :type="isPasswordVisible ? 'text' : 'password'"
   
    @click:append-inner="togglePasswordVisible"
    v-bind="props.props" rounded="lg" v-model="model" variant="outlined" hide-details="auto" :placeholder="placeholder"
    class="font-weight-bold" :error-messages="errors" label="">
    <template v-slot:prepend-inner>
      <div class="mx-2 text-primary text-no-wrap ">
        <v-icon >{{ icon || 'mdi-lock-outline' }}</v-icon>
        <span class="mx-2">
          {{ name }} :
        </span>
      </div>
    </template>
    </v-text-field>
</template>

<script lang="ts" setup>
const model = defineModel()

const props = defineProps(['errors', 'placeholder', 'name', 'icon', 'props'])

const isPasswordVisible = ref(false);
function togglePasswordVisible() {
  isPasswordVisible.value = !isPasswordVisible.value
}
</script>

<style></style>