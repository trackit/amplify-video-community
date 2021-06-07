import { VodAsset, ListVodAssets } from './vod.interface'
import { fetchSections, fetchThumbnail } from './fetch'
import {
    fetchVodFiles,
    fetchHighlightedVideos,
    fetchVodSections,
} from './vod-fetch'
import { uploadVideo } from './vod-mutate'

export {
    fetchVodFiles,
    fetchHighlightedVideos,
    fetchSections,
    uploadVideo,
    fetchThumbnail,
    fetchVodSections,
}
export type { VodAsset, ListVodAssets }
