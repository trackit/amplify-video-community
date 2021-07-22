import { API } from 'aws-amplify'
import * as APIt from '../../API'

import { createContentSubmission } from '../../graphql/mutations'
import { getAuthMode } from './helper'

async function setContentSubmission(input: APIt.CreateContentSubmissionInput) {
    return API.graphql({
        query: createContentSubmission,
        authMode: getAuthMode(),
        variables: { input: input },
    })
}

export { setContentSubmission }
