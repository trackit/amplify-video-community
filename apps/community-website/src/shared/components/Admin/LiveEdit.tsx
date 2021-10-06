import React from 'react'
import {
    Edit,
    SimpleForm,
    TextInput,
    BooleanInput,
    ImageInput,
    ImageField,
} from 'react-admin'

import ThumbnailField from './customFields/ThumbnailField'

const LiveEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <ThumbnailField source="thumbnail" width={400} height={200} />
            <TextInput source="title" />
            <TextInput source="description" multiline={true} />
            <BooleanInput source="isLive" label="Start live" />
            <TextInput source="author" />
            <ImageInput
                source="thumbnail"
                label="Thumbnail"
                accept="image/*"
                multiple={false}
            >
                <ImageField source="thumbnailBlob" title="Thumbnail" />
            </ImageInput>
        </SimpleForm>
    </Edit>
)

export default LiveEdit
