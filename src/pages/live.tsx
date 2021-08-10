import React, { useState, useEffect } from 'react'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'

import { fetchLivestream } from '../shared/utilities'
import {
    Layout,
    VideoPlayer as VideoPlayerComponent,
} from '../shared/components'
import { Livestream } from '../models'

type VideoPlayerProps = {
    source: string
}

const VideoPlayerWrapper = styled.div`
    background: black;
    margin: 20px 0;
`
const VideoPlayer = ({ source }: VideoPlayerProps) => {
    const videoJsOptions = {
        autoplay: false,
        controls: true,
        sources: [
            {
                src: `${source}`,
                type: 'application/x-mpegURL',
            },
        ],
    }
    return (
        <VideoPlayerWrapper>
            <VideoPlayerComponent {...videoJsOptions} />
        </VideoPlayerWrapper>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin: 50px 25px;
`

const LivestreamContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
`

const Message = styled.div`
    font-size: 2em;
    text-align: center;
`

const LivestreamTitle = styled.h1`
    font-size: 2em;
`

const LivestreamDescription = styled.h2`
    font-size: 1.3em;
`

const LivestreamManagement = () => {
    const [livestream, setLivestream] = useState<Livestream | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            try {
                const { data } = await fetchLivestream(
                    '282ee6de-56c3-459c-ad92-64d7a5eaeac5'
                )
                setLivestream(data?.getLivestream as Livestream)
            } catch (error) {
                console.error(
                    'admin/livestream/index.tsx(fetchLivestream):',
                    error
                )
            }
            setLoading(false)
        })()
    }, [])

    return (
        <Layout>
            {loading ? (
                <Loader
                    type="Bars"
                    color="#FFA41C"
                    height={100}
                    width={100}
                    timeout={3000}
                />
            ) : (
                <Container>
                    {livestream && livestream.isLive ? (
                        <LivestreamContainer>
                            <LivestreamTitle>
                                {livestream.media?.title}
                            </LivestreamTitle>
                            <VideoPlayer source={livestream.url || ''} />
                            <LivestreamDescription>
                                {livestream.media?.description}
                            </LivestreamDescription>
                        </LivestreamContainer>
                    ) : (
                        <Message>Livestream has not started</Message>
                    )}
                </Container>
            )}
        </Layout>
    )
}

export default LivestreamManagement
