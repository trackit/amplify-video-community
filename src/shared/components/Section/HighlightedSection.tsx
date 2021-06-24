import React from 'react'
import styled from 'styled-components'
import { vodAsset } from '../../../models'
import HighlightedVideoCard from '../Video/HighlightedVideoCard'
import { Thumbnail } from '../../types'

type HighlightedProps = {
    title: string
    vodAsset: vodAsset | undefined
    thumbnails: Array<Thumbnail>
}

const StyledHighlightedContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;

    margin-left: 5px;
    margin-right: 5px;
`

const StyledTitle = styled.h1`
    margin-left: 15px;
`

const StyledContentContainer = styled.div`
    margin-left: 10px;
`

const StyledContentTitle = styled.p`
    font-size: 2.2em;
    font-weight: bold;
    margin-bottom: 12px;
    margin-top 0;
`

const StyledContent = styled.p`
    font-size: 1em;
`

const Highlighted = ({ title, vodAsset, thumbnails }: HighlightedProps) => {
    return (
        <div>
            <StyledTitle>{title}</StyledTitle>
            <StyledHighlightedContainer>
                <HighlightedVideoCard
                    key={vodAsset?.id}
                    vod={vodAsset}
                    thumbnail={thumbnails.find(
                        (thumb) => vodAsset?.thumbnail?.id === thumb.obj?.id
                    )}
                />
                <StyledContentContainer>
                    <StyledContentTitle>Titre</StyledContentTitle>
                    <StyledContent>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Sint modi tempore beatae enim, deserunt delectus fuga
                        doloribus mollitia soluta neque, a magni, aliquam
                        tempora architecto optio odit dignissimos assumenda
                        quis.
                    </StyledContent>
                </StyledContentContainer>
            </StyledHighlightedContainer>
        </div>
    )
}

export default Highlighted
