<!-- eslint-disable @stylistic/indent-binary-ops -->
<!-- eslint-disable @stylistic/operator-linebreak -->
<script lang="ts" setup>
	import { ArrowUpRight } from 'lucide-vue-next'
	import Separator from '~/components/ui/separator/Separator.vue'
	import type { Project } from '~/types/projectTypes'
	import { Cop } from '~/util/functions'

	const project = defineModel<Project>()

	const show_gasto_total = ref(false)

	const total_ingreso_min = computed(
		() =>
			project.value?.products.reduce(
				(prev, { value, expected, capacity, units }) => {
					return prev + value.min * expected.min * capacity * units
				},
				0
			) ?? 0
	)

	const total_ingreso_max = computed(
		() =>
			project.value?.products.reduce(
				(prev, { value, expected, capacity, units }) => {
					return prev + value.max * expected.max * capacity * units
				},
				0
			) ?? 0
	)

	const gastos_max = computed(
		() =>
			project.value?.config.gastos.reduce(
				(prev, gasto) => prev + gasto.range.max * total_ingreso_max?.value,
				0
			) ?? 0
	)
	const gastos_min = computed(
		() =>
			project.value?.config.gastos.reduce(
				(prev, gasto) => prev + gasto.range.min * total_ingreso_min.value,
				0
			) ?? 0
	)

	const total_libre_min = computed(
		() => total_ingreso_min.value - gastos_min.value
	)
	const total_libre_max = computed(
		() => total_ingreso_max.value - gastos_max.value
	)
</script>

<template>
	<div v-if="project">
		<h3 class="mb-2 border-b py-2 text-xl font-bold">Proyecciones</h3>
		<div class="grid grid-cols-2 gap-1 lg:grid-cols-4">
			<div class="col-span-2 mb-2 p-4">
				<div
					v-for="product in project.products"
					:key="product.name"
					class="mb-2"
				>
					<h3 class="mb-2 border-b py-2 font-bold">{{ product.name }}</h3>
					<div class="grid grid-cols-2 justify-between gap-2">
						<div>
							<strong>Unidades!</strong>
							<p>
								<input v-model="product.units" type="number" class="w-full" />
							</p>
						</div>
						<div>
							<strong>Precio</strong>
							<p>
								<Currency v-model="product.value.min" />
								<Currency v-model="product.value.max" />
							</p>
						</div>
						<div>
							<strong>Ocupacion</strong>
							<p class="flex items-center justify-between">
								<Percent v-model="product.expected.min" class="text-center" />
								<span>
									<ArrowUpRight />
								</span>
								<Percent v-model="product.expected.max" class="text-center" />
							</p>
						</div>
						<div>
							<strong>Capacidad</strong>
							<p>
								<input
									v-model="product.capacity"
									type="number"
									class="w-full"
								/>
							</p>
						</div>
					</div>
				</div>
				<strong class="inline-block cursor-pointer rounded-lg bg-yellow-200">
					Ingresos totales
				</strong>
				<div class="flex items-center justify-between gap-2">
					<span class="w-40 text-right">
						{{ Cop.format(total_ingreso_min) }}
					</span>
					<ArrowUpRight />
					<span class="w-40 text-right">
						{{ Cop.format(total_ingreso_max) }}
					</span>
				</div>
				<h4 class="mb-2 border-b py-2 font-bold">Gastos</h4>
				<div v-if="show_gasto_total">
					<template v-for="gasto in project.config.gastos" :key="gasto.name">
						<strong class="inline-block">
							<input v-model="gasto.name" type="text" />
						</strong>
						<div class="flex items-center justify-between gap-2">
							<span class="w-40 text-right">
								{{ Cop.format(total_ingreso_min * gasto.range.min) }}
								<Percent v-model="gasto.range.min" class="text-right" />
							</span>
							<ArrowUpRight />
							<span class="w-40 text-right">
								{{ Cop.format(total_ingreso_max * gasto.range.max) }}
								<Percent v-model="gasto.range.max" class="text-right" />
							</span>
						</div>
					</template>
				</div>

				<strong
					class="inline-block cursor-pointer rounded-lg bg-yellow-200"
					@click="show_gasto_total = !show_gasto_total"
				>
					Gasto total
				</strong>
				<div class="flex items-center justify-between gap-2">
					<span class="w-40 text-right">
						{{ Cop.format(gastos_min) }}
					</span>
					<ArrowUpRight />
					<span class="w-40 text-right">
						{{ Cop.format(gastos_max) }}
					</span>
				</div>
			</div>
			<div class="col-span-2">
				<div class="p-4">
					<h4 class="mb-2 border-b py-2 font-bold">Utilidad total</h4>
					<p class="text-2xl">
						{{ Cop.format(total_ingreso_min - gastos_min) }}
					</p>
					<p class="text-2xl">
						{{ Cop.format(total_ingreso_max - gastos_max) }}
					</p>
				</div>
				<div class="p-4">
					<h4 class="mb-2 border-b py-2 font-bold">Utilidad acción</h4>
					<p class="text-2xl">
						{{ Cop.format(total_libre_min / project.actions) }}
						<small>
							({{
								Math.round(((total_libre_min * 100) / project.value) * 100) /
								100
							}}%)
						</small>
					</p>
					<p class="text-2xl">
						{{ Cop.format(total_libre_max / project.actions) }}
						<small>
							({{
								Math.round(((total_libre_max * 100) / project.value) * 100) /
								100
							}}%)
						</small>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
