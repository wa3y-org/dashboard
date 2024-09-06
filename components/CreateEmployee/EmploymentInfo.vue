<template>
  <v-row>
    <v-col>
      <w-select-org-section />
    </v-col>
    <v-col>
      <TextField name="Position" placeholder="Enter employee position" />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <w-select-qualification />
    </v-col>
    <v-col>
      <text-field name="specialization" placeholder="Enter employee specialization" />
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <DatePicker name="Started At" />
    </v-col>
    <v-col>
      <w-select-employment-status />
    </v-col>
  </v-row>
  
</template>

<script lang="ts" setup>

</script>

<style></style>