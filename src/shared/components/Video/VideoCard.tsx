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
    display: flex;
    justify-content: center;
`

const Image = styled.img`
    cursor: pointer;
    width: 85%;
`

const VideoCard = ({ vod, thumbnail }: VideoCardProps) => {
    const onClick = () => {
        navigate(`/video/${vod?.id}`)
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
                <Image src={thumbnail.url} alt="thumbnail" onClick={onClick} />
            )}
        </StyledVideoCard>
    )
}

export default VideoCard
