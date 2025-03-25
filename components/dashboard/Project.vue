<script lang="ts" setup>
	import type { Project } from '~/types/projectTypes'
	import { Cop } from '~/util/functions'

	const project = defineModel<Project>()
</script>

<template>
	<div>
		<template v-if="project">
			<h3 class="mb-2 border-b py-2 text-xl font-bold">
				Proyecto:
				<input v-model="project.name" type="text" />
			</h3>
			<div
				class="grid items-center justify-center gap-2 text-center md:grid-cols-3 md:divide-x"
			>
				<div class="p-4">
					<h4 class="mb-2 border-b py-2 font-bold">Valor</h4>
					<p class="text-2xl">
						<Currency v-model="project.value" class="text-center" />
					</p>
				</div>

				<div class="p-4">
					<h4 class="mb-2 border-b py-2 font-bold">Acciones</h4>
					<p class="text-2xl">
						<input
							v-model="project.actions"
							type="number"
							class="w-full text-center"
						/>
					</p>
				</div>
				<div class="p-4">
					<h4 class="mb-2 border-b py-2 font-bold">Valor Acción</h4>
					<p class="text-2xl">
						{{ Cop.format(project.value / project.actions) }}
					</p>
				</div>
			</div>
		</template>
	</div>
</template>
