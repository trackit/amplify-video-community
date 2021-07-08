import React from 'react'

import { VideoUploadForm } from '../../../shared/components/Admin/VideoUploadForm'
import { AdminLayout } from '../../../shared/components'

const HomePage = () => {
    return (
        <AdminLayout>
            <VideoUploadForm />
        </AdminLayout>
    )
}

export default HomePage
