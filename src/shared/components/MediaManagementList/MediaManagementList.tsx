import React, { useState, useEffect } from 'react'

import { Media, Section } from '../../../models'
import { fetchSections } from '../../utilities'
import MediaManagementListItem from './MediaManagementListItem'
import MediaManagementListItemList from './MediaManagementListItemList'

type MediaManagementListProps = {
    medias: Array<Media>
    setMedias: React.Dispatch<React.SetStateAction<Array<Media>>>
}

const MediaManagementList = ({
    medias,
    setMedias,
}: MediaManagementListProps) => {
    const [selectedMedia, setSelectedMedia] = useState<Media | null>(null)
    const [searchValue, setSearchValue] = useState('')
    const [sections, setSections] = useState<Array<Section>>([])

    const filterMedia = (media: Media) => {
        return (
            media?.title.toLowerCase().includes(searchValue.toLowerCase()) ||
            media?.description.toLowerCase().includes(searchValue.toLowerCase())
        )
    }

    useEffect(() => {
        ;(async () => {
            try {
                const { data } = await fetchSections()
                setSections(data?.listSections?.items as Array<Section>)
            } catch (error) {
                console.error('fetchSections(MediaManagementList.tsx):', error)
            }
        })()
    }, [])

    return (
        <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ padding: '15px' }}>
                    <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '100%' }}>
                            <input
                                type="text"
                                placeholder="Title and/or Description"
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
                        {medias.filter(filterMedia).map((media) => {
                            return (
                                <MediaManagementListItemList
                                    key={media.id}
                                    media={media}
                                    selectedMedia={selectedMedia}
                                    setSelectedMedia={setSelectedMedia}
                                />
                            )
                        })}
                    </div>
                </div>
                <div style={{ padding: '15px' }}>
                    {selectedMedia && (
                        <MediaManagementListItem
                            medias={medias}
                            setMedias={setMedias}
                            selectedMedia={selectedMedia}
                            sections={sections}
                            setSelectedMedia={setSelectedMedia}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default MediaManagementList
