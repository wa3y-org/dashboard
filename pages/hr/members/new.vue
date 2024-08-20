<template>
  <v-card class="my-4" rounded="lg">
    <v-toolbar color="white">
      <v-toolbar-title color="text-primary">
        <v-icon>mdi-account-box-plus-outline</v-icon>
        <span class="mx-2 font-weight-bold">
          Create New Member
        </span>
      </v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>

    <v-stepper v-model="step" show-actions editable>
      <v-stepper-header>
        <template v-for="(item, index) of items ">
          <v-stepper-item :complete="item.isComplete" :title="item.title" :subtitle="item.subtitle" :value="index + 1" />
          <v-divider v-if="index < (items.length - 1)"></v-divider>
        </template>



      </v-stepper-header>
      <v-stepper-window style="min-height: 24rem;">

        <v-stepper-window-item :value="1">
          <create-member-personal-info />
        </v-stepper-window-item>

        <v-stepper-window-item :value="2">
          <create-member-contact-info />

        </v-stepper-window-item>

        <v-stepper-window-item :value="3">
          <w-id-info />
        </v-stepper-window-item>
      </v-stepper-window>
      <v-stepper-actions :disabled="false">
        <template v-slot:next>
          <v-btn v-f :disabled="step >= 3" @click="next">Next</v-btn>
        </template>
        <template v-slot:prev>
          <v-btn :disabled="step <= 1" @click="pervious">Previous</v-btn>
        </template>
      </v-stepper-actions>
    </v-stepper>
  </v-card>

  <!-- 
  <v-card class="my-4" rounded="lg">
    <v-toolbar color="white">
      <v-toolbar-title color="text-primary">
        <v-icon>mdi-account-box-plus-outline</v-icon>
        <span class="mx-2 font-weight-bold">
          Create New Member
        </span>
      </v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <create-member-personal-info />
      <v-divider class="my-4"></v-divider>
      <create-member-contact-info />

    </v-card-text>
  </v-card> -->
</template>

<script lang="ts" setup>
const step = ref(1);
const items = [
  { title: 'Personal', subtitle: '', isComplete: false },
  { title: 'Contact', subtitle: '', isComplete: false },
  { title: 'Identification', subtitle: '', isComplete: false },
];

function next() {
  step.value += 1;
}

function pervious() {
  step.value -= 1;
}
</script>

<style></style>