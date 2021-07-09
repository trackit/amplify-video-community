import React from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'

import { AdminLayout } from '../../../shared/components'

const SourceSelectionStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: space-start;
    gap: 25px;
`

const Button = styled.div`
    border: black 1px solid;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    padding: 10px;
`

const SourceSelector = () => {
    return (
        <SourceSelectionStyled>
            <Button
                onClick={() => {
                    navigate('/admin/create/video')
                }}
            >
                Self
            </Button>
            <Button
                onClick={() => {
                    navigate('/admin/create/youtube')
                }}
            >
                Youtube
            </Button>
            <Button
                onClick={() => {
                    navigate('/admin/create/twitch')
                }}
            >
                Twitch
            </Button>
        </SourceSelectionStyled>
    )
}

const DashboardVideoAdd = () => {
    return (
        <AdminLayout>
            <h1>Select your source</h1>
            <SourceSelector />
        </AdminLayout>
    )
}

export default DashboardVideoAdd
