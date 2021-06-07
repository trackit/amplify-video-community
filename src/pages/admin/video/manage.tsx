import React, { useState, useEffect } from 'react'
import AssetsManagementList from '../../../shared/components/AssetsManagementList/AssetsManagementList'
import { fetchVodFiles } from '../../../shared/utilities'
import Loader from 'react-loader-spinner'
import { AdminLayout } from '../../../shared/components'
import { vodAsset } from '../../../models'

const DashboardVideoManage = () => {
    const [vodAssets, setVodAssets] = useState<Array<vodAsset>>([])
    const [nextToken, setNextToken] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            try {
                const { data } = await fetchVodFiles(nextToken)
                setNextToken(
                    data?.listVodAssets?.nextToken
                        ? data.listVodAssets.nextToken
                        : null
                )
                setVodAssets(data?.listVodAssets?.items as Array<vodAsset>)
            } catch (error) {
                console.error('VideoManage.tsx ', error)
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
