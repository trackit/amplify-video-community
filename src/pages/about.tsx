import React from 'react'
import { Layout } from '../shared/components'
import { graphql, PageProps } from 'gatsby'
import styled from 'styled-components'

const PostContent = styled.div`
    padding: 5%;
`

const About = ({ data }: PageProps) => {
    return (
        <Layout>
            <PostContent
                dangerouslySetInnerHTML={{
                    __html: data.about.childMarkdownRemark.html,
                }}
            />
        </Layout>
    )
}

export const pageQuery = graphql`
    query {
        about: file(relativePath: { eq: "about.md" }) {
            id
            childMarkdownRemark {
                id
                html
            }
        }
    }
`

export default About
