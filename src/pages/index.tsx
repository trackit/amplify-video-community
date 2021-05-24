import * as React from "react"
import { NavBar } from '../shared/components'
import { withAuthenticator } from '@aws-amplify/ui-react'

import Amplify from 'aws-amplify'
import awsmobile from '../aws-exports'

Amplify.configure(awsmobile)

const HomePage = () => {
    return (
        <div>
            <NavBar />
        </div>
    )
}

export default withAuthenticator(HomePage)


