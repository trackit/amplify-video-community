import React, { useState } from 'react'
import { Media } from '../../../../models'

type AssetsManagementListItemListProps = {
    media: Media
    selectedMedia: Media | null
    setSelectedMedia: React.Dispatch<React.SetStateAction<Media | null>>
}

const AssetsManagementListItemList = ({
    media,
    selectedMedia,
    setSelectedMedia,
}: AssetsManagementListItemListProps) => {
    const [hover, setHover] = useState<boolean>(false)
    const hoverStyles = {
        backgroundColor: '#969696',
        cursor: 'pointer',
    }
    const selectedStyles = {
        backgroundColor: '#E3E3E3',
    }
    return (
        media && (
            <div
                style={{
                    borderBottom: 'solid 1px black',
                    display: 'flex',
                    ...(hover ? hoverStyles : null),
                    ...(selectedMedia === media ? selectedStyles : null),
                }}
                onClick={() => {
                    setSelectedMedia(media)
                }}
                onMouseEnter={() => {
                    setHover(true)
                }}
                onMouseLeave={() => {
                    setHover(false)
                }}
            >
                <div>
                    <p>{media?.title}</p>
                    <p>{media?.description}</p>
                </div>
                <div>
                    <p>{'>'}</p>
                </div>
            </div>
        )
    )
}

export default AssetsManagementListItemList
