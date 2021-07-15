import React from 'react'
import styled from 'styled-components'

import { Section } from '../../../models'

type SectionsManagementListItemProps = {
    section: Section
    selectedSection: Section | null
    setSelectedSection: (section: Section) => void
}

const Item = styled.div`
    border-bottom: solid 1px black;
    display: flex;
    justify-content: space-between;

    &:hover {
        background-color: #969696;
        cursor: pointer;
    }

    background-color: ${(props) => props.theme.itemColor};
`

const SectionsManagementListItemList = ({
    section,
    selectedSection,
    setSelectedSection,
}: SectionsManagementListItemProps) => {
    return (
        <Item
            onClick={() => {
                setSelectedSection(section)
            }}
            theme={{ itemColor: selectedSection === section ? '#E3E3E3' : '' }}
        >
            <div>
                <p>{section.label}</p>
            </div>
            <div>
                <p>{'>'}</p>
            </div>
        </Item>
    )
}

export default SectionsManagementListItemList
