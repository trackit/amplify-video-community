/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createMedia = /* GraphQL */ `
  mutation CreateMedia(
    $input: CreateMediaInput!
    $condition: ModelMediaConditionInput
  ) {
    createMedia(input: $input, condition: $condition) {
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
export const updateMedia = /* GraphQL */ `
  mutation UpdateMedia(
    $input: UpdateMediaInput!
    $condition: ModelMediaConditionInput
  ) {
    updateMedia(input: $input, condition: $condition) {
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
export const deleteMedia = /* GraphQL */ `
  mutation DeleteMedia(
    $input: DeleteMediaInput!
    $condition: ModelMediaConditionInput
  ) {
    deleteMedia(input: $input, condition: $condition) {
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
export const createThumbnail = /* GraphQL */ `
  mutation CreateThumbnail(
    $input: CreateThumbnailInput!
    $condition: ModelThumbnailConditionInput
  ) {
    createThumbnail(input: $input, condition: $condition) {
      id
      ext
      createdAt
      updatedAt
    }
  }
`;
export const updateThumbnail = /* GraphQL */ `
  mutation UpdateThumbnail(
    $input: UpdateThumbnailInput!
    $condition: ModelThumbnailConditionInput
  ) {
    updateThumbnail(input: $input, condition: $condition) {
      id
      ext
      createdAt
      updatedAt
    }
  }
`;
export const deleteThumbnail = /* GraphQL */ `
  mutation DeleteThumbnail(
    $input: DeleteThumbnailInput!
    $condition: ModelThumbnailConditionInput
  ) {
    deleteThumbnail(input: $input, condition: $condition) {
      id
      ext
      createdAt
      updatedAt
    }
  }
`;
export const createSection = /* GraphQL */ `
  mutation CreateSection(
    $input: CreateSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    createSection(input: $input, condition: $condition) {
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
export const updateSection = /* GraphQL */ `
  mutation UpdateSection(
    $input: UpdateSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    updateSection(input: $input, condition: $condition) {
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
export const deleteSection = /* GraphQL */ `
  mutation DeleteSection(
    $input: DeleteSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    deleteSection(input: $input, condition: $condition) {
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
export const createMediasSections = /* GraphQL */ `
  mutation CreateMediasSections(
    $input: CreateMediasSectionsInput!
    $condition: ModelMediasSectionsConditionInput
  ) {
    createMediasSections(input: $input, condition: $condition) {
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
export const updateMediasSections = /* GraphQL */ `
  mutation UpdateMediasSections(
    $input: UpdateMediasSectionsInput!
    $condition: ModelMediasSectionsConditionInput
  ) {
    updateMediasSections(input: $input, condition: $condition) {
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
export const deleteMediasSections = /* GraphQL */ `
  mutation DeleteMediasSections(
    $input: DeleteMediasSectionsInput!
    $condition: ModelMediasSectionsConditionInput
  ) {
    deleteMediasSections(input: $input, condition: $condition) {
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
export const createVideoObject = /* GraphQL */ `
  mutation CreateVideoObject(
    $input: CreateVideoObjectInput!
    $condition: ModelVideoObjectConditionInput
  ) {
    createVideoObject(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
    }
  }
`;
export const updateVideoObject = /* GraphQL */ `
  mutation UpdateVideoObject(
    $input: UpdateVideoObjectInput!
    $condition: ModelVideoObjectConditionInput
  ) {
    updateVideoObject(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
    }
  }
`;
export const deleteVideoObject = /* GraphQL */ `
  mutation DeleteVideoObject(
    $input: DeleteVideoObjectInput!
    $condition: ModelVideoObjectConditionInput
  ) {
    deleteVideoObject(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
    }
  }
`;
export const createVideoOnDemand = /* GraphQL */ `
  mutation CreateVideoOnDemand(
    $input: CreateVideoOnDemandInput!
    $condition: ModelVideoOnDemandConditionInput
  ) {
    createVideoOnDemand(input: $input, condition: $condition) {
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
      video {
        id
        createdAt
        updatedAt
      }
    }
  }
`;
export const updateVideoOnDemand = /* GraphQL */ `
  mutation UpdateVideoOnDemand(
    $input: UpdateVideoOnDemandInput!
    $condition: ModelVideoOnDemandConditionInput
  ) {
    updateVideoOnDemand(input: $input, condition: $condition) {
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
      video {
        id
        createdAt
        updatedAt
      }
    }
  }
`;
export const deleteVideoOnDemand = /* GraphQL */ `
  mutation DeleteVideoOnDemand(
    $input: DeleteVideoOnDemandInput!
    $condition: ModelVideoOnDemandConditionInput
  ) {
    deleteVideoOnDemand(input: $input, condition: $condition) {
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
      video {
        id
        createdAt
        updatedAt
      }
    }
  }
`;
export const createLivestream = /* GraphQL */ `
  mutation CreateLivestream(
    $input: CreateLivestreamInput!
    $condition: ModelLivestreamConditionInput
  ) {
    createLivestream(input: $input, condition: $condition) {
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
export const updateLivestream = /* GraphQL */ `
  mutation UpdateLivestream(
    $input: UpdateLivestreamInput!
    $condition: ModelLivestreamConditionInput
  ) {
    updateLivestream(input: $input, condition: $condition) {
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
export const deleteLivestream = /* GraphQL */ `
  mutation DeleteLivestream(
    $input: DeleteLivestreamInput!
    $condition: ModelLivestreamConditionInput
  ) {
    deleteLivestream(input: $input, condition: $condition) {
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
