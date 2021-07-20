import React from 'react'
import styled from 'styled-components'

import {
    VideoPlayer as VideoPlayerComponent,
    Layout,
} from '../shared/components'

type VideoPlayerProps = {
    source: string
}

const VideoPlayerWrapper = styled.div`
    background: black;
`

const VideoPlayer = ({ source }: VideoPlayerProps) => {
    const videoJsOptions = {
        autoplay: false,
        controls: true,
        sources: [
            {
                src: `${source}`,
                type: 'application/x-mpegURL',
            },
        ],
    }
    return (
        <VideoPlayerWrapper>
            <VideoPlayerComponent {...videoJsOptions} />
        </VideoPlayerWrapper>
    )
}

const LiveApp = () => {
    return (
        <Layout
            seo={{
                title: 'Amplify Video Community - ' + 'Live',
                description:
                    'On Amplify Video Community you can see our live videos created through AWS Amplify Video.',
            }}
        >
            <VideoPlayer
                source={'https://dcw3cwpfmf2pb.cloudfront.net/index.m3u8'}
            />
        </Layout>
    )
}

export default LiveApp
