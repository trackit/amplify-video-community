import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import { vodAsset, section } from '../../../models'
import VideoCard from '../Video/VideoCard'
import { Thumbnail } from '../../types'

type SectionProps = {
    section: section
    vodAssets: Array<vodAsset>
    thumbnails: Array<Thumbnail>
}

const StyledTitle = styled.h1``

const Slide = styled.div`
    margin: 0 auto;
`

const StyledSection = styled.div`
    margin: 0 15px;
`

const Section = ({ section, vodAssets, thumbnails }: SectionProps) => {
    const [filteredAssets, setFilteredAssets] = useState<Array<vodAsset>>([])
    const slidesToShow = (slidesNumber: number) =>
        filteredAssets.length >= slidesNumber
            ? slidesNumber
            : filteredAssets.length
    const sliderSettings = {
        infinite: true,
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
                // eslint-disable-next-line
                asset.sections?.items.forEach((item) => {
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
                                        asset?.thumbnail?.id ===
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

export default Section
