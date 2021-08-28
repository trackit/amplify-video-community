import { API, graphqlOperation } from 'aws-amplify'
import { Storage } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { v4 as uuidv4 } from 'uuid'

import {
    createSection,
    deleteMedia,
    updateMedia,
    deleteThumbnail,
    deleteMediasSections,
    deleteVideoOnDemand,
    deleteLivestream,
} from '../../graphql/mutations'
import { uploadSourceSelf, uploadSourceYoutube } from './vod-mutate'
import * as APIt from '../../API'
import { Media, Thumbnail } from '../../models'

import {
    createThumbnail,
    createMediasSections,
    createMedia,
} from '../../graphql/mutations'
import awsmobile from '../../aws-exports'

const createNewSection = async (label: string, description: string) => {
    return API.graphql(
        graphqlOperation(createSection, {
            input: {
                label,
                description,
            },
        })
    )
}

async function setMediasSections(input: APIt.CreateMediasSectionsInput) {
    return API.graphql(
        graphqlOperation(createMediasSections, {
            input,
        })
    ) as GraphQLResult<APIt.CreateMediasSectionsMutation>
}

async function removeMediasSections(input: APIt.DeleteMediasSectionsInput) {
    return API.graphql(
        graphqlOperation(deleteMediasSections, {
            input,
        })
    ) as GraphQLResult<APIt.DeleteMediasSectionsInput>
}

async function removeThumbnailFile(thumbnail: Thumbnail | undefined) {
    if (!thumbnail) {
        return
    }
    await API.graphql(
        graphqlOperation(deleteThumbnail, {
            input: {
                id: thumbnail.id,
            },
        })
    )
    await Storage.remove(`thumbnails/${thumbnail.id}.${thumbnail.ext}`, {
        bucket: awsmobile.aws_user_files_s3_bucket,
        level: 'public',
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

async function removeVideoOnDemand(input: APIt.DeleteVideoOnDemandInput) {
    return API.graphql(
        graphqlOperation(deleteVideoOnDemand, {
            input,
        })
    )
}

async function removeLivestream(input: APIt.DeleteLivestreamInput) {
    return API.graphql(
        graphqlOperation(deleteLivestream, {
            input,
        })
    )
}

async function removeMedia(input: APIt.DeleteMediaInput) {
    return API.graphql(
        graphqlOperation(deleteMedia, {
            input,
        })
    )
}

async function modifyMedia(input: APIt.UpdateMediaInput) {
    return API.graphql(
        graphqlOperation(updateMedia, {
            input,
        })
    )
}

function checkfileExtention(filename: string) {
    const validThumbnailExtention = ['png', 'jpg', 'jpeg']
    // const validVodFileExtention = ['mp4', 'avi', 'mov', 'mkv']
    const filePart = filename.toLowerCase().split('.')
    return (
        !validThumbnailExtention.includes(filePart[filePart.length - 1]) &&
        /*!validVodFileExtention.includes(filePart[filePart.length - 1]) &&*/
        filePart.length <= 1
    )
}

const uploadContent = async (
    media: Media,
    source: APIt.Source,
    sectionsId: Array<undefined | string>,
    thumbnailFile: File,
    vodFile: File | null,
    youtubeSrc: string
) => {
    const id: string = uuidv4()

    switch (source) {
        case APIt.Source.SELF:
            if (!vodFile) {
                break
            }
            await uploadSourceSelf(
                id,
                media,
                thumbnailFile,
                vodFile,
                sectionsId
            )
            break

        case APIt.Source.YOUTUBE:
            await uploadSourceYoutube(id, media, thumbnailFile, youtubeSrc)
            break

        default:
            break
    }

    for (let i = 0; i < sectionsId.length; i++) {
        await setMediasSections({
            sectionID: sectionsId[i] as string,
            mediaID: id,
        })
    }
}

export {
    uploadContent,
    createNewSection,
    putThumbnailFile,
    setMedia,
    setMediasSections,
    setThumbnail,
    checkfileExtention,
    removeMedia,
    modifyMedia,
    removeThumbnailFile,
    removeMediasSections,
    removeVideoOnDemand,
    removeLivestream,
}
