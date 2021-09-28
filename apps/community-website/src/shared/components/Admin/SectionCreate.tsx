import React from 'react'
import { Create, SimpleForm, TextInput } from 'react-admin'

const SectionCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="label" />
            <TextInput source="description" multiline={true} />
        </SimpleForm>
    </Create>
)

export default SectionCreate
