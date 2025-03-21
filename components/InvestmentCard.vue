<script setup lang="ts">
	import type { projectListType } from '~/composables/useProjects'
	import { Cop } from '~/util/functions'

	const { project } = defineProps<{
		project: projectListType[0]
	}>()
</script>

<template>
	<div class="rounded-lg border shadow">
		<!-- Header -->
		<div class="flex items-center gap-2 p-4">
			<div
				class="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-gray-300"
			>
				<img src="/img/glamping.jpeg" alt="Logo" class="" />
			</div>
			<div>
				<h2 class="text-xl text-blue-900">{{ project.name }}</h2>
			</div>
		</div>

		<!-- Property Image -->
		<div class="h-52 overflow-hidden">
			<img
				src="/img/glamping.jpeg"
				alt="Property"
				class="h-full w-full object-cover"
			/>
		</div>

		<!-- Investment Details -->
		<div class="p-4">
			<div class="mb-2 flex items-center justify-between">
				<p class="text-sm font-bold">
					{{
						Cop.format(
							Math.round(
								((project.value / project.actions) * project.invertions) /
									1000000
							)
						)
					}}M conseguido
				</p>
				<div class="text-sm text-gray-600">
					<span>Valor. {{ Cop.format(project.value / 1000000) }}M</span>
				</div>
			</div>

			<!-- Progress Bar -->
			<div class="mb-4">
				<div class="h-4 overflow-hidden rounded bg-gray-300">
					<div
						class="h-full bg-blue-600 text-center text-xs text-white"
						:style="{
							width: (project.invertions / project.actions) * 100 + '%',
						}"
					>
						{{ (project.invertions / project.actions) * 100 }}%
					</div>
				</div>
			</div>

			<!-- Rate Information -->

			<div class="m-auto mb-4 w-fit border p-4 text-center shadow-lg">
				<p class="text-sm text-gray-500">Margen renta</p>
				<p class="text-2xl font-bold">
					{{ project.margin.min }}% - {{ project.margin?.max }}%
				</p>
			</div>

			<!-- Investment Terms -->
			<div class="terms-row">
				<div class="min-investment">
					<p class="term-label">Mínimo de inversión:</p>
					<p class="term-value">
						{{ Cop.format(project.value / project.actions) }}
					</p>
				</div>
				<div class="term">
					<p class="term-label">Plazo:</p>
					<p class="term-value">Entre 3 y 19 meses</p>
				</div>
			</div>

			<!-- Action Button -->
			<NuxtLink :to="`/project/${project.id}`">
				<button class="action-button">Ver más</button>
			</NuxtLink>
		</div>
	</div>
</template>

<style scoped>
	.card-container {
		max-width: 360px;
		border-radius: 12px;
		overflow: hidden;
		background-color: white;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			sans-serif;
	}

	.header {
		display: flex;
		padding: 16px;
		align-items: center;
		gap: 12px;
	}

	.logo-container {
		width: 40px;
		height: 40px;
		border-radius: 50%;
		overflow: hidden;
		background-color: #f5f5f5;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.logo {
		width: 24px;
		height: 24px;
		object-fit: contain;
	}

	.title-container {
		flex: 1;
	}

	.title {
		margin: 0;
		font-size: 18px;
		font-weight: 700;
		color: #004d40;
	}

	.subtitle {
		margin: 2px 0;
		font-size: 14px;
		color: #666;
	}

	.location {
		margin: 2px 0;
		font-size: 14px;
		color: #0288d1;
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.location-icon {
		color: #0288d1;
	}

	.debt-banner {
		background-color: #0288d1;
		color: white;
		text-align: center;
		padding: 8px;
		font-weight: 500;
	}

	.image-container {
		position: relative;
		height: 200px;
		overflow: hidden;
	}

	.property-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.badge {
		position: absolute;
		bottom: 12px;
		right: 12px;
		background-color: white;
		color: #333;
		padding: 6px 12px;
		border-radius: 4px;
		font-size: 12px;
		font-weight: 500;
	}

	.investment-details {
		padding: 16px;
	}

	.amount-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 8px;
	}

	.amount-achieved {
		font-weight: 700;
		font-size: 16px;
		margin: 0;
	}

	.min-max {
		display: flex;
		gap: 8px;
		font-size: 12px;
		color: #666;
	}

	.progress-container {
		margin-bottom: 16px;
	}

	.progress-bar {
		height: 4px;
		background-color: #e0e0e0;
		border-radius: 2px;
		overflow: hidden;
	}

	.progress {
		height: 100%;
		background-color: #0288d1;
	}

	.rate-row {
		display: flex;
		justify-content: space-between;
		margin-bottom: 16px;
	}

	.rate-info,
	.evaluation {
		display: flex;
		flex-direction: column;
	}

	.rate-label,
	.eval-label,
	.term-label {
		font-size: 14px;
		color: #666;
		margin: 0 0 4px 0;
	}

	.rate-value {
		font-size: 24px;
		font-weight: 700;
		color: #0288d1;
		margin: 0;
	}

	.eval-value {
		display: flex;
		align-items: center;
		gap: 8px;
	}

	.eval-score {
		font-weight: 600;
	}

	.eval-indicator {
		width: 40px;
		height: 6px;
		background-color: #4caf50;
		border-radius: 3px;
	}

	.terms-row {
		display: flex;
		justify-content: space-between;
		margin-bottom: 16px;
	}

	.term-value {
		font-weight: 600;
		margin: 0;
	}

	.days-left {
		text-align: center;
		color: #f44336;
		font-weight: 500;
		margin: 16px 0;
	}

	.action-button {
		width: 100%;
		background-color: #0288d1;
		color: white;
		border: none;
		border-radius: 4px;
		padding: 12px;
		font-weight: 600;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.action-button:hover {
		background-color: #0277bd;
	}
</style>
