<template>
  <div class="my-4 text-center">
    <v-file-input v-show="false" v-model="image" ref="imageFilePicker" accept="image/*" label="File input" />

    <v-avatar size="280" @click="openImageFilePicker" v-if="!previewURL" color="grey-lighten-3" width="100%" height="250"
      class="cursor-pointer elevation-2" rounded="xl">
      <div class="fill-height d-flex justify-center align-center flex-column">
        <v-icon size="128" color="#CCC">mdi-image-area</v-icon>
        <p class="text-h5 font-weight-bold text-grey">
          Select Avatar
        </p>
        <p class="text-grey text-caption"> JPEG, WEBP, PNG, GIF, SVG </p>
      </div>
    </v-avatar>
    <v-avatar size="280" v-if="previewURL" rounded="xl" class="elevation-2">
      <v-img style="cursor: pointer;" :src="previewURL" @click="openImageFilePicker"></v-img>
    </v-avatar>

    <v-btn color="error" class="my-2 px-4" v-if="previewURL" rounded="lg" variant="tonal" @click="resetImages"
      prepend-icon="mdi-delete">
      remove image
    </v-btn>
  </div>
</template>

<script lang="ts" setup>

const image = defineModel('image', { required: true })
const imageFilePicker: Ref<HTMLElement | null> = ref(null);

const previewURL = computed(() => {
  if (image.value) {
    if (image.value instanceof File) {
      return URL.createObjectURL(image.value);
    }
    else if (typeof image.value == "string") {
      return image.value;
    }
  }
  return null;
});

function openImageFilePicker() {
  if (imageFilePicker.value) {
    imageFilePicker.value.click();
  }
}

const resetImages = () => {
  image.value = null
}
</script>

<style></style>