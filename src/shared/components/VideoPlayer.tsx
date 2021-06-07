import React from 'react'
import 'video.js/dist/video-js.css'
import videojs from 'video.js'

import styled from 'styled-components'

interface VideoPlayerPropsInferface extends videojs.PlayerOptions {
    token: string
}

const VideoPlayerWrapper = styled.div`
    margin: auto;
    width: 70%;
`

export default class VideoPlayer extends React.Component<VideoPlayerPropsInferface> {
    private player?: videojs.Player
    private videoNode?: HTMLVideoElement
    private options?: VideoPlayerPropsInferface

    constructor(props: VideoPlayerPropsInferface) {
        super(props)
        this.options = props
        this.player = undefined
        this.videoNode = undefined
    }

    componentDidMount() {
        // eslint-disable-next-line
        videojs.Vhs.xhr.beforeRequest = (options: any) => {
            options.uri = `${options.uri}${this.options?.token}`
            return options
        }

        this.player = videojs(this.videoNode, this.options).ready(function () {
            console.log('onPlayerReady', this)
        })
    }

    componentWillUnmount() {
        if (this.player) {
            this.player.dispose()
        }
    }

    render() {
        return (
            <VideoPlayerWrapper>
                <div data-vjs-player>
                    <video
                        ref={(node: HTMLVideoElement) => {
                            this.videoNode = node
                        }}
                        className="vjs-fluid video-js vjs-default-skin vjs-big-play-centered"
                    />
                </div>
            </VideoPlayerWrapper>
        )
    }
}
