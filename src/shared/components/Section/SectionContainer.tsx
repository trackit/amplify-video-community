import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'

import { VideoOnDemand, Section, Thumbnail } from '../../../models'
import VideoCard from '../Video/VideoCard'

type SectionProps = {
    section: Section
    vodAssets: Array<VideoOnDemand>
    thumbnails: Array<{
        obj: Thumbnail | undefined
        url: string
    }>
}

const StyledTitle = styled.h2``

const Slide = styled.div`
    margin: 0 auto;
`

const StyledSection = styled.div`
    margin: 0 15px;
    border-bottom: 1px solid ${(props) => props.theme.palette.primary.ternary};

    &:last-child {
        border-bottom: none;
    }
`

const SectionContainer = ({ section, vodAssets, thumbnails }: SectionProps) => {
    const [filteredAssets, setFilteredAssets] = useState<Array<VideoOnDemand>>(
        []
    )
    const slidesToShow = (slidesNumber: number) =>
        filteredAssets.length >= slidesNumber
            ? slidesNumber
            : filteredAssets.length
    const sliderSettings = {
        infinite: false,
        draggable: true,
        swipe: true,
        swipeToSlide: true,
        speed: 300,
        slidesToShow: slidesToShow(5),
        centerPadding: 0,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: slidesToShow(3),
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: slidesToShow(1),
                },
            },
        ],
    }

    useEffect(() => {
        setFilteredAssets(
            vodAssets.filter((asset) => {
                let returnValue = false
                // TODO: create according model for vodAssets (with sections details from custom graphql call)
                // eslint-disable-next-line
                asset.media?.sections?.items.forEach((item) => {
                    if (item?.section.id === section.id) {
                        returnValue = true
                    }
                })
                return returnValue
            })
        )
    }, [])

    return (
        <StyledSection>
            <StyledTitle>{section.label}</StyledTitle>
            <Slider {...sliderSettings}>
                {filteredAssets &&
                    filteredAssets.map((asset) => (
                        <Slide key={asset.id}>
                            <VideoCard
                                thumbnail={thumbnails.find(
                                    (thumbnail) =>
                                        asset.media?.thumbnail?.id ===
                                        thumbnail.obj?.id
                                )}
                                vod={asset}
                            />
                        </Slide>
                    ))}
            </Slider>
        </StyledSection>
    )
}

export default SectionContainer
