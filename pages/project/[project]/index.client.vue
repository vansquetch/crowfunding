<script setup lang="ts">
	import { LoaderIcon } from 'lucide-vue-next'
	import type { Project } from '~/types/projectTypes'

	const { data } = useNuxtData<Project>(`project-data`)
	const { editProject } = useProjects()
	const project = ref<Project | undefined>(data.value)
	const edited = ref(false)
	const editing = ref(false)

	const saveProject = async () => {
		editing.value = true
		if (project.value) await editProject(project.value)
		edited.value = false
		editing.value = false
	}
	watch(
		project,
		() => {
			edited.value = true
		},
		{ deep: true }
	)
	watch(
		() => project.value?.name,
		() => {
			usePage().setBreadcumbItems(
				[{ title: 'dashboard', href: '#' }],
				'General de ' + project.value?.name
			)
		},
		{ immediate: true }
	)
</script>

<template>
	<div v-if="project" class="grid justify-start gap-2 lg:grid-cols-3">
		<div class="lg:col-span-2">
			<div
				v-if="edited"
				class="sticky top-0 mb-2 flex justify-end rounded border border-b bg-background p-2"
			>
				<UiButton :disabled="editing" class="flex" @click="saveProject">
					<LoaderIcon v-if="editing" class="mr-2 animate-spin" />
					<span>Guardar</span>
				</UiButton>
			</div>
			<div class="mb-2 rounded border p-2 lg:col-span-2">
				<DashboardProject v-model="project" />
			</div>
			<div class="rounded border p-2 lg:col-span-2">
				<DashboardProjection v-model="project" />
			</div>
		</div>
		<div class="overflow-hidden rounded border">
			<div class="h-52 overflow-hidden">
				<img
					src="/img/glamping.webp"
					alt="Imagen del proyecto"
					class="object-cover"
				/>
			</div>
			<div class="p-2">
				<DashboardInvertions
					:invertions="project.invertions"
					:actions="project.actions"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
