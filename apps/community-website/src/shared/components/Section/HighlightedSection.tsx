import React from 'react'
import styled from 'styled-components'

import { VideoOnDemand, Thumbnail } from '../../../models'
import HighlightedVideoCard from '../Video/HighlightedVideoCard'

type HighlightedProps = {
    title: string
    vodAsset: VideoOnDemand | undefined
    thumbnails: Array<{
        obj: Thumbnail | undefined
        url: string
    }>
}

const StyledHighlightedContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 15px;
`

const StyledTitle = styled.h2``

const StyledContentContainer = styled.div`
    flex: 1 0;
    align-self: center;
`

const StyledContentTitle = styled.p`
    font-size: 1.7em;
    font-weight: bold;
    margin-bottom: 12px;
    margin-top 0;
`

const StyledContent = styled.p`
    font-size: 1em;
`

const StyledHighlighted = styled.div`
    margin: 0 15px;
    margin-bottom: 25px;
`

const Highlighted = ({ title, vodAsset, thumbnails }: HighlightedProps) => {
    return (
        <StyledHighlighted>
            <StyledTitle>{title}</StyledTitle>
            <StyledHighlightedContainer>
                <HighlightedVideoCard
                    key={vodAsset?.id}
                    vod={vodAsset}
                    thumbnail={thumbnails.find(
                        (thumb) =>
                            vodAsset?.media?.thumbnail?.id === thumb.obj?.id
                    )}
                />
                <StyledContentContainer>
                    <StyledContentTitle>
                        {vodAsset?.media?.title}
                    </StyledContentTitle>
                    <StyledContent>
                        {vodAsset?.media?.description}
                    </StyledContent>
                </StyledContentContainer>
            </StyledHighlightedContainer>
        </StyledHighlighted>
    )
}

export default Highlighted
