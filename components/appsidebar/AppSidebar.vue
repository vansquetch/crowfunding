<script setup lang="ts">
	import NavMain from './NavMain.vue'
	import NavUser from './NavUser.vue'
	import ProjectSwitcher from './ProjectSwitcher.vue'
	import type { SidebarProps } from '~/components/ui/sidebar'

	import {
		Sidebar,
		SidebarContent,
		SidebarFooter,
		SidebarHeader,
		SidebarRail,
	} from '~/components/ui/sidebar'

	const props = withDefaults(defineProps<SidebarProps>(), {
		collapsible: 'icon',
	})

	const { getProject } = useProjects()
	const route = useRoute()
	const { data: project, execute } = await useAsyncData(
		`project-data`,
		async () => {
			if (!route.params.project) return null
			const { data } = await getProject((route.params.project ?? '') as string)
			return data
		}
	)
	watch(route, async () => {
		execute()
	})
</script>

<template>
	<Sidebar v-bind="props" variant="inset">
		<SidebarHeader>
			<ProjectSwitcher v-if="project" :project="project" />
		</SidebarHeader>
		<SidebarContent>
			<NavMain v-if="project" />
		</SidebarContent>
		<SidebarFooter>
			<NavUser />
		</SidebarFooter>
		<SidebarRail />
	</Sidebar>
</template>
