import React from 'react'
import { IoClose } from 'react-icons/io5'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { vodAsset } from '../../../models'
import awsvideoconfig from '../../../aws-video-exports'
import { VideoPlayer as VideoPlayerComponent } from '../index'

const StyledContent = styled.div`
    position: relative;
    height: 38vw;
    margin-top: -40px;
`

const Background = styled.div`
    background: var(--amplify-secondary-color);
    width: 100%;
    position: absolute;
    z-index: 2;
    top: 0;
    bottom: 0;
`

const Container = styled.div`
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    position: absolute;

    height: 100%;
    z-index: 3;
    padding: 45px 40px;
    color: wheat;
    display: flex;
    flex-direction: row;

    @media (max-width: 1000px) {
        flex-direction: column;
        padding: 30px 5px 0px 5px;
    }
`

const CloseButton = styled.button`
    color: #fff;
    width: 40px;
    height: 40px;
    background: transparent;
    outline: none;
    border: none;
    position: absolute;
    top: 0;
    right: 5px;
`

const PresentationContainer = styled.div`
    flex: 35%;

    @media (max-width: 1000px) {
        flex: 100%;
    }
`

const Title = styled(Link)`
    font-size: var(--amplify-text-lg);
    color: var(--amplify-secondary-contrast);
    font-weight: 700;

    &hover {
        cursor: pointer;
    }
`

const Description = styled.div`
    padding-top: 20px;
    padding-right: 20px;
    font-size: var(--amplify-text-sm);
    color: var(--amplify-secondary-contrast);
    text-align: justify;
`

const PlayerContainer = styled.div`
    flex: 60%;
    vertical-align: top;
    margin-right: 0;

    @media (max-width: 1000px) {
        display: none;
    }
`

type ContentProps = {
    movie: vodAsset
    onClose(): void
}

const Content = ({ movie, onClose }: ContentProps) => {
    const videoJsOptions = {
        autoplay: true,
        controls: true,
        sources: [
            {
                src: `https://${awsvideoconfig.awsOutputVideo}/${movie.video.id}/${movie.video.id}.m3u8`,
                type: 'application/x-mpegURL',
            },
        ],
        token: movie.video.token,
        width: '100%',
    }

    return (
        <StyledContent>
            <Background />
            <Container>
                <PresentationContainer>
                    <Title to={`/video/${movie.id}`}>{movie.title}</Title>
                    <Description>{movie.description}</Description>
                </PresentationContainer>
                <PlayerContainer>
                    {<VideoPlayerComponent {...videoJsOptions} />}
                </PlayerContainer>
            </Container>
            <CloseButton onClick={onClose}>
                <IoClose />
            </CloseButton>
        </StyledContent>
    )
}

export default Content
