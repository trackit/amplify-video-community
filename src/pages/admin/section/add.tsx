import React, { useState } from 'react'

import { createNewSection } from '../../../shared/utilities/mutate'
import { AdminLayout } from '../../../shared/components'

const SectionAddForm = () => {
    const [name, setName] = useState<string>('')

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        if (name !== undefined || name !== '') {
            try {
                const section = await createNewSection(name)
                console.log(section)
            } catch (error) {
                console.error('SectionAdd.tsx', error)
                return
            }
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <div style={{ margin: '15px' }}>
                <label htmlFor="_add_section_name">Section Name</label>
                <input
                    id="_add_section_name"
                    type="text"
                    value={name}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setName(event.target.value)
                    }}
                />
            </div>
            <div style={{ margin: '15px' }}>
                <input type="submit" value="Create section" />
            </div>
        </form>
    )
}

const DashboardSectionAdd = () => {
    return (
        <AdminLayout>
            <h1>Section Add</h1>
            <SectionAddForm />
        </AdminLayout>
    )
}

export default DashboardSectionAdd
