import React, { useState, useEffect } from 'react'

import { Layout } from '../shared/components'
import Landing from './homepage/landing'
import CommunityContent from './homepage/communityContent'
import IntroductionSection from './homepage/introduction'
import StreamingContent from './homepage/streaming'
import Form from './homepage/form'
import defaultTheme, {
    NavbarTheme,
    defaultNavbar,
} from '../shared/components/theme'

const noScrollNavBarTheme: NavbarTheme = {
    type: 'noScroll',
    main: 'rgba(0, 0, 0, 0)',
    boxShadow: 'none',
    amplifyLogo: 'light',
    amplifyText: '#ffffff',
    textColor: '#ffffff',
    textHoverColor: '#ffffff',
    searchBgColor: 'rgba(0, 0, 0, 0)',
    searchMainColor: '#ffffff',
    searchHoverMainColor: '#000000',
    searchHoverBgColor: '#ffffff',
    contrastText: 'var(--amplify-primary-contrast)',
}

const HomePage = () => {
    const [theme, setTheme] = useState({
        ...defaultTheme,
        palette: {
            ...defaultTheme.palette,
            navbar: noScrollNavBarTheme,
        },
    })
    const handleScroll = () => {
        if (window.pageYOffset > 20 && theme.palette.navbar.type !== 'scroll') {
            setTheme({
                ...theme,
                palette: {
                    ...theme.palette,
                    navbar: defaultNavbar,
                },
            })
        }
        if (
            window.pageYOffset <= 20 &&
            theme.palette.navbar.type !== 'noScroll'
        ) {
            setTheme({
                ...theme,
                palette: {
                    ...theme.palette,
                    navbar: noScrollNavBarTheme,
                },
            })
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    })

    return (
        <Layout overrideTheme={theme}>
            <Landing />
            <IntroductionSection />
            <StreamingContent />
            <CommunityContent />
            <Form />
        </Layout>
    )
}

export default HomePage
