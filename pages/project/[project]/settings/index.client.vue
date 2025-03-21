<script setup lang="ts">
	import type { Project } from '~/types/projectTypes'
	import { Cop } from '~/util/functions'

	const route = useRoute()
	const { data: project } = useNuxtData<Project>(`project-data`)
	const updateProject = async (data) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve('data')
			}, 2000)
		})
	}
	usePage().setBreadcumbItems([{ title: 'config', href: '#' }], 'Proyecto')
</script>

<template>
	<div v-if="project">
		<FormKit
			type="form"
			:value="project"
			submit-label="Actualizar"
			@submit="updateProject"
		>
			<div class="grid grid-cols-3 gap-4">
				<FormKit
					v-model="project.name"
					type="text"
					label="Nombre"
					help="ingresa el nombre de tu proyecto"
					placeholder="Nombre del proyecto"
					validation="required"
					name="name"
					validation-visibility="live"
				/>

				<FormKit
					type="text"
					label="Valor"
					placeholder="Valor del proyecto"
					validation="required"
					name="value"
					help="Ingresa el valor de tu proyecto"
					number
					validation-visibility="live"
				></FormKit>
				<FormKit
					type="text"
					label="Acciones"
					placeholder="Acciones del proyecto"
					validation="required"
					name="actions"
					help="Ingresa las acciones de tu proyecto"
					number
					validation-visibility="live"
				></FormKit>
				<FormKit
					v-model="project.config.gastos[0].name"
					type="text"
					label="Gastos"
					placeholder="Acciones del proyecto"
					validation="required"
					help="Ingresa las acciones de tu proyecto"
					number
					validation-visibility="live"
				></FormKit>
			</div>
		</FormKit>
	</div>
</template>
