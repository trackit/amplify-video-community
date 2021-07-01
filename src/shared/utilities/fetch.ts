import { API, Storage } from 'aws-amplify'
import { getSection, listSections } from '../../graphql/queries'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import awsmobile from '../../aws-exports'
import * as APIt from '../../API'
import { VideoOnDemand } from '../../models'
import { getAuthMode } from './helper'

async function fetchSections() {
    return API.graphql({
        query: listSections,
        authMode: getAuthMode(),
    }) as GraphQLResult<APIt.ListSectionsQuery>
}

async function fetchSection(id: string) {
    return API.graphql({
        query: getSection,
        variables: { input: { id } },
        authMode: getAuthMode(),
    }) as GraphQLResult<APIt.GetSectionQuery>
}

async function fetchThumbnail(vod: VideoOnDemand) {
    return Storage.get(
        `thumbnails/${vod?.media?.thumbnail?.id}.${vod?.media?.thumbnail?.ext}`,
        {
            bucket: awsmobile.aws_user_files_s3_bucket,
            level: 'public',
        }
    )
}

export { fetchSection, fetchSections, fetchThumbnail }
