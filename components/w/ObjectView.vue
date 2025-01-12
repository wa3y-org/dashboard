<template>
    <v-dialog scrollable @click:outside="close" :model-value="show" :fullscreen="fullscreen" :overlay="true"
        :max-width="maxWidth">
        <v-card rounded="lg">
            <v-toolbar color="transparent">
                <v-toolbar-title class="font-weight-bold">
                    {{ title }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <NuxtLink target="blank" download :href="getFileUrl(record, filename)">
                    <v-btn color="green" variant="flat" prepend-icon="mdi-link" >Open In New Tab</v-btn>
                </NuxtLink>
                
                <v-btn class="mx-1" color="error" icon="mdi-close" @click="close" />
            </v-toolbar>

            <v-divider></v-divider>
            <v-card-text class="pa-0 ma-0">
                <object style="display: block; min-width: 100%; min-height: 800px;" title="{{bill}}" :data="getFileUrl(record, filename)">Cannot
                    preview the file.</object>
            </v-card-text>
           
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
defineProps({
    filename: {
        type: String,
        required: true
    },
    record: {
        type: Object,
        required: true,
    },
    show: {
        type: Boolean,
        required: true,
    },
    fullscreen: {
        type: Boolean,
        default: false
    },
    maxWidth: {
        type: String,
        default: '1080px'
    },
    title: {
        type: String
    }
})

const emit = defineEmits(['close'])

function close() {
    emit('close')
}

function getFileUrl(record: any, fileName: string) {
    return usePocketBase().files.getUrl(record, fileName);
}
</script>