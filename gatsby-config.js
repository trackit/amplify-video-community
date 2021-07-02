module.exports = {
    siteMetadata: {
        title: 'amplify-video-community',
    },
    plugins: [
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                name: 'markdown',
                path: `${__dirname}/content/`,
            },
        },
        'gatsby-plugin-sharp',
        'gatsby-plugin-styled-components',
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    'gatsby-remark-relative-images',
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 750,
                            linkImagesToOriginal: false,
                        },
                    },
                ],
            },
        },
        'gatsby-plugin-typescript',
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                icon: 'src/images/favicon.png',
            },
        },
    ],
}
