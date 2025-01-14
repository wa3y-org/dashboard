<template>
  <w-html-view-dialog :title="finacialRequestItemDetailsTitle" :show="financialREquestItemDetailsModal.isShown.value"
    :html="finacialRequestItemDetailsToShow" @close="financialREquestItemDetailsModal.hide" />

  <ProjectsFinanceRequestsCreateRequestItem @cancel="addItemModal.hide" @saved="addItemModal.hide"
    :show="addItemModal.isShown.value" :request="request" />

  <ProjectsFinanceRequestsUpdateRequestItem @cancel="cancelUpdate" @saved="handleUpdate"
    :show="updateFinancilaRequestItemModal.isShown.value" :request="request" :item="finacialRequestItemToUpdate" />

  <v-toolbar color="transparent">
    <v-toolbar-title class="font-weight-bold">
      Request Items
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn color="primary" variant="tonal" class="mx-2" rounded="pill" @click="addItemModal.show">
      <v-icon>mdi-plus-thick</v-icon>
      <span class="mx-2">
        Add Item
      </span>
    </v-btn>
  </v-toolbar>
  <v-divider class="my-2"></v-divider>
  <div>
    <div v-for="item of itemsList" class="border-lg px-2 my-2 rounded-lg">
      <v-row>
        <v-col cols="6" class="py-8 font-weight-bold">

          <p>
            Title: {{ item.title }} <span class="mx-2"></span>
            <v-chip color="success" variant="flat" prepend-icon="mdi-check" v-if="item.bills.length"> With Bill</v-chip>
            <v-chip color="error" variant="flat" prepend-icon="mdi-close" v-else> Without Bill</v-chip>
          </p>
          <p>Store: {{ item.store_name }}</p>

          <v-spacer></v-spacer>
          <p>Address: {{ item.store_address }}</p>
          <div class=" d-flex align-center">
            Line:
            <span class="mx-2"></span>
            <div class="my-4 pa-2 border rounded-lg d-flex ">
              {{ item.expand?.budget_line.title }}
              <!-- <span class="mx-3">|</span>
              <p>Budget :<w-usd :amount="item.expand?.budget_line.budget"></w-usd></p>
              <span class="mx-3">|</span>

              <p>Remaining :<w-usd :amount="item.expand?.budget_line.budget"></w-usd></p> -->
            </div>
          </div>
          <div v-if="item.bill_number && item.bill_number.trim() != ''">
            <v-divider class="mb-3"></v-divider>
            <p>
              Bill Number: {{ item.bill_number }}
            </p>
          </div>
          <v-divider class="my-4"></v-divider>

          <ProjectsFinanceRequestsItemBills :item="item" />

        </v-col>
        <v-divider vertical></v-divider>
        <v-col class="py-8">
          <pre>
<span>{{ `Quantity :`.padEnd(20, '.') }} {{ item.quantity }} Unit</span>
<span>{{ `Unit Price :`.padEnd(20, '.') }} {{ item.unit_price + ' ' + item.currency }}</span>
<span>{{ `Total Price :`.padEnd(20, '.') }} {{ item.total_price + ' ' + item.currency }}</span>
<span>{{ `1 USD = :`.padEnd(20, '.') }} {{ item.exchange_rate + ' ' + item.currency }}</span>
<span class="font-weight-bold">{{ `USD Price :`.padEnd(20, '.') }} <w-usd color="" :amount="item.total_price_in_usd"></w-usd></span>
        </pre>
          <div class="mb-2 mt-8 d-flex">
            <v-btn color="primary" variant="text" icon="mdi-file-document-outline"
              @click="showFinancialRequestItemDetails(item)"></v-btn>

            <v-btn class="mx-2" color="info" variant="tonal" icon="mdi-pencil" rounded="lg"
              @click="setFinacialRequestItemToUpdate(item)"></v-btn>

            <v-btn color="error" variant="text" icon="mdi-delete" @click="confirmRemove(item)"></v-btn>

          </div>
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TFinancialRequestsItem } from '~/composables/requestsItems';


const props = defineProps({
  request: { required: true, type: Object },
})
const addItemModal = useModal();

const itemsList = ref<TFinancialRequestsItem[]>([]);
const loading = useLoading();
async function loadFinancialRequestItems() {
  loading.start();
  const response = await useFinancialRequestsItems().get.all(props.request.id)
  loading.end();

  console.log(response)
  if (response.models) {
    itemsList.value = response.models;
  }
}

onMounted(() => {
  loadFinancialRequestItems();
  useNuxtApp().$activeModalsBus.$on('projects:financial_requests:items:created', loadFinancialRequestItems)
  useNuxtApp().$activeModalsBus.$on('projects:financial_requests:items:updated', loadFinancialRequestItems)
  useNuxtApp().$activeModalsBus.$on('projects:financial_requests:items:removed', loadFinancialRequestItems)

})


const updateFinancilaRequestItemModal = useModal();
const finacialRequestItemToUpdate = ref<TFinancialRequestsItem | null>(null);

function setFinacialRequestItemToUpdate(request: TFinancialRequestsItem) {
  finacialRequestItemToUpdate.value = Object.assign({}, request);
  updateFinancilaRequestItemModal.show();
}

function cancelUpdate() {
  updateFinancilaRequestItemModal.hide();
  // staffToUpdate.value = null;
}

function handleUpdate() {
  updateFinancilaRequestItemModal.hide();
}



const financialREquestItemDetailsModal = useModal();
const finacialRequestItemDetailsToShow = ref<string>('');
const finacialRequestItemDetailsTitle = ref<string>('');

function showFinancialRequestItemDetails(item: TFinancialRequestsItem) {
  finacialRequestItemDetailsToShow.value = item.details || '';
  finacialRequestItemDetailsTitle.value = `
    item : ( ${item.title} )
  `;
  financialREquestItemDetailsModal.show();
}


const Remove = useConfirmRemove();
async function confirmRemove(item: TFinancialRequestsItem) {
  const { isConfirmed } = await Remove.confirm();
  if (isConfirmed) {
    await Remove.doRemove(async () => {
      await useFinancialRequestsItems().remove(item)
      useNuxtApp().$activeModalsBus.$emit('projects:financial_requests:items:removed');

    });
  }
}
</script>