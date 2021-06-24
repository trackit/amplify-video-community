import React from 'react'
import styled from 'styled-components'
import Loader from 'react-loader-spinner'
import { navigate } from 'gatsby'
import { Thumbnail } from '../../types'
import { vodAsset } from '../../../models'

type HighlightedVideoCardProps = {
    thumbnail: Thumbnail | undefined
    vod: vodAsset | undefined
}

const StyledHighlightedVideoCard = styled.div`
    cursor: pointer;
    margin-left: 10px;
    margin-right: 10px;
    flex-grow: 1;

    img {
        height: 27vh;
    }
`

const HighlightedVideoCard = ({
    vod,
    thumbnail,
}: HighlightedVideoCardProps) => {
    const onClick = () => {
        navigate(`/video/${vod?.id}`)
    }

    return (
        <StyledHighlightedVideoCard onClick={onClick}>
            {!thumbnail ? (
                <Loader
                    type="Rings"
                    color="#FFA41C"
                    height={100}
                    width={100}
                    timeout={3000}
                />
            ) : (
                <img src={thumbnail.url as string} alt="thumbnail" />
            )}
        </StyledHighlightedVideoCard>
    )
}

export default HighlightedVideoCard
