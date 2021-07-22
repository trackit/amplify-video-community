import { API } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api-graphql'

import * as APIt from '../../API'
import { getAuthMode } from './helper'
import { listLivestreams } from '../../graphql/queries'

async function fetchLivestreams() {
    return API.graphql({
        query: listLivestreams,
        authMode: getAuthMode(),
    }) as GraphQLResult<APIt.ListLivestreamsQuery>
}

export { fetchLivestreams }
