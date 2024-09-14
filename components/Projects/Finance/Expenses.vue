<template>
  <projects-finance-create-project-finance @saved="addExpenseModal.hide" @cancel="addExpenseModal.hide"
    :show="addExpenseModal.isShown.value" :project="project" type="expense" />
  <v-card elevation="2" class="border border-error border-lg" rounded="lg">
    <v-toolbar color="transparent">
      <v-toolbar-title class="font-weight-bold text-red">
        Project Expenses
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="error" variant="tonal" class="mx-2" rounded="pill" @click="addExpenseModal.show">
        <v-icon>mdi-plus-thick</v-icon>
        <span class="mx-2">
          Add Expense
        </span>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <projects-finance-expenses-list :project="project" />

    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
const props = defineProps(['project'])

const addExpenseModal = useModal();

</script>

<style></style>