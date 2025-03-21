<script setup lang="ts">
	import type { Project } from '~/types/projectTypes'

	const route = useRoute()
	const { data: project } = useNuxtData<Project>(
		`project-${route.params.project}`
	)

	usePage().setBreadcumbItems(
		[{ title: 'dashboard', href: '#' }],
		'General de ' + project.value?.name
	)
</script>

<template>
	<div v-if="project" class="grid justify-start gap-2 lg:grid-cols-3">
		<div class="lg:col-span-2">
			<div class="mb-2 rounded border p-2 lg:col-span-2">
				<DashboardProject :data="project" />
			</div>
			<div class="rounded border p-2 lg:col-span-2">
				<DashboardProjection :data="project" />
			</div>
		</div>
		<div class="overflow-hidden rounded border">
			<div class="h-52 overflow-hidden">
				<img src="/img/glamping.jpeg" alt="Logo" class="object-cover" />
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
