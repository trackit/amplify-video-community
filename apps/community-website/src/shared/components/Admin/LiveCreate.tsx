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
import styled from 'styled-components'

import { fetchSections } from '../../utilities'

const InputsContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const CommonInputs = () => {
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
        <InputsContainer>
            <TextInput source="title" validate={required()} />
            <TextInput
                source="description"
                multiline={true}
                validate={required()}
            />
            <AutocompleteArrayInput
                source="sections"
                choices={existingSections}
                validate={required()}
            />
        </InputsContainer>
    )
}

const LivestreamCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <InputsContainer>
                <CommonInputs {...props} />
                <ImageInput
                    source="thumbnail"
                    label="Thumbnail"
                    accept="image/*"
                    multiple={false}
                    validate={required()}
                >
                    <ImageField source="thumbnailBlob" title="Thumbnail" />
                </ImageInput>
            </InputsContainer>
        </SimpleForm>
    </Create>
)

export default LivestreamCreate
