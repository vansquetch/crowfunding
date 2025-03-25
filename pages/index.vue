<script setup lang="ts">
	import InvestmentCard from '~/components/InvestmentCard.vue'
	import { useProjects } from '~/composables/useProjects'

	const { getProjectList } = useProjects()

	const { data: projects } = useAsyncData('project-list', async () => {
		const { data } = await getProjectList()
		return data
	})
	definePageMeta({
		layout: 'default',
	})
	usePage().setBreadcumbItems([{ title: 'dashboard', href: '#' }], 'Proyectos')
</script>

<template>
	<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
		<InvestmentCard
			v-for="project in projects"
			:key="project.id"
			:project="project"
		/>
	</div>
</template>
