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
</script>

<template>
	<div class="grid grid-cols-3 gap-4">
		<InvestmentCard
			v-for="project in projects"
			:key="project.id"
			:project="project"
		/>
	</div>
</template>
