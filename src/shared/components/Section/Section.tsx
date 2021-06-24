import React from 'react'
import styled from 'styled-components'
import { vodAsset } from '../../../models'
import VideoCard from '../Video/VideoCard'
import { Thumbnail } from '../../types'

type SectionProps = {
    title: string
    vodAssets: Array<vodAsset> | null
    thumbnails: Array<Thumbnail>
}

const StyledSectionContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-left;

    margin-left: 5px;
    margin-right: 5px;
`

const StyledTitle = styled.h1`
    margin-left: 15px;
`

const Section = ({ title, vodAssets, thumbnails }: SectionProps) => {
    return (
        <div>
            <StyledTitle>{title}</StyledTitle>
            <StyledSectionContainer>
                {vodAssets &&
                    vodAssets.map((asset) => {
                        return (
                            <VideoCard
                                key={asset.id}
                                vod={asset}
                                thumbnail={thumbnails.find(
                                    (thumbnail) =>
                                        asset.thumbnail?.id ===
                                        thumbnail.obj?.id
                                )}
                            />
                        )
                    })}
            </StyledSectionContainer>
        </div>
    )
}

export default Section
