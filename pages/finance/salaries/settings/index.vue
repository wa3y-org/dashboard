<template>
  <allowances-options-create @saved="handleNewAllowance" :show="createAllowanceModal.isShown.value"
    @close="createAllowanceModal.hide" />
  
  <v-card class="my-4" rounded="lg">
    <v-toolbar color="white">
      <v-toolbar-title>
        <v-icon>mdi-table-settings</v-icon>
        <span class="mx-2 font-weight-bold">
          Salary Settings
        </span>
      </v-toolbar-title>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text class="my-4">
      <div class="d-flex justify-center align-center">
        <p class="text-h5 font-weight-bold my-4"> Allowances </p>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="createAllowanceModal.show" prepend-icon="mdi-plus-thick" variant="tonal">Create
          new</v-btn>
      </div>
      <allowances-options-list />
    </v-card-text>
    <div class="my-4">
      <v-divider></v-divider>
    </div>
    <v-card-text class="my-4">
      <p class="text-h5 font-weight-bold">Deductions</p>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>

const createAllowanceModal = useModal();
function handleNewAllowance() {
  createAllowanceModal.hide();
}


</script>

<style></style>