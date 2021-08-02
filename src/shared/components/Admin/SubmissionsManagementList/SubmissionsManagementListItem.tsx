import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { DateTime } from 'luxon'
import Loader from 'react-loader-spinner'

import {
    acceptContentSubmission,
    declineContentSubmission,
    fetchSections,
} from '../../../utilities'
import { ContentSubmission, Section } from '../../../../models'

const SubmissionContainer = styled.div`
    width: 100%;
`

const ContainerHeader = styled.div`
    display: flex;
    justify-content: space-between;
`

const ContainerHeaderTitle = styled.h1``

const ContainerHeaderActions = styled.div`
    display: flex;
    justify-self: flex-end;
`

const ContainerContent = styled.div`
    display: flex;
    flex-direction: column;
`

const Button = styled.button`
    color: ${(props) => props.theme.buttonColor};
`

type SubmissionManagementListItemProps = {
    selectedContentSubmission: ContentSubmission
}

const SubmissionManagementListItem = ({
    selectedContentSubmission,
}: SubmissionManagementListItemProps) => {
    const [uploading, setUploading] = useState<boolean>(false)
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
    const [existingSections, setExistingSections] = useState<Array<Section>>([])
    const [selectedSections, setSelectedSections] = useState<Array<Section>>([])
    const createdAtDate = DateTime.fromISO(
        selectedContentSubmission.createdAt || ''
    )

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

    const onClick = async (value: boolean) => {
        if (value) {
            if (thumbnailFile) {
                setUploading(true)
                await acceptContentSubmission(
                    selectedContentSubmission,
                    thumbnailFile,
                    selectedSections.map((sec) => {
                        return sec.id
                    })
                )
                setUploading(false)
            }
        } else {
            await declineContentSubmission({ id: selectedContentSubmission.id })
        }
    }

    return (
        <SubmissionContainer>
            <ContainerHeader>
                <ContainerHeaderTitle>Submission</ContainerHeaderTitle>
                {uploading ? (
                    <Loader
                        type="Rings"
                        color="#FFA41C"
                        height={50}
                        width={50}
                    />
                ) : (
                    <ContainerHeaderActions>
                        <Button
                            disabled={uploading}
                            theme={{ buttonColor: 'green' }}
                            onClick={() => onClick(true)}
                        >
                            Accept
                        </Button>
                        <Button
                            disabled={uploading}
                            theme={{ buttonColor: 'orangered' }}
                            onClick={() => onClick(false)}
                        >
                            Decline
                        </Button>
                    </ContainerHeaderActions>
                )}
            </ContainerHeader>
            <ContainerContent>
                <p>
                    <strong>Title:</strong> {selectedContentSubmission.title}
                </p>
                <p>
                    <strong>description:</strong>{' '}
                    {selectedContentSubmission.description}
                </p>
                <p>
                    <strong>src:</strong> {selectedContentSubmission.src}
                </p>
                <p>
                    <strong>email:</strong> {selectedContentSubmission.email}
                </p>
                <p>
                    <strong>comment:</strong>{' '}
                    {selectedContentSubmission.comment}
                </p>
                <p>
                    <strong>createdAt:</strong>{' '}
                    {createdAtDate.toLocaleString(DateTime.DATETIME_MED)}
                </p>
            </ContainerContent>
            <ContainerContent>
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
            </ContainerContent>
        </SubmissionContainer>
    )
}

export default SubmissionManagementListItem
