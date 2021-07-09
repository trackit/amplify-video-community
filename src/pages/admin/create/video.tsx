import React from 'react'

import { VideoUploadForm } from '../../../shared/components/Admin/VideoUploadForm'
import { AdminLayout } from '../../../shared/components'

const CreateVideo = () => {
    return (
        <AdminLayout>
            <VideoUploadForm />
        </AdminLayout>
    )
}

export default CreateVideo
