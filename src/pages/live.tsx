import * as React from "react"
import {LiveApp} from "../tmp";
import {withAuthenticator} from "@aws-amplify/ui-react";
import Amplify from "aws-amplify";

import awsmobile from "../aws-exports";
Amplify.configure(awsmobile)


export default withAuthenticator(LiveApp)
