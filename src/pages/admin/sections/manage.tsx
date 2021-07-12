import React, { useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'

import { fetchSections } from '../../../shared/utilities'
import { AdminLayout } from '../../../shared/components'
import SectionsManagementList from '../../../shared/components/SectionsManagementList/SectionsManagementList'
import { Section } from '../../../models'

const SectionManage = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [sections, setSections] = useState<Array<Section>>([])

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            try {
                const { data } = await fetchSections()
                setSections(data?.listSections?.items as Array<Section>)
            } catch (error) {
                console.error('SectionManage.tsx ', error)
            }
            setLoading(false)
        })()
    }, [])

    return (
        <AdminLayout>
            <h1>Manage sections</h1>
            {loading ? (
                <Loader
                    type="Bars"
                    color="#FFA41C"
                    height={100}
                    width={100}
                    timeout={3000}
                />
            ) : (
                <SectionsManagementList sections={sections} />
            )}
        </AdminLayout>
    )
}

export default SectionManage
