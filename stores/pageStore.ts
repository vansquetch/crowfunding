import { defineStore } from 'pinia'

interface BreadcrumbItem {
    subItems: { title: string, href: string }[]
    page: string
}

export const usePageStore = defineStore('page-store', () => {
    const breadcrumbItems = ref<BreadcrumbItem>({
        subItems: [],
		page: '',
    })

    const setBreadcumbItems = (breadcumb: BreadcrumbItem['subItems'], page: string) => {
        breadcrumbItems.value.subItems = breadcumb
        breadcrumbItems.value.page = page
    }
    return { setBreadcumbItems, breadcrumbItems }
})
