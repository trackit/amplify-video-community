import React, { useState, useEffect } from 'react'
import { useLocation } from '@reach/router'
import Amplify from 'aws-amplify'
import styled, { ThemeProvider } from 'styled-components'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

import { NavBar } from '../'
import theme, { Theme } from '../theme'
import awsmobile from '../../../aws-exports'
import Footer from '../Footer/Footer'

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

const Container = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
`

const SubBody = styled.div`
    background-color: ${(props) => props.theme.palette.primary.background};
    flex: 1;
`

type LayoutProps = {
    children: React.ReactNode
    seo?: SEOProps
    overrideTheme?: Theme
    removePaddingTop?: boolean
}

const Layout = ({
    children,
    seo,
    overrideTheme,
    removePaddingTop,
}: LayoutProps) => {
    const [usedTheme, setUsedTheme] = useState(overrideTheme || theme)
    const [headerHeight, setHeaderHeight] = useState(0)

    useEffect(() => {
        setUsedTheme(overrideTheme || theme)
    }, [overrideTheme])

    useEffect(() => {
        setHeaderHeight(
            document.getElementById('video-community-header')?.clientHeight || 0
        )
    })

    return (
        <ThemeProvider theme={usedTheme}>
            <SEO
                title={seo?.title}
                description={seo?.description}
                image={seo?.image}
                article={seo?.article}
            />
            <Container>
                <NavBar navbarTheme={usedTheme.palette.navbar} />
                <SubBody
                    style={{ paddingTop: !removePaddingTop ? headerHeight : 0 }}
                >
                    {children}
                </SubBody>
                <Footer />
            </Container>
        </ThemeProvider>
    )
}

export default Layout
