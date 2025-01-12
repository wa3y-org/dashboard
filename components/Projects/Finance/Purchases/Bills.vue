<template>
    <w-object-view :title="billToView || ''" :show="objectViewModal.isShown.value" @close="objectViewModal.hide"
        :filename="billToView || ''" :record="request" />
    <div class="pa-4">
        <h1>Bills ({{ bills.length || 0 }})</h1>
        <div v-for="(bill, index) in bills" :key="index + bill">
            <v-btn variant="text" color="blue" class="capitalized-text" link @click="showBillPreview(bill)">
                {{ index + 1 }}. {{ bill }}
            </v-btn>
            <v-btn icon="mdi-close" color="red" variant="text" @click="confirmRemove(bill)"></v-btn>
        </div>
        <v-card rounded="xl" min-width="200px" :loading="loading.isLoading.value" class="py-4 px-2 ma-2 border-lg rounded-lg">
            <v-file-input @change="uploadBills" v-show="false" ref="billFilePicker" v-model="billsToUpload" label="Select Bills" multiple min-width="500px" />
            <div v-if="backendError.error && backendError.hasError" class="my-4">
                
                <BackendErrorWrapper class="ma-4" type="error" :backend-error="backendError.error"
                    v-if="backendError.hasError" />
            </div>
            <v-btn block size="x-large" rounded="pill" prepend-icon="mdi-upload" color="blue" :loading="loading.isLoading.value"
                :disabled="loading.isLoading.value" @click="openBillFilePicker">
                Upload
            </v-btn>
        </v-card>
    </div>
</template>

<script lang="ts" setup>
const required = true;
const props = defineProps({
    request: { required, type: Object },
})

const billsToUpload = ref([]);

const objectViewModal = useModal();
const billToView = ref<string | null>(null)
function showBillPreview(bill: string) {
    billToView.value = bill;
    objectViewModal.show();
}

const bills = ref<string[]>([])

watch(() => props.request, () => {
    bills.value = props.request?.bills || [];
}, { deep: true });

onMounted(() => {
    bills.value = props.request?.bills || [];
})

const Remove = useConfirmRemove();
async function confirmRemove(bill: string) {
    const { isConfirmed } = await Remove.confirm();
    if (isConfirmed) {
        await Remove.doRemove(async () => {
            usePurchasesRequests().bills.remove(props.request, bill);
        });
        useNuxtApp().$activeModalsBus.$emit('projects:purchases:updated');
        bills.value.splice(bills.value.indexOf(bill), 1);
    }
}


const billFilePicker: Ref<HTMLElement | null> = ref(null);
function openBillFilePicker() {
  if (billFilePicker.value) {
    billFilePicker.value.click();
  }
}

const loading = useLoading();
const backendError = useBackendError();

async function uploadBills() {
    if (!billsToUpload.value.length) return;

    backendError.clear();
    loading.start();
    const response = await usePurchasesRequests().update(Object.assign({ id: props.request?.id, 'bills+': billsToUpload.value },));
    loading.end();

    useNuxtApp().$activeModalsBus.$emit('projects:purchases:updated');


    if (response.error) {
        backendError.set(response.error)
        return;
    }

    if (response.model) {
        bills.value = [];
        for (let bill of response.model.bills) {
            bills.value.push(bill)
        }
    }

    billsToUpload.value = []
}
</script>