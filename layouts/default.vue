<script setup lang="ts">
	import AppSidebar from '~/components/appsidebar/AppSidebar.vue'
	import {
		Breadcrumb,
		BreadcrumbItem,
		BreadcrumbList,
		BreadcrumbLink,
		BreadcrumbPage,
		BreadcrumbSeparator,
	} from '~/components/ui/breadcrumb'
	import Separator from '~/components/ui/separator/Separator.vue'
	import {
		SidebarInset,
		SidebarProvider,
		SidebarTrigger,
	} from '~/components/ui/sidebar'
	import { Skeleton } from '~/components/ui/skeleton'

	const page = usePage()
</script>

<template>
	<SidebarProvider>
		<AppSidebar />
		<main class="w-full">
			<SidebarInset>
				<header
					class="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12"
				>
					<div class="flex items-center gap-2 px-4">
						<SidebarTrigger class="-ml-1" />
						<Separator orientation="vertical" class="mr-2 h-4" />
						<ClientOnly>
							<template #fallback>
								<div class="flex items-center space-x-4">
									<Skeleton class="h-8 w-20" />
									<Skeleton class="h-8 w-32" />
								</div>
							</template>
							<Breadcrumb>
								<BreadcrumbList v-if="page.breadcrumbItems.value">
									<template
										v-for="item in page.breadcrumbItems.value.subItems"
										:key="item.title"
									>
										<BreadcrumbItem class="hidden md:block">
											<BreadcrumbLink :href="item.href">
												{{ item.title }}
											</BreadcrumbLink>
										</BreadcrumbItem>
										<BreadcrumbSeparator class="hidden md:block" />
									</template>
									<BreadcrumbItem>
										<BreadcrumbPage>
											{{ page.breadcrumbItems.value.page }}
										</BreadcrumbPage>
									</BreadcrumbItem>
								</BreadcrumbList>
							</Breadcrumb>
						</ClientOnly>
					</div>
				</header>
				<div class="flex flex-1 flex-col gap-4 p-4 pt-0">
					<slot />
				</div>
			</SidebarInset>
		</main>
	</SidebarProvider>
</template>

<style scoped></style>
