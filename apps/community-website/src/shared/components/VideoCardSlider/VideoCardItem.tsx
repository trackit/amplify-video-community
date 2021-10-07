import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import ReactPlayer from 'react-player'
import CSS from 'csstype'

import awsvideoconfig from '../../../aws-video-exports'
import { VideoOnDemand, Thumbnail } from '../../../models'
import { navigate } from 'gatsby'

import PlayLogo from '../../../assets/logo/logo-play.svg'
import AmplifyLogo from '../../../assets/logo/logo-dark.svg'

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
    spaceBetweenItems?: number
    itemWidth?: number
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
    display: flex;
    flex-direction: column;

    width: ${(props) => props.width}px;
    height: ${(props) => (props.displayOnlyTitle ? '270' : '318')}px;
    min-width: ${(props) => props.width}px;
    min-height: ${(props) => (props.displayOnlyTitle ? '270' : '318')}px;

    transition: box-shadow 200ms ease-out, transform 200ms ease-out;

    transform: scale(${(props) => (props.playing ? 1.05 : 1)});
    ${(props) =>
        props.playing && 'box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);'};

    margin-right: 40px;

    border-radius: 10px;
    overflow: hidden;
    cursor: pointer;
`

const ThumbnailContainer = styled.div`
    position: relative;
    background-image: ${(props) =>
        props.playing || !props.thumbUrl ? 'none' : `url(${props.thumbUrl})`};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: ${(props) => props.width}px;
    height: 200px;
    border-radius: ${(props) => (props.hover ? '10px 10px 0 0' : '10px')};
    overflow: hidden;
`

const PlayerWrapper = styled.div<PlayerWrapperProps>`
    opacity: ${(props) => (props.playing ? '1' : '0')};
    width: 100%;
    aspect-ratio: 16/9;
`

const VideoInformations = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: flex-end;
    background-color: ${(props) =>
        props.transparent ? 'transparent' : '#FFFFFF'};
    padding: 10px;
    position: relative;
    transition: background-color 200ms ease-out;
`

const VideoText = styled.div`
    height: 100%;
    margin-top: 15px;
    text-align: left;
`

const VideoTitle = styled.div`
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 5px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
`

const VideoAuthor = styled.div`
    font-size: 18px;
    color: #444444;
    margin-bottom: 5px;
`

const ViewsAndDate = styled.div`
    font-size: 14px;
`

const TransparentOverlay = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(50, 50, 50, 0.5);
    width: 100%;
    height: 100%;
    border-top-right-radius: 10px;
    top: 0;
    transition: opacity 200ms;
    opacity: ${(props) => (props.visible ? 1 : 0)};
`

const ChannelLogo = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background: #ffffff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    position: absolute;
    top: -20px;
    left: 20px;
`

const VideoCardItem = ({
    videoInfo,
    spaceBetweenItems = 40,
    itemWidth = 360,
    displayOnlyTitle = false,
    customStyles = {},
}: Props) => {
    const [videoStatus, setVideoStatus] = useState<VideoStatus>({
        playing: false,
        played: 0,
        loaded: 0,
        duration: 0,
        seeking: false,
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
            onClick={() => navigate(`/video/${videoInfo.vod?.id}`)}
            width={itemWidth}
            margin={spaceBetweenItems}
            displayOnlyTitle
            style={customStyles}
        >
            <ThumbnailContainer
                thumbUrl={
                    videoInfo.vod
                        ? videoInfo.vod?.media?.source === 'SELF'
                            ? videoInfo.thumbnail?.url
                            : videoInfo.thumbnail?.obj?.src
                        : `https://img.youtube.com/vi/${videoInfo.id}/maxresdefault.jpg`
                }
                hover={videoStatus.playing}
                width={itemWidth}
            >
                <PlayerWrapper playing={videoStatus.playing}>
                    <ReactPlayer
                        ref={playerRef}
                        width="100%"
                        height="100%"
                        url={
                            videoInfo.vod
                                ? videoInfo.vod?.media?.source === 'SELF'
                                    ? `https://${awsvideoconfig.awsOutputVideo}/public/${videoInfo.vod?.id}/${videoInfo.vod?.id}.m3u8`
                                    : videoInfo.vod?.src
                                : videoInfo.url
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
                <TransparentOverlay visible={videoStatus.playing}>
                    <PlayLogo />
                </TransparentOverlay>
            </ThumbnailContainer>
            <VideoInformations transparent={!videoStatus.playing}>
                <ChannelLogo>
                    <AmplifyLogo />
                </ChannelLogo>
                <VideoText>
                    <VideoTitle>
                        {videoInfo.vod?.media?.title
                            ? videoInfo.vod?.media?.title
                            : 'Video Title'}
                    </VideoTitle>
                    {displayOnlyTitle ? (
                        <div style={{ display: 'flex', flex: 1 }} />
                    ) : (
                        <>
                            <VideoAuthor>Author</VideoAuthor>
                            <ViewsAndDate>1M views - 18 sep 2025</ViewsAndDate>
                        </>
                    )}
                </VideoText>
            </VideoInformations>{' '}
        </VideoCardItemContainer>
    )
}

export default VideoCardItem
