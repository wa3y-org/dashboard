<template>
  <div class="my-4 text-center">
    <v-file-input v-show="false" v-model="image" ref="imageFilePicker" accept="image/*" label="File input" />

    <v-avatar size="280" @click="openImageFilePicker" v-if="!previewURL" color="grey-lighten-3" width="100%" height="250"
      class="cursor-pointer elevation-2" :rounded="round">
      <div class="fill-height d-flex justify-center align-center flex-column">
        <v-icon size="128" color="#CCC">mdi-image-area</v-icon>
        <p class="text-h5 font-weight-bold text-grey">
          Select Cover
        </p>
        <p class="text-grey text-caption"> JPEG, WEBP, JPEG </p>
      </div>
    </v-avatar>
    <v-avatar size="280" v-if="previewURL" :rounded="round" class="elevation-2">
      <v-img  style="cursor: pointer;" :src="previewURL" @click="openImageFilePicker"></v-img>
    </v-avatar>

    <div class="my-2">
      <v-btn color="error" class="my-2 px-4" v-if="previewURL" rounded="lg" variant="tonal" @click="resetImages"
        icon="mdi-delete">
      </v-btn>

      <span class="mx-2"></span>
      <v-btn color="success" class="my-2 px-4" v-if="previewURL" rounded="lg" variant="tonal" @click="openImageFilePicker"
        icon="mdi-file-replace-outline">

      </v-btn>

      <!-- <span class="mx-2"></span>
      <v-btn color="" class="my-2 px-4" v-if="previewURL" rounded="lg" variant="tonal" @click="toggleRounded"
        :icon="round == 'xl' ? 'mdi-account-box-outline' : 'mdi-account-circle-outline'">

      </v-btn> -->
    </div>
  </div>
</template>

<script lang="ts" setup>

const image = defineModel('image', { required: true })
const props = defineProps(['pocketUrl'])
const imageFilePicker: Ref<HTMLElement | null> = ref(null);

const previewURL = computed(() => {
  if (image.value) {
    if (image.value instanceof File) {
      return URL.createObjectURL(image.value);
    }
    else if (typeof image.value == "string") {
      return props.pocketUrl;
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

const round: Ref<"circle" | "xl"> = ref('xl')

function toggleRounded() {
  round.value = round.value == "xl" ? "circle" : "xl";
}
</script>

<style></style>