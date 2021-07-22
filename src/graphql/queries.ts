/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getMedia = /* GraphQL */ `
  query GetMedia($id: ID!) {
    getMedia(id: $id) {
      id
      title
      description
      highlighted
      source
      createdAt
      updatedAt
      thumbnail {
        id
        ext
        createdAt
        updatedAt
      }
      sections {
        items {
          id
          sectionID
          mediaID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const listMedia = /* GraphQL */ `
  query ListMedia(
    $filter: ModelMediaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMedia(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        highlighted
        source
        createdAt
        updatedAt
        thumbnail {
          id
          ext
          createdAt
          updatedAt
        }
        sections {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getUserSubmissions = /* GraphQL */ `
  query GetUserSubmissions($id: ID!) {
    getUserSubmissions(id: $id) {
      id
      title
      description
      comment
      source
      src
      email
      createdAt
      updatedAt
    }
  }
`;
export const listUserSubmissions = /* GraphQL */ `
  query ListUserSubmissions(
    $filter: ModelUserSubmissionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserSubmissions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        comment
        source
        src
        email
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getContentSubmission = /* GraphQL */ `
  query GetContentSubmission($id: ID!) {
    getContentSubmission(id: $id) {
      id
      title
      description
      comment
      source
      src
      email
      createdAt
      updatedAt
    }
  }
`;
export const listContentSubmissions = /* GraphQL */ `
  query ListContentSubmissions(
    $filter: ModelContentSubmissionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContentSubmissions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        title
        description
        comment
        source
        src
        email
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getThumbnail = /* GraphQL */ `
  query GetThumbnail($id: ID!) {
    getThumbnail(id: $id) {
      id
      ext
      createdAt
      updatedAt
    }
  }
`;
export const listThumbnails = /* GraphQL */ `
  query ListThumbnails(
    $filter: ModelThumbnailFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listThumbnails(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        ext
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSection = /* GraphQL */ `
  query GetSection($id: ID!) {
    getSection(id: $id) {
      id
      label
      createdAt
      updatedAt
      medias {
        items {
          id
          sectionID
          mediaID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const listSections = /* GraphQL */ `
  query ListSections(
    $filter: ModelSectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        label
        createdAt
        updatedAt
        medias {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getMediasSections = /* GraphQL */ `
  query GetMediasSections($id: ID!) {
    getMediasSections(id: $id) {
      id
      sectionID
      mediaID
      createdAt
      updatedAt
      media {
        id
        title
        description
        highlighted
        source
        createdAt
        updatedAt
        thumbnail {
          id
          ext
          createdAt
          updatedAt
        }
        sections {
          nextToken
        }
      }
      section {
        id
        label
        createdAt
        updatedAt
        medias {
          nextToken
        }
      }
    }
  }
`;
export const listMediasSections = /* GraphQL */ `
  query ListMediasSections(
    $filter: ModelMediasSectionsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMediasSections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        sectionID
        mediaID
        createdAt
        updatedAt
        media {
          id
          title
          description
          highlighted
          source
          createdAt
          updatedAt
        }
        section {
          id
          label
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getVideoOnDemand = /* GraphQL */ `
  query GetVideoOnDemand($id: ID!) {
    getVideoOnDemand(id: $id) {
      id
      src
      createdAt
      updatedAt
      media {
        id
        title
        description
        highlighted
        source
        createdAt
        updatedAt
        thumbnail {
          id
          ext
          createdAt
          updatedAt
        }
        sections {
          nextToken
        }
      }
    }
  }
`;
export const listVideoOnDemands = /* GraphQL */ `
  query ListVideoOnDemands(
    $filter: ModelVideoOnDemandFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listVideoOnDemands(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        src
        createdAt
        updatedAt
        media {
          id
          title
          description
          highlighted
          source
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getLivestream = /* GraphQL */ `
  query GetLivestream($id: ID!) {
    getLivestream(id: $id) {
      id
      url
      isLive
      createdAt
      updatedAt
      media {
        id
        title
        description
        highlighted
        source
        createdAt
        updatedAt
        thumbnail {
          id
          ext
          createdAt
          updatedAt
        }
        sections {
          nextToken
        }
      }
    }
  }
`;
export const listLivestreams = /* GraphQL */ `
  query ListLivestreams(
    $filter: ModelLivestreamFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listLivestreams(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        url
        isLive
        createdAt
        updatedAt
        media {
          id
          title
          description
          highlighted
          source
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
