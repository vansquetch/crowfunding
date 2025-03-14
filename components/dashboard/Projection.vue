<!-- eslint-disable @stylistic/operator-linebreak -->
<script lang="ts" setup>
	import { ArrowUpRight } from 'lucide-vue-next'
	import Separator from '~/components/ui/separator/Separator.vue'
	import type { Project } from '~/types/projectTypes'
	import { Cop } from '~/util/functions'

	const { data } = defineProps<{
		data: Project
	}>()

	const rent_month_min = data.unit_value.min * data.month_expected_rent.min
	const rent_month_max = data.unit_value.max * data.month_expected_rent.max
	const rent_month_min_total = rent_month_min * data.units
	const rent_month_max_total = rent_month_max * data.units
	const total_libre_min =
		rent_month_min_total -
		data.config?.gastos.reduce(
			(prev, curr) => prev + rent_month_min_total * curr.range.min,
			0
		)
	const total_libre_max =
		rent_month_max_total -
		data.config?.gastos.reduce(
			(prev, curr) => prev + rent_month_max_total * curr.range.max,
			0
		)
</script>

<template>
	<div>
		<h3 class="mb-2 border-b py-2 text-xl font-bold">Proyecciones mensuales</h3>
		<div class="grid grid-cols-4 gap-2">
			<div class="col-span-2 p-4">
				<h4 class="mb-2 border-b py-2 font-bold">Valor unidad</h4>
				<div class="flex items-center justify-start gap-2">
					<span>{{ Cop.format(data.unit_value.min) }}</span>
					<ArrowUpRight />
					<span>{{ Cop.format(data.unit_value.max) }}</span>
				</div>
			</div>

			<div class="col-span-2 p-4">
				<h4 class="mb-2 border-b py-2 font-bold">Renta mensual</h4>
				<div class="flex items-center justify-start gap-2">
					<span>{{ Cop.format(rent_month_min) }}</span>
					<ArrowUpRight />
					<span>{{ Cop.format(rent_month_max) }}</span>
				</div>
			</div>

			<div class="col-span-2 p-4">
				<h4 class="mb-2 border-b py-2 font-bold">Rentas mes</h4>
				<div class="flex items-center justify-start gap-2">
					<span>{{ data.month_expected_rent.min }}</span>
					<ArrowUpRight />
					<span>{{ data.month_expected_rent.max }}</span>
				</div>
			</div>

			<div class="col-span-2 p-4">
				<h4 class="mb-2 border-b py-2 font-bold">
					Total
					<small>(x{{ data.units }} Unidades)</small>
				</h4>
				<div class="flex items-center justify-start gap-2">
					<span>{{ Cop.format(rent_month_min_total) }}</span>
					<ArrowUpRight />
					<span>{{ Cop.format(rent_month_max_total) }}</span>
				</div>
			</div>

			<div class="col-span-3 p-4">
				<h4 class="mb-2 border-b py-2 font-bold">Gastos</h4>
				<div class="grid grid-cols-2 gap-2 text-left">
					<template v-for="gasto in data.config.gastos" :key="gasto.name">
						<strong>{{ gasto.name }}:</strong>
						<span class="flex items-center gap-2">
							<span>
								{{ Cop.format(rent_month_min_total * gasto.range.min) }}
							</span>
							<ArrowUpRight />
							<span>
								{{ Cop.format(rent_month_max_total * gasto.range.max) }}
							</span>
						</span>
					</template>
					<Separator class="col-span-2" />
					<strong>Total:</strong>
					<span class="flex items-center gap-2">
						<span>{{ Cop.format(total_libre_min) }}</span>
						<ArrowUpRight />
						<span>{{ Cop.format(total_libre_max) }}</span>
					</span>
				</div>
			</div>
			<div class="p-4">
				<h4 class="mb-2 border-b py-2 font-bold">Utilidad acción</h4>
				<p class="text-2xl">
					{{ Cop.format(total_libre_min / data.actions) }}
					<small>
						({{ Math.round((total_libre_min / data.value) * 1000) / 100 }}%)
					</small>
				</p>
				<p class="text-2xl">
					{{ Cop.format(total_libre_max / data.actions) }}
					<small>
						({{ Math.round((total_libre_max / data.value) * 1000) / 100 }}%)
					</small>
				</p>
			</div>
		</div>
	</div>
</template>
