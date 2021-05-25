import * as React from "react"
import styled from 'styled-components'

const StyledSliderWrapper = styled.div`
    padding: 40px 0;
    overflow: hidden;
    position: relative;
`

const SliderWrapper = ({ children }: any) => (
    <StyledSliderWrapper>{children}</StyledSliderWrapper>
)

export default SliderWrapper
