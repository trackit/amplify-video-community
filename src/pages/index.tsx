import React, { useState, useEffect } from 'react'

import { Layout } from '../shared/components'
import Landing from '../shared/homepage/landing'
import CommunityContent from '../shared/homepage/communityContent'
import IntroductionSection from '../shared/homepage/introduction'
import StreamingContent from '../shared/homepage/streaming'
import Form from '../shared/homepage/form'
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
        <Layout overrideTheme={theme} removePaddingTop>
            <Landing />
            <IntroductionSection />
            <StreamingContent />
            <CommunityContent />
            <Form />
        </Layout>
    )
}

export default HomePage
