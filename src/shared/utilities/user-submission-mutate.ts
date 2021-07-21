import { UserSubmissions } from '../../models'
import {
    checkfileExtention,
    putThumbnailFile,
    setThumbnail,
    setUserSubmissions,
} from './mutate'
import { v4 as uuidv4 } from 'uuid'
import { createVOD } from './vod-mutate'

const uploadUserSubmissions = async (
    userSubmissions: UserSubmissions,
    thumbnailFile: File,
    youtubeSrc: string
) => {
    const id: string = uuidv4()

    if (checkfileExtention(thumbnailFile.name)) {
        return
    }
    const thumbnailExtension = thumbnailFile.name.toLowerCase().split('.')
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
        await setUserSubmissions({
            id,
            title: userSubmissions.title,
            description: userSubmissions.description,
            comment: userSubmissions.comment,
            userSubmissionsThumbnailId: id,
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

export { uploadUserSubmissions }
