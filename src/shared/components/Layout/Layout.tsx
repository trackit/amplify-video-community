import React from 'react'
import Amplify from 'aws-amplify'
import { ThemeProvider } from 'styled-components'

import { NavBar } from '../'
import theme from '../theme'
import awsmobile from '../../../aws-exports'

Amplify.configure(awsmobile)

type LayoutProps = {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <ThemeProvider theme={theme}>
            <NavBar />
            {children}
        </ThemeProvider>
    )
}

export default Layout
