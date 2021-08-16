import React from 'react'
import styled from 'styled-components'
import CSS from 'csstype'

import VideoCardItem, { VideoCardItemContainer } from './VideoCardItem'
import { VideoOnDemand, Thumbnail } from '../../../models'

type VideoInfo = {
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

type Props = {
    videoInfos: Array<VideoInfo>
    config: {
        width: number
        height: number
    }
}

const ListContainer = styled.div`
    overflow-x: scroll;
    padding: 100px 0px 50px 0px;
    height: calc(20vw * 9 / 16 * 1.5);
`

const Container = styled.div`
    display: flex;
    padding: 0 95px;
    &:hover ${VideoCardItemContainer} {
        transform: translateX(-25%);
    }
`

const VideoCardList = ({ videoInfos, config }: Props) => {
    return (
        <ListContainer>
            <Container>
                {videoInfos.map(
                    (videoInfo, index: number) =>
                        videoInfo.vod && (
                            <VideoCardItem
                                key={videoInfo.vod?.id + index}
                                videoInfo={videoInfo}
                                config={config}
                            />
                        )
                )}
            </Container>
        </ListContainer>
    )
}

export default VideoCardList
