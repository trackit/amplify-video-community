import React from 'react'
import styled from 'styled-components'
import Loader from 'react-loader-spinner'
import { navigate } from 'gatsby'
import { VideoOnDemand, Thumbnail } from '../../../models'

type VideoCardProps = {
    thumbnail:
        | {
              obj: Thumbnail | undefined
              url: string
          }
        | undefined
    vod: VideoOnDemand | undefined
}

const StyledVideoCard = styled.div`
    display: flex;
    justify-content: center;
`

const Image = styled.img`
    cursor: pointer;
    width: 100%;
    transform: scale(0.85);
`

const VideoCard = ({ vod, thumbnail }: VideoCardProps) => {
    const onClick = () => {
        navigate(`/video/${vod?.id}`)
    }
    console.log(thumbnail)

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
