import { API } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql'

import * as APIt from '../../API'
import { getAuthMode } from './helper'
import { listLivestreams, getLivestream } from '../../graphql/queries'

async function fetchLivestreams() {
    return API.graphql({
        query: listLivestreams,
        authMode: await getAuthMode(),
    }) as GraphQLResult<APIt.ListLivestreamsQuery>
}

async function fetchLivestream(id: string) {
    return API.graphql({
        query: getLivestream,
        authMode: await getAuthMode(),
        variables: { id },
    }) as GraphQLResult<APIt.GetLivestreamQuery>
}

export { fetchLivestreams, fetchLivestream }
