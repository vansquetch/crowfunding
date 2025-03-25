<script lang="ts" setup>
	import { DonutChart } from '~/components/ui/chart-donut'

	const props = defineProps<{
		invertions: number
		actions: number
	}>()

	const dataChart = ref([
		{
			name: 'Acciones compradas',
			total: props.invertions,
		},

		{
			name: 'Acciones disponibles',
			total: props.actions - props.invertions,
		},
	])
</script>

<template>
	<div>
		<h3 class="mb-2 border-b py-2 text-xl font-bold">Inversiones</h3>
		<div class="mb-4 flex justify-center gap-2 text-center">
			<div>
				<h4 class="mb-2 border-b-2 border-blue-800 py-2 font-bold">Acciones</h4>
				{{ props.actions }}
			</div>
			<div>
				<h4 class="mb-2 border-b-2 border-green-700 py-2 font-bold">
					Invertido
				</h4>
				{{ props.invertions }}
			</div>
		</div>
		<DonutChart
			index="name"
			:category="'total'"
			:data="dataChart"
			:colors="['#32b967', '#32b3b9']"
		/>
	</div>
</template>

<style scoped></style>
