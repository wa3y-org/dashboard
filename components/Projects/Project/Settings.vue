<template>
  <div>
    <div class="">
      <div class="pa-0 font-weight-bold text-primary border-lg border-info rounded-pill overflow-hidden">
        <v-tabs hide-slider bg-color="" grow size="large" center-active class="pa-0 ma-0 w-100" v-model="tab">
          <v-tab color="blue" size="large" value="financial_comity" rounded="pill" :variant="tab == 'financial_comity' ? 'flat' : 'text'">
            Financial Comity
          </v-tab>
          <v-tab color="indigo" size="large" value="purchases_comity" rounded="pill"
            :variant="tab == 'purchases_comity' ? 'flat' : 'text'">
            Purchases Comity
          </v-tab>
          <v-tab color="error" size="large" value="danger_zone" rounded="pill"
            :variant="tab == 'danger_zone' ? 'flat' : 'text'">
            Danger zone
          </v-tab>
        </v-tabs>
      </div>

      <v-divider color=" primary" vertical class=""></v-divider>
      <div class="w-100 pl-4">
        <v-window v-model="tab" class="pa-0 h-100" style="min-height: 500px;">
          <v-window-item transition="" value="financial_comity">
            <projects-project-financial-commity :project="project" />
          </v-window-item>
          <v-window-item transition="" value="purchases_comity">
            <projects-project-purchases-comity :project="project" />

          </v-window-item>
          <v-window-item transition="" value="danger_zone">
            <div class="pa-4">

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
                      Removing this Project is permanent, you cant undo this command
                    </p>
                    <v-btn rounded="lg" @click="confirmRemove" color="red" prepend-icon="mdi-delete" variant="outlined"
                      size="large">Remove</v-btn>
                  </div>
                </div>
              </div>
            </div>
          </v-window-item>
        </v-window>
      </div>
    </div>
  </div>


</template>

<script lang="ts" setup>

const props = defineProps(['project'])

const tab = ref(null)

const remove = useConfirmRemove();
const loading = useLoading();

async function confirmRemove() {
  const isConfirmed = (await remove.confirm()).isConfirmed;
  if (isConfirmed) {
    remove.doRemove(async () => {
      console.log(props.project)
      const response = await useProjects().remove(props.project?.id || '');
      if (response.error) {
        return
      }
      useRouter().replace('/projects')
    });
  }
}
</script>

<style></style>