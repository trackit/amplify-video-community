/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateVodAsset = /* GraphQL */ `
  subscription OnCreateVodAsset {
    onCreateVodAsset {
      id
      title
      src
      description
      highlighted
      createdAt
      updatedAt
      video {
        id
        createdAt
        updatedAt
      }
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
          videoID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const onUpdateVodAsset = /* GraphQL */ `
  subscription OnUpdateVodAsset {
    onUpdateVodAsset {
      id
      title
      src
      description
      highlighted
      createdAt
      updatedAt
      video {
        id
        createdAt
        updatedAt
      }
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
          videoID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const onDeleteVodAsset = /* GraphQL */ `
  subscription OnDeleteVodAsset {
    onDeleteVodAsset {
      id
      title
      src
      description
      highlighted
      createdAt
      updatedAt
      video {
        id
        createdAt
        updatedAt
      }
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
          videoID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const onCreateVideoObject = /* GraphQL */ `
  subscription OnCreateVideoObject {
    onCreateVideoObject {
      id
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateVideoObject = /* GraphQL */ `
  subscription OnUpdateVideoObject {
    onUpdateVideoObject {
      id
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteVideoObject = /* GraphQL */ `
  subscription OnDeleteVideoObject {
    onDeleteVideoObject {
      id
      createdAt
      updatedAt
    }
  }
`;
export const onCreateThumbnailObject = /* GraphQL */ `
  subscription OnCreateThumbnailObject {
    onCreateThumbnailObject {
      id
      ext
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateThumbnailObject = /* GraphQL */ `
  subscription OnUpdateThumbnailObject {
    onUpdateThumbnailObject {
      id
      ext
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteThumbnailObject = /* GraphQL */ `
  subscription OnDeleteThumbnailObject {
    onDeleteThumbnailObject {
      id
      ext
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSection = /* GraphQL */ `
  subscription OnCreateSection {
    onCreateSection {
      id
      label
      createdAt
      updatedAt
      videos {
        items {
          id
          sectionID
          videoID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const onUpdateSection = /* GraphQL */ `
  subscription OnUpdateSection {
    onUpdateSection {
      id
      label
      createdAt
      updatedAt
      videos {
        items {
          id
          sectionID
          videoID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const onDeleteSection = /* GraphQL */ `
  subscription OnDeleteSection {
    onDeleteSection {
      id
      label
      createdAt
      updatedAt
      videos {
        items {
          id
          sectionID
          videoID
          createdAt
          updatedAt
        }
        nextToken
      }
    }
  }
`;
export const onCreateVideoSection = /* GraphQL */ `
  subscription OnCreateVideoSection {
    onCreateVideoSection {
      id
      sectionID
      videoID
      createdAt
      updatedAt
      video {
        id
        title
        src
        description
        highlighted
        createdAt
        updatedAt
        video {
          id
          createdAt
          updatedAt
        }
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
        videos {
          nextToken
        }
      }
    }
  }
`;
export const onUpdateVideoSection = /* GraphQL */ `
  subscription OnUpdateVideoSection {
    onUpdateVideoSection {
      id
      sectionID
      videoID
      createdAt
      updatedAt
      video {
        id
        title
        src
        description
        highlighted
        createdAt
        updatedAt
        video {
          id
          createdAt
          updatedAt
        }
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
        videos {
          nextToken
        }
      }
    }
  }
`;
export const onDeleteVideoSection = /* GraphQL */ `
  subscription OnDeleteVideoSection {
    onDeleteVideoSection {
      id
      sectionID
      videoID
      createdAt
      updatedAt
      video {
        id
        title
        src
        description
        highlighted
        createdAt
        updatedAt
        video {
          id
          createdAt
          updatedAt
        }
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
        videos {
          nextToken
        }
      }
    }
  }
`;
