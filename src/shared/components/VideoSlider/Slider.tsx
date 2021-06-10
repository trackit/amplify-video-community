import React, { useState } from 'react'
import SliderContext from './Context'
import Content from './Content'
import SlideButton from './SlideButton'
import SliderWrapper from './SliderWrapper'
import useSliding from './useSliding'
import useSizeElement from './useSizeElement'
import styled from 'styled-components'
import { StyledItem } from './Item'
import { StyledShowDetailsButton } from './ShowDetailsButton'
import { vodAsset } from '../../../models'

const StyledSlider = styled.div`
    display: flex;
    position: relative;

    &:not(&.--open) ${StyledItem}:hover ${StyledShowDetailsButton} {
        opacity: 1;
    }

    &:not(&.--open) ${StyledItem}:hover {
        transform: scale(1.5) !important;
    }

    &:not(&.--open):hover ${StyledItem} {
        transform: translateX(-25%);
    }

    &:not(&.--open) ${StyledItem}:hover ~ ${StyledItem} {
        transform: translateX(25%);
    }
`

const Container = styled.div`
    display: flex;
    padding: 0 55px;
    transition: transform 300ms ease 100ms;
    z-index: 3;
    width: 100%;
`

type SliderProps = {
    children: React.ReactNode
}

const Slider = ({ children }: SliderProps) => {
    const [currentSlide, setCurrentSlide] = useState<vodAsset | null>(null)
    const { width, elementRef } = useSizeElement()
    const {
        handlePrev,
        handleNext,
        slideProps,
        containerRef,
        hasNext,
        hasPrev,
    } = useSliding(width, React.Children.count(children))

    const handleSelect = (movie: vodAsset) => {
        setCurrentSlide(movie)
    }

    const handleClose = () => {
        setCurrentSlide(null)
    }

    const contextValue = {
        onSelectSlide: handleSelect,
        onCloseSlide: handleClose,
        elementRef,
        currentSlide,
    }

    return (
        <SliderContext.Provider value={contextValue}>
            <SliderWrapper>
                <StyledSlider className={currentSlide != null ? '--open' : ''}>
                    <Container ref={containerRef} {...slideProps}>
                        {children}
                    </Container>
                </StyledSlider>
                {hasPrev && <SlideButton onClick={handlePrev} type="prev" />}
                {hasNext && <SlideButton onClick={handleNext} type="next" />}
            </SliderWrapper>
            {currentSlide && (
                <Content movie={currentSlide} onClose={handleClose} />
            )}
        </SliderContext.Provider>
    )
}

export default Slider
