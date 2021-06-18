import React, { useEffect } from 'react'

import { Layout } from '../shared/components'
import { navigate } from 'gatsby'

const HomePage = () => {
    useEffect(() => {
        navigate('/videos')
    })
    return (
        <Layout>
            <></>
        </Layout>
    )
}

export default HomePage
