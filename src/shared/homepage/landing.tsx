import React, { useRef, useState } from 'react'
import styled from 'styled-components'
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

    const handleHideModalVideo = () => {
        setIsModalDisplayed(false)
        if (videoRef) videoRef?.current?.play()
    }

    return (
        <LandingContainer>
            <VideoPlayer ref={videoRef} muted loop autoPlay id="amplifyVideo">
                <source src={intro} type="video/mp4" />
            </VideoPlayer>
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
