import React from 'react'
import CSS from 'csstype'
import Loader from 'react-loader-spinner'

type LoaderSpinnerProps = {
    type?:
        | 'Audio'
        | 'BallTriangle'
        | 'Bars'
        | 'Circles'
        | 'Grid'
        | 'Hearts'
        | 'Oval'
        | 'Puff'
        | 'Rings'
        | 'TailSpin'
        | 'ThreeDots'
        | 'Watch'
        | 'RevolvingDot'
        | 'Triangle'
        | 'Plane'
        | 'MutatingDots'
        | 'CradleLoader'
    color?: string
    height?: number
    width?: number
    timeout?: number
}

type BasicLoaderProps = {
    style?: CSS.Properties
    loader?: LoaderSpinnerProps
}

const BasicLoader = ({ style, loader }: BasicLoaderProps) => {
    const defaultStyle: CSS.Properties = {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%)',
    }

    return (
        <div style={style || defaultStyle}>
            <Loader
                type={loader?.type || 'Bars'}
                color={loader?.color || '#FFA41C'}
                height={loader?.height || 100}
                width={loader?.width || 100}
                timeout={loader?.timeout || 3000}
            />
        </div>
    )
}

export default BasicLoader
