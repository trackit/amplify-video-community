import React from 'react'
import { Edit, SimpleForm, TextInput, BooleanInput } from 'react-admin'

const LiveEdit = (props) => {
    return (
        <Edit {...props}>
            <SimpleForm>
                <BooleanInput source="isLive" label="IsLive" />
                <TextInput source="url" />
            </SimpleForm>
        </Edit>
    )
}

export default LiveEdit
