<template>
  <v-card class="my-4" rounded="lg" :disabled="loading.isLoading.value" :loading="loading.isLoading.value">
    <v-toolbar color="white">
      <v-toolbar-title color="text-primary">
        <v-icon>mdi-account-edit-outline</v-icon>
        <span class="mx-2 font-weight-bold">
          Update member
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      {{ member.name }}
      <span class="text-grey mx-2">
        ({{ member.email }})
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
          <create-member-personal-info v-model="member" />
        </v-stepper-window-item>
        <!-- <v-stepper-window-item :value="2">
          <w-id-info />
        </v-stepper-window-item> -->
        <v-stepper-window-item :value="2">
          <create-member-contact-info v-model="member" />
        </v-stepper-window-item>
        <v-stepper-window-item :value="3">
          <create-member-membership-info v-model="member" />
        </v-stepper-window-item>
        <v-stepper-window-item :value="4">
          <create-member-salary v-model="member" />
        </v-stepper-window-item>
      </v-stepper-window>
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
import type { MembersRecord } from "~/app/pocketbase-types";
import { validateMember } from "~/app/modules/members/validateMember";
import { updateMember } from "~/app/modules/members/update";
const step = ref(1);
const items = [
  { title: 'Personal', subtitle: '', isComplete: false },
  // { title: 'ID', subtitle: '', isComplete: false },
  { title: 'Contact', subtitle: '', isComplete: false },
  // { title: 'Qualifications', subtitle: '', isComplete: false },
  { title: 'Membership', subtitle: '', isComplete: false },
];

function next() {
  step.value += 1;
}

function pervious() {
  step.value -= 1;
}

const id = useRoute().params.id;

const member: Ref<MembersRecord | any> = ref({
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
})


const { loadOneMember } = useMembers();

onMounted(async () => {
  loading.start();
  member.value = await loadOneMember(id.toString());
  loading.end();
});

const isFirstAttempt = ref(true);

const validationErrors = computed(() => {
  return validateMember(member.value);
});
provide('validationErrors', validationErrors);

function jumpToValidationErrors() {
  if (
    validationErrors.value.membership_status.length
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

const loading = useLoading();
async function save() {
  if (useErrors().hasError(validationErrors.value)) {
    jumpToValidationErrors();
    return;
  }

  loading.start()
  const record = await updateMember(member.value);
  loading.end();

  useRouter().push(`/hr/members/${record.id}`)
}

</script>

<style></style>