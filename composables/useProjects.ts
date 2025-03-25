import type { QueryData } from '@supabase/supabase-js'
import type { Database } from '~/types/database.types'
import type {
	configProject,
	minMax,
	productProject,
	Project,
} from '~/types/projectTypes'

export const useProjects = () => {
	const supabase = useSupabaseClient<Database>()
	const user = useSupabaseUser()

	const getProjectList = () => {
		return supabase
			.from('projects')
			.select(
				'id,name, value, actions, invertions, margin, projects_profiles (relation)'
			)
			.eq('projects_profiles.profile_id', user.value?.id ?? '')
	}

	const getProject = (id: string) => {
		return supabase
			.from('projects')
			.select()
			.eq('id', id)
			.single()
			.overrideTypes<{
				config: configProject
				products: productProject[]
				margin: minMax
			}>()
	}

	const editProject = (project: Project) => {
		const { id, ...rest } = project
		return supabase
			.from('projects')
			.update(rest)
			.eq('id', id)
			.overrideTypes<Project>()
	}

	return {
		getProject,
		getProjectList,
		editProject,
	}
}

export type projectListType = QueryData<
	ReturnType<ReturnType<typeof useProjects>['getProjectList']>
>
