import React, { useState, useEffect } from 'react'
import Loader from 'react-loader-spinner'

import MediaManagementList from '../../../shared/components/MediaManagementList/MediaManagementList'
import { fetchMedias } from '../../../shared/utilities'
import { AdminLayout } from '../../../shared/components'
import { Media } from '../../../models'

const DashboardVideoManage = () => {
    const [medias, setMedias] = useState<Array<Media>>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            try {
                const { data } = await fetchMedias()
                setMedias(data?.listMedia?.items as Array<Media>)
            } catch (error) {
                console.error('admin/manage/index.tsx(fetchMedias):', error)
            }
            setLoading(false)
        })()
    }, [])

    return (
        <AdminLayout>
            {loading ? (
                <Loader
                    type="Bars"
                    color="#FFA41C"
                    height={100}
                    width={100}
                    timeout={3000}
                />
            ) : (
                <MediaManagementList medias={medias} setMedias={setMedias} />
            )}
        </AdminLayout>
    )
}

export default DashboardVideoManage
