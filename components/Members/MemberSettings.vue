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
            Removing this member is permanent, you cant undo this command
          </p>
          <v-btn rounded="lg" @click="confirmRemove" color="red" prepend-icon="mdi-delete" variant="outlined"
            size="large">Remove</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { deleteMember } from "@/app/modules/members/delete";
const props = defineProps(['member'])

const remove = useConfirmRemove();
const loading = useLoading();

async function confirmRemove() {
  const isConfirmed = (await remove.confirm()).isConfirmed;
  if (isConfirmed) {
    remove.doRemove(async () => {
      const response = await deleteMember(props.member?.id || '')
      console.log('Deleted: ', response);
      useRouter().replace('/hr/members')
    });
  }
}
</script>

<style></style>