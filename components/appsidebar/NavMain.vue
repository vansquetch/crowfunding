<script setup lang="ts">
	import {
		Settings2,
		SquareTerminal,
	} from 'lucide-vue-next'
	import { ChevronRight, type LucideIcon } from 'lucide-vue-next'
	import {
		Collapsible,
		CollapsibleContent,
		CollapsibleTrigger,
	} from '~/components/ui/collapsible'
	import {
		SidebarGroup,
		SidebarGroupLabel,
		SidebarMenu,
		SidebarMenuButton,
		SidebarMenuItem,
		SidebarMenuSub,
		SidebarMenuSubButton,
		SidebarMenuSubItem,
	} from '@/components/ui/sidebar'

	const route = useRoute()
	const items: {
		title: string
		url: string
		icon?: LucideIcon
		isActive?: boolean
		items?: {
			title: string
			url: string
		}[]
	}[] = [
		{
			title: 'Dashboard',
			url: 'dashboard',
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: 'General',
					url: '/project/' + route.params.project,
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
					url: '/project/' + route.params.project + '/settings',
				},
			],
		},
	]
</script>

<template>
	<SidebarGroup>
		<SidebarGroupLabel>Platform</SidebarGroupLabel>
		<SidebarMenu>
			<Collapsible
				v-for="item in items"
				:key="item.title"
				as-child
				:default-open="item.isActive"
				class="group/collapsible"
			>
				<SidebarMenuItem>
					<CollapsibleTrigger as-child>
						<SidebarMenuButton :tooltip="item.title">
							<component :is="item.icon" v-if="item.icon" />
							<span>{{ item.title }}</span>
							<ChevronRight
								class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
							/>
						</SidebarMenuButton>
					</CollapsibleTrigger>
					<CollapsibleContent>
						<SidebarMenuSub>
							<SidebarMenuSubItem
								v-for="subItem in item.items"
								:key="subItem.title"
							>
								<SidebarMenuSubButton as-child>
									<NuxtLink :href="subItem.url">
										<span>{{ subItem.title }}</span>
									</NuxtLink>
								</SidebarMenuSubButton>
							</SidebarMenuSubItem>
						</SidebarMenuSub>
					</CollapsibleContent>
				</SidebarMenuItem>
			</Collapsible>
		</SidebarMenu>
	</SidebarGroup>
</template>
