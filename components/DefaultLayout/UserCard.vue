<template>
  <div class="text-center">
    
    <v-menu v-model="menuModal.isShown.value" :close-on-content-click="false" location="top">
      <template v-slot:activator="{ props }">
        <v-avatar size="large" color="indigo" v-bind="props" class="cursor-pointer">

          <v-img cover :aspect-ratio="1 / 1" :src="avatar"></v-img>

        </v-avatar>
      </template>

      <v-card min-width="300" class="pa-4 my-2" rounded="xl">
        
        <v-list>
          <nuxt-link :to="`/hr/employees/${employee?.id}`">

            <v-list-item :prepend-avatar="avatar" :title="employee?.name" :subtitle="employee?.email" />
          </nuxt-link>
        </v-list>

        <!-- <v-divider></v-divider>

        <v-list>
          <v-list-item>
            My Profile
          </v-list-item>

          <v-list-item>
            Settings
          </v-list-item>
        </v-list>
        <v-divider></v-divider> -->
        <v-card-actions class="pa-2 mt-2">
          <v-btn color="error" block rounded="lg" size="large" @click="doLogout" variant="tonal"
            prepend-icon="mdi-logout mdi-rotate-180">Logout</v-btn>
        </v-card-actions>

      </v-card>
    </v-menu>
  </div>
</template>

<script lang="ts" setup>
import { AuthService } from "@/app/modules/users/services/index";
import type { EmployeesRecord } from "~/app/pocketbase-types";
function doLogout() {
  useLogout().logout();
}

const menuModal = useModal();

const user = computed(() => {
  const user = AuthService.AuthenticatedUser || usePocketBase().authStore.model;

  if (user && !user.id) user.id = usePocketBase().authStore.model?.id;
  if (user && !user.name) user.name = usePocketBase().authStore.model?.name;
  return user;
});

const employee: Ref<EmployeesRecord | null> = ref(null)
const { loading, loadOneEmployee } = useEmployees();

onMounted(async () => {
  employee.value = await loadOneEmployee(user.value?.id.toString());
});

const avatar = computed(() => {
  let image = '';
  if (employee.value?.avatar) {
    image = usePocketBase().files.getUrl(employee.value, employee.value.avatar);
  }
  return image;
});


const currentUser = useCurrentUser();

currentUser.init();

</script>

<style></style>
