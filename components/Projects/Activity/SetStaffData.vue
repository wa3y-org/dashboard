<template>
  <v-card-text style="min-height: 400px;">
    <v-row class="mt-3">
      <v-col>
        <text-field :errors="validationErrors.position" v-model="staff.position" name="Position"
          placeholder="Enter staff member position" />

      </v-col>
      <v-col cols="3">
        <SelectField :props="{
          clearable: true
        }" v-model="staff.type" name="select type" :items="['employee', 'member']" :errors="validationErrors.type" />
      </v-col>
    </v-row>

    <v-row class="my-4 ">
      <v-col>
        <div v-if="!staff.type"
          class="pa-4 text-end text-red-lighten-3 border border-dashed border-lg border-error rounded-lg font-weight-black">
          To select Member : Select Staff Member type (employee - organization's member)
          <v-icon>mdi-arrow-up</v-icon>
        </div>
        <w-select-employee :errors="validationErrors.person" v-if="staff.type == 'employee'" v-model="staff.person"
          placeholder="Select Employee" />
        <w-select-member :errors="validationErrors.person" v-if="staff.type == 'member'" v-model="staff.person"
          placeholder="Select Staff" />

      </v-col>
    </v-row>
    <textarea-field :errors="validationErrors.description" v-model="staff.description" name="Job Description"
      placeholder="Explain Tasks" />


  </v-card-text>
</template>

<script lang="ts" setup>
const props = defineProps(['staff', 'isFirstAttempt'])

const Staff = useStaff();

watch(() => props.staff.type, () => {
  if (props.staff) {
    props.staff.person = null;
  }
})

const validationErrors = computed(() => {
  if (props.isFirstAttempt) return {}
  return Staff.validate(props.staff)
});

</script>

<style></style>