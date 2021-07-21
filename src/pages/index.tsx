import React, { useRef, useState, useEffect } from 'react'
import styled, { DefaultTheme } from 'styled-components'
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'

import { Layout } from '../shared/components'
import intro from '../videos/introduction-video.mp4'
import Landing from './homepage/landing'

// TODO: Move type and const in other file
type NavBarTheme = {
    type: string
    main: string
    boxShadow: string
    contrastText: string
    amplifyLogo: string
    amplifyText: string
    textColor: string
    textHoverColor: string
    searchBgColor: string
    searchMainColor: string
    searchHoverMainColor: string
    searchHoverBgColor: string
    
    searchTextColor: string
    searchHoverTextColor: string
}

const noScrollNavBarTheme: NavBarTheme = {
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
    searchTextColor: '#ffffff',
    searchHoverTextColor: '#000000',
}


const scrollNavBarTheme: NavBarTheme = {
    type: 'scroll',
    main: '#ffffff',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',
    amplifyLogo: 'dark',
    amplifyText: '#000000',
    textColor: '#000000',
    textHoverColor: 'var(--amplify-primary-color)',
    searchBgColor: 'rgba(0, 0, 0, 0)',
    searchMainColor: '#000000',
    searchHoverMainColor: '#ffffff',
    searchHoverBgColor: 'var(--amplify-primary-color)',

    contrastText: 'var(--amplify-primary-contrast)',
    searchTextColor: '#ffffff',
    searchHoverTextColor: '#000000',
}

const subTheme = {
    palette: {
        primary: {
            main: 'black',
            contrastText: 'var(--amplify-primary-contrast)',
            background: '#f2f3f3',
            ternary: '#dedede',
            darkblue: '#050029',
        },
        navbar: noScrollNavBarTheme,
        textMd: 'var(--amplify-text-md)',
    },
}

const HomePage = () => {
    const [theme, setTheme] = useState(subTheme)
    const handleScroll = (e: any) => {
        if (window.pageYOffset > 20 && theme.palette.navbar.type !== 'scroll') {
            setTheme({
                ...theme,
                palette: {
                    ...theme.palette,
                    navbar: scrollNavBarTheme,
                },
            })
        }
        if (window.pageYOffset <= 20 && theme.palette.navbar.type !== 'noScroll') {
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
        <Layout navBarTheme={theme}>
            <Landing />
            <div style={{ height: '600px' }} />
        </Layout>
    )
}

export default HomePage
