<template>


    <h1>Comity Comments For Purchase</h1>
    <ProjectsFinancePurchasesCreateComment :request="request" />
    <div class="my-6" v-for="reply of repliesList" :key="reply.id">
        <v-card class="ma-2 pa-2 border-lg rounded-xl">
            <v-card-actions class="text font-weight-bold px-4">
                <v-avatar :image="getAvatarUrl(reply.expand?.employee)"></v-avatar>
                {{ reply.expand?.employee.name }}
                <span class="mx-2"></span>
                <v-chip color="" v-if="reply.status == FinancialReqeuestsCommityCommentsStatusOptions.REVIEW">{{
                    reply.status }}</v-chip>
                <v-chip color="warning" v-if="reply.status == FinancialReqeuestsCommityCommentsStatusOptions.APPROVAL"
                    prepend-icon="mdi-check ">Approval</v-chip>
                <v-chip color="success"
                    v-if="reply.status == FinancialReqeuestsCommityCommentsStatusOptions.BILL_APPROVAL" label
                    variant="flat" prepend-icon="mdi-check-all">Bill Approval</v-chip>
                <v-spacer></v-spacer>
                <span class="text-grey text-body-2">
                    {{ calcAge(reply?.created) }} -
                    <date-view :date="reply?.created" :show-time="true" />
                </span>

            </v-card-actions>
            <v-divider></v-divider>
            <v-card-text>
                <div>
                    <w-html-view :html="reply?.comment" />
                </div>

            </v-card-text>
        </v-card>


    </div>

    <div class="my-6 text-center">
        <v-btn v-if="!isAllItemsLoaded" prepend-icon="mdi-download" :loading="loading.isLoading.value" size="large"
            color="primary" rounded="pill" @click="loadMoreReplies">

            {{ `Load More ${pagination.perPage} replies` }}

        </v-btn>
    </div>
</template>

<script setup lang="ts">
import moment from 'moment';
import { FinancialReqeuestsCommityCommentsStatusOptions, type EmployeesRecord } from '~/app/pocketbase-types';
import type { TFinancialRequestsComment } from '~/composables/requestsComments';

const required = true;
const props = defineProps({
    request: { required, type: Object },
})


const repliesList = ref<Set<TFinancialRequestsComment>>(new Set());
const pagination = ref({
    page: 0,
    perPage: 5,
    totalItems: 5,
    totalPages: 1
})

const isAllItemsLoaded = computed(() => {
    return pagination.value.page >= pagination.value.totalPages
});

const loading = useLoading();
async function loadMoreReplies() {
    loading.start();
    const response = await useProjectPurchasesComityComments().get.paginated(props.request?.id, pagination.value.page + 1);
    loading.end();
    console.log(response)

    if (response.models) {
        pagination.value = {
            page: response.models.page,
            perPage: response.models.perPage,
            totalItems: response.models.totalItems,
            totalPages: response.models.totalPages
        };
        for (let reply of response.models.items) {
            repliesList.value.add(Object.assign({}, reply));
        }
    }
}

onMounted(() => {
    loadMoreReplies();
    useNuxtApp().$activeModalsBus.$on(`projects:purchases:comments:created`, () => {
        repliesList.value = new Set();
        pagination.value.page = 0;
        loadMoreReplies();
    })
});

function calcAge(birthDate: string) {
    return moment(birthDate).fromNow(true)
}

function getAvatarUrl(employee: EmployeesRecord) {
    return usePocketBase().files.getUrl(employee, employee.avatar || '');
}
</script>