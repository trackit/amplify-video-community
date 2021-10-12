# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Build

```
$ yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Deployment

```
$ GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

# Migration

## How to migrate the project to another AWS account

Before all make sure you are using the version of node specified in the `.nvmrc` file

```sh
npm install -g @aws-amplify/cli
amplify configure
```

The configure step will guide you through steps for creating a new IAM user. Select all default options.
If you already have the CLI configured, you do not need to run the configure command again.

```sh
amplify init --app https://github.com/trackit/amplify-video-community
```

The init command clones the GitHub repo, initializes the CLI, creates a ‘sampledev’ environment in CLI, detects and adds categories, provisions the backend, pushes the changes to the cloud, and starts the app.

If you already have an AWS profile set up on your local machine, choose “Yes” when prompted by the CLI and select the profile you would like to use.

The whole article can be found [here](https://aws.amazon.com/blogs/mobile/amplify-cli-adds-scaffolding-support-for-amplify-apps-and-authoring-plugins/)

--

# Deployement

## Community website

Deployement

## Documentation

The documentation uses [docsify](https://docsify.js.org/)

[When deploying docsify on AWS Amplify](https://docsify.js.org/#/deploy?id=aws-amplify) make sure to add the following redirect rules in their displayed order. Note that the second record is a PNG image where you can change it with any image format you are using.

| Source address | Target address | Type |
|---|---|---|
| /<*>.md | /<*>.md | 200 | (Rewrite) |
| /<*>.png | /<*>.png | 200 | (Rewrite) |
| /<*> | /index.html | 200 | (Rewrite) |


