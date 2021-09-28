import React from 'react'
import styled from 'styled-components'
import Item, { ItemContainer } from './item'

type VideoInfo = {
    url: string
    id: string
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
    &:hover ${ItemContainer} {
        transform: translateX(-25%);
    }
`

const VideoList = ({ videoInfos, config }: Props) => {
    return (
        <ListContainer>
            <Container>
                {videoInfos.map((videoInfo, index: number) => (
                    <Item
                        key={videoInfo.id + index}
                        videoInfo={videoInfo}
                        config={config}
                    />
                ))}
            </Container>
        </ListContainer>
    )
}

export default VideoList
