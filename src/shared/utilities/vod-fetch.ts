import { API, Auth } from 'aws-amplify'
import { GraphQLResult, GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql'
import { getVodAsset } from '../../graphql/queries'
import { ModelvodAssetFilterInput } from '../../API'
import * as APIt from '../../API'

const listVodAssets = /* GraphQL */ `
    query ListVodAssets(
        $filter: ModelvodAssetFilterInput
        $limit: Int
        $nextToken: String
    ) {
        listVodAssets(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                title
                description
                highlighted
                video {
                    id
                    createdAt
                    updatedAt
                }
                thumbnail {
                    id
                    ext
                    createdAt
                    updatedAt
                }
                sections {
                    items {
                        id
                    }
                    nextToken
                }
                createdAt
                updatedAt
            }
            nextToken
        }
    }
`

async function fetchVodFiles(nextToken: string | null) {
    if (nextToken !== null && nextToken !== '')
        return API.graphql({
            query: listVodAssets,
            variables: {
                nextToken,
            },
            authMode:
                Auth.Credentials.getCredSource() !== 'userPool'
                    ? GRAPHQL_AUTH_MODE.AWS_IAM
                    : GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        }) as GraphQLResult<APIt.ListVodAssetsQuery>
    else
        return API.graphql({
            query: listVodAssets,
            authMode:
                Auth.Credentials.getCredSource() !== 'userPool'
                    ? GRAPHQL_AUTH_MODE.AWS_IAM
                    : GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
        }) as GraphQLResult<APIt.ListVodAssetsQuery>
}

async function fetchHighlightedVideos() {
    const filter: ModelvodAssetFilterInput = {
        highlighted: {
            eq: true,
        },
    }
    return API.graphql({
        query: listVodAssets,
        variables: { filter },
        authMode:
            Auth.Credentials.getCredSource() !== 'userPool'
                ? GRAPHQL_AUTH_MODE.AWS_IAM
                : GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as GraphQLResult<APIt.GetVodAssetQuery>
}

async function fetchVodAsset(id: string) {
    return API.graphql({
        query: getVodAsset,
        variables: {
            id,
        },
        authMode:
            Auth.Credentials.getCredSource() !== 'userPool'
                ? GRAPHQL_AUTH_MODE.AWS_IAM
                : GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as GraphQLResult<APIt.GetVodAssetQuery>
}

export const listVodSections = /* GraphQL */ `
    query GetVodAsset($id: ID!) {
        getVodAsset(id: $id) {
            id
            title
            description
            highlighted
            sections {
                items {
                    id
                    section {
                        id
                        label
                        createdAt
                        updatedAt
                    }
                    createdAt
                    updatedAt
                }
                nextToken
            }
            createdAt
            updatedAt
        }
    }
`

export type ListVodSections = {
    getVodAsset: {
        id: string
        title: string
        description: string
        highlighted: boolean
        sections: {
            items: Array<{
                id: string
                section: {
                    id: string
                    label: string
                    createdAt: string
                    updatedAt: string
                }
                createdAt: string
                updatedAt: string
            }>
            nextToken: string
        }
        createdAt: string
        updatedAt: string
    }
}

async function fetchVodSections(id: string) {
    return API.graphql({
        query: listVodSections,
        variables: {
            id: id,
        },
        authMode:
            Auth.Credentials.getCredSource() !== 'userPool'
                ? GRAPHQL_AUTH_MODE.AWS_IAM
                : GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
    }) as GraphQLResult<ListVodSections>
}

export {
    fetchVodFiles,
    fetchHighlightedVideos,
    fetchVodAsset,
    fetchVodSections,
}
