import React, { useState } from 'react'

import { ContentSubmission } from '../../../../models'
import SubmissionManagementListItem from './SubmissionsManagementListItem'
import SubmissionManagementListItemList from './SubmissionsManagementListItemList'

type SubmissionManagementListProps = {
    contentSubmissions: Array<ContentSubmission>
}

const SubmissionManagementList = ({
    contentSubmissions,
}: SubmissionManagementListProps) => {
    const [selectedContentSubmission, setSelectedContentSubmission] =
        useState<ContentSubmission | null>(null)
    const [searchValue, setSearchValue] = useState('')

    const filterContentSubmission = (contentSubmission: ContentSubmission) => {
        return (
            (contentSubmission.title &&
                contentSubmission.title
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())) ||
            (contentSubmission.description &&
                contentSubmission.description
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())) ||
            (contentSubmission.email &&
                contentSubmission.email
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()))
        )
    }

    return (
        <div style={{ width: '100%' }}>
            <div style={{ display: 'flex', width: '100%' }}>
                <div style={{ padding: '15px' }}>
                    <div style={{ display: 'flex', width: '100%' }}>
                        <div style={{ width: '100%' }}>
                            <input
                                type="text"
                                placeholder="Search..."
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
                        {contentSubmissions
                            .filter(filterContentSubmission)
                            .map((contentSubmission) => {
                                return (
                                    <SubmissionManagementListItemList
                                        key={contentSubmission.id}
                                        contentSubmission={contentSubmission}
                                        selectedContentSubmission={
                                            selectedContentSubmission
                                        }
                                        setSelectedContentSubmission={
                                            setSelectedContentSubmission
                                        }
                                    />
                                )
                            })}
                    </div>
                </div>
                <div style={{ padding: '15px', width: '100%' }}>
                    {selectedContentSubmission && (
                        <SubmissionManagementListItem
                            selectedContentSubmission={
                                selectedContentSubmission
                            }
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default SubmissionManagementList
