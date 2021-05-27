
import React, { useEffect, useState } from 'react'
import { Storage } from 'aws-amplify'

import awsmobile from '../../../aws-exports'
import { fetchVodSections } from '../../utilities'
import Loader from 'react-loader-spinner'

const AssetsManagementListItem = ({ selectedAsset }: any) => {
    const [thumbnail, setThumbnail] = useState(
        <Loader type="Rings" color="#FFA41C" height={100} width={100} timeout={3000} />
    )
    const [sections, setSections] = useState<Array<any>>([])

    useEffect(() => {
        ;(async () => {
            try {
                const data: String | Object = await Storage.get(`thumbnails/${selectedAsset.thumbnail.id}.${selectedAsset.thumbnail.ext}`, {
                    bucket: awsmobile.aws_user_files_s3_bucket,
                    customPrefix: { public: '' },
                })
                setThumbnail(<img src={data as string} alt="thumbnail" />)  
            } catch (error ) {
                console.error('AssetsManagementList(Storage.get): ', error)
            }
        })()
    }, [setThumbnail])

    useEffect(() => {
        try {
            ;(async () => {
                const { data }: any = await fetchVodSections(selectedAsset.id)
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
                {sections
                    .map((s) => (
                        <span key={s.section.label}>{s.section.label}</span>
                    ))}
            </p>
            <p>Related to: </p>
        </div>
    )
}

export default AssetsManagementListItem
