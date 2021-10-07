import React from 'react'
import {
    Datagrid,
    DateField,
    List,
    UrlField,
    useRecordContext,
    TextField,
} from 'react-admin'
import EllipsisTextField from './customFields/EllipsisTextField'
import styled from 'styled-components'
import ThumbnailField from './customFields/ThumbnailField'

const IsLiveIcon = styled.div`
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: ${({ isLive }) => (isLive ? '#06d6a0' : '#ef476f')};
`
const IsLiveField = ({ source }) => {
    const record = useRecordContext()
    return <IsLiveIcon isLive={record[source]} />
}

const LiveList = (props) => {
    return (
        <List {...props}>
            <Datagrid rowClick="edit">
                <IsLiveField source="isLive" label="IsLive" />
                <ThumbnailField source="thumbnail" />
                <EllipsisTextField
                    source="title"
                    label="Title"
                    width={'200px'}
                />
                <EllipsisTextField
                    source="description"
                    label="Description"
                    width={'600px'}
                />
                <UrlField source="url" />
                <TextField source="author" />
                <DateField source="createdAt" label="CreatedAt" />
                <DateField source="updatedAt" label="UpdatedAt" />
            </Datagrid>
        </List>
    )
}

export default LiveList
