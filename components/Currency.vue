<script setup lang="ts">
	import AutoNumeric from 'autonumeric'

	const valueEl = defineModel<number>()
	const element = useTemplateRef('numeric')
	const value = ref(valueEl.value)

	onMounted(() => {
		const autoNumeric = new AutoNumeric(element.value ?? '', {
			decimalCharacter: ',',
			digitGroupSeparator: '.',
			decimalPlaces: 0,
			emptyInputBehavior: 'zero',
			currencySymbol: '$',
		})
		watch(value, () => {
			valueEl.value = autoNumeric.getNumber() ?? 0
		})
	})
</script>

<template>
	<input
		ref="numeric"
		v-model="value"
		type="text"
		class="w-full bg-transparent"
	/>
</template>

<style scoped></style>
