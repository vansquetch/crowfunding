<script setup lang="ts">
	import { ChevronsUpDown } from 'lucide-vue-next'
	import { Skeleton } from '~/components/ui/skeleton'

	import {
		SidebarMenu,
		SidebarMenuButton,
		SidebarMenuItem,
	} from '@/components/ui/sidebar'
	import type { Project } from '~/types/projectTypes'

	const { project } = defineProps<{
		project: Project
	}>()
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
				<NuxtLink to="/">
					<SidebarMenuButton
						v-if="project"
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
								{{ project.name }}
							</span>
							<span class="truncate text-xs">
								<!-- {{ project?.relation }} -->
							</span>
						</div>
						<ChevronsUpDown class="ml-auto" />
					</SidebarMenuButton>
				</NuxtLink>
			</ClientOnly>
		</SidebarMenuItem>
	</SidebarMenu>
</template>
