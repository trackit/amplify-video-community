import React from 'react'
import Loader from 'react-loader-spinner'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

import {
    Layout,
    SectionContainer,
    HighlightedSection,
    VideoCardSlider,
} from '../shared/components'
import {
    fetchSections,
    fetchVodFiles,
    fetchThumbnail,
} from '../shared/utilities'
import { Thumbnail, VideoOnDemand, Section } from '../models'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 25px;
`

const VodApp = () => {
    const [vodAssets, setVodAssets] = useState<Array<VideoOnDemand>>([])
    const [thumbnails, setThumbnails] = useState<
        Array<{
            obj: Thumbnail | undefined
            url: string
        }>
    >([])
    const [sections, setSections] = useState<Array<Section> | null>(null)
    const [nextTokenVodFiles, setNextTokenVodFiles] =
        useState<string | null>(null)
    const [loadingVodFiles, setLoadingVodFiles] = useState<boolean>(false)
    const [loadingSections, setLoadingSections] = useState<boolean>(false)
    const [haveHighlightedContent, setHaveHighlightedContent] = useState(false)

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

                if (
                    assets.findIndex(
                        (elem) => elem.media?.highlighted === true
                    ) > 0
                ) {
                    setHaveHighlightedContent(true)
                }
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
                let nonce = true
                const list = data?.listSections?.items as Array<Section>
                if (haveHighlightedContent) {
                    list.forEach((item, index, arr) => {
                        if (arr.length <= 3 && nonce) {
                            arr.push({
                                label: 'Highlighted',
                                id: `Highlighted${index}`,
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
            {loadingVodFiles || loadingSections ? (
                <Loader
                    type="Bars"
                    color="#FFA41C"
                    height={100}
                    width={100}
                    timeout={3000}
                />
            ) : (
                <Container>
                    <VideoCardSlider vod={vodAssets} thumbnails={thumbnails} />
                    {sections &&
                        sections.map((section: Section) => {
                            return section.label === 'Highlighted' ? (
                                <HighlightedSection
                                    key={section.id}
                                    title={section.label}
                                    vodAsset={vodAssets
                                        .filter(
                                            (item: VideoOnDemand) =>
                                                item.media?.highlighted
                                        )
                                        .pop()}
                                    thumbnails={thumbnails}
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
                </Container>
            )}
        </Layout>
    )
}

export default VodApp
