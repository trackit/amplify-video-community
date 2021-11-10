---
sidebar_position: 2
sidebar_label: Documentation Deployment
---
# Deployment

## Requirements
* [AWS Account](https://aws.amazon.com/account/)
* [GitHub Account](https://github.com)

## Instructions
Follow these instructions to deploy the community site:

### Deploy using Amplify Console

1. Fork the community [website repository](https://github.com/aws-samples/amplify-video-community)

2. Go to Amplify console then click `New app -> Host web app`
3. Select Github and click `Continue`
![Host your web app](./images/host-your-webapp.png)
4. Select your repository and the target branch
    
    4.1. check "`Connecting a monorepo ? Pick a folder.`" and copy/paste:
    ```bash
    apps/documentation
    ```
    4.2. click `Next`
    
    ![Add repository branch](./images/add-repo-branch.png)

5. Configure build settings
![Configure build settings](./images/build-settings.png)
6. Review build settings
![Review build settings](./images/review.png)
7. Provision, build and deploy your app
![Review build settings](./images/provision.png)
![Deployed](./images/done.png)

### Assign a domain
To continue working on the backend, install the Amplify CLI and make updates by running the command below from the root of your project folder.

![Backend](./images/backend.png)

```bash
cd amplify-video-community/apps/community-website
```

```bash
amplify pull --appId <your-app-id> --envName <your-env>
```