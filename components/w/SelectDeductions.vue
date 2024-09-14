<template>
  <v-autocomplete :loading="loading.isLoading.value" :error-messages="errors" v-model="model" item-value="id" chips closable-chips v-bind="props.props" return-object hide-selected
    auto-select-first clearable open-on-clear hide-details="auto" rounded="lg" variant="outlined"
    :items="visibleDeductions" class="font-weight-bold" :placeholder="placeholder">
    <template v-slot:prepend-inner>
      <div class="mx-2 text-primary text-no-wrap">
        <v-icon v-if="icon">{{ icon }}</v-icon>
        Select Deductions :
      </div>
    </template>
    <template v-slot:chip="{ props, item }">
      <v-chip label size="large" v-bind="props" class="font-weight-bold bg-white">
        {{ item.raw.title }}
        <v-divider vertical class="mx-2"></v-divider>
        <span class="text-success">{{ item.raw.amount }} USD</span>
      </v-chip>
    </template>
    <template v-slot:item="{ props, item }">
      <v-list-item v-bind="props" title="">
        <div class="d-flex">
          <span class="font-weight-bold">{{ item.raw.title }}</span>
          <v-spacer></v-spacer>
          <v-chip variant="tonal" color="success" class="font-weight-bold">{{ item.raw.amount }} USD</v-chip>
        </div>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script lang="ts" setup>
import type { DeductionOptionsRecord } from "~/app/pocketbase-types";

const model = defineModel()
const props = defineProps(['errors', 'placeholder', 'name', 'icon', 'props', 'items', 'hidden'])


const { fetchDeductions } = useDeductions();
const { loading, deductionsList } = fetchDeductions()


function isHidden(deduction: DeductionOptionsRecord) {
  for (let hiddenDeduction of props.hidden || []) {
    if (deduction.id == hiddenDeduction.id) {
      return true;
    }
  }
  return false;
}

const visibleDeductions = computed(() => {
  let visible = [];
  for (let deduction of deductionsList.value) {
    if (!isHidden(deduction)) {
      visible.push(deduction)
    }
  }

  return visible;
});

</script>

<style></style>