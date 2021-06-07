import React, { useState } from 'react'
import { vodAsset } from '../../../models'

type AssetsManagementListItemListProps = {
    asset: vodAsset
    selectedAsset: vodAsset
    setSelectedAsset: React.Dispatch<React.SetStateAction<vodAsset>>
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
                <p>{asset.title}</p>
                <p>{asset.description}</p>
            </div>
            <div>
                <p>{'>'}</p>
            </div>
        </div>
    )
}

export default AssetsManagementListItemList
