import React, { useRef, useState } from 'react'
import styled, { DefaultTheme } from 'styled-components'
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'

import { Layout } from '../shared/components'
import intro from '../videos/introduction-video.mp4'
import Landing from './homepage/landing'

const subTheme: DefaultTheme = {
    palette: {
        primary: {
            main: 'black',
            contrastText: 'var(--amplify-primary-contrast)',
            background: '#f2f3f3',
            ternary: '#dedede',
            darkblue: '#050029',
        },
        navbar: {
            main: 'none',
            boxShadow: 'none',
            contrastText: 'var(--amplify-primary-contrast)',
        },
        textMd: 'var(--amplify-text-md)',
    },
}

const HomePage = () => {
    return (
        <Layout navBarTheme={subTheme}>
            <Landing />
        </Layout>
    )
}

export default HomePage
