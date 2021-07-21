import React, { useEffect, useState } from 'react'

import { fetchSection } from '../../../utilities/fetch'
import { Section, VideoOnDemand } from '../../../../models'
import * as API from '../../../../API'
import { fetchVodAsset } from '../../../utilities/vod-fetch'

type SectionVideoProps = {
    media: API.MediasSections
}

const SectionVideo = ({ media }: SectionVideoProps) => {
    const [vod, setVod] = useState<VideoOnDemand | null>(null)

    useEffect(() => {
        ;(async () => {
            try {
                const { data } = await fetchVodAsset(media.mediaID)
                if (data?.getVideoOnDemand === null) {
                    throw new Error('data.getVideoOnDemand is null')
                }
                setVod(data?.getVideoOnDemand as VideoOnDemand)
            } catch (error) {
                console.error(
                    'SectionsManagementList.tsx(SectionVideo):',
                    error
                )
            }
        })()
    }, [])

    return vod ? (
        <li key={vod.media?.id}>
            <a href={`/video/${vod.media?.id}`}>{vod.media?.title}</a>
        </li>
    ) : (
        <p>Loading ...</p>
    )
}

type SectionsManagementListItemProps = {
    selectedSection: Section
}

const SectionsManagementListItem = ({
    selectedSection,
}: SectionsManagementListItemProps) => {
    const [medias, set] = useState<Array<API.MediasSections> | null>(null)

    const deleteSection = () => {
        console.log('delete section ' + selectedSection.id)
    }

    useEffect(() => {
        ;(async () => {
            if (selectedSection.id === null) {
                return
            }
            try {
                const { data } = await fetchSection(selectedSection.id)
                console.log(
                    'SectionsManagementListItem(fetchSection).tsx: ',
                    data
                )
                set(
                    data?.getSection?.medias?.items as Array<API.MediasSections>
                )
            } catch (e) {
                console.error(
                    'SectionsManagementListItem(fetchSection).tsx: ',
                    e
                )
            }
        })()
    }, [selectedSection])

    return (
        <div>
            <p>Label: {selectedSection.label}</p>
            <p>Videos:</p>
            {medias &&
                medias.map((media) => (
                    <SectionVideo key={media.id} media={media} />
                ))}
            <button onClick={deleteSection}>Delete Section</button>
        </div>
    )
}

export default SectionsManagementListItem
