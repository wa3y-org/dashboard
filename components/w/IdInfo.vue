<template>
  <div>
    <v-row>
      <v-col>
        <select-field :props="{
          'clearable': true
        }" placeholder="Select Nationality" name="Nationality" :items="nationalities" />
      </v-col>
      <v-col>
        <select-field placeholder="Select ID type" name="ID Type" :items="idTypes" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <text-field name="ID Number" placeholder="Enter Id number" />
      </v-col>
      <v-col>
        <date-picker name="Expiry date" />
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <text-field name="Issue Place" placeholder="Enter place of issue" />
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts" setup>
const idTypes = ['Passport', 'National ID'];
const nationalities = ['Sudanese', 'Uganda', 'Egypt']
</script>

<style></style>