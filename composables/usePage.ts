interface BreadcrumbItem {
    subItems: { title: string, href: string }[]
    page: string
}

export const usePage = () => {
    const breadcrumbItems = useState<BreadcrumbItem>('breadcrumbItems', () => ({
        subItems: [],
        page: '',
    }))

    const setBreadcumbItems = (breadcumb: BreadcrumbItem['subItems'], page: string) => {
        breadcrumbItems.value.subItems = breadcumb
        breadcrumbItems.value.page = page
    }
    return { setBreadcumbItems, breadcrumbItems }
}
