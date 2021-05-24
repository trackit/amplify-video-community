import * as React from "react"
import {withAuthenticator} from "@aws-amplify/ui-react";
import Amplify from "aws-amplify";

import awsmobile from "../aws-exports";
import { NavBar } from '../shared/components'

Amplify.configure(awsmobile)


const LiveApp = () => {
    return (
        <div>
            <NavBar />
            <p>Coming Soon</p>
        </div>
    )
}

export default withAuthenticator(LiveApp)
