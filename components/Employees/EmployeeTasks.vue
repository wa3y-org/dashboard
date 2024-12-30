<template>
    <w-html-view-dialog title="Task Data" :html="selectedTaskData" :show="taskModal.isShown.value"
        @close="taskModal.hide" />

    <EmployeesTasksUpdateTask :task="Object.assign({}, selectedTask)" :show="updateTaskModal.isShown.value"
        @cancel="updateTaskModal.hide" @saved="updateTaskModal.hide" />
    <div>
        <EmployeesTasksCreateTask :employee="employee" />
    </div>
    <div class="my-4">
        <div v-for="task of tasksList" :key="task.id">
            <v-card class="ma-1 mt-3" :color="isCompleted(task) ? 'success' : ''"
                :variant="isCompleted(task) ? 'tonal' : 'elevated'">
                <v-card-actions class="pa-4 font-weight-bold">
                    <v-icon>
                        {{
                            isCompleted(task) ? `mdi-checkbox-marked-outline` : `mdi-checkbox-blank-outline`
                        }}
                    </v-icon>
                    {{ task.title }}
                    <v-spacer></v-spacer>
                    <date-view :date="task.complition_date || task.due_date"></date-view>

                    <v-btn color="primary" size="small" variant="text" icon="mdi-file-document-outline"
                        @click="selectTask(task); taskModal.show()" />
                    <v-btn icon="mdi-pencil" size="small" @click="selectTask(task); updateTaskModal.show()"></v-btn>
                    <v-btn icon="mdi-delete" color="error" size="small" @click="confirmRemove(task)"></v-btn>
                </v-card-actions>
            </v-card>
        </div>
        <div class="text-center mt-4">
            <v-btn :prepend-icon="isAllItemsLoaded ? 'mdi-check-all' : 'mdi-download'"
                :loading="loading.isLoading.value" :disabled="isAllItemsLoaded" size="large"
                :color="isAllItemsLoaded ? 'black' : 'primary'" rounded="pill" @click="loadMoretasks">

                {{ isAllItemsLoaded ? 'Thats All' : `Load More ${pagination.perPage} tasks` }}

            </v-btn>
        </div>
    </div>
</template>


<script lang="ts" setup>
import type { TEmployeesTasks } from '~/composables/tasks/index';

const props = defineProps(['employee'])

const tasksList = ref<Set<TEmployeesTasks>>(new Set());

const pagination = ref({
    page: 0,
    perPage: 5,
    totalItems: 5,
    totalPages: 1
})

const isAllItemsLoaded = computed(() => {
    return pagination.value.page >= pagination.value.totalPages
});

const EmployeesTasks = useEmployeesTasks();


const loading = useLoading();
async function loadMoretasks() {
    loading.start();
    pagination.value.perPage + 1
    const response = await EmployeesTasks.getTasks(props.employee?.id, pagination.value.page + 1);
    loading.end();
    console.log(response)

    if (response.models) {
        pagination.value = {
            page: response.models.page,
            perPage: response.models.perPage,
            totalItems: response.models.totalItems,
            totalPages: response.models.totalPages
        };
        for (let task of response.models.items) {
            tasksList.value.add(Object.assign({}, task));
        }
    }
}

onMounted(() => {
    loadMoretasks();
    function reloadTasksFromStart() {
        tasksList.value = new Set();
        pagination.value.page = 0;
        loadMoretasks();
    }
    useNuxtApp().$activeModalsBus.$on('employees:tasks:created', reloadTasksFromStart)
    useNuxtApp().$activeModalsBus.$on('employees:tasks:updated', reloadTasksFromStart)
    useNuxtApp().$activeModalsBus.$on('employees:tasks:removed', reloadTasksFromStart)

});

function isCompleted(task: TEmployeesTasks) {
    return task.complition_date != null && task.complition_date != '';
}

const taskModal = useModal();
const selectedTask = ref<TEmployeesTasks | null>(null);

function selectTask(task: TEmployeesTasks) {
    selectedTask.value = task;
}

const selectedTaskData = computed(() => {
    return `
        <h2>Subject: ${selectedTask.value?.title}</h3>
        <h3>Due Date: ${selectedTask.value?.due_date || 'N/a'}</h3>
        <h3>Complition Date: ${selectedTask.value?.complition_date || 'N/a'}</h3>
        <h3>Details</h3>
        ${selectedTask.value?.details}
    `;
});

const Remove = useConfirmRemove();
async function confirmRemove(task: TEmployeesTasks) {
    const { isConfirmed } = await Remove.confirm();
    if (isConfirmed) {
        await Remove.doRemove(async () => {
            await EmployeesTasks.remove(task)
            useNuxtApp().$activeModalsBus.$emit('employees:tasks:removed');

        });
    }
}

const updateTaskModal = useModal();
</script>