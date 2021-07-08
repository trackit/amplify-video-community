import React from 'react'

import { YoutubeUploadForm } from '../../../shared/components/Admin/YoutubeUploadForm'
import { AdminLayout } from '../../../shared/components'

const HomePage = () => {
    return (
        <AdminLayout>
            <YoutubeUploadForm />
        </AdminLayout>
    )
}

export default HomePage
