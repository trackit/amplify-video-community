import { API, Storage, Auth } from 'aws-amplify'
import { getSection, listSections } from '../../graphql/queries'
import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql'
import awsmobile from '../../aws-exports'
import * as APIt from '../../API'
import { vodAsset } from '../../models'

async function fetchSections() {
    const data = await Auth.currentSession()
    const groups: Array<string> = data.getIdToken().payload['cognito:groups']
    return API.graphql({
        query: listSections,
        authMode: !groups.includes('Admin')
            ? GRAPHQL_AUTH_MODE.AWS_IAM
            : undefined,
    }) as GraphQLResult<APIt.ListSectionsQuery>
}

async function fetchSection(id: string | null) {
    const data = await Auth.currentSession()
    const groups: Array<string> = data.getIdToken().payload['cognito:groups']
    return API.graphql({
        query: getSection,
        variables: { input: { id } },
        authMode: !groups.includes('Admin')
            ? GRAPHQL_AUTH_MODE.AWS_IAM
            : undefined,
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
