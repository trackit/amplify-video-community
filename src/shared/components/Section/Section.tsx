import React from 'react'
import styled from 'styled-components'
import { vodAsset } from '../../../models'
import VideoCard from '../Video/VideoCard'

type SectionProps = {
    title: string
    vodAssets: Array<vodAsset> | null
}

const StyledSectionContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: flex-left;

    margin-left: 5px;
    margin-right: 5px;
`

const StyledTitle = styled.h1`
    margin-left: 15px;
`

const Section = ({ title, vodAssets }: SectionProps) => {
    return (
        <div>
            <StyledTitle>{title}</StyledTitle>
            <StyledSectionContainer>
                {vodAssets &&
                    vodAssets.map((vod) => {
                        return <VideoCard key={vod.id} vod={vod} />
                    })}
            </StyledSectionContainer>
        </div>
    )
}

export default Section
