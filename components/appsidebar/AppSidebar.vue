<script setup lang="ts">
	import {
		GalleryVerticalEnd,
		Settings2,
		SquareTerminal,
	} from 'lucide-vue-next'

	import NavMain from './NavMain.vue'
	import NavUser from './NavUser.vue'
	import ProjectSwitcher from './ProjectSwitcher.vue'
	import type { SidebarProps } from '~/components/ui/sidebar'
	import type { Database } from '~/types/database.types'

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

	const supabase = useSupabaseClient<Database>()
	const user = useSupabaseUser()
	const { data: projects } = await useAsyncData(async () => {
		const { data } = await supabase
			.from('projects_profiles')
			.select('relation, projects(name,id)')
			.eq('profile_id', user.value?.id ?? '')
		return data
	})
	// This is sample data.
	const data = {
		user: {
			name: 'Santiago Marchena',
			email: 'vansquetch@gmail.com',
			avatar: null,
		},
		projects: projects.value?.map(({ relation, projects }) => ({
			relation,
			name: projects.name,
			id: projects.id,
		})),
		navMain: [
			{
				title: 'Dashboard',
				url: 'dashboard',
				icon: SquareTerminal,
				isActive: true,
				items: [
					{
						title: 'General',
						url: 'dashboard',
					},
					{
						title: 'Inversores',
						url: '#',
					},
				],
			},
			{
				title: 'Configuración',
				url: '#',
				icon: Settings2,
				items: [
					{
						title: 'Proyecto',
						url: '#',
					},
				],
			},
		],
	}
</script>

<template>
	<Sidebar v-bind="props" variant="inset">
		<SidebarHeader v-if="data.projects">
			<ProjectSwitcher :projects="data.projects" />
		</SidebarHeader>
		<SidebarContent>
			<NavMain :items="data.navMain" />
		</SidebarContent>
		<SidebarFooter>
			<NavUser :user="data.user" />
		</SidebarFooter>
		<SidebarRail />
	</Sidebar>
</template>
