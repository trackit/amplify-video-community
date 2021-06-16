import { API, Storage } from 'aws-amplify'
import { getSection, listSections } from '../../graphql/queries'
import { GraphQLResult, GraphQLOptions } from '@aws-amplify/api-graphql'
import awsmobile from '../../aws-exports'
import * as APIt from '../../API'
import { vodAsset } from '../../models'
import { getAuthMode } from './helper'

async function fetchSections() {
    const opts: GraphQLOptions = {
        query: listSections,
        authMode: getAuthMode(),
    }
    return API.graphql(opts) as GraphQLResult<APIt.ListSectionsQuery>
}

async function fetchSection(id: string | null) {
    return API.graphql({
        query: getSection,
        variables: { input: { id } },
        authMode: getAuthMode(),
    }) as GraphQLResult<APIt.GetSectionQuery>
}

async function fetchThumbnail(asset: vodAsset) {
    return Storage.get(
        `thumbnails/${asset?.thumbnail?.id}.${asset?.thumbnail?.ext}`,
        {
            bucket: awsmobile.aws_user_files_s3_bucket,
            level: 'public',
        }
    )
}

export { fetchSection, fetchSections, fetchThumbnail }
