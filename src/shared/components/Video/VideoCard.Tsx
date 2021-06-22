import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { vodAsset } from '../../../models'
import { fetchThumbnail } from '../../utilities'
import Loader from 'react-loader-spinner'
import { navigate } from 'gatsby'

type VideoCardProps = {
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

const VideoCard = ({ vod }: VideoCardProps) => {
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
        console.log('wesh la zone')
        navigate(`/video/${vod?.id}`)
    }

    return (
        <StyledVideoCard onClick={onClick}>
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
        </StyledVideoCard>
    )
}

export default VideoCard
