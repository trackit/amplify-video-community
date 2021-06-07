import React from 'react'
import styled from 'styled-components'

const StyledSliderWrapper = styled.div`
    padding: 40px 0;
    overflow: hidden;
    position: relative;
`

type SliderWrapperProps = {
    children: React.ReactNode
}

const SliderWrapper = ({ children }: SliderWrapperProps) => (
    <StyledSliderWrapper>{children}</StyledSliderWrapper>
)

export default SliderWrapper
