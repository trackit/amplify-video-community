import React, { useEffect, useState } from 'react'

import { fetchSections, uploadVideo } from '../../../shared/utilities'
import { AdminLayout } from '../../../shared/components'
import { Section } from '../../../models'

type DropZoneProps = {
    setVodFile: React.Dispatch<React.SetStateAction<File | null>>
}

const DropZone = ({ setVodFile }: DropZoneProps) => {
    return (
        <div id="drop-area">
            <p>Drop a file or</p>
            <input
                type="file"
                accept="video/*"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (event.target.files === null) {
                        return
                    }
                    setVodFile(event.target.files[0])
                }}
            />
        </div>
    )
}

type VideoAddFormProps = {
    vodFile: File | null
}

const VideoAddForm = ({ vodFile }: VideoAddFormProps) => {
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
    const [highlighted, setHighlighted] = useState<boolean>(false)
    const [existingSections, setExistingSections] = useState<Array<Section>>([])
    const [selectedSections, setSelectedSections] = useState<Array<Section>>([])

    useEffect(() => {
        ;(async () => {
            try {
                const { data } = await fetchSections()
                setExistingSections(data?.listSections?.items as Array<Section>)
            } catch (error) {
                console.error('video/add.tsx(fetchSections):', error)
            }
        })()
    }, [setExistingSections])

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        ;(async () => {
            if (vodFile === null || thumbnailFile === null) {
                return
            }
            try {
                await uploadVideo(
                    title,
                    description,
                    vodFile,
                    thumbnailFile,
                    highlighted,
                    selectedSections.map((sec) => {
                        return sec && sec.id
                    })
                )
            } catch (error) {
                console.error('video/add.tsx(uploadVideo):', error)
            }
        })()
    }

    return (
        <div>
            <form
                onSubmit={onSubmit}
                style={{ display: 'flex', flexDirection: 'column' }}
            >
                <div style={{ margin: '15px' }}>
                    <label htmlFor="_add_vod_title">Title</label>
                    <input
                        id="_add_vod_title"
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            setTitle(event.target.value)
                        }}
                    />
                </div>
                <div style={{ margin: '15px' }}>
                    <label htmlFor="_add_vod_description">Description</label>
                    <input
                        id="_add_vod_description"
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            setDescription(event.target.value)
                        }}
                    />
                </div>
                <div style={{ margin: '15px' }}>
                    <label htmlFor="_add_vod_thumbnail">Video Thumbnail</label>
                    <input
                        id="_add_vod_thumbnail"
                        type="file"
                        accept="image/*"
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            if (event.target.files === null) {
                                return
                            }
                            setThumbnailFile(event?.target?.files[0])
                        }}
                    />
                </div>
                <div style={{ margin: '15px' }}>
                    <label htmlFor="_add_vod_highlighted">
                        Highlighted Video
                    </label>
                    <input
                        id="_add_vod_highlighted"
                        type="checkbox"
                        onChange={() => {
                            setHighlighted(!highlighted)
                        }}
                    />
                </div>
                <div style={{ margin: '15px' }}>
                    <label htmlFor="_add_vod_tags">Video Tags</label>
                    {selectedSections.map((section: Section | undefined) => {
                        return (
                            <div key={section && section.label}>
                                <span>{section && section.label}</span>
                                <button
                                    onClick={() => {
                                        setSelectedSections(
                                            selectedSections.filter(
                                                (value: Section | undefined) =>
                                                    value !== section
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
                            const section = existingSections.find(
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
                        {existingSections
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
                <div style={{ margin: '15px' }}>
                    <input type="submit" value="Upload video" />
                </div>
            </form>
        </div>
    )
}

const DashboardVideoAdd = () => {
    const [vodFile, setVodFile] = useState<File | null>(null)

    return (
        <AdminLayout>
            <h1>Video Add</h1>
            {!vodFile && <DropZone setVodFile={setVodFile} />}
            {vodFile && <VideoAddForm vodFile={vodFile} />}
        </AdminLayout>
    )
}

export default DashboardVideoAdd
