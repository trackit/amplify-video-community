import { API, graphqlOperation, Storage } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql'

import { createVideoOnDemand } from '../../graphql/mutations'
import {
    checkfileExtention,
    putThumbnailFile,
    setThumbnail,
    setMedia,
    setMediasSections,
} from './mutate'
import awsvideoconfig from '../../aws-video-exports'
import awsmobile from '../../aws-exports'
import * as APIt from '../../API'
import { Media } from '../../models'

async function createVOD(payload: APIt.CreateVideoOnDemandInput) {
    return API.graphql(
        graphqlOperation(createVideoOnDemand, {
            input: payload,
        })
    ) as GraphQLResult<APIt.CreateVideoOnDemandMutation>
}

async function putVodFile(file: File, id: string, vodExtension: string[]) {
    return Storage.put(`${id}.${vodExtension[vodExtension.length - 1]}`, file, {
        bucket: awsvideoconfig.awsInputVideo,
        region: awsmobile.aws_project_region,
        // eslint-disable-next-line
        progressCallback(progress: any) {
            console.log(
                `vodFile Uploaded: ${progress.loaded}/${progress.total}`
            )
        },
    })
}

const uploadSourceSelf = async (
    id: string,
    media: Media,
    thumbnailFile: File,
    vodFile: File,
    sectionsId: Array<undefined | string>
) => {
    if (checkfileExtention(vodFile.name)) {
        return
    }
    const vodExtension = vodFile.name.toLowerCase().split('.')
    try {
        await putVodFile(vodFile, id, vodExtension)
    } catch (error) {
        console.error('vod-mutate.ts(putVodFile): ', error)
        return
    }

    try {
        await putThumbnailFile(thumbnailFile, id)
    } catch (error) {
        console.error('vod-mutate.ts(putThumbnailFile): ', error)
        return
    }

    try {
        await setThumbnail(id)
    } catch (error) {
        console.error('vod-mutate.tx(setThumbnail): ', error)
        return
    }

    try {
        await setMedia({
            id,
            title: media.title,
            description: media.description,
            highlighted: media.highlighted,
            author: media.author,
            source: APIt.Source.SELF,
            mediaThumbnailId: id,
        })
    } catch (error) {
        console.error('vod-mutate.tx(setMedia): ', error)
        return
    }

    try {
        const { data } = await createVOD({
            id,
            videoOnDemandMediaId: id,
            src: null,
        })
        for (let i = 0; i < sectionsId.length; i++) {
            await setMediasSections({
                sectionID: sectionsId[i] as string,
                mediaID: data?.createVideoOnDemand?.id as string,
            })
        }
    } catch (error) {
        console.error('vod-mutate.tx(createVOD): ', error)
        return
    }
}

const uploadSourceYoutube = async (
    id: string,
    media: Media,
    thumbnailFile: File,
    youtubeSrc: string
) => {
    try {
        await putThumbnailFile(thumbnailFile, id)
    } catch (error) {
        console.error('vod-mutate.ts(putThumbnailFile): ', error)
        return
    }

    try {
        await setThumbnail(id)
    } catch (error) {
        console.error('vod-mutate.tx(setThumbnail): ', error)
        return
    }

    try {
        await setMedia({
            id,
            title: media.title,
            description: media.description,
            author: media.author,
            highlighted: media.highlighted,
            source: APIt.Source.YOUTUBE,
            mediaThumbnailId: id,
        })
    } catch (error) {
        console.error('vod-mutate.tx(setMedia): ', error)
        return
    }

    try {
        await createVOD({
            id,
            videoOnDemandMediaId: id,
            src: youtubeSrc,
        })
    } catch (error) {
        console.error('vod-mutate.tx(createVOD): ', error)
        return
    }
}

export { createVOD, uploadSourceSelf, uploadSourceYoutube }
