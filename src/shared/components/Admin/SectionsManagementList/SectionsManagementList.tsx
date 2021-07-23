import React, { useState } from 'react'

import { Section } from '../../../../models'
import SectionsManagementListItem from './SectionsManagementListItem'
import SectionsManagementListItemList from './SectionsManagementListItemList'

type SectionsManagementListProps = {
    sections: Array<Section>
}

const SectionsManagementList = ({ sections }: SectionsManagementListProps) => {
    const [selectedSection, setSelectedSection] = useState<Section | null>(null)
    const [searchValue, setSearchValue] = useState('')

    const filterSections = (elem: Section) => {
        return elem.label.toLowerCase().includes(searchValue.toLowerCase())
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
                        {sections
                            .filter(filterSections)
                            .map((elem: Section) => {
                                return (
                                    <SectionsManagementListItemList
                                        key={elem.id}
                                        section={elem}
                                        selectedSection={selectedSection}
                                        setSelectedSection={setSelectedSection}
                                    />
                                )
                            })}
                    </div>
                </div>
                <div style={{ padding: '15px' }}>
                    {selectedSection && (
                        <SectionsManagementListItem
                            selectedSection={selectedSection}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default SectionsManagementList
