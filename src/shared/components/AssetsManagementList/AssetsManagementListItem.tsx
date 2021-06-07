import React, { useEffect, useState } from 'react'
import { fetchThumbnail, fetchVodSections } from '../../utilities'
import Loader from 'react-loader-spinner'
import { vodAsset } from '../../../models'

type AssetsManagementListItemProps = {
    selectedAsset: vodAsset
}

type VideoSections = {
    id: string
    section: {
        id: string
        label: string
        createdAt: string
        updatedAt: string
    }
    createdAt: string
    updatedAt: string
}

const AssetsManagementListItem = ({
    selectedAsset,
}: AssetsManagementListItemProps) => {
    const [thumbnail, setThumbnail] = useState(
        <Loader
            type="Rings"
            color="#FFA41C"
            height={100}
            width={100}
            timeout={3000}
        />
    )
    const [sections, setSections] = useState<Array<VideoSections>>([])

    useEffect(() => {
        ;(async () => {
            try {
                const thumb = await fetchThumbnail(selectedAsset)
                setThumbnail(<img src={thumb as string} alt="thumbnail" />)
            } catch (error) {
                console.error('AssetsManagementList(Storage.get): ', error)
            }
        })()
    }, [setThumbnail])

    useEffect(() => {
        try {
            ;(async () => {
                const { data } = await fetchVodSections(selectedAsset.id)
                if (data === undefined) {
                    return
                }
                setSections(data.getVodAsset.sections.items)
            })()
        } catch (error) {
            console.error('AssetsManagementList(fetchSections): ', error)
        }
    }, [setSections])

    return (
        <div>
            {thumbnail}
            <p>Title: {selectedAsset.title}</p>
            <p>Description: {selectedAsset.description}</p>
            <p>
                Tags:{' '}
                {sections.map((s) => (
                    <span key={s.section.label}>{s.section.label}</span>
                ))}
            </p>
            <p>Related to: </p>
        </div>
    )
}

export default AssetsManagementListItem
