import React, { useRef, useState } from 'react'
import styled, { DefaultTheme } from 'styled-components'
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa'

import { Layout } from '../shared/components'
import intro from '../videos/introduction-video.mp4'

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

const Video = styled.video`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    filter: blur(2px);
`

const TextContainer = styled.div`
    position: fixed;
    top: 128px;
    z-index: 10;
    width: 65vh;
    margin-left: 5%;

    h1 {
        font-size: 48px;
        margin-bottom: 72px;
        text-shadow: 2px 2px 2px black;
    }

    p {
        margin-bottom: 72px;
        font-size: 20px;
        font-weight: lighter;
        text-shadow: 2px 2px 2px black;
    }
`

const HomePage = () => {
    const vidRef = useRef<HTMLVideoElement>()
    const [paused, setPaused] = useState<boolean>(true)

    const handlePlayVideo = () => {
        if (paused) vidRef.current?.play()
        else vidRef.current?.pause()
        setPaused(!paused)
    }
    return (
        <Layout navBarTheme={subTheme}>
            <Video muted ref={vidRef}>
                <source src={intro} type="video/mp4" />
            </Video>
            <TextContainer>
                <h1 style={{ color: 'white' }}>
                    Fastest, easiest way to build scalable mobile and web apps.
                </h1>
                <p style={{ color: 'white' }}>
                    Take a tour and find what{' '}
                    <span style={{ color: 'var(--amplify-primary-color)' }}>
                        AWS Amplify
                    </span>{' '}
                    store for you!
                </p>
                <div style={{ display: 'flex' }}>
                    {paused ? (
                        <FaPlayCircle
                            style={{
                                marginRight: '10px',
                                transform: 'translateY(25%)',
                                cursor: 'pointer',
                                filter: 'drop-shadow(2px 2px 2px black)',
                            }}
                            size="40px"
                            color="white"
                            onClick={handlePlayVideo}
                        />
                    ) : (
                        <FaPauseCircle
                            style={{
                                marginRight: '10px',
                                transform: 'translateY(25%)',
                                cursor: 'pointer',
                                filter: 'drop-shadow(2px 2px 2px black)',
                            }}
                            size="40px"
                            color="white"
                            onClick={handlePlayVideo}
                        />
                    )}
                    <p style={{ color: 'white' }}>Play introduction video</p>
                </div>
            </TextContainer>
        </Layout>
    )
}

export default HomePage
