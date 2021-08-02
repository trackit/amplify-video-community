import React, { useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { FaPlayCircle } from 'react-icons/fa'
import Modal from 'react-modal'

import intro from '../../videos/introduction-video.mp4'

const LandingContainer = styled.div`
    background-color: black;
    width: 100vw;
    height: 100vh;
`

const VideoPlayer = styled.video`
    object-fit: cover;
    width: 100vw;
    height: 100vh;
    position: relative;
    top: 0;
    left: 0;
    z-index: 1;
`

const TextContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    top: -100vh;
    left: 0;
    z-index: 2;
`

const TextWrapper = styled.div`
    margin-left: 120px;
    width: 33%;
`

const TextShadow = css`
    text-shadow: 0px 4px 8px rgba(0, 0, 0, 0.6);
`

const Title = styled.h1`
    font-size: 48px;
    ${TextShadow}
    color: #ffffff;
    margin: 0;
`

const CommonText = css`
    font-size: 20px;
    ${TextShadow}
`

const Text = styled.p`
    ${CommonText}
    margin: 70px 0;
    color: #ffffff;
`

const OrangeText = styled.span`
    color: var(--amplify-primary-color);
`

const PlayButton = styled.button`
    background-color: rgba(0, 0, 0, 0);
    border: 0px;
    display: flex;
    align-items: center;
    cursor: pointer;
`

const ButtonText = styled.span`
    ${CommonText}
    color: #ffffff;
    margin-left: 20px;
`

const ModalVideoPlayer = styled.video`
    width: 90vw;
    height: 90vh;
`

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#000000',
        border: '0',
    },
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        zIndex: 1000,
    },
}

Modal.setAppElement('#___gatsby')

const Landing = () => {
    const [isModalDisplayed, setIsModalDisplayed] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    const handleDisplayModalVideo = () => {
        setIsModalDisplayed(true)
        console.log(videoRef)
        if (videoRef) videoRef?.current?.pause()
    }

    const handleHideModalVideo = () => {
        setIsModalDisplayed(false)
        if (videoRef) videoRef?.current?.play()
    }

    return (
        <LandingContainer>
            <VideoPlayer ref={videoRef} muted loop autoPlay id="amplifyVideo">
                <source src={intro} type="video/mp4" />
            </VideoPlayer>
            <TextContainer>
                <TextWrapper>
                    <Title>
                        Fastest, easiest way to build scalable mobile and web
                        apps.
                    </Title>
                    <Text>
                        Take a tour and find what{' '}
                        <OrangeText>Amplify Video</OrangeText> has in store for
                        you!
                    </Text>
                    <PlayButton onClick={handleDisplayModalVideo}>
                        <FaPlayCircle
                            style={{ filter: 'drop-shadow(2px 2px 2px black)' }}
                            size="50px"
                            color="white"
                        />
                        <ButtonText>Play introduction video</ButtonText>
                    </PlayButton>
                </TextWrapper>
            </TextContainer>
            <Modal
                isOpen={isModalDisplayed}
                onRequestClose={handleHideModalVideo}
                style={customStyles}
            >
                <ModalVideoPlayer controls>
                    <source src={intro} type="video/mp4" />
                </ModalVideoPlayer>
            </Modal>
        </LandingContainer>
    )
}

export default Landing
