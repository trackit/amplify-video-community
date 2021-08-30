import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import ReactPlayer from 'react-player'
import { FaRegPlayCircle } from 'react-icons/fa'
import CSS from 'csstype'

import awsvideoconfig from '../../../aws-video-exports'
import { VideoOnDemand, Thumbnail } from '../../../models'
import { navigate } from 'gatsby'

type Props = {
    videoInfo: {
        thumbnail:
            | {
                  obj: Thumbnail | undefined
                  url: string
              }
            | undefined
        vod: VideoOnDemand | undefined
        style?: CSS.Properties
        imgStyle?: CSS.Properties
    }
    config: {
        width: number
        height: number
    }
}

type VideoStatus = {
    playing?: boolean
    played?: number
    loaded?: number
    duration?: number
    seeking?: boolean
    width?: number
    height?: number
}

type PlayerWrapperProps = {
    playing?: boolean
}

type ItemContainerProps = {
    playing?: boolean
    thumbUrl?: string
}

export const VideoCardItemContainer = styled.div<ItemContainerProps>`
    background-color: #ffffff;
    background-image: ${(props) =>
        props.playing || !props.thumbUrl ? 'none' : `url(${props.thumbUrl})`};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    min-width: 20vw;
    min-height: calc(20vw * 9 / 16);
    ${(props) => (!props.playing ? 'max-height: calc(20vw * 9 / 16)' : '')};

    margin: 0 10px;
    transition: transform 200ms ease 100ms;

    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    overflow: hidden;

    &:hover ~ & {
        transform: translateX(25%) !important;
    }
    &:hover {
        transform: scale(1.5) !important;
    }
`

const PlayerWrapper = styled.div<PlayerWrapperProps>`
    opacity: ${(props) => (props.playing ? '1' : '0')};
    width: 20vw;
    aspect-ratio: 16/9;
`

const VideoInformations = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
`

const VideoText = styled.div`
    text-align: left;
`

const VideoTitle = styled.div`
    font-size: 12px;
    font-weight: 500;
`

const VideoAuthor = styled.div`
    font-size: 10px;
`

const VideoPlay = styled.a`
    background: none;
    border: none;
    margin: 0;
    padding: 0;
    cursor: pointer;
    color: #000000;
    display: flex;
    align-items: center;
`

const VideoCardItem = ({ videoInfo, config }: Props) => {
    const [videoStatus, setVideoStatus] = useState<VideoStatus>({
        playing: false,
        played: 0,
        loaded: 0,
        duration: 0,
        seeking: false,
        width: config.width,
        height: config.height,
    })
    const playerRef = useRef<ReactPlayer>(null)

    const updateVideoStatus = (updatedData: VideoStatus) =>
        setVideoStatus({
            ...videoStatus,
            ...updatedData,
        })
    const handleMouseLeave = () => {
        updateVideoStatus({ playing: false })
    }
    const handleMouseEnter = () => {
        updateVideoStatus({ playing: true })
    }

    return (
        <VideoCardItemContainer
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            playing={videoStatus.playing}
            thumbUrl={
                videoInfo.vod?.media?.source === 'SELF'
                    ? videoInfo.thumbnail?.url
                    : videoInfo.thumbnail?.obj?.src
            }
        >
            <PlayerWrapper playing={videoStatus.playing}>
                <ReactPlayer
                    ref={playerRef}
                    width="100%"
                    height="100%"
                    url={
                        videoInfo.vod?.media?.source === 'SELF'
                            ? `https://${awsvideoconfig.awsOutputVideo}/public/${videoInfo.vod?.id}/${videoInfo.vod?.id}.m3u8`
                            : videoInfo.vod?.src
                    }
                    controls={false}
                    playing={videoStatus.playing}
                    muted
                    config={{
                        youtube: {
                            playerVars: {
                                controls: 0,
                                rel: 0,
                            },
                        },
                    }}
                />
            </PlayerWrapper>
            {videoStatus.playing && (
                <VideoInformations>
                    <VideoText>
                        <VideoTitle>{videoInfo.vod?.media?.title}</VideoTitle>
                        <VideoAuthor>Author</VideoAuthor>
                    </VideoText>
                    <VideoPlay
                        onClick={() => navigate(`/video/${videoInfo.vod?.id}`)}
                    >
                        <FaRegPlayCircle size={24} />
                    </VideoPlay>
                </VideoInformations>
            )}
        </VideoCardItemContainer>
    )
}

export default VideoCardItem
