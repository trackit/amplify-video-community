import React, { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'
import Index from '../../components/Layout'

type AdminLayoutProps = {
    children: React.ReactNode
}

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
                <Index>{children}</Index>
            ) : (
                <Index>
                    <p>{"You don't have admin permissions"}</p>
                </Index>
            )}
        </>
    )
}

export default withAuthenticator(AdminLayout)
