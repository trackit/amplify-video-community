import { API, graphqlOperation } from 'aws-amplify'
import { v4 as uuidv4 } from 'uuid'

import { createSection } from '../../graphql/mutations'
import { uploadSourceSelf, uploadSourceYoutube } from './vod-mutate'
import { uploadSourceTwitch } from './live-mutate'
import * as APIt from '../../API'
import { Media } from '../../models'
import { Storage } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql'

import {
    createThumbnail,
    createMediasSections,
    createMedia,
} from '../../graphql/mutations'
import awsmobile from '../../aws-exports'

const createNewSection = async (name: string) => {
    return API.graphql(
        graphqlOperation(createSection, {
            input: {
                label: name,
            },
        })
    )
}

async function setMediasSections(
    mediasSections: APIt.CreateMediasSectionsInput
) {
    return API.graphql(
        graphqlOperation(createMediasSections, {
            input: mediasSections,
        })
    ) as GraphQLResult<APIt.CreateMediasSectionsMutation>
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

const uploadContent = async (
    media: Media,
    source: APIt.Source,
    sectionsId: Array<undefined | string>,
    thumbnailFile: File,
    vodFile: File | null,
    youtubeSrc: string,
    twitchSrc: string
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

        case APIt.Source.TWITCH:
            await uploadSourceTwitch(id, media, thumbnailFile, twitchSrc)
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
}
