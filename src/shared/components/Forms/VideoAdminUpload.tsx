import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'
import Loader from 'react-loader-spinner'

import { fetchSections, uploadContent } from '../../../shared/utilities'
import { Section } from '../../../models'
import { Media } from '../../../models'
import * as APIt from '../../../API'

const VideoAdminUpload = () => {
    const [uploading, setUploading] = useState<boolean>(false)
    const [vodFile, setVodFile] = useState<File | null>(null)
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [author, setAuthor] = useState<string>('')
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
                console.error('Form/VideoUpload.tsx(fetchSections):', error)
            }
        })()
    }, [setExistingSections])

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (vodFile === null || thumbnailFile === null) {
            return
        }
        ;(async () => {
            setUploading(true)
            try {
                const media: Media = {
                    id: '',
                    title,
                    description,
                    highlighted,
                    author,
                }
                await uploadContent(
                    media,
                    APIt.Source.SELF,
                    selectedSections.map((sec) => {
                        return sec && sec.id
                    }),
                    thumbnailFile,
                    vodFile,
                    ''
                )
            } catch (error) {
                console.error('admin/VideoAdminUpload.tsx(uploadVideo):', error)
                setUploading(false)
                return
            }
            navigate('/admin')
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
                    <textarea
                        id="_add_vod_description"
                        placeholder="Description"
                        value={description}
                        onChange={(
                            event: React.ChangeEvent<HTMLTextAreaElement>
                        ) => {
                            setDescription(event.target.value)
                        }}
                    />
                </div>
                <div style={{ margin: '15px' }}>
                    <label htmlFor="_add_vod_author">Author</label>
                    <input
                        id="_add_vod_author"
                        type="text"
                        placeholder="Author"
                        value={author}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            setAuthor(event.target.value)
                        }}
                    />
                </div>
                <div style={{ margin: '15px' }}>
                    <label htmlFor="_add_vod_file">Video File</label>
                    <input
                        id="_add_vod_file"
                        type="file"
                        accept="video/*"
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            if (event.target.files === null) {
                                return
                            }
                            setVodFile(event?.target?.files[0])
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
                    {uploading ? (
                        <Loader
                            type="Rings"
                            color="#FFA41C"
                            height={50}
                            width={50}
                        />
                    ) : (
                        <input
                            disabled={uploading}
                            type="submit"
                            value="Upload Content"
                        />
                    )}
                </div>
            </form>
        </div>
    )
}

export { VideoAdminUpload }
