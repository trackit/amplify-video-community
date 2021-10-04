import React, { useEffect, useState } from 'react'
import {
    Create,
    SimpleForm,
    TextInput,
    BooleanInput,
    AutocompleteArrayInput,
    ImageInput,
    ImageField,
} from 'react-admin'
import { FormDataConsumer } from 'react-admin'
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
            <TextInput source="title" />
            <TextInput source="description" multiline={true} />
            <BooleanInput source="highlighted" />
            <TextInput source="author" />
            <AutocompleteArrayInput
                source="sections"
                choices={existingSections}
            />
        </InputsContainer>
    )
}

const LivestreamCreate = (props) => (
    <Create {...props}>
        <SimpleForm>
            <FormDataConsumer>
                {(props) => (
                    <InputsContainer>
                        <CommonInputs {...props} />
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
                        <TextInput source="url" />
                    </InputsContainer>
                )}
            </FormDataConsumer>
        </SimpleForm>
    </Create>
)

export default LivestreamCreate
