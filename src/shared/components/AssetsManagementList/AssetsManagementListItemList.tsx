import React, { useState } from 'react'
import { VideoOnDemand } from '../../../models'

type AssetsManagementListItemListProps = {
    asset: VideoOnDemand
    selectedAsset: VideoOnDemand
    setSelectedAsset: React.Dispatch<React.SetStateAction<VideoOnDemand>>
}

const AssetsManagementListItemList = ({
    asset,
    selectedAsset,
    setSelectedAsset,
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
        <div
            style={{
                borderBottom: 'solid 1px black',
                display: 'flex',
                ...(hover ? hoverStyles : null),
                ...(selectedAsset === asset ? selectedStyles : null),
            }}
            onClick={() => {
                setSelectedAsset(asset)
            }}
            onMouseEnter={() => {
                setHover(true)
            }}
            onMouseLeave={() => {
                setHover(false)
            }}
        >
            <div>
                <p>{asset.media?.title}</p>
                <p>{asset.media?.description}</p>
            </div>
            <div>
                <p>{'>'}</p>
            </div>
        </div>
    )
}

export default AssetsManagementListItemList
