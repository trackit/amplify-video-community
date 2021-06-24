import React from 'react'
import styled from 'styled-components'
import Loader from 'react-loader-spinner'
import { navigate } from 'gatsby'
import { Thumbnail } from '../../types'
import { vodAsset } from '../../../models'

type VideoCardProps = {
    thumbnail: Thumbnail | undefined
    vod: vodAsset | undefined
}

const StyledVideoCard = styled.div`
    cursor: pointer;
    margin-left: 10px;
    margin-right: 10px;

    img {
        width: 21vw;
    }
`

const VideoCard = ({ vod, thumbnail }: VideoCardProps) => {
    const onClick = () => {
        navigate(`/video/${vod?.id}`)
    }

    return (
        <StyledVideoCard onClick={onClick}>
            {!thumbnail ? (
                <Loader
                    type="Rings"
                    color="#FFA41C"
                    height={100}
                    width={100}
                    timeout={3000}
                />
            ) : (
                <img src={thumbnail.url} alt="thumbnail" />
            )}
        </StyledVideoCard>
    )
}

export default VideoCard
