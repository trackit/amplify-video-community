import React, { useState, useEffect } from 'react'
import Loader from 'react-loader-spinner'

import AssetsManagementList from '../../../shared/components/AssetsManagementList/AssetsManagementList'
import { fetchVodFiles } from '../../../shared/utilities'
import { AdminLayout } from '../../../shared/components'
import { VideoOnDemand } from '../../../models'

const DashboardVideoManage = () => {
    const [vodAssets, setVodAssets] = useState<Array<VideoOnDemand>>([])
    const [nextToken, setNextToken] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            try {
                const { data } = await fetchVodFiles(nextToken)
                setNextToken(
                    data?.listVideoOnDemands?.nextToken
                        ? data.listVideoOnDemands.nextToken
                        : null
                )
                setVodAssets(
                    data?.listVideoOnDemands?.items as Array<VideoOnDemand>
                )
            } catch (error) {
                console.error('video/manage.tsx(fetchVodFiles):', error)
            }
            setLoading(false)
        })()
    }, [nextToken])

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
                <AssetsManagementList assets={vodAssets} />
            )}
        </AdminLayout>
    )
}

export default DashboardVideoManage
