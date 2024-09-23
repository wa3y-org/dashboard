<template>
  <div>
    <v-divider color="error" class="my-4"></v-divider>

    <p class="text-error text-h6 font-weight-bold">
      Danger Zone
    </p>
    <div class="ma-4 border rounded-lg">
      <div class="py-4">
        <p class="px-4 text-red text-h6 font-weight-bold">
          Remove
        </p>
        <v-divider class="my-3"></v-divider>
        <div class="px-4">
          <p class="my-4">
            Removing this volunteer is permanent, you cant undo this command
          </p>
          <v-btn rounded="lg" @click="confirmRemove" color="red" prepend-icon="mdi-delete" variant="outlined"
            size="large">Remove</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { deleteVolunteer } from "@/app/modules/volunteers/delete";
const props = defineProps(['volunteer'])

const remove = useConfirmRemove();
const loading = useLoading();

async function confirmRemove() {
  const isConfirmed = (await remove.confirm()).isConfirmed;
  if (isConfirmed) {
    remove.doRemove(async () => {
      const response = await deleteVolunteer(props.volunteer?.id || '')
      console.log('Deleted: ', response);
      useRouter().replace('/hr/volunteers')
    });
  }
}
</script>

<style></style>