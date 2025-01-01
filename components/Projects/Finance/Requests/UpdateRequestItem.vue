<template>
  <v-dialog :model-value="show" scrollable persistent max-width="1080px" transition="dialog-transition">
    <v-card rounded="xl" :loading="loading.isLoading.value" :disabled="loading.isLoading.value">
      <v-toolbar>
        <v-toolbar-title class="font-weight-bold">
          Update Request Item
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="error" icon="mdi-close" @click="cancel" />
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>

          <v-col>
            <WSelectBudgetline :project="request.project" :errors="validationErrors.budget_line"
              v-model="itemData.budget_line" name="Budget Line" placeholder="Select Budgetline" />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <text-field :errors="validationErrors.title" v-model="itemData.title" name="Item Name"
              placeholder="Enter Item Title/Name" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <text-field :errors="validationErrors.bill_number" v-model="itemData.bill_number" name="Bill Number"
              placeholder="Enter Bill Number" />
          </v-col>
        </v-row>
        <!-- <v-row>
          <v-col>
            <text-editor :errors="validationErrors.details" v-model="itemData.details" name="Details"
              placeholder="Enter detailed description" />
          </v-col>
        </v-row> -->
        <v-row>
          <v-col>
            <NumberField :errors="validationErrors.quantity" v-model="itemData.quantity" name="Quantity"
              placeholder="Enter Quantity - min is 0.01" :props="{
                min: 0.01,
                suffix: ' Unit'
              }" />
          </v-col>
          <v-col>
            <text-field :errors="validationErrors.currency" v-model="itemData.currency" name="Currency"
              placeholder="Enter Currency" />
          </v-col>


        </v-row>
        <v-row>
          <v-col>
            <NumberField :errors="validationErrors.unit_price" v-model="itemData.unit_price" name="Unit Price"
              placeholder="Enter Price - min is 0.01 USD" :props="{
                min: 0.01,
                suffix: ' ' + itemData.currency || '',

              }" />
          </v-col>
          <v-col>
            <NumberField :model-value="totalPrice" name="Total Price" placeholder="" :props="{
              readonly: true,
              suffix: ' ' + itemData.currency || '',
            }" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <NumberField :errors="validationErrors.exchange_rate" v-model="itemData.exchange_rate" name="Rate"
              placeholder="???" :props="{
                min: 0.01,
                suffix: ' ' + itemData.currency || '',
                prefix: '1 USD = ',
                'persistant-placeholder': true,
              }" />
          </v-col>

          <v-col>
            <NumberField :model-value="totalUSD" name="Total USD" placeholder="" :props="{
              readonly: true,
              suffix: ' USD',
            }" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <text-field :errors="validationErrors.store_name" v-model="itemData.store_name" name="Store Name"
              placeholder="Enter store Name" />
          </v-col>
          <v-col>
            <text-field :errors="validationErrors.store_address" v-model="itemData.store_address" name="Store Address"
              placeholder="Enter store address" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <text-editor :errors="validationErrors.details" v-model="itemData.details" name="Details"
              placeholder="Enter detailed description" />
          </v-col>
        </v-row>
      </v-card-text>
      <div v-if="backendError.error && backendError.hasError" class="my-4">
        <v-divider class="my-4"></v-divider>
        <BackendErrorWrapper class="ma-4" type="error" :backend-error="backendError.error"
          v-if="backendError.hasError" />
      </div>
      <v-divider></v-divider>
      <v-card-actions class="pa-4">
        <v-alert type="error" :value="true" variant="text" v-if="Errors.hasError(validationErrors)">
          Input Validation Error
        </v-alert>
        <v-spacer></v-spacer>
        <SaveCancelBtn :loading="loading.isLoading.value" @cancel="cancel" @save="save" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">

const required = true;
const props = defineProps({
  item: { required, type: Object },
  request: { required, type: Object },
  show: { required, type: Boolean }
})

const emit = defineEmits(['cancel', 'saved']);
function cancel() {
  emit('cancel')
}

const itemData = ref({
  bill_number: null,
  title: null,
  details: null,
  budget_line: null,
  quantity: null,
  unit_price: null,
  exchange_rate: null,
  store_name: null,
  store_address: null,
  currency: null,
})

watch(() => { props.item }, () => {
  itemData.value = {
    bill_number: props.item?.bill_number,
    title: props.item?.title,
    details: props.item?.details,
    budget_line: props.item?.budget_line,
    quantity: props.item?.quantity,
    unit_price: props.item?.unit_price,
    exchange_rate: props.item?.exchange_rate,
    store_name: props.item?.store_name,
    store_address: props.item?.store_address,
    currency: props.item?.currency,
  }
}, { deep: true })


const Errors = useErrors();
const isFirstAttempt = ref(true)
const validationErrors = computed<{ [key: string]: any }>(() => {
  if (isFirstAttempt.value) return {};
  return useFinancialRequestsItems().validate(itemData.value)
});

const loading = useLoading();
const backendError = useBackendError();
async function save() {

  isFirstAttempt.value = false;
  backendError.clear();
  if (Errors.hasError(validationErrors.value)) {
    return;
  }
  loading.start();
  const itemDataClone = Object.assign({
    total_price: totalPrice.value,
    total_price_in_usd: totalUSD.value,
    id: props.item?.id
  }, itemData.value);
  itemDataClone.budget_line = itemDataClone.budget_line?.id || '';
  const response = await useFinancialRequestsItems().update(itemDataClone);
  loading.end();



  if (response.error) {

    backendError.set(response.error)
    return;
  }

  if (response.model) {
    isFirstAttempt.value = true;
    itemData.value = {
      title: null,
      details: null,
      budget_line: null,
      quantity: null,
      unit_price: null,
      exchange_rate: null,
      store_name: null,
      store_address: null,
      currency: null,
    }
    useNuxtApp().$activeModalsBus.$emit('projects:financial_requests:items:updated')
    emit('saved')
  }
}


const totalPrice = computed(() => {
  return (Number(itemData.value.unit_price) * Number(itemData.value.quantity)).toFixed(2)
});


const totalUSD = computed(() => {
  if (!itemData.value.exchange_rate) return null;
  return Number(Number(totalPrice.value) / itemData.value.exchange_rate).toFixed(2);
});
</script>