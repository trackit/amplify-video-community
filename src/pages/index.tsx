import * as React from "react"

import { withAuthenticator } from '@aws-amplify/ui-react'

import Amplify from 'aws-amplify'
import awsmobile from '../aws-exports'
import HomePage from "../tmp/Home";

Amplify.configure(awsmobile)

const IndexPage = () => {
  return (
      <div>
        <HomePage />
      </div>
  )
}

export default withAuthenticator(IndexPage)
