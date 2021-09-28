import React, { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'

import Layout from './Layout'
import styled from 'styled-components'

type AdminLayoutProps = {
    children: React.ReactNode
}

const AdminLayoutStyled = styled.div`
    margin: 25px;
    width: 100%;
    max-width: 100%;
    overflow: scroll;
`

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const [groups, setGroups] = useState([] as Array<string>)

    useEffect(() => {
        ;(async () => {
            const authData = await Auth.currentSession()
            const groupsData = authData.getIdToken().payload['cognito:groups']
            if (groupsData !== undefined) setGroups(groupsData)
        })()
    }, [])

    return (
        <>
            {groups.includes('Admin') ? (
                <Layout>
                    <AdminLayoutStyled>{children}</AdminLayoutStyled>
                </Layout>
            ) : (
                <Layout>
                    <p>{"You don't have admin permissions"}</p>
                </Layout>
            )}
        </>
    )
}

export default withAuthenticator(AdminLayout)
