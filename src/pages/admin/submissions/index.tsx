import React, { useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'

import { fetchContentSubmissions } from '../../../shared/utilities'
import { AdminLayout } from '../../../shared/components'
import { SubmissionsManagementList } from '../../../shared/components'
import { UserSubmissions } from '../../../models'

const TitleContainer = styled.div`
    display: flex;
    justify-content: space-between;
`

const SubmissionsManagement = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [submissions, setSubmissions] = useState<Array<UserSubmissions>>([])

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            try {
                const { data } = await fetchContentSubmissions()
                setSubmissions(
                    data?.listContentSubmissions
                        ?.items as Array<UserSubmissions>
                )
            } catch (error) {
                console.error('SubmissionsManagement.tsx ', error)
            }
            setLoading(false)
        })()
    }, [])

    return (
        <AdminLayout>
            <TitleContainer>
                <h1>Manage Submissions</h1>
            </TitleContainer>
            {loading ? (
                <Loader
                    type="Bars"
                    color="#FFA41C"
                    height={100}
                    width={100}
                    timeout={3000}
                />
            ) : (
                <SubmissionsManagementList contentSubmissions={submissions} />
            )}
        </AdminLayout>
    )
}

export default SubmissionsManagement
