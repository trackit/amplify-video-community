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

const uploadVideo = async (
    title: string,
    description: string,
    vodFile: File,
    thumbnailFile: File,
    highlighted: boolean,
    sectionsId: Array<undefined | string>
) => {
    const id = uuidv4()
    const vodExtension = vodFile.name.toLowerCase().split('.')
    const thumbnailExtension = thumbnailFile.name.toLowerCase().split('.')
    try {
        await Storage.put(
            `${id}.${vodExtension[vodExtension.length - 1]}`,
            vodFile,
            {
                bucket: awsvideoconfig.awsInputVideo,
                region: awsmobile.aws_project_region,
                level: 'public',
                // eslint-disable-next-line
                progressCallback(progress: any) {
                    console.log(
                        `vodFile Uploaded: ${progress.loaded}/${progress.total}`
                    )
                },
            }
        )
    } catch (error) {
        console.error('vod-mutate(storage put vod file): ', error)
        return
    }

    try {
        await Storage.put(
            `thumbnails/${id}.${
                thumbnailExtension[thumbnailExtension.length - 1]
            }`,
            thumbnailFile,
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
    } catch (error) {
        console.error('vod-mutate(storage put thumbnail file): ', error)
        return
    }

    try {
        console.log('createThumbnailObject')
        await API.graphql(
            graphqlOperation(createThumbnailObject, {
                input: {
                    id: id,
                    ext: thumbnailExtension[thumbnailExtension.length - 1],
                },
            })
        )
    } catch (error) {
        console.error('vod-mutate(createThumbnail): ', error)
        return
    }
    try {
        console.log('createVideoObject')
        await API.graphql(
            graphqlOperation(createVideoObject, {
                input: {
                    id: id,
                },
            })
        )
    } catch (error) {
        console.error('vod-mutate(createVideo): ', error)
        return
    }

    try {
        console.log('createVideoAsset')
        const { data } = await createVideoAsset({
            title: title,
            description: description,
            vodAssetVideoId: id,
            vodAssetThumbnailId: id,
            highlighted: highlighted,
        })
        for (let i = 0; i < sectionsId.length; i++) {
            console.log('setVideoSections')
            await setVideoSections({
                sectionID: sectionsId[i] as string,
                videoID: data?.createVodAsset?.id as string,
            })
        }
    } catch (error) {
        console.error('vod-mutate(createVodAsset): ', error)
        return
    }
}

export { uploadVideo, setVideoSections, createVideoAsset }
