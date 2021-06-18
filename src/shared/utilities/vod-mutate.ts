import { API, graphqlOperation, Storage } from 'aws-amplify'
import {
    createThumbnailObject,
    createVideoObject,
    createVideoSection,
    createVodAsset,
} from '../../graphql/mutations'
import { v4 as uuidv4 } from 'uuid'
import awsvideoconfig from '../../aws-video-exports'
import awsmobile from '../../aws-exports'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import * as APIt from '../../API'

async function setVideoSections(videoSection: APIt.CreateVideoSectionInput) {
    return API.graphql(
        graphqlOperation(createVideoSection, {
            input: videoSection,
        })
    ) as GraphQLResult<APIt.CreateVideoSectionMutation>
}

async function createVideoAsset(payload: APIt.CreateVodAssetInput) {
    return API.graphql(
        graphqlOperation(createVodAsset, {
            input: payload,
        })
    ) as GraphQLResult<APIt.CreateVodAssetMutation>
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

async function setThumbnailObject(id: string, thumbnailExtension: string[]) {
    return API.graphql(
        graphqlOperation(createThumbnailObject, {
            input: {
                id: id,
                ext: thumbnailExtension[thumbnailExtension.length - 1],
            },
        })
    )
}

async function setVideoObject(id: string) {
    return API.graphql(
        graphqlOperation(createVideoObject, {
            input: {
                id: id,
            },
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
    const id = uuidv4()
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
        // return
    }

    try {
        await putThumbnailFile(thumbnailFile, id, thumbnailExtension)
    } catch (error) {
        console.error('vod-mutate.ts(putThumbnailFile): ', error)
        // return
    }

    try {
        await setThumbnailObject(id, thumbnailExtension)
    } catch (error) {
        console.error('vod-mutate.tx(setThumbnailObject): ', error)
        return
    }
    try {
        await setVideoObject(id)
    } catch (error) {
        console.error('vod-mutate.tx(setVideoObject): ', error)
        return
    }

    try {
        const { data } = await createVideoAsset({
            title: title,
            description: description,
            vodAssetVideoId: id,
            vodAssetThumbnailId: id,
            highlighted: highlighted,
        })
        for (let i = 0; i < sectionsId.length; i++) {
            await setVideoSections({
                sectionID: sectionsId[i] as string,
                videoID: data?.createVodAsset?.id as string,
            })
        }
    } catch (error) {
        console.error('vod-mutate.tx(createVodAsset): ', error)
        return
    }
}

export { uploadVideo, setVideoSections, createVideoAsset }
