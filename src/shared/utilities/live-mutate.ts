import { API, graphqlOperation } from 'aws-amplify'
import { v4 as uuidv4 } from 'uuid'

import * as APIt from '../../API'
import { createLivestream } from '../../graphql/mutations'
import { Media } from '../../models'
import {
    checkfileExtention,
    putThumbnailFile,
    setThumbnail,
    setMedia,
    setMediasSections,
} from './mutate'

async function setLivestream(input: APIt.CreateLivestreamInput) {
    return API.graphql(
        graphqlOperation(createLivestream, {
            input,
        })
    )
}

const createNewLivestream = async (
    media: Media,
    thumbnailFile: File,
    src: string,
    sectionsId: Array<undefined | string>
) => {
    const id: string = uuidv4()
    if (checkfileExtention(thumbnailFile.name)) {
        return
    }
    const thumbnailExtension = thumbnailFile.name.toLowerCase().split('.')
    try {
        await putThumbnailFile(thumbnailFile, id, thumbnailExtension)
    } catch (error) {
        console.error('live-mutate.ts(putThumbnailFile): ', error)
        return
    }

    try {
        await setThumbnail(id, thumbnailExtension)
    } catch (error) {
        console.error('live-mutate.tx(setThumbnail): ', error)
        return
    }

    try {
        await setMedia({
            id,
            title: media.title,
            description: media.description,
            highlighted: media.highlighted,
            source: APIt.Source.LIVESTREAM_SELF,
            mediaThumbnailId: id,
        })
    } catch (error) {
        console.error('live-mutate.tx(setMedia): ', error)
        return
    }
    try {
        await setLivestream({
            id,
            url: src,
            isLive: false,
            livestreamMediaId: id,
        })
    } catch (error) {
        console.error('live-mutate.tx(setLivestream): ', error)
        return
    }
    try {
        for (let i = 0; i < sectionsId.length; i++) {
            await setMediasSections({
                sectionID: sectionsId[i] as string,
                mediaID: id,
            })
        }
    } catch (error) {
        console.error('live-mutate.tx(setMediasSections): ', error)
        return
    }
}

export { createNewLivestream }
