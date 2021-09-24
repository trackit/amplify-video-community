import React from 'react'
import { List, Datagrid, TextField, BooleanField, DateField } from 'react-admin'
import ThumbnailField from './customFields/ThumbnailField'
import EllipsisTextField from './customFields/EllipsisTextField'
import SourceField from './customFields/SourceField'

const VideoList = (props) => {
    return (
        <List {...props}>
            <Datagrid rowClick="edit">
                <ThumbnailField source="thumbnail" />
                <EllipsisTextField source="title" width={'200px'} />
                <EllipsisTextField source="description" width={'600px'} />
                <BooleanField source="highlighted" />
                <SourceField source="source" />
                <TextField source="author" />
                <TextField source="viewCount" />
                <DateField source="createdAt" />
                <DateField source="updatedAt" />
            </Datagrid>
        </List>
    )
}

export default VideoList
