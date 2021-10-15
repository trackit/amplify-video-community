import { API, Storage } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import {
    getSection,
    listSections,
    listMedia,
    getMedia,
    listMediasSections,
    getMediasSections,
} from '../../graphql/queries'
import awsmobile from '../../aws-exports'
import * as APIt from '../../API'
import { Media } from '../../models'
import { getAuthMode } from './helper'

async function fetchSections() {
    return API.graphql({
        query: listSections,
        authMode: await getAuthMode(),
    }) as GraphQLResult<APIt.ListSectionsQuery>
}

async function fetchSection(id: string) {
    return API.graphql({
        query: getSection,
        variables: { id },
        authMode: await getAuthMode(),
    }) as GraphQLResult<APIt.GetSectionQuery>
}

async function fetchThumbnail(media: Media | undefined) {
    return Storage.get(
        `thumbnails/${media?.thumbnail?.id}.${media?.thumbnail?.ext}`,
        {
            bucket: awsmobile.aws_user_files_s3_bucket,
            level: 'public',
        }
    )
}

async function fetchMedias() {
    return API.graphql({
        query: listMedia,
        authMode: await getAuthMode(),
    }) as GraphQLResult<APIt.ListMediaQuery>
}

async function fetchMedia(id: string) {
    return API.graphql({
        query: getMedia,
        variables: { id },
        authMode: await getAuthMode(),
    }) as GraphQLResult<APIt.GetMediaQuery>
}

async function fetchMediasSections() {
    return API.graphql({
        query: listMediasSections,
        authMode: await getAuthMode(),
    }) as GraphQLResult<APIt.ListMediasSectionsQuery>
}

async function fetchMediasSectionsFiltered(
    filter: APIt.ModelMediasSectionsFilterInput
) {
    return API.graphql({
        query: listMediasSections,
        authMode: await getAuthMode(),
        variables: { filter },
    }) as GraphQLResult<APIt.ListMediasSectionsQuery>
}

async function fetchMediaSections(id: string) {
    return API.graphql({
        query: getMediasSections,
        variables: { id },
        authMode: await getAuthMode(),
    }) as GraphQLResult<APIt.GetMediasSectionsQuery>
}

export {
    fetchSection,
    fetchSections,
    fetchThumbnail,
    fetchMedias,
    fetchMedia,
    fetchMediasSections,
    fetchMediaSections,
    fetchMediasSectionsFiltered,
}
