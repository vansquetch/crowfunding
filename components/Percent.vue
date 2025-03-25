<script setup lang="ts">
	import AutoNumeric from 'autonumeric'

	const valueEl = defineModel<number>()
	const element = useTemplateRef('numeric')
	const value = ref((valueEl.value ?? 0) * 100)

	onMounted(() => {
		const autoNumeric = new AutoNumeric(element.value ?? '', {
			decimalCharacter: ',',
			digitGroupSeparator: '',
			decimalPlaces: 1,
			emptyInputBehavior: 'zero',
			currencySymbol: '%',
			currencySymbolPlacement: 's',
			minimumValue: '0',
			maximumValue: '100',
		})
		watch(value, () => {
			valueEl.value = (autoNumeric.getNumber() ?? 0) / 100
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
