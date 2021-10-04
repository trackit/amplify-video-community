import React from 'react'
import {
    List,
    Datagrid,
    BooleanField,
    DateField,
    TextField,
    UrlField,
    useRecordContext,
} from 'react-admin'
import ThumbnailField from './customFields/ThumbnailField'
import EllipsisTextField from './customFields/EllipsisTextField'
import styled from 'styled-components'

const IsLiveIcon = styled.div`
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: ${({ isLive }) => (isLive ? '#06d6a0' : '#ef476f')};
`
const IsLiveField = ({ source }) => {
    const record = useRecordContext()
    console.log('record: ', record)
    return <IsLiveIcon isLive={record[source]} />
}

const LiveList = (props) => {
    console.log('lives: ', props)
    return (
        <List {...props}>
            <Datagrid rowClick="edit">
                <IsLiveField source="isLive" label="IsLive" />
                <ThumbnailField source="thumbnail" path="media" />
                <EllipsisTextField
                    source="media.title"
                    label="Title"
                    width={'200px'}
                />
                <EllipsisTextField
                    source="media.description"
                    label="Description"
                    width={'600px'}
                />
                <UrlField source="url" />
                <BooleanField source="media.highlighted" label="Highlighted" />
                <TextField source="media.author" label="Author" />
                <TextField source="media.viewCount" label="ViewCount" />
                <DateField source="media.createdAt" label="CreatedAt" />
                <DateField source="media.updatedAt" label="UpdatedAt" />
            </Datagrid>
        </List>
    )
}

export default LiveList
