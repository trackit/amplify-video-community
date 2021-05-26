import React from 'react'
import { IoClose } from 'react-icons/io5'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { fetchThumbnail } from '../../utilities'
import { Link } from 'gatsby'
import { vodAsset } from '../../../models'
import {Link} from "gatsby";
import awsvideoconfig from "../../../aws-video-exports";
import { VideoPlayer as VideoPlayerComponent } from "../index";
//import { useHistory } from 'react-router-dom'

const StyledContent = styled.div`
    position: relative;
    height: 37vw;
    margin-top: -40px;

    .__background,
    .__background__shadow,
    .__background__image,
    .__area {
        position: absolute;
        top: 0;
        bottom: 0;
    }

    .__background {
        left: 0;
        right: 0;

        &__shadow {
            left: 0;
            background: #000;
            width: 30%;
            z-index: 2;

            &:before {
                content: '';
                position: absolute;
                z-index: 10;
                background-image: linear-gradient(to right, #000, transparent);
                top: 0;
                bottom: 0;
                left: 100%;
                width: 275px;
            }
        }

        &__image {
            right: 0;
            width: 70%;
            height: 100%;
            background-position: center 10%;
            background-size: cover;
            z-index: 1;
        }
    }

    .__area {
        left: 0;
        right: 0;
        height: 100%;
        z-index: 3;

        &__container {
            padding: 30px 70px;
            color: wheat;

            &__title {
                font-size: 45px;
                color: #fff;
                font-weight: 700;
            }

            &__title:hover {
                cursor: pointer;
            }

            &__description {
                font-size: 18px;
                color: #999;
                margin-top: 20px;
                max-width: 500px;
            }
        }

        &__close {
            color: #fff;
            width: 40px;
            height: 40px;
            background: transparent;
            outline: none;
            border: none;
            position: absolute;
            top: 30px;
            right: 30px;
        }

        &__close:hover {
            cursor: pointer;
        }
    }
`

type ContentProps = {
    movie: vodAsset
    onClose(): void
}

const Content = ({ movie, onClose }: ContentProps) => {
    const [thumbnailUrl, setThumbnailUrl] = useState<string>('')

    useEffect(() => {
        ;(async () => {
            if (movie.thumbnail) {
                const data = await fetchThumbnail(movie)
                setThumbnailUrl(data as string)
            }
        })()
    }, [movie])

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
    }

    return (
        <StyledContent>
            <div className="__background">
                <div className="__background__shadow" />
                <div
                    className="__background__image"
                    style={{ backgroundImage: `url(${thumbnailUrl})` }}
                />
            </div>
            <div className="__area">
                <div className="__area__container">
                    <Link
                        to={`/video/${movie.id}`}
                        className="__area__container__title"
                    >
                        {movie.title}
                    </Link>
                    <div className="__area__container__description">
                        {movie.description}
                        {<VideoPlayerComponent {...videoJsOptions} />}
                    </div>
                </div>
                <button className="__area__close" onClick={onClose}>
                    <IoClose />
                </button>
            </div>
        </StyledContent>
    )
}

export default Content
