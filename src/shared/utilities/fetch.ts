import { API, Storage, Auth } from 'aws-amplify'
import { getSection, listSections } from '../../graphql/queries'
import {
    GraphQLResult,
    GRAPHQL_AUTH_MODE,
    GraphQLOptions,
} from '@aws-amplify/api-graphql'
import awsmobile from '../../aws-exports'
import * as APIt from '../../API'
import { vodAsset } from '../../models'

async function fetchSections() {
    const opts: GraphQLOptions = {
        query: listSections,
        authMode:
            Auth.Credentials.getCredSource() !== 'userPool'
                ? GRAPHQL_AUTH_MODE.AWS_IAM
                : GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }
    return API.graphql(opts) as GraphQLResult<APIt.ListSectionsQuery>
}

async function fetchSection(id: string | null) {
    return API.graphql({
        query: getSection,
        variables: { input: { id } },
        authMode:
            Auth.Credentials.getCredSource() !== 'userPool'
                ? GRAPHQL_AUTH_MODE.AWS_IAM
                : GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
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
