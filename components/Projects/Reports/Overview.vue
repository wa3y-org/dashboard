<template>
  <VaultsProjectVault :hide-header="true" :key="project.id" :project="project" />
  <div>
    <h3 class="text-h4 ma-2">
      Generate Financial Report
    </h3>
    <v-row>
      <v-col>
        <DatePicker name="From" v-model="dates.start" />
      </v-col>
      <v-col>
        <DatePicker name="To" v-model="dates.end" />
      </v-col>
     
    </v-row>
    <v-row v-if="computedDates.start && computedDates.end">
      <v-col>
        <VaultsReportVault :start="computedDates.start" :end="computedDates.end" :hide-header="true" :key="project.id"
          :project="project" />

      </v-col>
    </v-row>
  </div>
</template>


<script setup lang="ts">
import moment from 'moment';


const props = defineProps({
  project: { required: true, type: Object },
})

const dates = ref({
  start: null,
  end: null
})

const computedDates = computed(() => {
  if (!dates.value.start || !dates.value.end) return dates.value;

  let firstDate: Date = dates.value.start;
  let secondDate: Date = dates.value.end;

  if (firstDate > secondDate) {
    firstDate = dates.value.end;
    secondDate = dates.value.start;
  }

  let date = moment(firstDate);

  let day = date.get('D');
  let month = date.get("M") + 1;
  let year = date.get('year');

  firstDate = new Date(`${year}-${month}-${day} 00:00:00.000Z`)

  date = moment(secondDate);

  day = date.get('D');
  month = date.get("M") + 1;
  year = date.get('year');

  secondDate = new Date(`${year}-${month}-${day} 23:59:59.999Z`)

  return {
    start: firstDate,
    end: secondDate
  }

});
</script>