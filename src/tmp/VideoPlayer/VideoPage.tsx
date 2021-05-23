import React, { useEffect, useState } from 'react'
import { fetchVodAsset } from '../../shared/utilities/vod-fetch'
import { NavBar, VideoPlayer as VideoPlayerComponent } from '../../shared/components'
import awsvideoconfig from '../../aws-video-exports'
import styled from 'styled-components'

const VideoPlayer = ({ video }: any) => {
    const videoJsOptions = {
        autoplay: false,
        controls: true,
        sources: [
            {
                src: `https://${awsvideoconfig.awsOutputVideo}/${video.id}/${video.id}.m3u8`,
                type: 'application/x-mpegURL',
            },
        ],
        token: video.token,
    }

    const Wrapper = styled.div`
      background: black;
    `;

    return (
        <Wrapper>
            {<VideoPlayerComponent {...videoJsOptions} />}
        </Wrapper>
    );
}

const VideoCard = ({ asset }: any) => {
    const Card = styled.div`
      padding: 10px;
      box-sizing: border-box;
    `;

    const Title = styled.h2`
      margin-bottom: 0;
    `;

    return (
        <Card>
            <VideoPlayer video={asset.video} />
            <Title>{asset.title}</Title>
            <p>{asset.description}</p>
        </Card>
    )
}

const VideoPage = (props: any) => {
    const id: any = props.params.id;
    const [asset, setAsset] = useState(null)
    const [loaded, setLoaded] = useState(false)

    useEffect (() => {
        ;(async () => {
            try {
                const data: any = await fetchVodAsset(id);
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

    const ShowVideoCard = () => {
        if (asset != null) {
            return <VideoCard asset={asset} />;
        }
        const videoState = !loaded ? "Loading ..." : "Video Not Found";
        return <p>{ videoState }</p>;
    }

    return (
        <div>
            <NavBar />
            <ShowVideoCard />
        </div>
    )
}

export default VideoPage
