import React, { useEffect, useState } from 'react'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'

import {
    fetchThumbnail,
    removeMedia,
    modifyMedia,
    removeThumbnailFile,
    fetchMediaSections,
    removeMediasSections,
    setMediasSections as createMediasSections,
} from '../../utilities'
import { Media, MediasSections, Section } from '../../../models'

type MediaManagementListItemProps = {
    medias: Array<Media>
    setMedias: React.Dispatch<React.SetStateAction<Array<Media>>>
    selectedMedia: Media
    sections: Array<Section>
    setSelectedMedia: React.Dispatch<React.SetStateAction<Media | null>>
}

const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 7px;
    margin-top: 13px;
`

const Tag = styled.span`
    border: solid 1px black;
    border-radius: 10px;
    padding: 3px;
    display: flex;
    justify-content: space-between;
`

const Actions = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 7px;
    margin-top: 26px;
`

const Action = styled.span`
    border: solid 1px black;
    border-radius: 10px;
    padding: 3px;
    background-color: ${(props) => props.theme.actionColor};

    &:hover {
        cursor: pointer;
    }
`

const MediaManagementListItem = ({
    selectedMedia,
    setSelectedMedia,
    sections,
    medias,
    setMedias,
}: MediaManagementListItemProps) => {
    const thumbnailLoader = (
        <Loader
            type="Rings"
            color="#FFA41C"
            height={100}
            width={100}
            timeout={3000}
        />
    )
    const [thumbnail, setThumbnail] = useState(thumbnailLoader)
    const [edititonMode, setEdititonMode] = useState(false)
    const [mediasSections, setMediasSections] = useState<Array<MediasSections>>(
        []
    )
    const [mediaSections, setMediaSections] = useState<Array<Section>>([])
    const [selectedSections, setSelectedSections] = useState<Array<Section>>([])

    const deleteMedia = async () => {
        const filteredMediasSections = mediasSections.filter((ms) => {
            ms.media.id === selectedMedia.id
        })
        try {
            await Promise.all(
                filteredMediasSections.map(async (ms) => {
                    await removeMediasSections(ms)
                })
            )
        } catch (error) {
            console.error(
                'removeMediasSections(MediaManagementListItem.tsx):',
                error
            )
            return
        }
        try {
            await removeMedia({ id: selectedMedia.id })
        } catch (error) {
            console.error('removeMedia(MediaManagementListItem.tsx):', error)
            return
        }
        try {
            await removeThumbnailFile(selectedMedia.thumbnail)
        } catch (error) {
            console.error(
                'removeThumbnailFile(MediaManagementListItem.tsx):',
                error
            )
            return
        }
        setSelectedMedia(null)
    }

    useEffect(() => {
        setThumbnail(thumbnailLoader)
        ;(async () => {
            try {
                const thumb = await fetchThumbnail(selectedMedia)
                setThumbnail(
                    <img src={thumb as string} alt="thumbnail" height="150px" />
                )
            } catch (error) {
                console.error(
                    'fetchThumbnail(MediaManagementListItem.tsx): ',
                    error
                )
            }
        })()
    }, [selectedMedia])

    useEffect(() => {
        ;(async () => {
            try {
                const { data } = await fetchMediaSections()
                const mediassections = data?.listMediasSections
                    ?.items as Array<MediasSections>
                setMediasSections(mediassections)
                const value = sections.filter(
                    (s) =>
                        mediassections
                            .filter((ms) => ms.media.id === selectedMedia.id)
                            .filter((ms) => s.id === ms.section.id).length > 0
                )
                setMediaSections(value)
                setSelectedSections(value)
            } catch (error) {
                console.error(
                    'fetchMediaSections(MediaManagementListItem.tsx): ',
                    error
                )
            }
        })()
    }, [selectedMedia])

    const EditMode = () => {
        const [title, setTitle] = useState(selectedMedia.title)
        const [description, setDescription] = useState(
            selectedMedia.description
        )
        const [highlighted, setHighlighted] = useState(
            selectedMedia.highlighted
        )

        const onChange = (
            value: string,
            callback: React.Dispatch<React.SetStateAction<string>>
        ) => {
            callback(value)
        }

        const saveChanges = async () => {
            try {
                await modifyMedia({
                    id: selectedMedia.id,
                    title,
                    description,
                    highlighted,
                })
            } catch (error) {
                console.error('MediaManagementListItem.tsx(modifyMedia)', error)
                return
            }
            const objIndex = medias.findIndex((m) => m.id === selectedMedia.id)
            const updatedMedia = {
                ...medias[objIndex],
                title,
                description,
                highlighted,
            }
            const updatedMedias = [
                ...medias.slice(0, objIndex),
                updatedMedia,
                ...medias.slice(objIndex + 1),
            ]
            try {
                mediaSections
                    .filter((section) => {
                        return !selectedSections.includes(section)
                    })
                    .map(async (section) => {
                        const relation = mediasSections.find(
                            (ms) =>
                                ms.section.id === section.id &&
                                ms.media.id === selectedMedia.id
                        )
                        if (relation) {
                            await removeMediasSections({ id: relation.id })
                        }
                    })
            } catch (error) {
                console.error(
                    'MediaManagementListItem.tsx(removeMediasSections)',
                    error
                )
                return
            }
            try {
                selectedSections
                    .filter((ss) => {
                        return !mediaSections.includes(ss)
                    })
                    .map(async (ms) => {
                        await createMediasSections({
                            sectionID: ms.id,
                            mediaID: selectedMedia.id,
                        })
                    })
            } catch (error) {
                console.error(
                    'MediaManagementListItem.tsx(createMediasSections)',
                    error
                )
                return
            }
            setMedias(updatedMedias)
            setSelectedMedia(updatedMedia)
        }

        return (
            <div>
                {thumbnail}
                <div>
                    <span>Title</span>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => onChange(e.target.value, setTitle)}
                    />
                </div>
                <div>
                    <span>Description</span>
                    <textarea
                        value={description}
                        onChange={(e) =>
                            onChange(e.target.value, setDescription)
                        }
                    />
                </div>
                <div>
                    <span>Highlighted: </span>
                    <input
                        type="checkbox"
                        name="Highlighted"
                        checked={highlighted}
                        onChange={() => {
                            setHighlighted(!highlighted)
                        }}
                    />
                </div>
                <div style={{ margin: '15px' }}>
                    <label htmlFor="_add_vod_tags">Video Tags</label>
                    {selectedSections.map((section) => {
                        return (
                            <div key={section && section.label}>
                                <span>{section && section.label}</span>
                                <button
                                    onClick={() => {
                                        setSelectedSections(
                                            selectedSections.filter(
                                                (value) => value !== section
                                            )
                                        )
                                    }}
                                >
                                    X
                                </button>
                            </div>
                        )
                    })}
                    <select
                        id="_add_vod_tags"
                        onChange={(
                            event: React.FormEvent<HTMLSelectElement>
                        ) => {
                            const section = sections.find(
                                (section) =>
                                    (section && section.label) ===
                                    event.currentTarget.value
                            )
                            section !== undefined &&
                                setSelectedSections([
                                    ...selectedSections,
                                    section,
                                ])
                        }}
                    >
                        <option value="">Select a section</option>
                        {sections
                            .filter(
                                (section) =>
                                    !selectedSections.find(
                                        (s) =>
                                            s &&
                                            section &&
                                            s.label === section.label
                                    )
                            )
                            .map((section) => {
                                return (
                                    <option
                                        value={section && section.label}
                                        key={section && section.label}
                                    >
                                        {section && section.label}
                                    </option>
                                )
                            })}
                    </select>
                </div>
                <Actions>
                    <Action
                        onClick={() => {
                            setEdititonMode(false)
                        }}
                        theme={{ actionColor: 'orangered' }}
                    >
                        Cancel
                    </Action>
                    <Action
                        onClick={() => {
                            ;(async () => {
                                await saveChanges()
                                setEdititonMode(false)
                            })()
                        }}
                        theme={{ actionColor: 'cornflowerblue' }}
                    >
                        Save
                    </Action>
                </Actions>
            </div>
        )
    }

    const DisplayMode = () => {
        return (
            <div>
                {thumbnail}
                <p>Title: {selectedMedia?.title}</p>
                <p>Description: {selectedMedia?.description}</p>
                Sections:
                <Tags>
                    {mediaSections.map((s) => {
                        return <Tag key={s.label}>{s.label}</Tag>
                    })}
                </Tags>
                <Actions>
                    <Action
                        onClick={() => {
                            ;(async () => {
                                await deleteMedia()
                            })()
                        }}
                        theme={{ actionColor: 'orangered' }}
                    >
                        Delete media
                    </Action>
                    <Action
                        onClick={() => {
                            setEdititonMode(true)
                        }}
                        theme={{ actionColor: 'cornflowerblue' }}
                    >
                        Edit media
                    </Action>
                </Actions>
            </div>
        )
    }

    return edititonMode ? <EditMode /> : <DisplayMode />
}

export default MediaManagementListItem
