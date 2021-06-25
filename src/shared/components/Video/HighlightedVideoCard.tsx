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
    display: flex;
    justify-content: center;
    margin: 0 auto;
`

const Image = styled.img`
    cursor: pointer;
    height: 27vh;
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
                <Image src={thumbnail.url as string} alt="thumbnail" />
            )}
        </StyledHighlightedVideoCard>
    )
}

export default HighlightedVideoCard
