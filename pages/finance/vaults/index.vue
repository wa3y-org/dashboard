<template>
	<v-card rounded="lg" class="my-4">
		<v-toolbar color="transparent">
			<v-toolbar-title class="font-weight-bold">
				<v-icon>mdi-safe-square-outline</v-icon>
				<span class="mx-2"></span>
				Vaults
			</v-toolbar-title>

		</v-toolbar>
		<v-divider></v-divider>
		<v-card-text>
			<VaultsOrgVault />
			<p class="my-4"></p>
			<!-- <loading-from-backend v-if="loading.isLoading.value" /> -->
			<VaultsProjectVault v-for="project of projectsList" :key="project.id" :project="project" />
		</v-card-text>
	</v-card>
</template>

<script lang="ts" setup>
import type { ProjectsRecord } from '~/app/pocketbase-types';


const loading = useLoading();
const Projects = useProjects();
const backendError = useBackendError();

const projectsList: Ref<ProjectsRecord[]> = ref([]);

async function getAllProjects() {
	loading.start();
	const response = await Projects.getAll();
	loading.end();

	if (response.error) {
		backendError.set(response.error)
		return
	}

	projectsList.value = response.models || [];
}

onMounted(() => {
	getAllProjects();
});
</script>

<style></style>