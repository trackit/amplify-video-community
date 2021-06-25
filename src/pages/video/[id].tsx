import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Loader from 'react-loader-spinner'
import { PageProps } from 'gatsby'

import awsvideoconfig from '../../aws-video-exports'
import { fetchVodAsset, fetchVodFiles } from '../../shared/utilities/vod-fetch'
import { fetchSections } from '../../shared/utilities/fetch'
import {
    VideoPlayer as VideoPlayerComponent,
    Layout,
    Section,
    HighlightedSection,
} from '../../shared/components'
import { videoObject, vodAsset, section } from '../../models'

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
    }

    const Wrapper = styled.div`
        background: black;
    `
    return <Wrapper>{<VideoPlayerComponent {...videoJsOptions} />}</Wrapper>
}

type VideoCardProps = {
    asset: vodAsset
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
            <VideoPlayer video={asset.video} />
            <Title>{asset.title}</Title>
            <p>{asset.description}</p>
        </Card>
    )
}

const SectionContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const VideoPage = (props: PageProps) => {
    const id = props.params.id
    const [asset, setAsset] = useState<vodAsset | null>(null)
    const [loaded, setLoaded] = useState<boolean>(false)
    const [vodAssets, setVodAssets] = useState<Array<vodAsset>>([])
    const [sections, setSections] = useState<Array<section> | null>(null)
    const [nextTokenVodFiles, setNextTokenVodFiles] =
        useState<string | null>(null)
    const [loadingVodFiles, setLoadingVodFiles] = useState<boolean>(false)
    const [loadingSections, setLoadingSections] = useState<boolean>(false)

    useEffect(() => {
        ;(async () => {
            try {
                const { data } = await fetchVodAsset(id)
                if (data?.getVodAsset === null) {
                    console.log('object doesnt exist')
                } else {
                    setAsset(data?.getVodAsset as vodAsset)
                }
                setLoaded(true)
            } catch (error) {
                console.log(error)
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
                    data?.listVodAssets?.nextToken
                        ? data.listVodAssets.nextToken
                        : null
                )
                setVodAssets(data?.listVodAssets?.items as Array<vodAsset>)
                console.log('fetchVodFiles: ', data)
            } catch (error) {
                console.error('videos.tsx(fetchVodFiles):', error)
            }
            setLoadingVodFiles(false)
        })()
    }, [nextTokenVodFiles])

    useEffect(() => {
        ;(async () => {
            setLoadingSections(true)
            try {
                const { data } = await fetchSections()
                setSections(data?.listSections?.items as Array<section>)
                console.log('fetchSections: ', data)
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
                    <SectionContainer>
                        {sections &&
                            sections.map((section: section) => {
                                return section.label === 'Highlighted' ? (
                                    <HighlightedSection
                                        key={section.id}
                                        title={section.label}
                                        vodAsset={vodAssets
                                            .filter(
                                                (item: vodAsset) =>
                                                    item.highlighted
                                            )
                                            .pop()}
                                    />
                                ) : (
                                    <Section
                                        key={section.id}
                                        title={section.label}
                                        vodAssets={vodAssets}
                                    />
                                )
                            })}
                    </SectionContainer>
                )}
            </>
        </Layout>
    )
}

export default VideoPage
