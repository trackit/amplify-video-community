import React from 'react'
import Loader from 'react-loader-spinner'
import { useEffect, useState } from 'react'

import { Layout } from '../shared/components'
import { fetchSections, fetchVodFiles } from '../shared/utilities'
import { Slider, Item } from '../shared/components/VideoSlider'
import styled from 'styled-components'
import { vodAsset, section } from '../models'

function renderThumbnails(vodAssets: Array<vodAsset>) {
    if (vodAssets.length > 0)
        return vodAssets.map((movie: vodAsset) => (
            <Item movie={movie} key={movie.id} />
        ))
    return <p>No VoD Files</p>
}

const SectionContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const SectionItem = styled.div`
    div {
        h1 {
            margin-left: 20px;
        }
    }
`

const VodApp = () => {
    const [vodAssets, setVodAssets] = useState<Array<vodAsset>>([])
    const [sections, setSections] = useState<Array<section> | null>(null)
    const [nextTokenVodFiles, setNextTokenVodFiles] =
        useState<string | null>(null)
    const [loadingVodFiles, setLoadingVodFiles] = useState(false)
    const [loadingSections, setLoadingSections] = useState(false)

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
                let nonce = true
                const list = data?.listSections?.items as Array<section>
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
                setSections(list)
                console.log('fetchSections: ', data)
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
                <SectionContainer>
                    {sections &&
                        sections.map((section: section) => {
                            return (
                                <SectionItem key={section.id}>
                                    {section.label === 'Highlighted' ? (
                                        <div key={section.label}>
                                            <h1>{section.label}</h1>
                                            <Slider>
                                                {renderThumbnails(
                                                    vodAssets.filter(
                                                        (item: vodAsset) =>
                                                            item.highlighted
                                                    )
                                                )}
                                            </Slider>
                                        </div>
                                    ) : (
                                        <div key={section.label}>
                                            <h1>{section.label}</h1>
                                            <Slider>
                                                {renderThumbnails(vodAssets)}
                                            </Slider>
                                        </div>
                                    )}
                                </SectionItem>
                            )
                        })}
                </SectionContainer>
            )}
        </Layout>
    )
}

export default VodApp
