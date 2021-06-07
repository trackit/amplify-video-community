import { API, graphqlOperation, Storage } from 'aws-amplify'
import { getSection, listSections } from '../../graphql/queries'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import awsmobile from '../../aws-exports'
import * as APIt from '../../API'
import { vodAsset } from '../../models'

async function fetchSections(nextToken: string | null) {
    if (nextToken !== null && nextToken !== '')
        return API.graphql(
            graphqlOperation(listSections, { nexToken: nextToken })
        ) as GraphQLResult<APIt.ListSectionsQuery>
    else
        return API.graphql(
            graphqlOperation(listSections)
        ) as GraphQLResult<APIt.ListSectionsQuery>
}

async function fetchSection(id: string | null) {
    return API.graphql(
        graphqlOperation(getSection, { input: { id } })
    ) as GraphQLResult<APIt.GetSectionQuery>
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
