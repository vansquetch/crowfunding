<script setup lang="ts">
	useHead({
		titleTemplate: (chunk) =>
			chunk ? `${chunk} - Inversiones` : 'Inversiones',
	})
</script>

<template class="dark">
	<NuxtLoadingIndicator />
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
