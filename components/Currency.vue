<script setup lang="ts">
	import {
		useCurrencyInput,
		type CurrencyInputOptions,
	} from 'vue-currency-input'
	import { Input } from './ui/input'

	const props = defineProps<{
		modelValue: number
		options: CurrencyInputOptions
	}>()

	const { formattedValue, inputRef } = useCurrencyInput(props.options)
</script>

<template>
	<Input v-model="inputRef" :value="formattedValue" />
	{{ formattedValue }}
	{{ inputRef }}
</template>
