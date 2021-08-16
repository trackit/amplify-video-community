import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CSS from 'csstype'

import { VideoOnDemand, Section, Thumbnail } from '../../../models'
import VideoCardList from '../VideoCardSlider/VideoCardList'

type SectionProps = {
    section: Section
    vodAssets: Array<VideoOnDemand>
    thumbnails: Array<{
        obj: Thumbnail | undefined
        url: string
    }>
}

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

const Container = styled.div`
    padding: 100px 0;
    background-color: #f9f9f9;
`

const Title = styled.h2`
    font-weight: 600;
    font-size: 28px;
    margin: 0 0 0 100px;
`

const SectionContainer = ({ section, vodAssets, thumbnails }: SectionProps) => {
    const [videoInfos, setVideoInfos] = useState<Array<VideoInfo>>([])

    useEffect(() => {
        const fAssets: Array<VideoInfo> = []
        const assets = vodAssets.filter((asset) => {
            let returnValue = false
            // eslint-disable-next-line
            asset.media?.sections?.items.forEach((item) => {
                if (item?.section.id === section.id) {
                    returnValue = true
                }
            })
            return returnValue
        })
        assets.forEach((a) => {
            fAssets.push({
                thumbnail: thumbnails.find(
                    (thumbnail) => a.media?.thumbnail?.id === thumbnail.obj?.id
                ),
                vod: a,
            })
        })
        setVideoInfos(fAssets)
    }, [])

    return (
        <>
            {videoInfos && videoInfos.length > 0 && (
                <Container>
                    <Title>{section.label}</Title>
                    <VideoCardList
                        videoInfos={videoInfos}
                        config={{
                            width: 480,
                            height: 270,
                        }}
                    />
                </Container>
            )}
        </>
    )
}

export default SectionContainer
