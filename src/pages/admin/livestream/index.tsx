import React, { useState, useEffect } from 'react'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'

import { fetchLivestreams } from '../../../shared/utilities'
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

const StopButton = styled.button`
    background-color: orangered;
`

const StartButton = styled.button`
    background-color: lightgreen;
`

const LivestreamManagement = () => {
    const [livestreams, setLivestreams] = useState<Array<Livestream>>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            try {
                const { data } = await fetchLivestreams()
                const lives = data?.listLivestreams?.items as Array<Livestream>
                setTitle(lives[0].media?.title || '')
                setDescription(lives[0].media?.description || '')
                setLivestreams(lives)
            } catch (error) {
                console.error(
                    'admin/livestream/index.tsx(fetchLivestreams):',
                    error
                )
            }
            setLoading(false)
        })()
    }, [])

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
                    {livestreams.map((live) => {
                        // TODO:
                        // video player for the livestream, show thumbnail
                        // when isLive => stop button,
                        // when !isLive => start button, form to set title, desc
                        console.log(live)
                        return (
                            live && (
                                <div key={live.id}>
                                    <VideoPlayer source={live.url || ''} />
                                    {live.isLive ? (
                                        <div>
                                            <StopButton>
                                                Stop Streaming
                                            </StopButton>
                                        </div>
                                    ) : (
                                        <div>
                                            <StartButton>
                                                Start Streaming
                                            </StartButton>
                                            <input
                                                type="text"
                                                value={title}
                                                onChange={(
                                                    event: React.ChangeEvent<HTMLInputElement>
                                                ) => {
                                                    setTitle(event.target.value)
                                                }}
                                            />
                                            <textarea
                                                value={description}
                                                onChange={(
                                                    event: React.ChangeEvent<HTMLTextAreaElement>
                                                ) => {
                                                    setDescription(
                                                        event.target.value
                                                    )
                                                }}
                                            />
                                        </div>
                                    )}
                                </div>
                            )
                        )
                    })}
                </div>
            )}
        </AdminLayout>
    )
}

export default LivestreamManagement
