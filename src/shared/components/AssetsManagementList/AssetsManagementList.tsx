import React, { useState } from 'react'
import { vodAsset } from '../../../models'
import AssetsManagementListItem from './AssetsManagementListItem'
import AssetsManagementListItemList from './AssetsManagementListItemList'

type AssetsManagementListProps = {
    assets: Array<vodAsset>
}

const AssetsManagementList = ({ assets }: AssetsManagementListProps) => {
    const [selectedAsset, setSelectedAsset] = useState(null)
    const [searchValue, setSearchValue] = useState('')

    const filterAssets = (elem: vodAsset) => {
        return (
            elem.title.includes(searchValue) ||
            elem.description.includes(searchValue)
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
                                placeholder="Amplify video tutorial"
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
                        {assets.filter(filterAssets).map((elem: vodAsset) => {
                            return (
                                <AssetsManagementListItemList
                                    key={elem.id}
                                    asset={elem}
                                    selectedAsset={selectedAsset}
                                    setSelectedAsset={setSelectedAsset}
                                />
                            )
                        })}
                    </div>
                </div>
                <div style={{ padding: '15px' }}>
                    {selectedAsset && (
                        <AssetsManagementListItem
                            selectedAsset={selectedAsset}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default AssetsManagementList
