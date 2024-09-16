<template>
  <assets-create :show="addAssetModal.isShown.value" @cancel="addAssetModal.hide" @saved="addAssetModal.hide" />
  <assets-update :asset="assetToUpdate" :show="updateAssetModal.isShown.value" @cancel="updateAssetModal.hide"
    @saved="updateAssetModal.hide" />
  <w-html-view-dialog :title="assetDetailsTitle" :show="assetDetailsModal.isShown.value" :html="assetDetailsToShow"
    @close="assetDetailsModal.hide" />
  <div>
    <v-card-actions>
      <span class="font-weight-bold">
        Assets List
      </span>
      <v-spacer></v-spacer>
      <v-btn @click="addAssetModal.show" color="primary" variant="tonal" size="large" rounded="pill" class="px-4">
        <v-icon>mdi-bank-plus</v-icon>
        <span class="mx-2"></span>
        Add Asset
      </v-btn>
    </v-card-actions>
    <div class="my-4"></div>
    <v-data-table :loading="loading.isLoading.value" :headers="headers" :items="assetsList" item-key="id">
      <template v-slot:item.title="{ item }">
        <span class="font-weight-bold">{{ item.title }}</span>
      </template>

      <template v-slot:item.functional_total="{ item }">
        <span class="font-weight-black">{{ item.functional_total }}
          <span class="text-primary mx-4">
            {{ item.unit }}
          </span>
        </span>
      </template>

      <template v-slot:item.broken_total="{ item }">
        <span class="font-weight-bold">
          {{ item.broken_total }}
          <span class="text-primary mx-4">
            {{ item.unit }}
          </span>
        </span>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="my-2">
          <v-btn color="primary" variant="text" icon="mdi-file-document-outline" @click="showAssetDetails(item)" />

          <v-btn class="mx-2" color="info" variant="tonal" icon="mdi-pencil" rounded="lg"
            @click="setAssetToUpdate(item)" />

          <v-btn color="error" variant="text" icon="mdi-delete" @click="confirmRemove(item)"></v-btn>
        </div>

      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts" setup>
import { type TAsset } from "~/composables/assets/index";

const addAssetModal = useModal();

const headers = [
  { key: 'title', title: 'Title' },
  { key: 'functional_total', title: 'Functional' },
  { key: 'broken_total', title: 'Broken' },
  { key: 'actions', title: 'Actions', align: 'end' },
];

const Assets = useAssets();

const assetsList = ref<TAsset[]>([])

const loading = useLoading();
async function loadAllAssets() {

  loading.start();
  const { models } = await Assets.get.all();
  loading.end();

  if (models) {
    assetsList.value = models;
  }

}

onMounted(() => {
  loadAllAssets();
  useNuxtApp().$activeModalsBus.$on('assets:created', loadAllAssets);
  useNuxtApp().$activeModalsBus.$on('assets:updated', loadAllAssets);
  useNuxtApp().$activeModalsBus.$on('assets:removed', loadAllAssets);

});

const updateAssetModal = useModal();
const assetToUpdate = ref<TAsset | null>(null);

function setAssetToUpdate(asset: TAsset) {
  assetToUpdate.value = Object.assign({}, asset);
  updateAssetModal.show();
}

const assetDetailsModal = useModal();
const assetDetailsToShow = ref<string>('');
const assetDetailsTitle = ref<string>('');

function showAssetDetails(asset: TAsset) {
  assetDetailsToShow.value = asset.details || '';
  assetDetailsTitle.value = asset.title || ''
  assetDetailsModal.show();
}

const Remove = useConfirmRemove();
async function confirmRemove(asset: TAsset) {
  const { isConfirmed } = await Remove.confirm();
  if (isConfirmed) {
    await Remove.doRemove(async () => {
      await Assets.remove(asset)
      useNuxtApp().$activeModalsBus.$emit('assets:removed');

    });
  }
}
</script>

<style></style>