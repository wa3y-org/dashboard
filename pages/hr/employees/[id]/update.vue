<template>
  <v-card class="my-4" rounded="lg" :disabled="loading.isLoading.value" :loading="loading.isLoading.value">
    <v-toolbar color="white">
      <v-toolbar-title color="text-primary">
        <v-icon>mdi-account-edit-outline</v-icon>
        <span class="mx-2 font-weight-bold">
          Update Employee
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      {{ employee.name }}
      <span class="text-grey mx-2">
        ({{ employee.email }})
      </span>
    </v-toolbar>
    <v-divider></v-divider>
    <v-stepper v-model="step" show-actions editable>
      <v-stepper-header>
        <template v-for="(item, index) of items ">
          <v-stepper-item :complete="item.isComplete" :title="item.title" :subtitle="item.subtitle" :value="index + 1" />
          <v-divider v-if="index < (items.length - 1)"></v-divider>
        </template>
      </v-stepper-header>
      <v-stepper-window style="min-height: 24rem;" class="pa-0 ma-0 my-4">
        <v-stepper-window-item :value="1">
          <create-employee-personal-info v-model="employee" />
        </v-stepper-window-item>
        <!-- <v-stepper-window-item :value="2">
          <w-id-info />
        </v-stepper-window-item> -->
        <v-stepper-window-item :value="2">
          <create-employee-contact-info v-model="employee" />
        </v-stepper-window-item>
        <v-stepper-window-item :value="3">
          <create-employee-employment-info v-model="employee" />
        </v-stepper-window-item>
        <v-stepper-window-item :value="4">
          <create-employee-salary v-model="employee" />
        </v-stepper-window-item>
        <v-stepper-window-item :value="5">
          <create-employee-authentication v-model="employee" :update-mode="true" />
        </v-stepper-window-item>
      </v-stepper-window>
      <div v-if="backendError.error && backendError.hasError" class="my-4">
        <v-divider class="my-4"></v-divider>
        <BackendErrorWrapper class="ma-4" type="error" :backend-error="backendError.error" v-if="backendError.hasError" />
      </div>
      <v-divider class="my-4"></v-divider>
      <v-stepper-actions :disabled="false">
        <template v-slot:next>
          <v-btn v-f v-if="step < items.length" @click="next">Next</v-btn>
          <v-btn v-else rounded="pill" color="primary" variant="elevated" size="large" prepend-icon="mdi-check"
            @click="save" :loading="loading.isLoading.value">Save</v-btn>
        </template>
        <template v-slot:prev>
          <v-btn :disabled="step <= 1" @click="pervious">Previous</v-btn>
        </template>
      </v-stepper-actions>
    </v-stepper>
  </v-card>
</template>

<script lang="ts" setup>
import type { EmployeesRecord } from "~/app/pocketbase-types";
import { validateEmployee } from "~/app/modules/employees/validateEmployee";
import { updateEmployee } from "~/app/modules/employees/update";
const step = ref(1);
const items = [
  { title: 'Personal', subtitle: '', isComplete: false },
  // { title: 'ID', subtitle: '', isComplete: false },
  { title: 'Contact', subtitle: '', isComplete: false },
  // { title: 'Qualifications', subtitle: '', isComplete: false },
  { title: 'Employment', subtitle: '', isComplete: false },
  { title: 'Salary', subtitle: '', isComplete: false },
  { title: 'Authentication', subtitle: '', isComplete: false },

];

function next() {
  step.value += 1;
}

function pervious() {
  step.value -= 1;
}

const id = useRoute().params.id;

const employee: Ref<EmployeesRecord | any> = ref({
  basic_salary: 0,
  name: '',
  address: '',
  allowances: [],
  avatar: null,
  birth_date: null,
  deductions: [],
  employment_position: null,
  employment_section: null,
  employment_status: null,
  marital_status: null,
  number_of_children: 0,
  phone_numbers: [],
  qualification: null,
  Sex: null,
  specialization: null,
  starting_date: null,
  roles: [],
  password: null,
  passwordConfirm: null,
  OldPassword: null,
  isNew: false
})


const { loadOneEmployee } = useEmployees();

onMounted(async () => {
  loading.start();
  employee.value = await loadOneEmployee(id.toString());
  loading.end();
});

const isFirstAttempt = ref(true);

const validationErrors = computed(() => {
  return validateEmployee(employee.value, employee.value.oldPassword ? true : false);
});
provide('validationErrors', validationErrors);

function jumpToValidationErrors() {
  if (validationErrors.value.basicSalary.length) {
    step.value = 4;
  }
  if (
    validationErrors.value.employmentStatus.length ||
    validationErrors.value.employmentPosition.length ||
    validationErrors.value.employmentSection.length
  ) {
    step.value = 3;
  }

  if (validationErrors.value.email.length) {
    step.value = 2;
  }
  if (validationErrors.value.name.length) {
    step.value = 1;
  }
}

const backendError = useBackendError();
const loading = useLoading();
async function save() {

  backendError.clear();

  if (useErrors().hasError(validationErrors.value)) {
    jumpToValidationErrors();
    return;
  }

  loading.start()
  const response = await updateEmployee(employee.value);
  loading.end();

  if (response.error) {
    backendError.set(response.error)
    return;
  }

  if (response.model) {
    useRouter().push(`/hr/employees/${response.model.id}`)
    return;
  }


}

</script>

<style></style>