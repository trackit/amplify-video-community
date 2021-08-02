import React, { useState, useEffect } from 'react'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'

import {
    fetchLivestream,
    modifyLivestream,
    modifyMedia,
} from '../../../shared/utilities'
import {
    AdminLayout,
    VideoPlayer as VideoPlayerComponent,
} from '../../../shared/components'
import { Livestream } from '../../../models'

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

const ActionsContainer = styled.div`
    display: flex;
`

const StartStopButton = styled.button`
    justify-self: flex-end;
`

const StopButton = styled(StartStopButton)`
    background-color: orangered;
`

const StartButton = styled(StartStopButton)`
    background-color: lightgreen;
`

const LivestreamManagement = () => {
    const [livestream, setLivestream] = useState<Livestream | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [isLive, setIsLive] = useState<boolean>(false)

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            try {
                const { data } = await fetchLivestream(
                    '282ee6de-56c3-459c-ad92-64d7a5eaeac5'
                )
                setLivestream(data?.getLivestream as Livestream)
                setIsLive(data?.getLivestream?.isLive || false)
            } catch (error) {
                console.error(
                    'admin/livestream/index.tsx(fetchLivestream):',
                    error
                )
            }
            setLoading(false)
        })()
    }, [isLive])

    const onClick = (live: boolean) => {
        if (livestream) {
            setIsLive(live)
            modifyLivestream({
                id: livestream.id,
                isLive: live,
            })
            modifyMedia({
                id: livestream.id,
                title: livestream.media?.title,
                description: livestream.media?.description,
            })
        }
    }

    return (
        <AdminLayout>
            {loading ? (
                <Loader
                    type="Bars"
                    color="#FFA41C"
                    height={100}
                    width={100}
                    timeout={3000}
                />
            ) : (
                <div>
                    {livestream && (
                        <div key={livestream.id}>
                            <VideoPlayer source={livestream.url || ''} />
                            {livestream.isLive ? (
                                <ActionsContainer>
                                    <StopButton
                                        onClick={() => {
                                            onClick(false)
                                        }}
                                    >
                                        Stop Streaming
                                    </StopButton>
                                </ActionsContainer>
                            ) : (
                                <ActionsContainer>
                                    <input
                                        type="text"
                                        value={livestream.media?.title}
                                        onChange={(
                                            event: React.ChangeEvent<HTMLInputElement>
                                        ) => {
                                            if (
                                                livestream &&
                                                livestream.media
                                            ) {
                                                setLivestream({
                                                    ...livestream,
                                                    media: {
                                                        ...livestream.media,
                                                        title: event.target
                                                            .value,
                                                    },
                                                })
                                            }
                                        }}
                                    />
                                    <textarea
                                        value={livestream.media?.description}
                                        onChange={(
                                            event: React.ChangeEvent<HTMLTextAreaElement>
                                        ) => {
                                            if (
                                                livestream &&
                                                livestream.media
                                            ) {
                                                setLivestream({
                                                    ...livestream,
                                                    media: {
                                                        ...livestream.media,
                                                        description:
                                                            event.target.value,
                                                    },
                                                })
                                            }
                                        }}
                                    />
                                    <StartButton
                                        onClick={() => {
                                            onClick(true)
                                        }}
                                    >
                                        Start Streaming
                                    </StartButton>
                                </ActionsContainer>
                            )}
                        </div>
                    )}
                </div>
            )}
        </AdminLayout>
    )
}

export default LivestreamManagement
