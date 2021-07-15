import React, { useState } from 'react'
import { navigate } from 'gatsby'
import styled from 'styled-components'

import { createNewSection } from '../../../shared/utilities/mutate'
import { AdminLayout } from '../../../shared/components'

const FormItem = styled.div`
    margin: 15px;
`

const CreateSection = () => {
    const [name, setName] = useState<string>('')

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        if (name !== undefined || name !== '') {
            try {
                await createNewSection(name)
            } catch (error) {
                console.error(
                    'admin/sections/create.tsx(createNewSection)',
                    error
                )
                return
            }
            navigate('/admin')
        }
    }

    return (
        <AdminLayout>
            <form onSubmit={onSubmit}>
                <FormItem>
                    <label htmlFor="_add_section_name">Section Title</label>
                    <input
                        id="_add_section_name"
                        type="text"
                        value={name}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            setName(event.target.value)
                        }}
                    />
                </FormItem>
                <FormItem>
                    <input type="submit" value="Create section" />
                </FormItem>
            </form>
        </AdminLayout>
    )
}

export default CreateSection
