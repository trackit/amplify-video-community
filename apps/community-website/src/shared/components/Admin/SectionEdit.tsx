import React from 'react'
import { Edit, SimpleForm, TextInput } from 'react-admin'

const SectionEdit = (props) => (
    <Edit {...props}>
        <SimpleForm>
            <TextInput source="label" />
            <TextInput source="description" multiline={true} />
        </SimpleForm>
    </Edit>
)

export default SectionEdit
