import React, { useState } from 'react'
import { navigate } from 'gatsby'

import { createNewSection } from '../../../shared/utilities/mutate'
import { AdminLayout } from '../../../shared/components'

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
                <div style={{ margin: '15px' }}>
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
                </div>
                <div style={{ margin: '15px' }}>
                    <input type="submit" value="Create section" />
                </div>
            </form>
        </AdminLayout>
    )
}

export default CreateSection
