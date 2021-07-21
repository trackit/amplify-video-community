import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'
import styled from 'styled-components'
import Loader from 'react-loader-spinner'

import { createNewSection, fetchSections } from '../../../shared/utilities'
import { AdminLayout } from '../../../shared/components'
import { Section } from '../../../models'

const FormItem = styled.div`
    margin: 15px;
`

const CreateSection = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [sections, setSections] = useState<Array<Section>>([])
    const [name, setName] = useState<string>('')

    useEffect(() => {
        ;(async () => {
            setLoading(true)
            try {
                const { data } = await fetchSections()
                setSections(data?.listSections?.items as Array<Section>)
            } catch (error) {
                console.error('SectionManage.tsx ', error)
            }
            setLoading(false)
        })()
    }, [])

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
            <div>
                {loading ? (
                    <Loader
                        type="Bars"
                        color="#FFA41C"
                        height={100}
                        width={100}
                        timeout={3000}
                    />
                ) : (
                    <div>
                        <p>Existing sections: </p>
                        <div>
                            {sections &&
                                sections.map((section) => {
                                    return (
                                        <span key={section.id}>
                                            {section.label}
                                        </span>
                                    )
                                })}
                        </div>
                    </div>
                )}
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
            </div>
        </AdminLayout>
    )
}

export default CreateSection
