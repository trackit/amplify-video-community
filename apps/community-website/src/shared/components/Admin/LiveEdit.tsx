import React from 'react'
import {
    Edit,
    SimpleForm,
    TextInput,
    BooleanInput,
    ImageInput,
    ImageField,
    FormDataConsumer,
} from 'react-admin'
import ThumbnailField from './customFields/ThumbnailField'

const LiveEdit = (props) => {
    return (
        <Edit {...props}>
            <SimpleForm>
                <ThumbnailField source="thumbnail" width={400} height={200} />
                <TextInput source="media.title" />
                <TextInput source="media.description" multiline={true} />
                <BooleanInput source="media.highlighted" />
                <TextInput source="media.author" />
                <FormDataConsumer>
                    {() => (
                        <ImageInput
                            source="thumbnail"
                            label="Thumbnail"
                            accept="image/*"
                            multiple={false}
                        >
                            <ImageField
                                source="thumbnailBlob"
                                title="Thumbnail"
                            />
                        </ImageInput>
                    )}
                </FormDataConsumer>
            </SimpleForm>
        </Edit>
    )
}

export default LiveEdit
