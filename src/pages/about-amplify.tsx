import React from 'react'
import { Layout } from '../shared/components'
import { graphql, PageProps } from 'gatsby'
import styled from 'styled-components'

const PostContent = styled.div`
    padding: 5%;
`

const AboutAmplify = ({ data }: PageProps) => {
    return (
        <Layout
            seo={{
                title: 'Amplify Video Community - ' + 'About Amplify',
                description:
                    'About Amplify page explain you what is AWS Amplify and what are the use cases.',
            }}
        >
            <PostContent
                dangerouslySetInnerHTML={{
                    __html: data.aboutAmplify.childMarkdownRemark.html,
                }}
            />
        </Layout>
    )
}

export const pageQuery = graphql`
    query {
        aboutAmplify: file(relativePath: { eq: "about-amplify.md" }) {
            id
            childMarkdownRemark {
                id
                html
            }
        }
    }
`

export default AboutAmplify
