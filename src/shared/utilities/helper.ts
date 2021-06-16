import { Auth } from 'aws-amplify'
import { GRAPHQL_AUTH_MODE } from '@aws-amplify/api-graphql'

function getAuthMode() {
    return Auth.Credentials.getCredSource() !== 'userPool'
        ? GRAPHQL_AUTH_MODE.AWS_IAM
        : GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS
}

export { getAuthMode }
