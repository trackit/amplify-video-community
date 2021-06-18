import React from 'react'

import { Layout } from '../shared/components'
import { navigate } from 'gatsby'

const HomePage = () => {
    navigate('/videos')
    return (
        <Layout>
            <></>
        </Layout>
    )
}

export default HomePage
