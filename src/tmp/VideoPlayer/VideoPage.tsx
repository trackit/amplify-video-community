import React, { useEffect, useState } from 'react'
import { fetchVodAsset } from '../../shared/utilities/vod-fetch'
import { API } from 'aws-amplify'
import { NavBar, VideoPlayer } from '../../shared/components'
import awsvideoconfig from '../../aws-video-exports'
import './VideoPage.css'
import { GraphQLResult } from '@aws-amplify/api-graphql'

const VideoCard = ({ asset }: any) => {
    const videoJsOptions = {
        autoplay: false,
        controls: true,
        sources: [
            {
                src: `https://${awsvideoconfig.awsOutputVideo}/${asset.video.id}/${asset.video.id}.m3u8`,
                type: 'application/x-mpegURL',
            },
        ],
        token: asset.video.token,
    }

    return (
        <div className="video">
            <div className="video-wrapper">
                {<VideoPlayer {...videoJsOptions} />}
            </div>
            <h2>{asset.title}</h2>
            <p>{asset.description}</p>
        </div>
    )
}

const VideoPage = (props: any) => {
    const id: any = props.params.id;
    const [asset, setAsset] = useState(null)
    const [loaded, setLoaded] = useState(false)

    useEffect (() => {
        ;(async () => {
            try {
                const data = await fetchVodAsset(id);
                if (data.data.getVodAsset === null) {
                    console.log('object doesnt exist')
                } else {
                    setAsset(data.data.getVodAsset)
                    console.log(data)
                }
                setLoaded(true)
            }
            catch (error){
                console.log(error)
                setLoaded(false)
            }
        })()
    },
    [fetchVodAsset]
    )

    return (
        <div>
            <NavBar />
            {asset !== null ? (
                <VideoCard asset={asset} />
            ) : !loaded ? (
                <p>Loading ...</p>
            ) : (
                <p>Video Not Found</p>
            )}
        </div>
    )
}

export default VideoPage
