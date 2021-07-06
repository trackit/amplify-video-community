import React from 'react'
import { useLocation } from '@reach/router'
import Amplify from 'aws-amplify'
import styled, { ThemeProvider } from 'styled-components'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

import { NavBar } from '../'
import theme from '../theme'
import awsmobile from '../../../aws-exports'

Amplify.configure(awsmobile)

type SEOProps = {
    title?: string
    description?: string
    image?: string
    article?: boolean
}

const SEO = ({ title, description, image, article }: SEOProps) => {
    const { pathname } = useLocation()
    const { site } = useStaticQuery(query)

    const {
        defaultTitle,
        titleTemplate,
        defaultDescription,
        siteUrl,
        defaultImage,
        twitterUsername,
    } = site.siteMetadata

    const seo = {
        title: title || defaultTitle,
        description: description || defaultDescription,
        image: `${siteUrl}${image || defaultImage}`,
        url: `${siteUrl}${pathname}`,
    }

    return (
        <Helmet title={seo.title} titleTemplate={titleTemplate}>
            <meta name="description" content={seo.description} />
            <meta name="image" content={seo.image} />
            {seo.url && <meta property="og:url" content={seo.url} />}
            {(article ? true : null) && (
                <meta property="og:type" content="article" />
            )}
            {seo.title && <meta property="og:title" content={seo.title} />}
            {seo.description && (
                <meta property="og:description" content={seo.description} />
            )}
            {seo.image && <meta property="og:image" content={seo.image} />}
            <meta name="twitter:card" content="summary_large_image" />
            {twitterUsername && (
                <meta name="twitter:creator" content={twitterUsername} />
            )}
            {seo.title && <meta name="twitter:title" content={seo.title} />}
            {seo.description && (
                <meta name="twitter:description" content={seo.description} />
            )}
            {seo.image && <meta name="twitter:image" content={seo.image} />}
        </Helmet>
    )
}

const query = graphql`
    query SEO {
        site {
            siteMetadata {
                defaultTitle: title
                titleTemplate
                defaultDescription: description
                siteUrl: url
                defaultImage: image
                twitterUsername
            }
        }
    }
`

const Body = styled.body`
    background-color: ${(props) => props.theme.palette.primary.background};
    min-height: 100vh;
`

type LayoutProps = {
    children: React.ReactNode
    seo?: SEOProps
}

const Layout = ({ children, seo }: LayoutProps) => {
    return (
        <div>
            <SEO
                title={seo?.title}
                description={seo?.description}
                image={seo?.image}
                article={seo?.article}
            />
            <ThemeProvider theme={theme}>
                <Body>
                    <NavBar />
                    {children}
                </Body>
            </ThemeProvider>
        </div>
    )
}

export default Layout
