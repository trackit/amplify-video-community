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

const LivestreamContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
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
                <LivestreamContainer>
                    {livestream && (
                        <>
                            {livestream.isLive ? (
                                <div>
                                    <h1>{livestream.media?.title}</h1>
                                    <VideoPlayer
                                        source={livestream.url || ''}
                                    />
                                    <p>{livestream.media?.description}</p>
                                </div>
                            ) : (
                                <p>Livestream has not started</p>
                            )}
                        </>
                    )}
                </LivestreamContainer>
            )}
        </Layout>
    )
}

export default LivestreamManagement
