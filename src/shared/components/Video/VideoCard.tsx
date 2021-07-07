import React from 'react'
import styled from 'styled-components'
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
}

const StyledVideoCard = styled.div`
    width: calc(0.29 * 100vw);
    display: flex;
    justify-content: center;
`

const VideoCard = ({ vod, thumbnail, style }: VideoCardProps) => {
    const onClick = () => {
        navigate(`/video/${vod?.id}`)
    }

    const defaultStyle: CSS.Properties = {
        cursor: 'pointer',
        width: '100%',
        transform: 'scale(0.85)',
        boxShadow: 'black 0px 0px 10px',
    }

    return (
        <StyledVideoCard>
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
                    style={style || defaultStyle}
                    src={thumbnail.url}
                    alt="thumbnail"
                    onClick={onClick}
                />
            )}
        </StyledVideoCard>
    )
}

export default VideoCard
