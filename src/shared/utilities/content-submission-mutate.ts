import { API } from 'aws-amplify'

import * as APIt from '../../API'
import {
    createContentSubmission,
    deleteContentSubmission,
} from '../../graphql/mutations'
import { ContentSubmission, Media } from '../../models'
import { getAuthMode } from './helper'
import { uploadSourceYoutube } from './vod-mutate'
import { setMediasSections } from './mutate'

async function setContentSubmission(input: APIt.CreateContentSubmissionInput) {
    return API.graphql({
        query: createContentSubmission,
        authMode: await getAuthMode(),
        variables: { input: input },
    })
}

async function declineContentSubmission(
    input: APIt.DeleteContentSubmissionInput
) {
    return API.graphql({
        query: deleteContentSubmission,
        authMode: await getAuthMode(),
        variables: { input },
    })
}

async function acceptContentSubmission(
    submission: ContentSubmission,
    author: string,
    thumbnailFile: File,
    sectionsId: Array<string>
) {
    const media: Media = {
        id: '',
        title: submission.title || '',
        description: submission.description || '',
        highlighted: false,
        author,
    }
    await uploadSourceYoutube(
        submission.id,
        media,
        thumbnailFile,
        submission.src || ''
    )
    for (let i = 0; i < sectionsId.length; i++) {
        await setMediasSections({
            sectionID: sectionsId[i] as string,
            mediaID: submission.id,
        })
    }
}

export {
    setContentSubmission,
    declineContentSubmission,
    acceptContentSubmission,
}
