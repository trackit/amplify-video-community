import { UserSubmissions } from '../../models'
import {
    checkfileExtention,
    //putThumbnailFile,
    //setThumbnail,
    setUserSubmissions,
} from './mutate'
import { v4 as uuidv4 } from 'uuid'
//import { createVOD } from './vod-mutate'
import * as APIt from '../../API'

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
        console.log(
            'Should put ThumbnailFile',
            thumbnailFile,
            id,
            thumbnailExtension
        )
        //await putThumbnailFile(thumbnailFile, id, thumbnailExtension)
    } catch (error) {
        console.error('user-submission-mutate.ts(putThumbnailFile): ', error)
        return
    }

    try {
        console.log('Should setThumbnail', id, thumbnailExtension)
        //await setThumbnail(id, thumbnailExtension)
    } catch (error) {
        console.error('user-submission-mutate.ts(setThumbnail): ', error)
        return
    }

    try {
        await setUserSubmissions({
            id,
            title: userSubmissions.title,
            description: userSubmissions.description,
            comment: userSubmissions.comment,
            userSubmissionsThumbnailId: id,
            source: APIt.Source.YOUTUBE,
        })
    } catch (error) {
        console.error('user-submission-mutate.ts(setUserSubmissions): ', error)
        return
    }

    try {
        console.log('Should send VOD', {
            id,
            videoOnDemandMediaId: id,
            src: youtubeSrc,
        })
        /*
        await createVOD({
            id,
            videoOnDemandMediaId: id,
            src: youtubeSrc,
        })
        */
    } catch (error) {
        console.error('user-submission-mutate.ts(createVOD): ', error)
        return
    }
}

export { uploadUserSubmissions }
