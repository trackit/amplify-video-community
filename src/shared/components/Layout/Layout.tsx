import React from 'react'
import { useLocation } from '@reach/router'
import Amplify from 'aws-amplify'
import styled, { DefaultTheme, ThemeProvider } from 'styled-components'
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
            <meta
                property="og:video"
                content="https://www.youtube.com/v/7ekxPmVNV8k"
            />
            <meta property="og:site_name" content={seo.title} />
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
            <base target="_blank" />
            <base target="_top" />
            <link
                rel="canonical"
                href="https://amplify-video-community.trackit.io/"
            />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <title>Why you should use Amplify</title>
            <title>Amplify Video Community</title>
            <title>TrackIt Amplify</title>
            <title>TrackIt Amplify Video</title>
            <meta name="robots" />
            <meta name="googlebot" />
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

const SubBody = styled.div`
    background-color: ${(props) => props.theme.palette.primary.background};
    padding-left: 50px;
    padding-right: 50px;
`

type LayoutProps = {
    children: React.ReactNode
    seo?: SEOProps
    navBarTheme?: DefaultTheme
}

const Layout = ({ children, seo, navBarTheme }: LayoutProps) => {
    return (
        <ThemeProvider theme={theme}>
            <SEO
                title={seo?.title}
                description={seo?.description}
                image={seo?.image}
                article={seo?.article}
            />
            <NavBar theme={navBarTheme || theme} />
            <SubBody>{children}</SubBody>
        </ThemeProvider>
    )
}

export default Layout
