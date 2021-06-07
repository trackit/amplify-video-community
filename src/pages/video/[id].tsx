import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import { fetchVodAsset } from '../../shared/utilities/vod-fetch'
import {
    VideoPlayer as VideoPlayerComponent,
    Layout,
} from '../../shared/components'
import awsvideoconfig from '../../aws-video-exports'
import { videoObject, vodAsset } from '../../models'
import { PageProps } from 'gatsby'

type VideoPlayerProps = {
    video: videoObject | undefined
}

const VideoPlayer = ({ video }: VideoPlayerProps) => {
    const videoJsOptions = {
        autoplay: false,
        controls: true,
        sources: [
            {
                src: `https://${awsvideoconfig.awsOutputVideo}/${video?.id}/${video?.id}.m3u8`,
                type: 'application/x-mpegURL',
            },
        ],
        token: video?.token || '',
    }

    const Wrapper = styled.div`
        background: black;
    `
    return <Wrapper>{<VideoPlayerComponent {...videoJsOptions} />}</Wrapper>
}

type VideoCardProps = {
    asset: vodAsset
}

const VideoCard = ({ asset }: VideoCardProps) => {
    const Card = styled.div`
        padding: 10px;
        box-sizing: border-box;
    `

    const Title = styled.h2`
        margin-bottom: 0;
    `

    return (
        <Card>
            <VideoPlayer video={asset.video} />
            <Title>{asset.title}</Title>
            <p>{asset.description}</p>
        </Card>
    )
}

const VideoPage = (props: PageProps) => {
    const id = props.params.id
    const [asset, setAsset] = useState<vodAsset | null>(null)
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
        ;(async () => {
            try {
                const { data } = await fetchVodAsset(id)
                if (data?.getVodAsset === null) {
                    console.log('object doesnt exist')
                } else {
                    setAsset(data?.getVodAsset as vodAsset)
                    console.log(data)
                }
                setLoaded(true)
            } catch (error) {
                console.log(error)
                setLoaded(false)
            }
        })()
    }, [fetchVodAsset])

    return (
        <Layout>
            <>
                {asset === null ? (
                    <p>{!loaded ? 'Loading ...' : 'Video Not Found'}</p>
                ) : (
                    <VideoCard asset={asset} />
                )}
            </>
        </Layout>
    )
}

export default VideoPage
