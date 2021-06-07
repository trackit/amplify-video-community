import { API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql'
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
                    token
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
        return API.graphql(
            graphqlOperation(listVodAssets, { nextToken: nextToken })
        ) as GraphQLResult<APIt.ListVodAssetsQuery>
    else
        return API.graphql(
            graphqlOperation(listVodAssets)
        ) as GraphQLResult<APIt.ListVodAssetsQuery>
}

async function fetchHighlightedVideos() {
    const filter: ModelvodAssetFilterInput = {
        highlighted: {
            eq: true,
        },
    }
    return API.graphql(
        graphqlOperation(listVodAssets, { filter })
    ) as GraphQLResult<APIt.GetVodAssetQuery>
}

async function fetchVodAsset(id: string) {
    return API.graphql(
        graphqlOperation(getVodAsset, { id: id })
    ) as GraphQLResult<APIt.GetVodAssetQuery>
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
    return API.graphql(
        graphqlOperation(listVodSections, { id: id })
    ) as GraphQLResult<ListVodSections>
}

export {
    fetchVodFiles,
    fetchHighlightedVideos,
    fetchVodAsset,
    fetchVodSections,
}
