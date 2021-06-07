import { useState, useRef, useEffect } from 'react'

const useSizeElement = () => {
    const elementRef = useRef<HTMLInputElement>(null)
    const [width, setWidth] = useState<number>(0)

    useEffect(() => {
        setWidth(elementRef?.current?.clientWidth as number)
    }, [])

    return { width, elementRef }
}

export default useSizeElement
