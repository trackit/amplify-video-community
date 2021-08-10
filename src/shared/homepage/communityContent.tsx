import React from 'react'
import styled from 'styled-components'

import VideoList from '../components/YoutubeVideoPlayer/list'

const Container = styled.div`
    padding: 100px 0;
    background-color: #f9f9f9;
`

const Title = styled.h2`
    font-weight: 600;
    font-size: 28px;
    margin: 0 0 0 100px;
`

const OrangeText = styled.span`
    color: #ff9900;
`

const fakeList = [
    { url: 'https://www.youtube.com/watch?v=vM_YoZbLQQ0', id: 'vM_YoZbLQQ0' },
    { url: 'https://www.youtube.com/watch?v=7ekxPmVNV8k', id: '7ekxPmVNV8k' },
    { url: 'https://www.youtube.com/watch?v=vM_YoZbLQQ0', id: 'vM_YoZbLQQ0' },
    { url: 'https://www.youtube.com/watch?v=7ekxPmVNV8k', id: '7ekxPmVNV8k' },
    { url: 'https://www.youtube.com/watch?v=7ekxPmVNV8k', id: '7ekxPmVNV8k' },
    { url: 'https://www.youtube.com/watch?v=vM_YoZbLQQ0', id: 'vM_YoZbLQQ0' },
    { url: 'https://www.youtube.com/watch?v=7ekxPmVNV8k', id: '7ekxPmVNV8k' },
]

const CommunityContent = () => {
    return (
        <Container>
            <Title>
                <OrangeText>Explore</OrangeText> and{' '}
                <OrangeText>discover</OrangeText> the content made by our{' '}
                <OrangeText>community.</OrangeText>
            </Title>
            <VideoList
                videoInfos={fakeList}
                config={{
                    width: 480,
                    height: 270,
                }}
            />
            <Title>
                Follow tutorials to get started with{' '}
                <OrangeText>Amplify Video.</OrangeText>
            </Title>
            <VideoList
                videoInfos={fakeList}
                config={{
                    width: 480,
                    height: 270,
                }}
            />
        </Container>
    )
}

export default CommunityContent
