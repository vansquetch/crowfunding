import type { Tables } from './database.types'

export type minMax = {
    min: number
    max: number
}

export interface configProject {
    gastos: { name: string, range: minMax }[]
}

export interface Project extends Omit<Tables<'projects'>, 'config' | 'month_expected_rent' | 'unit_value'> {
    month_expected_rent: minMax
    unit_value: minMax
    config: configProject
}
