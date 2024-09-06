<template>
  <v-dialog max-width="800" :model-value="show" persistent>
    <v-card rounded="lg" :disabled="loading.isLoading.value">
      <v-toolbar>
        <v-toolbar-title class="font-weight-black">
          Update New Allowance
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="error" icon="mdi-close" @click="close"></v-btn>
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text class="my-4">
        <v-row>
          <v-col>
            <text-field name="title" v-model="allowance.title" :errors="errors?.title || []" />
          </v-col>
          <v-col>
            <number-field name="amount" v-model="allowance.amount" :errors="errors?.amount || []" :props="{
              min: 0,
              step: 0.1,
              suffix: 'USD'
            }" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <textarea-field name="description" v-model="allowance.description" />
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
import type { AllowanceOptionsRecord } from "~/app/pocketbase-types";
import { storeAllowance, updateAllowance } from "@/app/modules/salary/allowances";

const props = defineProps(['show'])
const emit = defineEmits(['close', 'saved'])

function close() {
  emit('close')
}

const allowance: Ref<AllowanceOptionsRecord> = defineModel();
const loading = useLoading();
const errors = ref()

const { validateAllowance } = useAllowances()
const { hasError } = useErrors();

async function save() {
  errors.value = validateAllowance(allowance.value);
  if (hasError(errors.value)) {
    return
  }
  loading.start();
  await updateAllowance(allowance.value);
  loading.end();

  allowance.value = {
    title: undefined,
    amount: undefined,
    description: undefined
  }
  const { $activeModalsBus } = useNuxtApp();
  $activeModalsBus.$emit('allowance:updated')
  emit('saved')
}

</script>

<style></style>