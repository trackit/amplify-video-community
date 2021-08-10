import React from 'react'
import styled from 'styled-components'
import { Layout } from '../shared/components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin: 50px 25px;
`

const Message = styled.div`
    font-size: 2em;
    text-align: center;
`

const SearchPage = () => {
    return (
        <Layout>
            <Container>
                <Message>Coming Soon</Message>
            </Container>
        </Layout>
    )
}

export default SearchPage
