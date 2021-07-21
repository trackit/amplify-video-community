import React from 'react'
import styled from 'styled-components'
import { CustomArrowProps } from 'react-slick'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const StyledArrow = styled.div`
    position: absolute;
    cursor: pointer;
    z-index: 10;
    color: black;

    & svg {
        transition: color 300ms;
    }

    & svg:hover {
        color: ${(props) => props.theme.palette.primary.main};
    }
`

const StyledNextArrow = styled(StyledArrow)`
    right: 0%;
    top 50%;
`

const NextArrow = ({ onClick }: CustomArrowProps) => {
    return (
        <StyledNextArrow onClick={onClick}>
            <FaArrowRight />
        </StyledNextArrow>
    )
}

const StyledPrevArrow = styled(StyledArrow)`
    left: 0%;
    top 50%;
`

const PrevArrow = ({ onClick }: CustomArrowProps) => {
    return (
        <StyledPrevArrow onClick={onClick}>
            <FaArrowLeft />
        </StyledPrevArrow>
    )
}

export { NextArrow, PrevArrow }
