import React, { useEffect } from 'react'
import { navigate } from 'gatsby'

import { Layout } from '../shared/components'

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
