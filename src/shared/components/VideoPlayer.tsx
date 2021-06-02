import React from 'react'
import 'video.js/dist/video-js.css'
import videojs from 'video.js'

import styled from 'styled-components'

interface VideoPlayerPropsInferface extends videojs.PlayerOptions {
    width?: string
}

const VideoPlayerWrapper = styled.div`
    margin: auto;
    width: ${(props) => props.width};
`;

export default class VideoPlayer extends React.Component<VideoPlayerPropsInferface> {
    private playerWidth: string
    private player?: videojs.Player
    private videoNode?: HTMLVideoElement
    private options?: VideoPlayerPropsInferface

    constructor(props: VideoPlayerPropsInferface) {
        super(props)
        this.playerWidth = props?.width || "70%"
        this.options = props
        this.player = undefined
        this.videoNode = undefined
    }

    changeVideo() {
        const newVideo = this.props.sources
        const videoComponent = videojs(this.videoNode)

        videoComponent.src(newVideo)
    }

    componentDidUpdate(prevProps: Readonly<VideoPlayerPropsInferface>, prevState: Readonly<{}>, snapshot?: any) {
        this.changeVideo()
    }

    componentDidMount() {
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
            <VideoPlayerWrapper width={this.playerWidth}>
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
