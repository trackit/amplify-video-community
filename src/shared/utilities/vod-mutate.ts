import { API, graphqlOperation, Storage } from 'aws-amplify'
import { v4 as uuidv4 } from 'uuid'
import { GraphQLResult } from '@aws-amplify/api-graphql'

import {
    createThumbnail,
    createMediasSections,
    createVideoOnDemand,
    createMedia,
} from '../../graphql/mutations'
import awsvideoconfig from '../../aws-video-exports'
import awsmobile from '../../aws-exports'
import * as APIt from '../../API'

async function setMediasSections(
    mediasSections: APIt.CreateMediasSectionsInput
) {
    return API.graphql(
        graphqlOperation(createMediasSections, {
            input: mediasSections,
        })
    ) as GraphQLResult<APIt.CreateMediasSectionsMutation>
}

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

async function putThumbnailFile(
    file: File,
    id: string,
    thumbnailExtension: string[]
) {
    return Storage.put(
        `thumbnails/${id}.${thumbnailExtension[thumbnailExtension.length - 1]}`,
        file,
        {
            bucket: awsmobile.aws_user_files_s3_bucket,
            level: 'public',
            // eslint-disable-next-line
            progressCallback(progress: any) {
                console.log(
                    `thumbnailFile Uploaded: ${progress.loaded}/${progress.total}`
                )
            },
        }
    )
}

async function setThumbnail(id: string, thumbnailExtension: string[]) {
    return API.graphql(
        graphqlOperation(createThumbnail, {
            input: {
                id: id,
                ext: thumbnailExtension[thumbnailExtension.length - 1],
            },
        })
    )
}

async function setMedia(input: APIt.CreateMediaInput) {
    return API.graphql(
        graphqlOperation(createMedia, {
            input,
        })
    )
}

function checkfileExtention(filename: string) {
    const validThumbnailExtention = ['png', 'jpg', 'jpeg']
    const validVodFileExtention = ['mp4', 'avi', 'mov', 'mkv']
    const filePart = filename.toLowerCase().split('.')
    return (
        !validThumbnailExtention.includes(filePart[filePart.length - 1]) &&
        !validVodFileExtention.includes(filePart[filePart.length - 1]) &&
        filePart.length <= 1
    )
}

const uploadVideo = async (
    title: string,
    description: string,
    vodFile: File,
    thumbnailFile: File,
    highlighted: boolean,
    sectionsId: Array<undefined | string>
) => {
    const id: string = uuidv4()
    if (
        checkfileExtention(thumbnailFile.name) ||
        checkfileExtention(vodFile.name)
    ) {
        return
    }
    const vodExtension = vodFile.name.toLowerCase().split('.')
    const thumbnailExtension = thumbnailFile.name.toLowerCase().split('.')
    try {
        await putVodFile(vodFile, id, vodExtension)
    } catch (error) {
        console.error('vod-mutate.ts(putVodFile): ', error)
        return
    }

    try {
        await putThumbnailFile(thumbnailFile, id, thumbnailExtension)
    } catch (error) {
        console.error('vod-mutate.ts(putThumbnailFile): ', error)
        return
    }

    try {
        await setThumbnail(id, thumbnailExtension)
    } catch (error) {
        console.error('vod-mutate.tx(setThumbnail): ', error)
        return
    }

    try {
        await setMedia({
            id,
            title,
            description,
            highlighted,
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
            src: '',
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

export { uploadVideo, setMediasSections, createVOD }
