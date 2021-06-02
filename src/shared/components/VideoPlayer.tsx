import React from 'react'
import 'video.js/dist/video-js.css'
import videojs from 'video.js'

import styled from 'styled-components'

interface VideoPlayerPropsInferface extends videojs.PlayerOptions {
    width?: string,
    sources: Array<object>
}

const VideoPlayerWrapper = styled.div`
  margin: auto;
  width: ${(props: { width: string; }) => props.width};
`;

export default class VideoPlayer extends React.Component<VideoPlayerPropsInferface> {
    private playerWidth: string
    private player?: videojs.Player
    private videoNode?: HTMLVideoElement

    constructor(props: VideoPlayerPropsInferface) {
        super(props)
        this.playerWidth = props?.width || '70%'
        this.player = undefined
        this.videoNode = undefined
    }

    changeVideo() {
        const newVideo = this.props.sources
        const videoComponent = videojs(this.videoNode)

        videoComponent.src(newVideo)
    }

    componentDidUpdate(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        prevProps: Readonly<VideoPlayerPropsInferface>,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        prevState: Readonly<any>,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        snapshot?: any
    ) {
        this.changeVideo()
    }

    componentDidMount() {
        this.player = videojs(this.videoNode, this.props).ready(function () {
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
