<template>
  <v-card variant="outlined" rounded="lg" class="border-md">
    <div class="d-flex align-center">
      <div>
        <span class="mx-2 text-primary text-no-wrap font-weight-black">
          <v-icon v-if="icon">{{ icon }}</v-icon>
          {{ name }} :
        </span>
      </div>
      <v-spacer></v-spacer>
      <v-menu :close-on-content-click="false" v-model="calendarPopupIsShown">
        <template v-slot:activator="{ props }">
          <div v-bind="props">
            <!-- <text-field :name="name" :icon="icon" v-model="model" /> -->

            <div class="d-flex rounded-md elevation-0 my-1 overflow-hidden">
              <div>
                <v-text-field @keydown.prevent="" density="comfortable" class="elevation-0" type="number" min="1" max="31"
                  :hide-spin-buttons="true" v-bind="props.props" width="60" menu-icon="" v-model="selectedDay" rounded="0"
                  variant="solo" hide-details="auto" label="Day"></v-text-field>
              </div>

              <div>

                <v-text-field @keydown.prevent="" density="comfortable" class="elevation-0" type="number" min="1" max="12"
                  :hide-spin-buttons="true" v-bind="props.props" width="70" menu-icon="" v-model="selectedMonth"
                  rounded="0" variant="solo" hide-details="auto" label="Month"></v-text-field>
              </div>

              <div>

                <v-text-field @keydown.prevent="" density="comfortable" class="elevation-0" type="number"
                  :hide-spin-buttons="true" v-bind="props.props" width="90" menu-icon="" v-model="selectedYear"
                  rounded="0" variant="solo" hide-details="auto" label="Year"></v-text-field>
              </div>
            </div>
          </div>
        </template>
        <v-date-picker show-adjacent-months border="md" rounded="lg" v-model="calendarPickedDate">
          <!-- <template v-slot:header></template>
          <template v-slot:title></template> -->
        </v-date-picker>
      </v-menu>
    </div>
  </v-card>
  <!-- {{ calendarPickedDate }} -->
</template>

<script lang="ts" setup>
import moment from "moment";
const model = defineModel<Date>();

const props = defineProps(['errors', 'placeholder', 'name', 'icon', 'props'])

const calendarPopupIsShown = ref(false);
function hideCalendarPopup() {
  calendarPopupIsShown.value = false;
}

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

const calendarPickedDate = ref(new Date());

watch(
  calendarPickedDate,
  () => {
    // console.log(calendarPickedDate.value.get)
    const date = moment(calendarPickedDate.value);

    selectedDay.value = date.get('D');
    selectedMonth.value = date.get("M") + 1;
    selectedYear.value = date.get('year');

    model.value = new Date(`${selectedYear.value}-${selectedMonth.value}-${selectedDay.value}`)

    hideCalendarPopup();

  },
  { deep: true }
)

watch(model, () => {
  const date = moment(model.value);

  selectedDay.value = date.get('D');
  selectedMonth.value = date.get("M") + 1;
  selectedYear.value = date.get('year');
}, { deep: true });

onMounted(() => {
  const date = moment(model.value);

  selectedDay.value = date.get('D');
  selectedMonth.value = date.get("M") + 1;
  selectedYear.value = date.get('year');
})
</script>

<style></style>