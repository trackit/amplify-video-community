import React from 'react'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import {
    Layout,
    VideosSectionContainer,
    BasicLoader,
} from '../../shared/components'
import {
    fetchSections,
    fetchVodFiles,
    fetchThumbnail,
} from '../../shared/utilities'
import { Thumbnail, VideoOnDemand, Section } from '../../models'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
    background-color: #f9f9f9;
    padding-bottom: 100px;
`

const Header = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Title = styled.h1`
    margin: 0;
    margin-bottom: 20px;
    margin-top: 50px;
    font-size: 36px;
    font-weight: 700px;
`

const Separator = styled.div`
    background-color: #ff9900;
    height: 1.5px;
    width: 105px;
    margin-bottom: 20px;
`

const Description = styled.h2`
    font-size: 18px;
    font-weight: 400px;
    font-style: normal;
    margin: 0;
`

const LoaderWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const VideoPage = () => {
    const [vodAssets, setVodAssets] = useState<Array<VideoOnDemand>>([])
    const [thumbnails, setThumbnails] = useState<
        Array<{
            obj: Thumbnail | undefined
            url: string
        }>
    >([])
    const [sections, setSections] = useState<Array<Section> | null>(null)
    const [loadingVodFiles, setLoadingVodFiles] = useState<boolean>(false)
    const [loadingSections, setLoadingSections] = useState<boolean>(false)
    const [haveHighlightedContent, setHaveHighlightedContent] = useState(false)

    useEffect(() => {
        ;(async () => {
            setLoadingVodFiles(true)
            try {
                const { data } = await fetchVodFiles(null)
                const assets = data?.listVideoOnDemands
                    ?.items as Array<VideoOnDemand>
                setVodAssets(assets)
                const thumbnailArr: Array<{
                    obj: Thumbnail | undefined
                    url: string
                }> = []
                if (
                    assets.findIndex(
                        (elem) => elem.media?.highlighted === true
                    ) !== -1
                ) {
                    setHaveHighlightedContent(true)
                }
                await Promise.all(
                    assets.map(async (asset) => {
                        if (asset.media?.thumbnail?.src != null) {
                            thumbnailArr.push({
                                obj: asset.media.thumbnail,
                                url: asset.media.thumbnail.src,
                            })
                        } else {
                            const data = await fetchThumbnail(asset.media)
                            thumbnailArr.push({
                                obj: asset.media?.thumbnail,
                                url: data as string,
                            })
                        }
                    })
                )
                setThumbnails(thumbnailArr)
            } catch (error) {
                console.error('videos.tsx(fetchVodFiles):', error)
            }
            setLoadingVodFiles(false)
        })()
    }, [])

    useEffect(() => {
        ;(async () => {
            setLoadingSections(true)
            try {
                const { data } = await fetchSections()
                let nonce = true
                const list = data?.listSections?.items as Array<Section>
                if (haveHighlightedContent) {
                    list.forEach((item, index, arr) => {
                        if (arr.length <= 3 && nonce) {
                            arr.push({
                                label: 'Highlighted',
                                id: `Highlighted${index}`,
                                description: 'Highlighted content',
                            })
                            nonce = false
                        }
                        if (
                            index % 3 === 0 &&
                            index !== 0 &&
                            item?.label !== 'Highlighted'
                        ) {
                            arr.splice(index, 0, {
                                label: 'Highlighted',
                                id: `Highlighted${index}`,
                                description: 'Highlighted content',
                            })
                        }
                    })
                }
                setSections(list)
            } catch (error) {
                console.error('videos.tsx(fetchSections)', error)
            }
            setLoadingSections(false)
        })()
    }, [])

    return (
        <Layout>
            <Container>
                <Header>
                    <Title>Videos</Title>
                    <Separator />
                    <Description>
                        From tutorials to simple showcase of Amplify Video,
                        discover the content created by our community.
                    </Description>
                </Header>
                {loadingVodFiles || loadingSections ? (
                    <LoaderWrapper>
                        <BasicLoader />
                    </LoaderWrapper>
                ) : (
                    <>
                        {sections &&
                            sections.map((section: Section) => (
                                <VideosSectionContainer
                                    key={section.id}
                                    section={section}
                                    vodAssets={vodAssets}
                                    thumbnails={thumbnails}
                                />
                            ))}
                        {sections &&
                            sections.map((section: Section) => (
                                <VideosSectionContainer
                                    key={section.id}
                                    section={section}
                                    vodAssets={vodAssets}
                                    thumbnails={thumbnails}
                                />
                            ))}
                    </>
                )}
            </Container>
        </Layout>
    )
}

export default VideoPage
