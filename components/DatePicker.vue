<template>
  <v-card variant="outlined" rounded="lg" class="py-2 px-2 border">
    <div class="d-flex align-center">
      <div>
        <span class="mx-2 text-primary text-no-wrap font-weight-black">
          <v-icon v-if="icon">{{ icon }}</v-icon>
          {{ name }} :
        </span>
      </div>
      <v-spacer></v-spacer>
      <div class="d-flex">
        <div>

          <v-autocomplete v-bind="props.props" width="80" density="compact" menu-icon="" :items="days" v-model="selectedDay" rounded="lg"
            variant="solo" label="Day" hide-details="auto" placeholder="day"></v-autocomplete>
        </div>
        <span class="mx-1"></span>
        <div>

          <v-autocomplete v-bind="props.props" label="Month" width="90" menu-icon="" density="compact" :items="months" v-model="selectedMonth"
            rounded="lg" variant="solo" hide-details="auto" placeholder="month"></v-autocomplete>
        </div>
        <span class="mx-1"></span>
        <div>

          <v-autocomplete v-bind="props.props" label="Year" width="100" menu-icon="" density="compact" :items="years" v-model="selectedYear"
            rounded="lg" variant="solo" hide-details="auto" placeholder="Year"></v-autocomplete>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts" setup>
const model = defineModel();

const props = defineProps(['errors', 'placeholder', 'name', 'icon', 'props'])

let days: number[] = [];
for (let day = 1; day <= 31; day++) {
  days.push(day)
}
const selectedDay = ref()

let months: number[] = [];
for (let month = 1; month <= 31; month++) {
  months.push(month)
}
const selectedMonth = ref()

let years: number[] = [];
for (let year = 1940; year <= 2010; year++) {
  years.push(year)
}
const selectedYear = ref()
</script>

<style></style>