import { API, graphqlOperation } from 'aws-amplify'
import { v4 as uuidv4 } from 'uuid'

import * as APIt from '../../API'
import { createLivestream, updateLivestream } from '../../graphql/mutations'
import { Media } from '../../models'
import {
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

async function modifyLivestream(input: APIt.UpdateLivestreamInput) {
    return API.graphql(
        graphqlOperation(updateLivestream, {
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
    let mediaData
    const id: string = uuidv4()
    try {
        await putThumbnailFile(thumbnailFile, id)
    } catch (error) {
        console.error('live-mutate.ts(putThumbnailFile): ', error)
        return
    }

    try {
        await setThumbnail(id)
    } catch (error) {
        console.error('live-mutate.tx(setThumbnail): ', error)
        return
    }

    try {
        mediaData = await setMedia({
            id,
            title: media.title,
            author: 'AmplifyVideo',
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
    return new Promise((resolve) =>
        resolve({ data: mediaData.data.createMedia })
    )
}

export { createNewLivestream, modifyLivestream }
