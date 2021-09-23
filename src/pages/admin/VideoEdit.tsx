import React from 'react'
import { Edit, SimpleForm, TextInput, BooleanInput } from 'react-admin'

const VideoEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="title" />
            <TextInput source="description" multiline={true} />
            <BooleanInput source="highlighted" />
            <TextInput source="author" />
        </SimpleForm>
    </Edit>
)

export default VideoEdit
