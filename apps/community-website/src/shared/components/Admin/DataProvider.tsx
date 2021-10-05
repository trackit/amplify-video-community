import {
    fetchMedias,
    fetchMedia,
    modifyMedia,
    uploadContent,
    removeMedia,
    updateThumbnail,
    fetchSections,
    fetchSection,
    modifySection,
    createNewSection,
    removeSection,
    fetchLivestream,
    modifyLivestream,
    createNewLivestream,
    removeLivestream,
    removeThumbnailFile,
} from '../../utilities'
import { fetchLivestreamsWithThumbnail } from '../../utilities/live-fetch'

const ressourcesMap = {
    Videos: {
        getList: () =>
            fetchMedias().then(({ data }) =>
                data && data.listMedia && data.listMedia.items
                    ? {
                          data: data.listMedia.items,
                          total: data.listMedia.items.length,
                      }
                    : { data: [], total: 0 }
            ),
        getOne: (params) =>
            fetchMedia(params.id).then(({ data }) =>
                data && data.getMedia
                    ? { data: data.getMedia }
                    : { data: { id: params.id } }
            ),
        update: (params) => {
            const promiseList = []
            if (params.data.thumbnail.rawFile) {
                promiseList.push(
                    updateThumbnail(
                        params.previousData.thumbnail,
                        params.previousData.id,
                        params.data.thumbnail.rawFile
                    )
                )
            }
            promiseList.push(
                modifyMedia({
                    ...params.data,
                    createdAt: undefined,
                    updatedAt: undefined,
                    thumbnail: undefined,
                    sections: undefined,
                }).then(({ data }) =>
                    data && data.updateMedia
                        ? { data: data.updateMedia }
                        : { data: {} }
                )
            )
            return Promise.all(promiseList).then((res) => res.at(-1))
        },
        create: (params) => {
            let youtubeID = ''
            if (params.data.source === 'YOUTUBE') {
                const url = new URL(params.data.url)
                const urlParams = new URLSearchParams(url.search)
                youtubeID = urlParams.get('v')
            }
            return uploadContent(
                {
                    id: '',
                    title: params.data.title,
                    description: params.data.description,
                    highlighted: params.data.highlited
                        ? params.data.highlited
                        : false,
                    author: params.data.author,
                },
                params.data.source,
                params.data.sections,
                params.data.source === 'YOUTUBE'
                    ? null
                    : params.data.thumbnail.rawFile,
                params.data.source === 'YOUTUBE'
                    ? null
                    : params.data.video.rawFile,
                params.data.source === 'YOUTUBE'
                    ? `https://youtube.com/embed/${youtubeID}`
                    : ''
            )
        },
        delete: (params) =>
            removeMedia({ id: params.id }).then(({ data }) => ({
                data: data?.deleteMedia,
            })),
        deleteMany: (params) =>
            Promise.all(
                params.ids.map((id) =>
                    removeMedia({ id: id }).then(
                        ({ data }) => data?.deleteMedia
                    )
                )
            ).then((deletedVideos) => ({ data: deletedVideos })),
    },
    Sections: {
        getList: () =>
            fetchSections().then(({ data }) =>
                data && data.listSections && data.listSections.items
                    ? {
                          data: data.listSections.items,
                          total: data.listSections.items.length,
                      }
                    : { data: [], total: 0 }
            ),
        getOne: (params) =>
            fetchSection(params.id).then(({ data }) =>
                data && data.getSection
                    ? { data: data.getSection }
                    : { data: { id: params.id } }
            ),
        update: (params) =>
            modifySection({
                ...params.data,
                createdAt: undefined,
                updatedAt: undefined,
                medias: undefined,
            }).then(({ data }) =>
                data && data.updateSection
                    ? { data: data.updateSection }
                    : { data: {} }
            ),
        create: (params) =>
            createNewSection(params.data.label, params.data.description).then(
                ({ data }) =>
                    data && data.createSection
                        ? { data: data.createSection }
                        : { data: {} }
            ),
        delete: (params) =>
            removeSection({ id: params.id }).then(({ data }) => ({
                data: data?.deleteSection,
            })),
        deleteMany: (params) =>
            Promise.all(
                params.ids.map((id) =>
                    removeSection({ id: id }).then(
                        ({ data }) => data?.deleteSection
                    )
                )
            ).then((deletedVideos) => ({ data: deletedVideos })),
    },
    Lives: {
        getList: () =>
            fetchLivestreamsWithThumbnail().then(({ data }) => {
                return data &&
                    data.listLivestreams &&
                    data.listLivestreams.items
                    ? {
                          data: data.listLivestreams.items,
                          total: data.listLivestreams.items.length,
                      }
                    : { data: [], total: 0 }
            }),
        getOne: (params) =>
            fetchLivestream(params.id).then(({ data }) =>
                data && data.getLivestream
                    ? { data: data.getLivestream }
                    : { data: { id: params.id } }
            ),
        update: (params) => {
            return modifyLivestream({
                id: params.data.id,
                url: params.data.url,
                isLive: params.data.isLive,
                livestreamMediaId: params.data.media.id,
            }).then(({ data }) => {
                return data && data.updateLivestream
                    ? { data: data.updateLivestream }
                    : { data: {} }
            })
        },
        create: (params) => {
            return createNewLivestream(
                {
                    id: '',
                    title: params.data.title,
                    description: params.data.description,
                    highlighted: false,
                    author: 'AmplifyVideo',
                },
                params.data.thumbnail.rawFile,
                'https://c6d98e9ef5e7.us-west-2.playback.live-video.net/api/video/v1/us-west-2.394125495069.channel.AriVnRGWVwdO.m3u8',
                params.data.sections
            ).then(({ data }) => ({ data }))
        },
        delete: async (params) => {
            let removedLivestream
            try {
                removedLivestream = await removeLivestream({ id: params.id })
            } catch (error) {
                console.error(
                    'DataProvider.tsx(delete: removeLivestream): ',
                    error
                )
                return
            }

            try {
                await removeMedia({ id: params.previousData.media.id })
            } catch (error) {
                console.error('DataProvider.tsx(delete: removeMedia): ', error)
                return
            }

            try {
                await removeThumbnailFile(params.previousData.media.thumbnail)
            } catch (error) {
                console.error(
                    'DataProvider.tsx(delete: removeThumbnailFile): ',
                    error
                )
                return
            }

            return new Promise((resolve) =>
                resolve({ data: removedLivestream.data })
            )
        },
        deleteMany: (params) =>
            Promise.all(
                params.ids.map(async (id) => {
                    let removedLivestream
                    const live = await fetchLivestream(id)

                    try {
                        removedLivestream = await removeLivestream({
                            id: live.data?.getLivestream?.id,
                        })
                    } catch (error) {
                        console.error(
                            'DataProvider.tsx(deleteMany: removeLivestream): ',
                            error
                        )
                        return
                    }

                    try {
                        await removeMedia({
                            id: live.data?.getLivestream?.media?.id,
                        })
                    } catch (error) {
                        console.error(
                            'DataProvider.tsx(deleteMany: removeMedia): ',
                            error
                        )
                        return
                    }

                    try {
                        await removeThumbnailFile(
                            live.data?.getLivestream?.media?.thumbnail
                        )
                    } catch (error) {
                        console.error(
                            'DataProvider.tsx(deleteMany: removeThumbnailFile): ',
                            error
                        )
                        return
                    }

                    return new Promise((resolve) =>
                        resolve({ data: removedLivestream.data })
                    )
                })
            ).then((deletedLivestreams) => ({ data: deletedLivestreams })),
    },
}

export default {
    getList: (ressource) => ressourcesMap[ressource].getList(),
    getOne: (ressource, params) => ressourcesMap[ressource].getOne(params),
    update: (ressource, params) => ressourcesMap[ressource].update(params),
    create: (ressource, params) => ressourcesMap[ressource].create(params),
    delete: (ressource, params) => ressourcesMap[ressource].delete(params),
    deleteMany: (ressource, params) =>
        ressourcesMap[ressource].deleteMany(params),
}
