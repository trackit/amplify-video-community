import React, { useEffect, useState } from 'react'

import { fetchSection } from '../../utilities/fetch'
import { Section, VideoOnDemand } from '../../../models'
import * as API from '../../../API'
import { fetchVodAsset } from '../../utilities/vod-fetch'

type SectionsManagementListItemProps = {
    section: Section
    selectedSection: Section | null
    setSelectedSection: (section: Section) => void
}

const SectionsManagementListItem = ({
    section,
    selectedSection,
    setSelectedSection,
}: SectionsManagementListItemProps) => {
    const [hover, setHover] = useState<boolean>(false)
    const hoverStyles = {
        backgroundColor: '#969696',
        cursor: 'pointer',
    }
    const selectedStyles = {
        backgroundColor: '#E3E3E3',
    }

    return (
        <div>
            <div
                style={{
                    borderBottom: 'solid 1px black',
                    display: 'flex',
                    ...(hover ? hoverStyles : null),
                    ...(selectedSection === section ? selectedStyles : null),
                }}
                onClick={() => {
                    setSelectedSection(section)
                }}
                onMouseEnter={() => {
                    setHover(true)
                }}
                onMouseLeave={() => {
                    setHover(false)
                }}
            >
                <div>
                    <p>{section.label}</p>
                </div>
                <div>
                    <p>{section.createdAt}</p>
                </div>
                <div>
                    <p>{'>'}</p>
                </div>
            </div>
        </div>
    )
}

type SectionVideosProps = {
    videos: Array<API.MediasSections>
}

const SectionVideos = ({ videos }: SectionVideosProps) => {
    return (
        <div>
            {videos.length > 0 ? (
                <ul>
                    {videos.map((video) => {
                        const [vod, setVod] =
                            useState<VideoOnDemand | null>(null)

                        useEffect(() => {
                            ;(async () => {
                                try {
                                    const { data } = await fetchVodAsset(
                                        video.mediaID
                                    )
                                    if (data?.getVideoOnDemand === null) {
                                        console.error(
                                            'SectionsManagementList.tsx(SectionVideos): object doesnt exist'
                                        )
                                    } else {
                                        setVod(
                                            data?.getVideoOnDemand as VideoOnDemand
                                        )
                                    }
                                } catch (error) {
                                    console.error(
                                        'SectionsManagementList.tsx(SectionVideos):',
                                        error
                                    )
                                }
                            })()
                        }, [fetchVodAsset])

                        if (vod) {
                            return (
                                <li key={vod.media?.id}>
                                    <a href={`/video/${vod.media?.id}`}>
                                        {vod.media?.title}
                                    </a>
                                </li>
                            )
                        } else {
                            return <p>Loading ...</p>
                        }
                    })}
                </ul>
            ) : (
                <p>There is no videos for this section</p>
            )}
        </div>
    )
}

type CurrentSectionProps = {
    selectedSection: Section
}

const CurrentSection = ({ selectedSection }: CurrentSectionProps) => {
    const [videos, setVideos] = useState<Array<API.MediasSections> | null>(null)

    const deleteSection = () => {
        console.log('delete section ' + selectedSection.id)
    }

    useEffect(() => {
        ;(async () => {
            if (selectedSection.id !== null) {
                try {
                    const { data } = await fetchSection(selectedSection.id)
                    console.log('SectionsManagementList.tsx: ', data)
                    setVideos(
                        data?.getSection?.medias
                            ?.items as Array<API.MediasSections>
                    )
                } catch (e) {
                    console.error('SectionsManagementList.tsx: ', e)
                }
            }
        })()
    }, [selectedSection])

    return (
        <div>
            <p>Label: {selectedSection.label}</p>
            <p>Videos:</p>
            {videos && <SectionVideos videos={videos} />}
            <button onClick={deleteSection}>Delete Section</button>
        </div>
    )
}

type SectionsManagementListProps = {
    sections: Array<Section>
}

const SectionsManagementList = ({ sections }: SectionsManagementListProps) => {
    const [selectedSection, setSelectedSection] = useState<Section | null>(null)
    const [searchValue, setSearchValue] = useState('')

    const filterSections = (elem: Section) => {
        return elem.label.toLowerCase().includes(searchValue.toLowerCase())
    }

    return (
        <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ padding: '15px' }}>
                    <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '100%' }}>
                            <input
                                type="text"
                                placeholder="Amplify video tutorial"
                                value={searchValue}
                                onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                ) => setSearchValue(e.target.value)}
                                style={{ width: '100%' }}
                            />
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    setSearchValue('')
                                }}
                            >
                                X
                            </button>
                        </div>
                    </div>
                    <div>
                        {sections
                            .filter(filterSections)
                            .map((elem: Section) => {
                                return (
                                    <SectionsManagementListItem
                                        key={elem.id}
                                        section={elem}
                                        selectedSection={selectedSection}
                                        setSelectedSection={setSelectedSection}
                                    />
                                )
                            })}
                    </div>
                </div>
                <div style={{ padding: '15px' }}>
                    {selectedSection && (
                        <CurrentSection selectedSection={selectedSection} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default SectionsManagementList
