import * as APIt from '../../API'
import { Media } from '../../models'
import {
    checkfileExtention,
    putThumbnailFile,
    setThumbnail,
    setMedia,
} from './mutate'

const uploadSourceTwitch = async (
    id: string,
    media: Media,
    thumbnailFile: File,
    twitchSrc: string
) => {
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
        await setMedia({
            id,
            title: media.title,
            description: media.description,
            highlighted: media.highlighted,
            source: APIt.Source.YOUTUBE,
            mediaThumbnailId: id,
        })
    } catch (error) {
        console.error('vod-mutate.tx(setMedia): ', error)
        return
    }
    console.log(twitchSrc)
    // create livestream
    // add created vod to its sections
}

export { uploadSourceTwitch }
