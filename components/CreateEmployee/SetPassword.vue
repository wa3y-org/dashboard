<template>
  <div class="ma-4 border-lg border-black rounded-lg">
    <v-expansion-panels v-if="updateMode">
      <v-expansion-panel>
        <v-expansion-panel-title>
          <div class="pa-2 font-weight-bold">
            <v-icon>mdi-form-textbox-password</v-icon>
            Change Password
          </div>
        </v-expansion-panel-title>
        <v-divider></v-divider>
        <v-expansion-panel-text>
          <v-row>
            <v-col>
              <PasswordField v-model="employee.oldPassword" :errors="validationErrors.oldPassword" name="Old Password"
                placeholder="Enter Login Password" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <PasswordField v-model="employee.password" :errors="validationErrors.password" name="Password"
                placeholder="Enter New Login Password" />
            </v-col>
            <v-col>
              <PasswordField v-model="employee.passwordConfirm" :errors="validationErrors.passwordConfirm"
                name="Confirm Password" placeholder="Enter New Login Password Again" />
            </v-col>
          </v-row>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <div v-else>

      <div class="pa-4 font-weight-bold">
        <v-icon>mdi-form-textbox-password</v-icon>
        <span class="mx-2"></span>
        <span v-if="updateMode">
          Change Password
        </span>
        <span v-else>
          Create Password
        </span>
      </div>
      <v-divider></v-divider>
      <div class="pa-4">

        <v-row>
          <v-col>
            <PasswordField v-model="employee.password" :errors="validationErrors.password" name="Password"
              placeholder="Enter New Login Password" />
          </v-col>
          <v-col>
            <PasswordField v-model="employee.passwordConfirm" :errors="validationErrors.passwordConfirm"
              name="Confirm Password" placeholder="Enter New Login Password Again" />
          </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { EmployeesRecord } from "~/app/pocketbase-types";

const employee = defineModel<EmployeesRecord>({ required: true })

const validationErrors = inject('validationErrors')

const props = defineProps(['updateMode'])

</script>

<style></style>