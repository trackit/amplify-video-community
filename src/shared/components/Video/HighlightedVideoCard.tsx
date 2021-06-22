import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { vodAsset } from '../../../models'
import { fetchThumbnail } from '../../utilities'
import Loader from 'react-loader-spinner'
import { navigate } from 'gatsby'

type HighlightedVideoCardProps = {
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

const HighlightedVideoCard = ({ vod }: HighlightedVideoCardProps) => {
    const [thumbnailUrl, setThumbnailUrl] = useState<string>('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        ;(async () => {
            try {
                if (vod?.thumbnail) {
                    setLoading(true)
                    const data = await fetchThumbnail(vod)
                    setThumbnailUrl(data as string)
                    setLoading(false)
                }
            } catch (error) {
                console.error('item.tsx(fetchThumbnail):')
            }
        })()
    }, [vod])

    const onClick = () => {
        navigate(`/video/${vod?.id}`)
    }

    return (
        <StyledHighlightedVideoCard onClick={onClick}>
            {loading ? (
                <Loader
                    type="Rings"
                    color="#FFA41C"
                    height={100}
                    width={100}
                    timeout={3000}
                />
            ) : (
                <img src={thumbnailUrl as string} alt="thumbnail" />
            )}
        </StyledHighlightedVideoCard>
    )
}

export default HighlightedVideoCard
