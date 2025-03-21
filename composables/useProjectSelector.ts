import type { Database } from '~/types/database.types'
import type {
	configProject,
	Project as ProjectType,
} from '~/types/projectTypes'

export const useProjectSelector = () => {
	const supabase = useSupabaseClient<Database>()
	const user = useSupabaseUser()
	const { data: selected_project } = useNuxtData<number | null>(
		'active_project'
	)

	const getProjectList = async () => {
		const { data } = await supabase
			.from('projects_profiles')
			.select('relation, projects(name,id)')
			.eq('profile_id', user.value?.id ?? '')
		return (
			data?.map(({ relation, projects }) => ({
				relation,
				name: projects.name,
				id: projects.id,
			})) ?? []
		)
	}

	const getActiveProject = async () => {
		const { data } = await supabase
			.from('profiles')
			.select('selected_project')
			.eq('id', user.value?.id ?? '')
			.single()
		return data?.selected_project ?? 0
	}

	const getProject = async () => {
		if (typeof selected_project.value === 'undefined') return null

		const { data } = await supabase
			.from('projects')
			.select()
			.eq('id', selected_project.value ?? 0)
			.single()
			.overrideTypes<{ config: configProject }>()
		return data as ProjectType
	}

	async function setActiveProject(id: number) {
		const { error } = await supabase
			.from('profiles')
			.update({ selected_project: id })
			.eq('id', user.value?.id ?? '')
	}

	return {
		getProject,
		getProjectList,
		getActiveProject,
		setActiveProject,
	}
}
