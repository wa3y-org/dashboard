<template>
  <v-card class="my-4" rounded="lg">
    <v-toolbar color="white">
      <v-toolbar-title color="text-primary">
        <v-icon>mdi-account-plus-outline</v-icon>
        <span class="mx-2 font-weight-bold">
          Create New Employee
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
      <v-stepper-window style="min-height: 24rem;" class="pa-0 ma-0 my-4">
        <v-stepper-window-item :value="1">
          <create-employee-personal-info />
        </v-stepper-window-item>
        <!-- <v-stepper-window-item :value="2">
          <w-id-info />
        </v-stepper-window-item> -->
        <v-stepper-window-item :value="2">
          <create-employee-contact-info />
        </v-stepper-window-item>
        <v-stepper-window-item :value="3">
          <create-employee-employment-info />
        </v-stepper-window-item>
        <v-stepper-window-item :value="4">
          <create-employee-salary />
        </v-stepper-window-item>
      </v-stepper-window>
      <v-divider class="my-4"></v-divider>
      <v-stepper-actions :disabled="false">
        <template v-slot:next>
          <v-btn v-f :disabled="step >= items.length" @click="next">Next</v-btn>
        </template>
        <template v-slot:prev>
          <v-btn :disabled="step <= 1" @click="pervious">Previous</v-btn>
        </template>
      </v-stepper-actions>
    </v-stepper>
  </v-card>
</template>

<script lang="ts" setup>
const step = ref(1);
const items = [
  { title: 'Personal', subtitle: '', isComplete: false },
  // { title: 'ID', subtitle: '', isComplete: false },
  { title: 'Contact', subtitle: '', isComplete: false },
  // { title: 'Qualifications', subtitle: '', isComplete: false },
  { title: 'Employment', subtitle: '', isComplete: false },
  { title: 'Salary', subtitle: '', isComplete: false },
];

function next() {
  step.value += 1;
}

function pervious() {
  step.value -= 1;
}
</script>

<style></style>