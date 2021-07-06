import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Loader from 'react-loader-spinner'
import { PageProps } from 'gatsby'

import awsvideoconfig from '../../aws-video-exports'
import { fetchVodAsset, fetchVodFiles } from '../../shared/utilities/vod-fetch'
import { fetchSections, fetchThumbnail } from '../../shared/utilities'
import {
    VideoPlayer as VideoPlayerComponent,
    Layout,
    SectionContainer,
    HighlightedSection,
} from '../../shared/components'
import { VideoOnDemand, Section, Thumbnail } from '../../models'

type VideoPlayerProps = {
    video: VideoOnDemand | undefined
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
    }

    const Wrapper = styled.div`
        background: black;
    `
    return <Wrapper>{<VideoPlayerComponent {...videoJsOptions} />}</Wrapper>
}

type IframeVideoPlayerProps = {
    asset: VideoOnDemand
}

const IframeVideoPlayer = ({ asset }: IframeVideoPlayerProps) => {
    const Wrapper = styled.div`
        display: flex;
        background-color: black;
        justify-content: center;
    `

    return (
        <Wrapper>
            <iframe
                width="1280"
                height="720"
                src={asset.src}
                title={asset.media?.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </Wrapper>
    )
}

type VideoCardProps = {
    asset: VideoOnDemand
}

const Card = styled.div`
    padding: 10px;
    box-sizing: border-box;
`

const Title = styled.h2`
    margin-bottom: 0;
`

const VideoCard = ({ asset }: VideoCardProps) => {
    return (
        <Card>
            {asset.src === null ? (
                <VideoPlayer video={asset} />
            ) : (
                <IframeVideoPlayer asset={asset} />
            )}
            <Title>{asset.media?.title}</Title>
            <p>{asset.media?.description}</p>
        </Card>
    )
}

const StyledSection = styled.div`
    display: flex;
    flex-direction: column;
`

const VideoPage = (props: PageProps) => {
    const id = props.params.id
    const [asset, setAsset] = useState<VideoOnDemand | null>(null)
    const [loaded, setLoaded] = useState<boolean>(false)
    const [vodAssets, setVodAssets] = useState<Array<VideoOnDemand>>([])
    const [sections, setSections] = useState<Array<Section>>([])
    const [nextTokenVodFiles, setNextTokenVodFiles] =
        useState<string | null>(null)
    const [loadingVodFiles, setLoadingVodFiles] = useState<boolean>(false)
    const [loadingSections, setLoadingSections] = useState<boolean>(false)
    const [thumbnails, setThumbnails] = useState<
        Array<{
            obj: Thumbnail | undefined
            url: string
        }>
    >([])

    useEffect(() => {
        ;(async () => {
            try {
                const { data } = await fetchVodAsset(id)
                if (data?.getVideoOnDemand === null) {
                    console.error('object doesnt exist')
                } else {
                    setAsset(data?.getVideoOnDemand as VideoOnDemand)
                }
                setLoaded(true)
            } catch (error) {
                console.error(error)
                setLoaded(false)
            }
        })()
    }, [fetchVodAsset])

    useEffect(() => {
        ;(async () => {
            setLoadingVodFiles(true)
            try {
                const { data } = await fetchVodFiles(nextTokenVodFiles)
                setNextTokenVodFiles(
                    data?.listVideoOnDemands?.nextToken
                        ? data.listVideoOnDemands.nextToken
                        : null
                )
                const assets = data?.listVideoOnDemands
                    ?.items as Array<VideoOnDemand>
                setVodAssets(assets)

                const thumbnailArr: Array<{
                    obj: Thumbnail | undefined
                    url: string
                }> = []
                await Promise.all(
                    assets.map(async (asset) => {
                        const data = await fetchThumbnail(asset)
                        thumbnailArr.push({
                            obj: asset.media?.thumbnail,
                            url: data as string,
                        })
                    })
                )
                setThumbnails(thumbnailArr)
            } catch (error) {
                console.error('video/[id].tsx(fetchVodFiles):', error)
            }
            setLoadingVodFiles(false)
        })()
    }, [nextTokenVodFiles])

    useEffect(() => {
        ;(async () => {
            setLoadingSections(true)
            try {
                const { data } = await fetchSections()
                setSections(data?.listSections?.items as Array<Section>)
            } catch (error) {
                console.error('videos.tsx(fetchSections)', error)
            }
            setLoadingSections(false)
        })()
    }, [])

    return (
        <Layout>
            <>
                {asset === null ? (
                    <p>{!loaded ? 'Loading ...' : 'Video Not Found'}</p>
                ) : (
                    <VideoCard asset={asset} />
                )}
                {loadingVodFiles || loadingSections ? (
                    <Loader
                        type="Bars"
                        color="#FFA41C"
                        height={100}
                        width={100}
                        timeout={3000}
                    />
                ) : (
                    <StyledSection>
                        {sections &&
                            sections.map((section: Section) => {
                                return section.label === 'Highlighted' ? (
                                    <HighlightedSection
                                        key={section.id}
                                        title={section.label}
                                        thumbnails={thumbnails}
                                        vodAsset={vodAssets
                                            .filter(
                                                (item: VideoOnDemand) =>
                                                    item.media?.highlighted
                                            )
                                            .pop()}
                                    />
                                ) : (
                                    <SectionContainer
                                        key={section.id}
                                        section={section}
                                        vodAssets={vodAssets}
                                        thumbnails={thumbnails}
                                    />
                                )
                            })}
                    </StyledSection>
                )}
            </>
        </Layout>
    )
}

export default VideoPage
