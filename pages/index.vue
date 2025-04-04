<template>
  <v-container fluid class="fill-height home-page-container">
    <v-row class="fill-height">
      <v-col cols="12" class="d-flex flex-column justify-center align-center">
        <div class="text-center">
          <v-img class="mx-auto mb-8" max-width="250" src="@/assets/images/wa3y-logo.png" rounded="xl"></v-img>
          <h1 class="text-h2 font-weight-bold mb-4 text-primary">
            Welcome to Wa3y Dashboard
          </h1>
          <p class="text-h6 mb-8 text-grey-darken-1">
            Empowering Change, One Project at a Time.
          </p>
          <v-btn color="primary" size="x-large" to="/projects" rounded="pill">
            Explore Projects
            <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </v-col>
      <!-- <v-col cols="12" md="6" class="d-flex align-center justify-center">
        <v-img src="@/assets/images/wa3y-logo.png" max-width="600" contain></v-img>
      </v-col> -->
    </v-row>
    <v-row class="mt-12">
      <v-col cols="12">
        <h2 class="text-h4 font-weight-bold text-center mb-8">
          Our Impact
        </h2>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="pa-4 rounded-xl" elevation="4">
          <v-card-title class="text-h5 font-weight-bold">
            <v-icon color="primary" class="mr-2">mdi-account-group</v-icon>
            Communities Served
          </v-card-title>
          <v-card-text>
            <p class="text-h3 font-weight-bold text-center">
              100+
            </p>
            <p class="text-center">
              We've reached over 100 communities with our projects.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="pa-4 rounded-xl" elevation="4">
          <v-card-title class="text-h5 font-weight-bold">
            <v-icon color="primary" class="mr-2">mdi-lightbulb-on-outline</v-icon>
            Projects Launched
          </v-card-title>
          <v-card-text>
            <p class="text-h3 font-weight-bold text-center">
              50+
            </p>
            <p class="text-center">
              We've successfully launched over 50 impactful projects.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card class="pa-4 rounded-xl" elevation="4">
          <v-card-title class="text-h5 font-weight-bold">
            <v-icon color="primary" class="mr-2">mdi-calendar-check</v-icon>
            Years of Service
          </v-card-title>
          <v-card-text>
            <p class="text-h3 font-weight-bold text-center">
              5+
            </p>
            <p class="text-center">
              We've been serving communities for over 5 years.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'default'
})
</script>

<style lang="scss" scoped>
.home-page-container {
  // background: rgb(240, 240, 240);
  // background: -moz-linear-gradient(106deg, rgba(240, 240, 240, 1) 0%, rgba(255, 255, 255, 1) 100%);
  // background: -webkit-linear-gradient(106deg, rgba(240, 240, 240, 1) 0%, rgba(255, 255, 255, 1) 100%);
  // background: linear-gradient(106deg, rgba(240, 240, 240, 1) 0%, rgba(255, 255, 255, 1) 100%);
  // filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#f0f0f0", endColorstr="#ffffff", GradientType=1);
}
</style>
