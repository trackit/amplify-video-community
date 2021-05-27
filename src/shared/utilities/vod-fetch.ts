import { API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql'
import { getVodAsset, listVodAssets } from '../../graphql/queries'
import { ModelvodAssetFilterInput } from '../../API'
import { ListVodAssets } from './vod.interface'

async function fetchVodFiles(nextToken: string | null) {
    if (nextToken !== null && nextToken !== '')
        return API.graphql(
            graphqlOperation(listVodAssets, { nextToken: nextToken })
        ) as Promise<ListVodAssets>
    else
        return API.graphql(
            graphqlOperation(listVodAssets)
        ) as Promise<ListVodAssets>
}

async function fetchHighlightedVideos() {
    const filter: ModelvodAssetFilterInput = {
        highlighted: {
            eq: true,
        },
    }
    return API.graphql(
        graphqlOperation(listVodAssets, { filter })
    ) as Promise<GraphQLResult>
}

async function fetchVodAsset(id: any) {
    return API.graphql(
        graphqlOperation(getVodAsset, { id: id })
    ) as Promise<GraphQLResult>
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
`;

async function fetchVodSections(id: any) {
    return API.graphql(
        graphqlOperation(listVodSections, { id: id })
    ) as Promise<GraphQLResult>
}

export { fetchVodFiles, fetchHighlightedVideos, fetchVodAsset, fetchVodSections }
