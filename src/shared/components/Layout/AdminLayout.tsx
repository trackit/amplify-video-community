import React, { useEffect, useState } from 'react'
import { Auth } from 'aws-amplify'
import { withAuthenticator } from '@aws-amplify/ui-react'
import Layout from './Layout'
import { Link } from 'gatsby'
import styled from 'styled-components'

const LeftPanelStyled = styled.div`
    height: 100%;
    flex-direction: row;
    width: 20%;
`

const RightPanelStyled = styled.div`
    width: 100%;
`

const AdminLayoutStyled = styled.div`
    display: flex;
    width: 100%;
`

const LeftPanelStyledElem = styled.div`
    display: flex;
    flex-direction: column;
    padding: 15px;
`

type LeftPanelProps = {
    currentPage: string
    setCurrentPage: React.Dispatch<React.SetStateAction<string>>
}

const LeftPanel = ({ currentPage, setCurrentPage }: LeftPanelProps) => {
    const onLinkClick = (path: string) => {
        console.log(currentPage)
        setCurrentPage(path)
    }

    return (
        <LeftPanelStyled>
            <LeftPanelStyledElem>
                <h2>Video</h2>
                <Link
                    to="/admin/video/add"
                    onClick={() => onLinkClick('/admin/video/add')}
                >
                    Add new video
                </Link>
                <Link
                    to="/admin/video/manage"
                    onClick={() => onLinkClick('/admin/video/manage')}
                >
                    Manage videos
                </Link>
            </LeftPanelStyledElem>
            <LeftPanelStyledElem>
                <h2>Livestream</h2>
                <Link
                    to="/admin/livestream/add"
                    onClick={() => onLinkClick('/admin/livestream/add')}
                >
                    Add new livestream
                </Link>
                <Link
                    to="/admin/livestream/manage"
                    onClick={() => onLinkClick('/admin/livestream/manage')}
                >
                    Manage livestreams
                </Link>
            </LeftPanelStyledElem>
            <LeftPanelStyledElem>
                <h2>Webinars</h2>
                <Link
                    to="/admin/webinar/add"
                    onClick={() => onLinkClick('/admin/webinar/add')}
                >
                    Add new webinar
                </Link>
                <Link
                    to="/admin/webinar/manage"
                    onClick={() => onLinkClick('/admin/webinar/manage')}
                >
                    Manage webinars
                </Link>
            </LeftPanelStyledElem>
        </LeftPanelStyled>
    )
}

type AdminLayoutProps = {
    children: React.ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
    const [groups, setGroups] = useState([] as Array<string>)
    const [currentPage, setCurrentPage] = useState<string>('')

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
                    <AdminLayoutStyled>
                        <LeftPanel
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                        <RightPanelStyled>{children}</RightPanelStyled>
                    </AdminLayoutStyled>
                </Layout>
            ) : (
                <Layout>
                    <p>Not Authenticated</p>
                </Layout>
            )}
        </>
    )
}

export default withAuthenticator(AdminLayout)
