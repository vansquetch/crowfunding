<script setup lang="ts">
	import { useStorage } from '@vueuse/core'
	import type { Database, Tables } from '~/types/database.types'
	import type {
		configProject,
		Project as ProjectType,
	} from '~/types/projectTypes'

	const supabase = useSupabaseClient<Database>()
	const { data: project } = await useAsyncData('projects', async () => {
		const { data } = await supabase
			.from('projects')
			.select()
			.eq('id', 1)
			.single()
			.overrideTypes<{ config: configProject }>()
		return data as ProjectType
	})

	usePageStore().setBreadcumbItems(
		[{ title: 'dashboard', href: '#' }],
		'General de ' + project.value?.name
	)
</script>

<template>
	<div v-if="project" class="grid grid-cols-3 gap-2">
		<div class="col-span-2 rounded border p-2">
			<DashboardProject :data="project" />
		</div>
		<div class="row-span-2 rounded border p-2">
			<DashboardInvertions
				:invertions="project.invertions"
				:reservations="project.reservations"
				:actions="project.actions"
			/>
		</div>
		<div class="col-span-2 rounded border p-2">
			<DashboardProjection :data="project" />
		</div>
	</div>
</template>

<style scoped></style>
