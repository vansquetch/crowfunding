<script setup lang="ts">
	useHead({
		titleTemplate: (chunk) =>
			chunk ? `${chunk} - Inversiones` : 'Inversiones',
	})
</script>

<template>
	<NuxtLoadingIndicator />
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
