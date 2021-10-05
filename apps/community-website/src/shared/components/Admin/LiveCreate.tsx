import React, { useEffect, useState } from 'react'
import {
    Create,
    SimpleForm,
    TextInput,
    AutocompleteArrayInput,
    ImageInput,
    ImageField,
    required,
} from 'react-admin'

import { fetchSections } from '../../utilities'

const LivestreamCreate = (props) => {
    const [existingSections, setExistingSections] = useState([])

    useEffect(() => {
        ;(async () => {
            try {
                const { data } = await fetchSections()
                if (!data || !data.listSections || !data.listSections.items)
                    throw 'Received invalid sections list'
                const formatedSections = data.listSections.items.map(
                    (element) => ({ id: element.id, name: element.label })
                )
                setExistingSections(formatedSections)
            } catch (error) {
                console.error(
                    'Form/LivestreamUpload.tsx(fetchSections):',
                    error
                )
            }
        })()
    }, [])

    return (
        <Create {...props}>
            <SimpleForm>
                <TextInput source="title" validate={required()} />
                <TextInput
                    source="description"
                    multiline={true}
                    validate={required()}
                />
                <AutocompleteArrayInput
                    source="sections"
                    choices={existingSections}
                />
                <ImageInput
                    source="thumbnail"
                    label="Thumbnail"
                    accept="image/*"
                    multiple={false}
                    validate={required()}
                >
                    <ImageField source="thumbnailBlob" title="Thumbnail" />
                </ImageInput>
            </SimpleForm>
        </Create>
    )
}

export default LivestreamCreate
