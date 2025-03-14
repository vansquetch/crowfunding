<script setup lang="ts">
	import { ChevronsUpDown, Plus } from 'lucide-vue-next'
	import { Skeleton } from '~/components/ui/skeleton'
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuSeparator,
		DropdownMenuShortcut,
		DropdownMenuTrigger,
	} from '@/components/ui/dropdown-menu'

	import {
		SidebarMenu,
		SidebarMenuButton,
		SidebarMenuItem,
		useSidebar,
	} from '@/components/ui/sidebar'

	const props = defineProps<{
		projects: {
			id: number
			name: string
			relation: string
		}[]
	}>()

	const { isMobile } = useSidebar()
	const client = useSupabaseClient()
	const user = useSupabaseUser()

	const { data: selected_project } = useAsyncData('activeProject', async () => {
		const { data } = await client
			.from('profiles')
			.select('selected_project')
			.eq('id', user.value?.id ?? '')
			.single()
		return data
	})
	const activeProject = ref(
		props.projects.find(
			(project) => project.id == selected_project.value?.selected_project
		)
	)

	const updateActiveProject = async (project: typeof activeProject.value) => {
		activeProject.value = project
		const { error } = await client
			.from('profiles')
			.update({ selected_project: project?.id })
			.eq('id', user.value?.id ?? '')
	}
</script>

<template>
	<SidebarMenu>
		<SidebarMenuItem>
			<ClientOnly>
				<template #fallback>
					<div class="flex items-center space-x-4">
						<Skeleton class="h-8 w-8 rounded-full" />
						<div class="flex-1 space-y-2">
							<Skeleton class="h-12" />
						</div>
					</div>
				</template>
				<DropdownMenu>
					<DropdownMenuTrigger as-child>
						<SidebarMenuButton
							v-if="activeProject"
							size="lg"
							class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div
								class="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
							>
								<!-- <component :is="activeTeam.logo" class="size-4" /> -->
							</div>
							<div class="grid flex-1 text-left text-sm leading-tight">
								<span class="truncate font-semibold">
									{{ activeProject?.name }}
								</span>
								<span class="truncate text-xs">
									{{ activeProject?.relation }}
								</span>
							</div>
							<ChevronsUpDown class="ml-auto" />
						</SidebarMenuButton>
					</DropdownMenuTrigger>
					<DropdownMenuContent
						class="w-[--reka-dropdown-menu-trigger-width] min-w-56 rounded-lg"
						align="start"
						:side="isMobile ? 'bottom' : 'right'"
						:side-offset="4"
					>
						<DropdownMenuLabel class="text-xs text-muted-foreground">
							Teams
						</DropdownMenuLabel>
						<DropdownMenuItem
							v-for="(project, index) in projects"
							:key="project.name"
							class="gap-2 p-2"
							@click="updateActiveProject(project)"
						>
							<div
								class="flex size-6 items-center justify-center rounded-sm border"
							>
								<!-- <component :is="team.logo" class="size-4 shrink-0" /> -->
							</div>
							{{ project.name }}
							<DropdownMenuShortcut>⌘{{ index + 1 }}</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem class="gap-2 p-2">
							<div
								class="flex size-6 items-center justify-center rounded-md border bg-background"
							>
								<Plus class="size-4" />
							</div>
							<div class="font-medium text-muted-foreground">
								Agregar proyecto
							</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</ClientOnly>
		</SidebarMenuItem>
	</SidebarMenu>
</template>
