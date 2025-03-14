<script lang="ts" setup>
	import type { Project } from '~/types/projectTypes'
	import { Cop } from '~/util/functions'

	const { data } = defineProps<{ data: Project }>()
</script>

<template>
	<div>
		<template v-if="data">
			<h3 class="mb-2 border-b py-2 text-xl font-bold">
				Proyecto: {{ data.name }}
			</h3>
			<div
				class="grid grid-cols-3 items-center justify-start gap-2 divide-x text-center"
			>
				<div class="p-4">
					<h4 class="mb-2 border-b py-2 font-bold">Valor proyecto</h4>
					<p class="text-2xl">{{ Cop.format(data.value) }}</p>
				</div>
				<div class="p-4">
					<h4 class="mb-2 border-b py-2 font-bold">Administración</h4>
					<p class="text-2xl">{{ Cop.format(data.admin) }}</p>
				</div>
				<div class="p-4">
					<h4 class="mb-2 border-b py-2 font-bold">Construcción</h4>
					<p class="text-2xl">{{ Cop.format(data.construction) }}</p>
				</div>
				<div class="p-4">
					<h4 class="mb-2 border-b py-2 font-bold">Unidades</h4>
					<p class="text-2xl">{{ data.units }}</p>
				</div>
				<div class="p-4">
					<h4 class="mb-2 border-b py-2 font-bold">Acciones</h4>
					<p class="text-2xl">{{ data.actions }}</p>
				</div>
				<div class="p-4">
					<h4 class="mb-2 border-b py-2 font-bold">Valor Acción</h4>
					<p class="text-2xl">{{ Cop.format(data.value / data.actions) }}</p>
				</div>
			</div>
		</template>
	</div>
</template>
