import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { ContentSubmission, Section } from '../../../models'
import { fetchContentSubmissions } from '../../../shared/utilities/content-submission-fetch'
import {
    acceptContentSubmission,
    removeContentSubmission,
    fetchSections,
} from '../../../shared/utilities'
import { AdminLayout } from '../../../shared/components'
import {
    ListContainer,
    ListModal,
    ListSearchBarWrapper,
    ListSearchBarInput,
    ListSearchBarButton,
    ListModalContent,
    ListModalContentHeader,
    ListModalContentBody,
    ListModalContentFooter,
} from '../../../shared/components/Lists/Lists'
import Loader from 'react-loader-spinner'

type ThumbnailProps = {
    youtubeId: string
    modal: boolean
}

const Title = styled.h1`
    font-size: 36px;
`

const CancelButton = styled.button``

const DeclineButton = styled.button``

const AcceptButton = styled.button``

const EditButton = styled.button``

const ListItem = styled.div`
    display: flex;
    padding: 2px;
    gap: 10px;
    cursor: pointer;

    &:hover {
        box-shadow: 0 0 0 2px #ff9900 inset;
    }
`

const Thumbnail = styled.div<ThumbnailProps>`
    background-image: ${(props) =>
        `url(https://img.youtube.com/vi/${props.youtubeId}/maxresdefault.jpg)`};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    ${(props) => (props.modal ? `height: 160px;width: 284px;` : '')}
    min-width: 144px;
    min-height: 82px;
`

const ListItemContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 10px;
    width: 100%;
`

const ListItemContentHeader = styled.div`
    display: flex;
    justify-content: space-between;
`

const ListItemContentHeaderTitle = styled.span`
    font-weight: bold;
    font-size: 22px;
`

const ListItemContentFooterDate = styled.span`
    font-size: 12px;
`

const ListItemContentFooterEmail = styled.span`
    font-size: 12px;
`

const ListItemContentFooter = styled.div`
    display: flex;
    justify-content: space-between;
`

const ListModalContentBodyHeader = styled.div`
    display: flex;
    gap: 25px;
    margin-bottom: 25px;
`

const ListModalContentBodyDescription = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`

const ListModalContentBodyContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    gap: 10px;
    margin-bottom: 10px;
`

const ListModalKeyValue = styled.div`
    font-size: 18px;
    display: flex;
    gap: 10px;
`

const ValueUrl = styled.a`
    text-decoration: none;

    &:hover {
        color: #ff9900;
        cursor: pointer;
    }
`

const Key = styled.span`
    font-weight: bold;
`

const EditDescription = styled.textarea`
    width: 600px;
    height: 80px;
`

const EditTitle = styled.input`
    width: 300px;
`

const SubmissionsManagement = () => {
    const [submissions, setSubmissions] = useState<Array<ContentSubmission>>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [editMode, setEditMode] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState('')
    const [selectedContentSubmission, setSelectedContentSubmission] =
        useState<ContentSubmission | null>(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [useYTThumbnail, setUseYTThumbnail] = useState(true)
    const [author, setAuthor] = useState('Submission')
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
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

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            try {
                const { data } = await fetchContentSubmissions()
                setSubmissions(
                    data?.listContentSubmissions
                        ?.items as Array<ContentSubmission>
                )
            } catch (error) {
                console.error('SubmissionsManagement.tsx ', error)
            }
            setLoading(false)
        })()
    }, [])

    const filterContentSubmission = (submission: ContentSubmission) => {
        return (
            (submission.title &&
                submission.title
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())) ||
            (submission.description &&
                submission.description
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())) ||
            (submission.email &&
                submission.email
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()))
        )
    }

    const onDeclineAccept = async (value: boolean) => {
        if (selectedContentSubmission) {
            if (value) {
                setUploading(true)
                await acceptContentSubmission(
                    selectedContentSubmission,
                    'Submission',
                    useYTThumbnail ? null : thumbnailFile,
                    selectedSections.map((sec) => {
                        return sec.id
                    })
                )
                setUploading(false)
            }
            await removeContentSubmission({
                id: selectedContentSubmission?.id,
            })
            setSubmissions(
                submissions.filter(
                    (sub) => sub.id !== selectedContentSubmission.id
                )
            )
            setEditMode(false)
            setModalOpen(false)
        }
    }

    return (
        <AdminLayout>
            <Title>Manage Submissions</Title>
            {loading ? (
                <></>
            ) : (
                <ListContainer>
                    <ListSearchBarWrapper>
                        <ListSearchBarInput
                            type="text"
                            placeholder="Search..."
                            value={searchValue}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>
                            ) => setSearchValue(e.target.value)}
                        />
                        <ListSearchBarButton
                            onClick={() => {
                                setSearchValue('')
                            }}
                        >
                            X
                        </ListSearchBarButton>
                    </ListSearchBarWrapper>
                    {submissions
                        .filter(filterContentSubmission)
                        .map((submission) => {
                            return (
                                submission && (
                                    <ListItem
                                        key={submission.id}
                                        onClick={() => {
                                            setModalOpen(true)
                                            setSelectedContentSubmission(
                                                submission
                                            )
                                        }}
                                    >
                                        <Thumbnail
                                            youtubeId={
                                                submission.src
                                                    ?.split('/')
                                                    .pop() || ''
                                            }
                                            modal={false}
                                        />
                                        <ListItemContent>
                                            <ListItemContentHeader>
                                                <ListItemContentHeaderTitle>
                                                    {submission.title}
                                                </ListItemContentHeaderTitle>
                                            </ListItemContentHeader>
                                            <ListItemContentFooter>
                                                <ListItemContentFooterEmail>
                                                    {submission.email}
                                                </ListItemContentFooterEmail>
                                                <ListItemContentFooterDate>
                                                    {moment(
                                                        submission.createdAt
                                                    ).format('MMM Do YYYY')}
                                                </ListItemContentFooterDate>
                                            </ListItemContentFooter>
                                        </ListItemContent>
                                    </ListItem>
                                )
                            )
                        })}
                    {modalOpen && selectedContentSubmission && (
                        <ListModal
                            onClick={() => {
                                setModalOpen(false)
                                setEditMode(false)
                            }}
                        >
                            <ListModalContent
                                onClick={(e) => e.stopPropagation()}
                            >
                                <ListModalContentHeader>
                                    {selectedContentSubmission?.title}
                                </ListModalContentHeader>
                                <ListModalContentBody>
                                    <ListModalContentBodyHeader>
                                        <Thumbnail
                                            youtubeId={
                                                selectedContentSubmission.src
                                                    ?.split('/')
                                                    .pop() || ''
                                            }
                                            modal={true}
                                        />
                                        <ListModalContentBodyDescription>
                                            <ListModalKeyValue>
                                                <Key>ID:</Key>
                                                {selectedContentSubmission?.id}
                                            </ListModalKeyValue>
                                            <ListModalKeyValue>
                                                <Key>Created At:</Key>
                                                {moment(
                                                    selectedContentSubmission?.createdAt
                                                ).format('MMM Do YYYY')}
                                            </ListModalKeyValue>
                                            <ListModalKeyValue>
                                                <Key>Source:</Key>
                                                {
                                                    selectedContentSubmission?.source
                                                }
                                            </ListModalKeyValue>
                                            <ListModalKeyValue>
                                                <Key>URL:</Key>
                                                <ValueUrl
                                                    href={
                                                        selectedContentSubmission?.src
                                                    }
                                                    target="_blank"
                                                >
                                                    {
                                                        selectedContentSubmission?.src
                                                    }
                                                </ValueUrl>
                                            </ListModalKeyValue>
                                        </ListModalContentBodyDescription>
                                    </ListModalContentBodyHeader>
                                    <ListModalContentBodyContent>
                                        <ListModalKeyValue>
                                            <Key>Title:</Key>
                                            {editMode ? (
                                                <EditTitle
                                                    type="text"
                                                    placeholder={
                                                        selectedContentSubmission?.title
                                                    }
                                                    value={
                                                        selectedContentSubmission?.title
                                                    }
                                                    onChange={(e) =>
                                                        setSelectedContentSubmission(
                                                            {
                                                                ...selectedContentSubmission,
                                                                title: e.target
                                                                    .value,
                                                            }
                                                        )
                                                    }
                                                />
                                            ) : (
                                                selectedContentSubmission?.title
                                            )}
                                        </ListModalKeyValue>
                                        <ListModalKeyValue>
                                            <Key>Description:</Key>
                                            {editMode ? (
                                                <EditDescription
                                                    placeholder={
                                                        selectedContentSubmission?.description
                                                    }
                                                    value={
                                                        selectedContentSubmission?.description
                                                    }
                                                    onChange={(e) =>
                                                        setSelectedContentSubmission(
                                                            {
                                                                ...selectedContentSubmission,
                                                                description:
                                                                    e.target
                                                                        .value,
                                                            }
                                                        )
                                                    }
                                                />
                                            ) : (
                                                selectedContentSubmission?.description
                                            )}
                                        </ListModalKeyValue>
                                        <ListModalKeyValue>
                                            <Key>Email:</Key>
                                            {selectedContentSubmission?.email}
                                        </ListModalKeyValue>
                                        <ListModalKeyValue>
                                            <Key>Comment:</Key>
                                            {selectedContentSubmission?.comment}
                                        </ListModalKeyValue>
                                    </ListModalContentBodyContent>
                                    {editMode && (
                                        <ListModalContentBodyContent>
                                            <ListModalKeyValue>
                                                <Key>
                                                    Use youtube thumbnail ?:
                                                </Key>
                                                <input
                                                    type="checkbox"
                                                    checked={useYTThumbnail}
                                                    onChange={() => {
                                                        setUseYTThumbnail(
                                                            !useYTThumbnail
                                                        )
                                                    }}
                                                />
                                            </ListModalKeyValue>
                                            <ListModalKeyValue>
                                                <Key>Thumbnail:</Key>
                                                <input
                                                    disabled={useYTThumbnail}
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(
                                                        event: React.ChangeEvent<HTMLInputElement>
                                                    ) => {
                                                        if (
                                                            event.target
                                                                .files === null
                                                        ) {
                                                            return
                                                        }
                                                        setThumbnailFile(
                                                            event?.target
                                                                ?.files[0]
                                                        )
                                                    }}
                                                />
                                            </ListModalKeyValue>
                                            <ListModalKeyValue>
                                                <Key>Author:</Key>
                                                <input
                                                    id="_add_vod_author"
                                                    type="text"
                                                    placeholder="Author"
                                                    value={author}
                                                    onChange={(
                                                        event: React.ChangeEvent<HTMLInputElement>
                                                    ) => {
                                                        setAuthor(
                                                            event.target.value
                                                        )
                                                    }}
                                                />
                                            </ListModalKeyValue>
                                            <ListModalKeyValue>
                                                <Key>Video Tags:</Key>
                                                {selectedSections.map(
                                                    (
                                                        section:
                                                            | Section
                                                            | undefined
                                                    ) => {
                                                        return (
                                                            <div
                                                                key={
                                                                    section &&
                                                                    section.label
                                                                }
                                                            >
                                                                <span>
                                                                    {section &&
                                                                        section.label}
                                                                </span>
                                                                <button
                                                                    onClick={() => {
                                                                        setSelectedSections(
                                                                            selectedSections.filter(
                                                                                (
                                                                                    value:
                                                                                        | Section
                                                                                        | undefined
                                                                                ) =>
                                                                                    value !==
                                                                                    section
                                                                            )
                                                                        )
                                                                    }}
                                                                >
                                                                    X
                                                                </button>
                                                            </div>
                                                        )
                                                    }
                                                )}
                                                <select
                                                    id="_add_vod_tags"
                                                    onChange={(
                                                        event: React.FormEvent<HTMLSelectElement>
                                                    ) => {
                                                        const section =
                                                            existingSections.find(
                                                                (section) =>
                                                                    (section &&
                                                                        section.label) ===
                                                                    event
                                                                        .currentTarget
                                                                        .value
                                                            )
                                                        section !== undefined &&
                                                            setSelectedSections(
                                                                [
                                                                    ...selectedSections,
                                                                    section,
                                                                ]
                                                            )
                                                    }}
                                                >
                                                    <option value="">
                                                        Select a section
                                                    </option>
                                                    {existingSections
                                                        .filter(
                                                            (section) =>
                                                                !selectedSections.find(
                                                                    (s) =>
                                                                        s &&
                                                                        section &&
                                                                        s.label ===
                                                                            section.label
                                                                )
                                                        )
                                                        .map((section) => {
                                                            return (
                                                                <option
                                                                    value={
                                                                        section &&
                                                                        section.label
                                                                    }
                                                                    key={
                                                                        section &&
                                                                        section.label
                                                                    }
                                                                >
                                                                    {section &&
                                                                        section.label}
                                                                </option>
                                                            )
                                                        })}
                                                </select>
                                            </ListModalKeyValue>
                                        </ListModalContentBodyContent>
                                    )}
                                </ListModalContentBody>
                                <ListModalContentFooter>
                                    {uploading ? (
                                        <Loader type="Bars" color="#ff9900" />
                                    ) : (
                                        <>
                                            <CancelButton
                                                onClick={() => {
                                                    setModalOpen(false)
                                                    setEditMode(false)
                                                }}
                                            >
                                                Cancel
                                            </CancelButton>
                                            <DeclineButton
                                                onClick={() => {
                                                    onDeclineAccept(false)
                                                }}
                                            >
                                                Decline
                                            </DeclineButton>
                                            {editMode ? (
                                                <AcceptButton
                                                    onClick={() => {
                                                        onDeclineAccept(true)
                                                    }}
                                                >
                                                    Accept
                                                </AcceptButton>
                                            ) : (
                                                <EditButton
                                                    onClick={() => {
                                                        setEditMode(true)
                                                    }}
                                                >
                                                    Edit
                                                </EditButton>
                                            )}
                                        </>
                                    )}
                                </ListModalContentFooter>
                            </ListModalContent>
                        </ListModal>
                    )}
                </ListContainer>
            )}
        </AdminLayout>
    )
}

export default SubmissionsManagement
