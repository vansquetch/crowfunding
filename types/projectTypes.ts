import type { Tables } from './database.types'

export type minMax = {
	min: number
	max: number
}

export interface configProject {
	gastos: {
		name: string
		range: minMax
	}[]
}
export interface productProject {
	name: string
	units: number
	value: minMax
	capacity: number
	expected: minMax
}

export interface Project
	extends Omit<Tables<'projects'>, 'config' | 'products' | 'margin'> {
	config: configProject
	products: productProject[]
	margin: minMax
}
