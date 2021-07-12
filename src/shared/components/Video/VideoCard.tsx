import React from 'react'
import Loader from 'react-loader-spinner'
import { navigate } from 'gatsby'
import CSS from 'csstype'

import { VideoOnDemand, Thumbnail } from '../../../models'

type VideoCardProps = {
    thumbnail:
        | {
              obj: Thumbnail | undefined
              url: string
          }
        | undefined
    vod: VideoOnDemand | undefined
    style?: CSS.Properties
    imgStyle?: CSS.Properties
}

const VideoCard = ({ vod, thumbnail, imgStyle, style }: VideoCardProps) => {
    const onClick = () => {
        navigate(`/video/${vod?.id}`)
    }

    const defaultImgStyle: CSS.Properties = {
        cursor: 'pointer',
        width: '100%',
        transform: 'scale(0.85)',
        boxShadow: 'black 0px 0px 10px',
    }

    return (
        <div style={style}>
            {!thumbnail ? (
                <Loader
                    type="Rings"
                    color="#FFA41C"
                    height={100}
                    width={100}
                    timeout={3000}
                />
            ) : (
                <img
                    style={imgStyle || defaultImgStyle}
                    src={thumbnail.url}
                    alt="thumbnail"
                    onClick={onClick}
                />
            )}
        </div>
    )
}

export default VideoCard
