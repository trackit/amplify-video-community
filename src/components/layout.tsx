import React from "react"
import { NavBar } from '../shared/components'

import { withAuthenticator } from '@aws-amplify/ui-react'
import Amplify from 'aws-amplify'
import awsmobile from '../aws-exports'

Amplify.configure(awsmobile)

const Layout = ({ children }: any) => {
    return (
        <div>
            <NavBar />
            {children}
        </div>
    )
}

export default withAuthenticator(Layout);
