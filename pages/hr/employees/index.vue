<template>
  <v-card rounded="lg" class="my-4">
    <v-toolbar color="transparent">
      <v-toolbar-title class="font-weight-bold">
        <v-icon>mdi-account-multiple-outline</v-icon>
        Employees List
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" to="/hr/employees/new" rounded="lg" variant="tonal" class="mx-4" size="large" prepend-icon="mdi-account-plus-outline">
        Create Employee
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-card-text>
      <EmployeesList />
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>

</script>

<style></style>