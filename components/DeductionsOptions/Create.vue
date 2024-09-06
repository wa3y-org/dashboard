<template>
  <v-dialog max-width="800" :model-value="show" persistent>
    <v-card rounded="lg" :disabled="loading.isLoading.value">
      <v-toolbar>
        <v-toolbar-title class="font-weight-black">
          Create New Deduction
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="error" icon="mdi-close" @click="close"></v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text class="my-4">
        <v-row>
          <v-col>
            <text-field name="title" v-model="deduction.title" :errors="errors?.title || []" />
          </v-col>
          <v-col>
            <number-field name="amount" v-model="deduction.amount" :errors="errors?.amount || []" :props="{
              min: 0,
              step: 0.1,
              suffix: 'USD'
            }" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <textarea-field name="description" v-model="deduction.description" />
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="pa-2">
        <v-spacer></v-spacer>
        <save-cancel-btn @cancel="close" @save="save" :loading="loading.isLoading.value" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import type { DeductionOptionsRecord } from "~/app/pocketbase-types";
import { storeDeduction } from "@/app/modules/salary/deductions";

const props = defineProps(['show'])
const emit = defineEmits(['close', 'saved'])

function close() {
  emit('close')
}

const deduction: Ref<DeductionOptionsRecord> = ref({
  title: undefined,
  amount: undefined,
  description: undefined
})
const loading = useLoading();
const errors = ref()

const { validateDeduction } = useDeductions()
const { hasError } = useErrors();

async function save() {
  errors.value = validateDeduction(deduction.value);
  if (hasError(errors.value)) {
    return
  }
  loading.start();
  await storeDeduction(deduction.value);
  loading.end();

  deduction.value = {
    title: '',
    amount: 0,
    description: undefined
  }
  const { $activeModalsBus } = useNuxtApp();
  $activeModalsBus.$emit('deduction:created')
  emit('saved')
}

</script>

<style></style>