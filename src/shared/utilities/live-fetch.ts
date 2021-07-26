import { API } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql'

import * as APIt from '../../API'
import { getAuthMode } from './helper'
import { listLivestreams, getLivestream } from '../../graphql/queries'

async function fetchLivestreams() {
    return API.graphql({
        query: listLivestreams,
        authMode: getAuthMode(),
    }) as GraphQLResult<APIt.ListLivestreamsQuery>
}

async function fetchLivestream(id: string) {
    return API.graphql({
        query: getLivestream,
        authMode: getAuthMode(),
        variables: { id },
    }) as GraphQLResult<APIt.GetLivestreamQuery>
}

export { fetchLivestreams, fetchLivestream }
