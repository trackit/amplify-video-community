import React from 'react'
import { vodAsset } from '../../../models'

type SliderContextType = {
    onSelectSlide(movie: vodAsset): void
    onCloseSlide(): void
    elementRef: React.RefObject<HTMLInputElement>
    currentSlide: vodAsset | null
} | null

const SliderContext = React.createContext<SliderContextType>(null)

export default SliderContext
