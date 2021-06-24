import React, { useState } from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import { NextArrow, PrevArrow } from './Arrows'
import VideoCard from '../Video/VideoCard'
import { Thumbnail } from '../../types'
import { vodAsset } from '../../../models'

type VideoCardSliderProps = {
    thumbnails: Array<Thumbnail>
    vod: Array<vodAsset>
}

const StyledVideoCardSlider = styled.div`
    margin: 4vh;
`

const Slide = styled.div`
    transform: scale(0.8);
    transition: transform 300ms;
    opacity: 0.5;

    & img {
        width: 40vw;
        margin: 0 auto;
    }
`

const ActiveSlide = styled(Slide)`
    transform: scale(1);
    opacity: 1;
    z-index: 5;
`

const VideoCardSlider = ({ vod, thumbnails }: VideoCardSliderProps) => {
    const [imageIndex, setImageIndex] = useState<number>(0)

    const sliderSettings = {
        infinite: true,
        className: 'center',
        centerMode: true,
        lazyLoad: true,
        autoplay: true,
        autoplaySpeed: 3500,
        draggable: true,
        speed: 300,
        slidesToShow: 3,
        centerPadding: 0,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        beforeChange: (current: number, next: number) => setImageIndex(next),
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    }

    return (
        <StyledVideoCardSlider>
            <Slider {...sliderSettings}>
                {thumbnails &&
                    thumbnails.map((thumbnail, idx) =>
                        idx === imageIndex ? (
                            <ActiveSlide key={thumbnail.obj?.id}>
                                <VideoCard
                                    thumbnail={thumbnail}
                                    vod={vod.find(
                                        (asset) =>
                                            asset?.thumbnail?.id ===
                                            thumbnail.obj?.id
                                    )}
                                />
                            </ActiveSlide>
                        ) : (
                            <Slide key={thumbnail.obj?.id}>
                                <VideoCard
                                    thumbnail={thumbnail}
                                    vod={vod.find(
                                        (asset) =>
                                            asset?.thumbnail?.id ===
                                            thumbnail.obj?.id
                                    )}
                                />
                            </Slide>
                        )
                    )}
            </Slider>
        </StyledVideoCardSlider>
    )
}

export default VideoCardSlider
