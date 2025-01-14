<template>

  <v-dialog :model-value="show" scrollable persistent transition="dialog-transition">
    <w-object-view :title="attachmentToView || ''" :show="objectViewModal.isShown.value" @close="objectViewModal.hide"
      :filename="attachmentToView || ''" :record="resource" />
    <v-card rounded="xl" :loading="loading.isLoading.value" :disabled="loading.isLoading.value">
      <v-toolbar>
        <v-toolbar-title class="font-weight-bold">
          Update Resource
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="error" icon="mdi-close" @click="cancel" />
      </v-toolbar>
      <v-divider></v-divider>
      <v-card-text>
        <v-row>
          <v-col>
            <text-field :errors="validationErrors.title" v-model="resourceData.title" name="Title"
              placeholder="Enter Article Title" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <textarea-field rows="3" :errors="validationErrors.embed_script" v-model="resourceData.embed_script"
              name="Embed" placeholder="<embed script />" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <text-editor :errors="validationErrors.full_text" v-model="resourceData.full_text" name="Post"
              placeholder="Enter Post Full Text" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <select-field :multiple="true" :items="['videos', 'podcasts', 'books', 'reports', 'others']"
              :errors="validationErrors.tags" v-model="resourceData.tags" name="Tags" placeholder="Select Tags" />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>Attachments ({{ resourceData.attachments.length || 0 }})</p>
            <div v-for="(attachment, index) in resourceData.attachments" :key="index + attachment">
              <v-btn variant="text" color="blue" class="capitalized-text" link
                @click="showAttachmentPreview(attachment)">
                {{ index + 1 }}. {{ attachment }}
              </v-btn>
              <v-btn icon="mdi-close" color="red" variant="text" @click="confirmRemoveAttachment(attachment)"></v-btn>
            </div>
            <div>
              <v-file-input @change="uploadAttachments" v-show="false" ref="attachmentsFilePicker" v-model="attachmentsToUpload"
                label="Select Bills" multiple min-width="500px" />
              <v-btn rounded="pill" prepend-icon="mdi-upload" color="blue" :loading="loading.isLoading.value"
                :disabled="loading.isLoading.value" @click="openAttachmentsFilePicker">
                Upload Attachments
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
      <div v-if="backendError.error && backendError.hasError" class="my-4">
        <v-divider class="my-4"></v-divider>
        <BackendErrorWrapper class="ma-4" type="error" :backend-error="backendError.error"
          v-if="backendError.hasError" />
      </div>
      <v-divider></v-divider>
      <v-card-actions class="pa-4">
        <v-alert type="error" :value="true" variant="text" v-if="Errors.hasError(validationErrors)">
          Input Validation Error
        </v-alert>
        <v-spacer></v-spacer>
        <SaveCancelBtn :loading="loading.isLoading.value" @cancel="cancel" @save="save" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const required = true;
const props = defineProps({
  resource: { required, type: Object },
  show: { required, type: Boolean }
})

const emit = defineEmits(['cancel', 'saved']);
function cancel() {
  emit('cancel')
}

const resourceData = ref({
  title: '',
  embed_script: '',
  full_text: '',
  attachments: [],
  tags: [],
})

watch(() => props.show, () => {
  resourceData.value = {
    title: props.resource?.title || '',
    embed_script: props.resource?.embed_script || '',
    full_text: props.resource?.full_text || '',
    attachments: props.resource?.attachments || [],
    tags: props.resource?.tags || [],
  }
}, { deep: true });


const WebsiteResourcesController = useWebResources();

const Errors = useErrors();
const isFirstAttempt = ref(true)
const validationErrors = computed<{ [key: string | number | symbol]: any }>(() => {
  if (isFirstAttempt.value) return {};
  return WebsiteResourcesController.validate(resourceData.value)
});

const loading = useLoading();
const backendError = useBackendError();
async function save() {

  isFirstAttempt.value = false;
  backendError.clear();
  if (Errors.hasError(validationErrors.value)) {
    return;
  }

  loading.start();
  const response = await WebsiteResourcesController.update(Object.assign({ id: props.resource?.id || '' }, resourceData.value))
  loading.end();



  if (response.error) {

    backendError.set(response.error)
    return;
  }

  if (response.model) {
    isFirstAttempt.value = true;
    resourceData.value = {
      title: '',
      embed_script: '',
      full_text: '',
      attachments: [],
      tags: [],
    }
    useNuxtApp().$activeModalsBus.$emit('website:resources:updated')
    emit('saved')
  }
}



const objectViewModal = useModal();
const attachmentToView = ref<string | null>(null)
function showAttachmentPreview(attachment: string) {
  attachmentToView.value = attachment;
  objectViewModal.show();
}

const Remove = useConfirmRemove();
async function confirmRemoveAttachment(attachment: string) {
  const { isConfirmed } = await Remove.confirm();
  if (isConfirmed) {
    await Remove.doRemove(async () => {
      WebsiteResourcesController.attachments.remove(props.resource, attachment);
    });
    useNuxtApp().$activeModalsBus.$emit('website:resources:updated');
    resourceData.value.attachments.splice(resourceData.value.attachments.indexOf(attachment), 1);
  }
}

const attachmentsToUpload = ref([]);

const attachmentsFilePicker: Ref<HTMLElement | null> = ref(null);
function openAttachmentsFilePicker() {
  if (attachmentsFilePicker.value) {
    attachmentsFilePicker.value.click();
  }
}

async function uploadAttachments() {
  if (!attachmentsToUpload.value.length) return;

  backendError.clear();
  loading.start();
  const response = await WebsiteResourcesController.update(Object.assign({ id: props.resource?.id, 'attachments+': attachmentsToUpload.value },));
  loading.end();

  useNuxtApp().$activeModalsBus.$emit('website:resources:updated');


  if (response.error) {
    backendError.set(response.error)
    return;
  }

  if (response.model) {
    resourceData.value.attachments = [];
    for (let attachment of response.model.attachments) {
      resourceData.value.attachments.push(attachment)
    }
  }

  attachmentsToUpload.value = []
}
</script>