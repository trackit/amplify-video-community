import React from 'react'
import Amplify from 'aws-amplify'
import styled, { ThemeProvider } from 'styled-components'

import { NavBar } from '../'
import theme from '../theme'
import awsmobile from '../../../aws-exports'

Amplify.configure(awsmobile)

type LayoutProps = {
    children: React.ReactNode
}

const Container = styled.div`
    height: 100%;
`

const Layout = ({ children }: LayoutProps) => {
    return (
        <ThemeProvider theme={theme}>
            <NavBar />
            <Container>{children}</Container>
        </ThemeProvider>
    )
}

export default Layout
