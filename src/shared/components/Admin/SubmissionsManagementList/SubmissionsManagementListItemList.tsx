import React, { useState } from 'react'

import { ContentSubmission } from '../../../../models'

type SubmissionsListItemListProps = {
    contentSubmission: ContentSubmission
    selectedContentSubmission: ContentSubmission | null
    setSelectedContentSubmission: React.Dispatch<
        React.SetStateAction<ContentSubmission | null>
    >
}

const SubmissionsListItemList = ({
    contentSubmission,
    selectedContentSubmission,
    setSelectedContentSubmission,
}: SubmissionsListItemListProps) => {
    const [hover, setHover] = useState<boolean>(false)
    const hoverStyles = {
        backgroundColor: '#969696',
        cursor: 'pointer',
    }
    const selectedStyles = {
        backgroundColor: '#E3E3E3',
    }
    return (
        contentSubmission && (
            <div
                style={{
                    borderBottom: 'solid 1px black',
                    display: 'flex',
                    ...(hover ? hoverStyles : null),
                    ...(selectedContentSubmission === contentSubmission
                        ? selectedStyles
                        : null),
                }}
                onClick={() => {
                    setSelectedContentSubmission(contentSubmission)
                }}
                onMouseEnter={() => {
                    setHover(true)
                }}
                onMouseLeave={() => {
                    setHover(false)
                }}
            >
                <div>
                    <p>{contentSubmission?.title}</p>
                    <p>{contentSubmission?.description}</p>
                </div>
                <div>
                    <p>{'>'}</p>
                </div>
            </div>
        )
    )
}

export default SubmissionsListItemList
