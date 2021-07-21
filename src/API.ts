/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateMediaInput = {
  id?: string | null,
  title: string,
  description: string,
  highlighted: boolean,
  source?: Source | null,
  mediaThumbnailId?: string | null,
};

export enum Source {
  TWITCH = "TWITCH",
  SELF = "SELF",
  YOUTUBE = "YOUTUBE",
  LIVESTREAM_SELF = "LIVESTREAM_SELF",
}


export type ModelMediaConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  highlighted?: ModelBooleanInput | null,
  source?: ModelSourceInput | null,
  and?: Array< ModelMediaConditionInput | null > | null,
  or?: Array< ModelMediaConditionInput | null > | null,
  not?: ModelMediaConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelBooleanInput = {
  ne?: boolean | null,
  eq?: boolean | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type ModelSourceInput = {
  eq?: Source | null,
  ne?: Source | null,
};

export type Media = {
  __typename: "Media",
  id: string,
  title: string,
  description: string,
  highlighted: boolean,
  source?: Source | null,
  createdAt: string,
  updatedAt: string,
  thumbnail?: Thumbnail | null,
  sections?: ModelMediasSectionsConnection | null,
};

export type Thumbnail = {
  __typename: "Thumbnail",
  id: string,
  ext: string,
  createdAt: string,
  updatedAt: string,
};

export type ModelMediasSectionsConnection = {
  __typename: "ModelMediasSectionsConnection",
  items?:  Array<MediasSections | null > | null,
  nextToken?: string | null,
};

export type MediasSections = {
  __typename: "MediasSections",
  id: string,
  sectionID: string,
  mediaID: string,
  createdAt: string,
  updatedAt: string,
  media: Media,
  section: Section,
};

export type Section = {
  __typename: "Section",
  id: string,
  label: string,
  createdAt: string,
  updatedAt: string,
  medias?: ModelMediasSectionsConnection | null,
};

export type UpdateMediaInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  highlighted?: boolean | null,
  source?: Source | null,
  mediaThumbnailId?: string | null,
};

export type DeleteMediaInput = {
  id: string,
};

export type UpdateUserSubmissionsInput = {
  id: string,
  title?: string | null,
  description?: string | null,
  comment?: string | null,
  source?: Source | null,
  userSubmissionsThumbnailId?: string | null,
};

export type ModelUserSubmissionsConditionInput = {
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  comment?: ModelStringInput | null,
  source?: ModelSourceInput | null,
  and?: Array< ModelUserSubmissionsConditionInput | null > | null,
  or?: Array< ModelUserSubmissionsConditionInput | null > | null,
  not?: ModelUserSubmissionsConditionInput | null,
};

export type UserSubmissions = {
  __typename: "UserSubmissions",
  id: string,
  title: string,
  description: string,
  comment: string,
  source?: Source | null,
  createdAt: string,
  updatedAt: string,
  thumbnail?: Thumbnail | null,
};

export type DeleteUserSubmissionsInput = {
  id: string,
};

export type CreateThumbnailInput = {
  id?: string | null,
  ext: string,
};

export type ModelThumbnailConditionInput = {
  ext?: ModelStringInput | null,
  and?: Array< ModelThumbnailConditionInput | null > | null,
  or?: Array< ModelThumbnailConditionInput | null > | null,
  not?: ModelThumbnailConditionInput | null,
};

export type UpdateThumbnailInput = {
  id: string,
  ext?: string | null,
};

export type DeleteThumbnailInput = {
  id: string,
};

export type CreateSectionInput = {
  id?: string | null,
  label: string,
};

export type ModelSectionConditionInput = {
  label?: ModelStringInput | null,
  and?: Array< ModelSectionConditionInput | null > | null,
  or?: Array< ModelSectionConditionInput | null > | null,
  not?: ModelSectionConditionInput | null,
};

export type UpdateSectionInput = {
  id: string,
  label?: string | null,
};

export type DeleteSectionInput = {
  id: string,
};

export type CreateMediasSectionsInput = {
  id?: string | null,
  sectionID: string,
  mediaID: string,
};

export type ModelMediasSectionsConditionInput = {
  sectionID?: ModelIDInput | null,
  mediaID?: ModelIDInput | null,
  and?: Array< ModelMediasSectionsConditionInput | null > | null,
  or?: Array< ModelMediasSectionsConditionInput | null > | null,
  not?: ModelMediasSectionsConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateMediasSectionsInput = {
  id: string,
  sectionID?: string | null,
  mediaID?: string | null,
};

export type DeleteMediasSectionsInput = {
  id: string,
};

export type CreateVideoOnDemandInput = {
  id?: string | null,
  src?: string | null,
  videoOnDemandMediaId?: string | null,
};

export type ModelVideoOnDemandConditionInput = {
  src?: ModelStringInput | null,
  and?: Array< ModelVideoOnDemandConditionInput | null > | null,
  or?: Array< ModelVideoOnDemandConditionInput | null > | null,
  not?: ModelVideoOnDemandConditionInput | null,
};

export type VideoOnDemand = {
  __typename: "VideoOnDemand",
  id: string,
  src?: string | null,
  createdAt: string,
  updatedAt: string,
  media?: Media | null,
};

export type UpdateVideoOnDemandInput = {
  id: string,
  src?: string | null,
  videoOnDemandMediaId?: string | null,
};

export type DeleteVideoOnDemandInput = {
  id: string,
};

export type CreateLivestreamInput = {
  id?: string | null,
  url?: string | null,
  isLive?: boolean | null,
  livestreamMediaId?: string | null,
};

export type ModelLivestreamConditionInput = {
  url?: ModelStringInput | null,
  isLive?: ModelBooleanInput | null,
  and?: Array< ModelLivestreamConditionInput | null > | null,
  or?: Array< ModelLivestreamConditionInput | null > | null,
  not?: ModelLivestreamConditionInput | null,
};

export type Livestream = {
  __typename: "Livestream",
  id: string,
  url?: string | null,
  isLive?: boolean | null,
  createdAt: string,
  updatedAt: string,
  media?: Media | null,
};

export type UpdateLivestreamInput = {
  id: string,
  url?: string | null,
  isLive?: boolean | null,
  livestreamMediaId?: string | null,
};

export type DeleteLivestreamInput = {
  id: string,
};

export type CreateUserSubmissionsInput = {
  id?: string | null,
  title: string,
  description: string,
  comment: string,
  source?: Source | null,
  userSubmissionsThumbnailId?: string | null,
};

export type ModelMediaFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  highlighted?: ModelBooleanInput | null,
  source?: ModelSourceInput | null,
  and?: Array< ModelMediaFilterInput | null > | null,
  or?: Array< ModelMediaFilterInput | null > | null,
  not?: ModelMediaFilterInput | null,
};

export type ModelMediaConnection = {
  __typename: "ModelMediaConnection",
  items?:  Array<Media | null > | null,
  nextToken?: string | null,
};

export type ModelUserSubmissionsFilterInput = {
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  description?: ModelStringInput | null,
  comment?: ModelStringInput | null,
  source?: ModelSourceInput | null,
  and?: Array< ModelUserSubmissionsFilterInput | null > | null,
  or?: Array< ModelUserSubmissionsFilterInput | null > | null,
  not?: ModelUserSubmissionsFilterInput | null,
};

export type ModelUserSubmissionsConnection = {
  __typename: "ModelUserSubmissionsConnection",
  items?:  Array<UserSubmissions | null > | null,
  nextToken?: string | null,
};

export type ModelThumbnailFilterInput = {
  id?: ModelIDInput | null,
  ext?: ModelStringInput | null,
  and?: Array< ModelThumbnailFilterInput | null > | null,
  or?: Array< ModelThumbnailFilterInput | null > | null,
  not?: ModelThumbnailFilterInput | null,
};

export type ModelThumbnailConnection = {
  __typename: "ModelThumbnailConnection",
  items?:  Array<Thumbnail | null > | null,
  nextToken?: string | null,
};

export type ModelSectionFilterInput = {
  id?: ModelIDInput | null,
  label?: ModelStringInput | null,
  and?: Array< ModelSectionFilterInput | null > | null,
  or?: Array< ModelSectionFilterInput | null > | null,
  not?: ModelSectionFilterInput | null,
};

export type ModelSectionConnection = {
  __typename: "ModelSectionConnection",
  items?:  Array<Section | null > | null,
  nextToken?: string | null,
};

export type ModelMediasSectionsFilterInput = {
  id?: ModelIDInput | null,
  sectionID?: ModelIDInput | null,
  mediaID?: ModelIDInput | null,
  and?: Array< ModelMediasSectionsFilterInput | null > | null,
  or?: Array< ModelMediasSectionsFilterInput | null > | null,
  not?: ModelMediasSectionsFilterInput | null,
};

export type ModelVideoOnDemandFilterInput = {
  id?: ModelIDInput | null,
  src?: ModelStringInput | null,
  and?: Array< ModelVideoOnDemandFilterInput | null > | null,
  or?: Array< ModelVideoOnDemandFilterInput | null > | null,
  not?: ModelVideoOnDemandFilterInput | null,
};

export type ModelVideoOnDemandConnection = {
  __typename: "ModelVideoOnDemandConnection",
  items?:  Array<VideoOnDemand | null > | null,
  nextToken?: string | null,
};

export type ModelLivestreamFilterInput = {
  id?: ModelIDInput | null,
  url?: ModelStringInput | null,
  isLive?: ModelBooleanInput | null,
  and?: Array< ModelLivestreamFilterInput | null > | null,
  or?: Array< ModelLivestreamFilterInput | null > | null,
  not?: ModelLivestreamFilterInput | null,
};

export type ModelLivestreamConnection = {
  __typename: "ModelLivestreamConnection",
  items?:  Array<Livestream | null > | null,
  nextToken?: string | null,
};

export type CreateMediaMutationVariables = {
  input: CreateMediaInput,
  condition?: ModelMediaConditionInput | null,
};

export type CreateMediaMutation = {
  createMedia?:  {
    __typename: "Media",
    id: string,
    title: string,
    description: string,
    highlighted: boolean,
    source?: Source | null,
    createdAt: string,
    updatedAt: string,
    thumbnail?:  {
      __typename: "Thumbnail",
      id: string,
      ext: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    sections?:  {
      __typename: "ModelMediasSectionsConnection",
      items?:  Array< {
        __typename: "MediasSections",
        id: string,
        sectionID: string,
        mediaID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateMediaMutationVariables = {
  input: UpdateMediaInput,
  condition?: ModelMediaConditionInput | null,
};

export type UpdateMediaMutation = {
  updateMedia?:  {
    __typename: "Media",
    id: string,
    title: string,
    description: string,
    highlighted: boolean,
    source?: Source | null,
    createdAt: string,
    updatedAt: string,
    thumbnail?:  {
      __typename: "Thumbnail",
      id: string,
      ext: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    sections?:  {
      __typename: "ModelMediasSectionsConnection",
      items?:  Array< {
        __typename: "MediasSections",
        id: string,
        sectionID: string,
        mediaID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteMediaMutationVariables = {
  input: DeleteMediaInput,
  condition?: ModelMediaConditionInput | null,
};

export type DeleteMediaMutation = {
  deleteMedia?:  {
    __typename: "Media",
    id: string,
    title: string,
    description: string,
    highlighted: boolean,
    source?: Source | null,
    createdAt: string,
    updatedAt: string,
    thumbnail?:  {
      __typename: "Thumbnail",
      id: string,
      ext: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    sections?:  {
      __typename: "ModelMediasSectionsConnection",
      items?:  Array< {
        __typename: "MediasSections",
        id: string,
        sectionID: string,
        mediaID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateUserSubmissionsMutationVariables = {
  input: UpdateUserSubmissionsInput,
  condition?: ModelUserSubmissionsConditionInput | null,
};

export type UpdateUserSubmissionsMutation = {
  updateUserSubmissions?:  {
    __typename: "UserSubmissions",
    id: string,
    title: string,
    description: string,
    comment: string,
    source?: Source | null,
    createdAt: string,
    updatedAt: string,
    thumbnail?:  {
      __typename: "Thumbnail",
      id: string,
      ext: string,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type DeleteUserSubmissionsMutationVariables = {
  input: DeleteUserSubmissionsInput,
  condition?: ModelUserSubmissionsConditionInput | null,
};

export type DeleteUserSubmissionsMutation = {
  deleteUserSubmissions?:  {
    __typename: "UserSubmissions",
    id: string,
    title: string,
    description: string,
    comment: string,
    source?: Source | null,
    createdAt: string,
    updatedAt: string,
    thumbnail?:  {
      __typename: "Thumbnail",
      id: string,
      ext: string,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type CreateThumbnailMutationVariables = {
  input: CreateThumbnailInput,
  condition?: ModelThumbnailConditionInput | null,
};

export type CreateThumbnailMutation = {
  createThumbnail?:  {
    __typename: "Thumbnail",
    id: string,
    ext: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateThumbnailMutationVariables = {
  input: UpdateThumbnailInput,
  condition?: ModelThumbnailConditionInput | null,
};

export type UpdateThumbnailMutation = {
  updateThumbnail?:  {
    __typename: "Thumbnail",
    id: string,
    ext: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteThumbnailMutationVariables = {
  input: DeleteThumbnailInput,
  condition?: ModelThumbnailConditionInput | null,
};

export type DeleteThumbnailMutation = {
  deleteThumbnail?:  {
    __typename: "Thumbnail",
    id: string,
    ext: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateSectionMutationVariables = {
  input: CreateSectionInput,
  condition?: ModelSectionConditionInput | null,
};

export type CreateSectionMutation = {
  createSection?:  {
    __typename: "Section",
    id: string,
    label: string,
    createdAt: string,
    updatedAt: string,
    medias?:  {
      __typename: "ModelMediasSectionsConnection",
      items?:  Array< {
        __typename: "MediasSections",
        id: string,
        sectionID: string,
        mediaID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdateSectionMutationVariables = {
  input: UpdateSectionInput,
  condition?: ModelSectionConditionInput | null,
};

export type UpdateSectionMutation = {
  updateSection?:  {
    __typename: "Section",
    id: string,
    label: string,
    createdAt: string,
    updatedAt: string,
    medias?:  {
      __typename: "ModelMediasSectionsConnection",
      items?:  Array< {
        __typename: "MediasSections",
        id: string,
        sectionID: string,
        mediaID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeleteSectionMutationVariables = {
  input: DeleteSectionInput,
  condition?: ModelSectionConditionInput | null,
};

export type DeleteSectionMutation = {
  deleteSection?:  {
    __typename: "Section",
    id: string,
    label: string,
    createdAt: string,
    updatedAt: string,
    medias?:  {
      __typename: "ModelMediasSectionsConnection",
      items?:  Array< {
        __typename: "MediasSections",
        id: string,
        sectionID: string,
        mediaID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateMediasSectionsMutationVariables = {
  input: CreateMediasSectionsInput,
  condition?: ModelMediasSectionsConditionInput | null,
};

export type CreateMediasSectionsMutation = {
  createMediasSections?:  {
    __typename: "MediasSections",
    id: string,
    sectionID: string,
    mediaID: string,
    createdAt: string,
    updatedAt: string,
    media:  {
      __typename: "Media",
      id: string,
      title: string,
      description: string,
      highlighted: boolean,
      source?: Source | null,
      createdAt: string,
      updatedAt: string,
      thumbnail?:  {
        __typename: "Thumbnail",
        id: string,
        ext: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      sections?:  {
        __typename: "ModelMediasSectionsConnection",
        nextToken?: string | null,
      } | null,
    },
    section:  {
      __typename: "Section",
      id: string,
      label: string,
      createdAt: string,
      updatedAt: string,
      medias?:  {
        __typename: "ModelMediasSectionsConnection",
        nextToken?: string | null,
      } | null,
    },
  } | null,
};

export type UpdateMediasSectionsMutationVariables = {
  input: UpdateMediasSectionsInput,
  condition?: ModelMediasSectionsConditionInput | null,
};

export type UpdateMediasSectionsMutation = {
  updateMediasSections?:  {
    __typename: "MediasSections",
    id: string,
    sectionID: string,
    mediaID: string,
    createdAt: string,
    updatedAt: string,
    media:  {
      __typename: "Media",
      id: string,
      title: string,
      description: string,
      highlighted: boolean,
      source?: Source | null,
      createdAt: string,
      updatedAt: string,
      thumbnail?:  {
        __typename: "Thumbnail",
        id: string,
        ext: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      sections?:  {
        __typename: "ModelMediasSectionsConnection",
        nextToken?: string | null,
      } | null,
    },
    section:  {
      __typename: "Section",
      id: string,
      label: string,
      createdAt: string,
      updatedAt: string,
      medias?:  {
        __typename: "ModelMediasSectionsConnection",
        nextToken?: string | null,
      } | null,
    },
  } | null,
};

export type DeleteMediasSectionsMutationVariables = {
  input: DeleteMediasSectionsInput,
  condition?: ModelMediasSectionsConditionInput | null,
};

export type DeleteMediasSectionsMutation = {
  deleteMediasSections?:  {
    __typename: "MediasSections",
    id: string,
    sectionID: string,
    mediaID: string,
    createdAt: string,
    updatedAt: string,
    media:  {
      __typename: "Media",
      id: string,
      title: string,
      description: string,
      highlighted: boolean,
      source?: Source | null,
      createdAt: string,
      updatedAt: string,
      thumbnail?:  {
        __typename: "Thumbnail",
        id: string,
        ext: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      sections?:  {
        __typename: "ModelMediasSectionsConnection",
        nextToken?: string | null,
      } | null,
    },
    section:  {
      __typename: "Section",
      id: string,
      label: string,
      createdAt: string,
      updatedAt: string,
      medias?:  {
        __typename: "ModelMediasSectionsConnection",
        nextToken?: string | null,
      } | null,
    },
  } | null,
};

export type CreateVideoOnDemandMutationVariables = {
  input: CreateVideoOnDemandInput,
  condition?: ModelVideoOnDemandConditionInput | null,
};

export type CreateVideoOnDemandMutation = {
  createVideoOnDemand?:  {
    __typename: "VideoOnDemand",
    id: string,
    src?: string | null,
    createdAt: string,
    updatedAt: string,
    media?:  {
      __typename: "Media",
      id: string,
      title: string,
      description: string,
      highlighted: boolean,
      source?: Source | null,
      createdAt: string,
      updatedAt: string,
      thumbnail?:  {
        __typename: "Thumbnail",
        id: string,
        ext: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      sections?:  {
        __typename: "ModelMediasSectionsConnection",
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type UpdateVideoOnDemandMutationVariables = {
  input: UpdateVideoOnDemandInput,
  condition?: ModelVideoOnDemandConditionInput | null,
};

export type UpdateVideoOnDemandMutation = {
  updateVideoOnDemand?:  {
    __typename: "VideoOnDemand",
    id: string,
    src?: string | null,
    createdAt: string,
    updatedAt: string,
    media?:  {
      __typename: "Media",
      id: string,
      title: string,
      description: string,
      highlighted: boolean,
      source?: Source | null,
      createdAt: string,
      updatedAt: string,
      thumbnail?:  {
        __typename: "Thumbnail",
        id: string,
        ext: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      sections?:  {
        __typename: "ModelMediasSectionsConnection",
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type DeleteVideoOnDemandMutationVariables = {
  input: DeleteVideoOnDemandInput,
  condition?: ModelVideoOnDemandConditionInput | null,
};

export type DeleteVideoOnDemandMutation = {
  deleteVideoOnDemand?:  {
    __typename: "VideoOnDemand",
    id: string,
    src?: string | null,
    createdAt: string,
    updatedAt: string,
    media?:  {
      __typename: "Media",
      id: string,
      title: string,
      description: string,
      highlighted: boolean,
      source?: Source | null,
      createdAt: string,
      updatedAt: string,
      thumbnail?:  {
        __typename: "Thumbnail",
        id: string,
        ext: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      sections?:  {
        __typename: "ModelMediasSectionsConnection",
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type CreateLivestreamMutationVariables = {
  input: CreateLivestreamInput,
  condition?: ModelLivestreamConditionInput | null,
};

export type CreateLivestreamMutation = {
  createLivestream?:  {
    __typename: "Livestream",
    id: string,
    url?: string | null,
    isLive?: boolean | null,
    createdAt: string,
    updatedAt: string,
    media?:  {
      __typename: "Media",
      id: string,
      title: string,
      description: string,
      highlighted: boolean,
      source?: Source | null,
      createdAt: string,
      updatedAt: string,
      thumbnail?:  {
        __typename: "Thumbnail",
        id: string,
        ext: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      sections?:  {
        __typename: "ModelMediasSectionsConnection",
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type UpdateLivestreamMutationVariables = {
  input: UpdateLivestreamInput,
  condition?: ModelLivestreamConditionInput | null,
};

export type UpdateLivestreamMutation = {
  updateLivestream?:  {
    __typename: "Livestream",
    id: string,
    url?: string | null,
    isLive?: boolean | null,
    createdAt: string,
    updatedAt: string,
    media?:  {
      __typename: "Media",
      id: string,
      title: string,
      description: string,
      highlighted: boolean,
      source?: Source | null,
      createdAt: string,
      updatedAt: string,
      thumbnail?:  {
        __typename: "Thumbnail",
        id: string,
        ext: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      sections?:  {
        __typename: "ModelMediasSectionsConnection",
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type DeleteLivestreamMutationVariables = {
  input: DeleteLivestreamInput,
  condition?: ModelLivestreamConditionInput | null,
};

export type DeleteLivestreamMutation = {
  deleteLivestream?:  {
    __typename: "Livestream",
    id: string,
    url?: string | null,
    isLive?: boolean | null,
    createdAt: string,
    updatedAt: string,
    media?:  {
      __typename: "Media",
      id: string,
      title: string,
      description: string,
      highlighted: boolean,
      source?: Source | null,
      createdAt: string,
      updatedAt: string,
      thumbnail?:  {
        __typename: "Thumbnail",
        id: string,
        ext: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      sections?:  {
        __typename: "ModelMediasSectionsConnection",
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type CreateUserSubmissionsMutationVariables = {
  input: CreateUserSubmissionsInput,
  condition?: ModelUserSubmissionsConditionInput | null,
};

export type CreateUserSubmissionsMutation = {
  createUserSubmissions?:  {
    __typename: "UserSubmissions",
    id: string,
    title: string,
    description: string,
    comment: string,
    source?: Source | null,
    createdAt: string,
    updatedAt: string,
    thumbnail?:  {
      __typename: "Thumbnail",
      id: string,
      ext: string,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type GetMediaQueryVariables = {
  id: string,
};

export type GetMediaQuery = {
  getMedia?:  {
    __typename: "Media",
    id: string,
    title: string,
    description: string,
    highlighted: boolean,
    source?: Source | null,
    createdAt: string,
    updatedAt: string,
    thumbnail?:  {
      __typename: "Thumbnail",
      id: string,
      ext: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    sections?:  {
      __typename: "ModelMediasSectionsConnection",
      items?:  Array< {
        __typename: "MediasSections",
        id: string,
        sectionID: string,
        mediaID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListMediaQueryVariables = {
  filter?: ModelMediaFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMediaQuery = {
  listMedia?:  {
    __typename: "ModelMediaConnection",
    items?:  Array< {
      __typename: "Media",
      id: string,
      title: string,
      description: string,
      highlighted: boolean,
      source?: Source | null,
      createdAt: string,
      updatedAt: string,
      thumbnail?:  {
        __typename: "Thumbnail",
        id: string,
        ext: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      sections?:  {
        __typename: "ModelMediasSectionsConnection",
        nextToken?: string | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetUserSubmissionsQueryVariables = {
  id: string,
};

export type GetUserSubmissionsQuery = {
  getUserSubmissions?:  {
    __typename: "UserSubmissions",
    id: string,
    title: string,
    description: string,
    comment: string,
    source?: Source | null,
    createdAt: string,
    updatedAt: string,
    thumbnail?:  {
      __typename: "Thumbnail",
      id: string,
      ext: string,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type ListUserSubmissionsQueryVariables = {
  filter?: ModelUserSubmissionsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserSubmissionsQuery = {
  listUserSubmissions?:  {
    __typename: "ModelUserSubmissionsConnection",
    items?:  Array< {
      __typename: "UserSubmissions",
      id: string,
      title: string,
      description: string,
      comment: string,
      source?: Source | null,
      createdAt: string,
      updatedAt: string,
      thumbnail?:  {
        __typename: "Thumbnail",
        id: string,
        ext: string,
        createdAt: string,
        updatedAt: string,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetThumbnailQueryVariables = {
  id: string,
};

export type GetThumbnailQuery = {
  getThumbnail?:  {
    __typename: "Thumbnail",
    id: string,
    ext: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListThumbnailsQueryVariables = {
  filter?: ModelThumbnailFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListThumbnailsQuery = {
  listThumbnails?:  {
    __typename: "ModelThumbnailConnection",
    items?:  Array< {
      __typename: "Thumbnail",
      id: string,
      ext: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetSectionQueryVariables = {
  id: string,
};

export type GetSectionQuery = {
  getSection?:  {
    __typename: "Section",
    id: string,
    label: string,
    createdAt: string,
    updatedAt: string,
    medias?:  {
      __typename: "ModelMediasSectionsConnection",
      items?:  Array< {
        __typename: "MediasSections",
        id: string,
        sectionID: string,
        mediaID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListSectionsQueryVariables = {
  filter?: ModelSectionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSectionsQuery = {
  listSections?:  {
    __typename: "ModelSectionConnection",
    items?:  Array< {
      __typename: "Section",
      id: string,
      label: string,
      createdAt: string,
      updatedAt: string,
      medias?:  {
        __typename: "ModelMediasSectionsConnection",
        nextToken?: string | null,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetMediasSectionsQueryVariables = {
  id: string,
};

export type GetMediasSectionsQuery = {
  getMediasSections?:  {
    __typename: "MediasSections",
    id: string,
    sectionID: string,
    mediaID: string,
    createdAt: string,
    updatedAt: string,
    media:  {
      __typename: "Media",
      id: string,
      title: string,
      description: string,
      highlighted: boolean,
      source?: Source | null,
      createdAt: string,
      updatedAt: string,
      thumbnail?:  {
        __typename: "Thumbnail",
        id: string,
        ext: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      sections?:  {
        __typename: "ModelMediasSectionsConnection",
        nextToken?: string | null,
      } | null,
    },
    section:  {
      __typename: "Section",
      id: string,
      label: string,
      createdAt: string,
      updatedAt: string,
      medias?:  {
        __typename: "ModelMediasSectionsConnection",
        nextToken?: string | null,
      } | null,
    },
  } | null,
};

export type ListMediasSectionsQueryVariables = {
  filter?: ModelMediasSectionsFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMediasSectionsQuery = {
  listMediasSections?:  {
    __typename: "ModelMediasSectionsConnection",
    items?:  Array< {
      __typename: "MediasSections",
      id: string,
      sectionID: string,
      mediaID: string,
      createdAt: string,
      updatedAt: string,
      media:  {
        __typename: "Media",
        id: string,
        title: string,
        description: string,
        highlighted: boolean,
        source?: Source | null,
        createdAt: string,
        updatedAt: string,
      },
      section:  {
        __typename: "Section",
        id: string,
        label: string,
        createdAt: string,
        updatedAt: string,
      },
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetVideoOnDemandQueryVariables = {
  id: string,
};

export type GetVideoOnDemandQuery = {
  getVideoOnDemand?:  {
    __typename: "VideoOnDemand",
    id: string,
    src?: string | null,
    createdAt: string,
    updatedAt: string,
    media?:  {
      __typename: "Media",
      id: string,
      title: string,
      description: string,
      highlighted: boolean,
      source?: Source | null,
      createdAt: string,
      updatedAt: string,
      thumbnail?:  {
        __typename: "Thumbnail",
        id: string,
        ext: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      sections?:  {
        __typename: "ModelMediasSectionsConnection",
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type ListVideoOnDemandsQueryVariables = {
  filter?: ModelVideoOnDemandFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListVideoOnDemandsQuery = {
  listVideoOnDemands?:  {
    __typename: "ModelVideoOnDemandConnection",
    items?:  Array< {
      __typename: "VideoOnDemand",
      id: string,
      src?: string | null,
      createdAt: string,
      updatedAt: string,
      media?:  {
        __typename: "Media",
        id: string,
        title: string,
        description: string,
        highlighted: boolean,
        source?: Source | null,
        createdAt: string,
        updatedAt: string,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type GetLivestreamQueryVariables = {
  id: string,
};

export type GetLivestreamQuery = {
  getLivestream?:  {
    __typename: "Livestream",
    id: string,
    url?: string | null,
    isLive?: boolean | null,
    createdAt: string,
    updatedAt: string,
    media?:  {
      __typename: "Media",
      id: string,
      title: string,
      description: string,
      highlighted: boolean,
      source?: Source | null,
      createdAt: string,
      updatedAt: string,
      thumbnail?:  {
        __typename: "Thumbnail",
        id: string,
        ext: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      sections?:  {
        __typename: "ModelMediasSectionsConnection",
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type ListLivestreamsQueryVariables = {
  filter?: ModelLivestreamFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListLivestreamsQuery = {
  listLivestreams?:  {
    __typename: "ModelLivestreamConnection",
    items?:  Array< {
      __typename: "Livestream",
      id: string,
      url?: string | null,
      isLive?: boolean | null,
      createdAt: string,
      updatedAt: string,
      media?:  {
        __typename: "Media",
        id: string,
        title: string,
        description: string,
        highlighted: boolean,
        source?: Source | null,
        createdAt: string,
        updatedAt: string,
      } | null,
    } | null > | null,
    nextToken?: string | null,
  } | null,
};

export type OnCreateMediaSubscription = {
  onCreateMedia?:  {
    __typename: "Media",
    id: string,
    title: string,
    description: string,
    highlighted: boolean,
    source?: Source | null,
    createdAt: string,
    updatedAt: string,
    thumbnail?:  {
      __typename: "Thumbnail",
      id: string,
      ext: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    sections?:  {
      __typename: "ModelMediasSectionsConnection",
      items?:  Array< {
        __typename: "MediasSections",
        id: string,
        sectionID: string,
        mediaID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateMediaSubscription = {
  onUpdateMedia?:  {
    __typename: "Media",
    id: string,
    title: string,
    description: string,
    highlighted: boolean,
    source?: Source | null,
    createdAt: string,
    updatedAt: string,
    thumbnail?:  {
      __typename: "Thumbnail",
      id: string,
      ext: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    sections?:  {
      __typename: "ModelMediasSectionsConnection",
      items?:  Array< {
        __typename: "MediasSections",
        id: string,
        sectionID: string,
        mediaID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteMediaSubscription = {
  onDeleteMedia?:  {
    __typename: "Media",
    id: string,
    title: string,
    description: string,
    highlighted: boolean,
    source?: Source | null,
    createdAt: string,
    updatedAt: string,
    thumbnail?:  {
      __typename: "Thumbnail",
      id: string,
      ext: string,
      createdAt: string,
      updatedAt: string,
    } | null,
    sections?:  {
      __typename: "ModelMediasSectionsConnection",
      items?:  Array< {
        __typename: "MediasSections",
        id: string,
        sectionID: string,
        mediaID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateUserSubmissionsSubscription = {
  onCreateUserSubmissions?:  {
    __typename: "UserSubmissions",
    id: string,
    title: string,
    description: string,
    comment: string,
    source?: Source | null,
    createdAt: string,
    updatedAt: string,
    thumbnail?:  {
      __typename: "Thumbnail",
      id: string,
      ext: string,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnUpdateUserSubmissionsSubscription = {
  onUpdateUserSubmissions?:  {
    __typename: "UserSubmissions",
    id: string,
    title: string,
    description: string,
    comment: string,
    source?: Source | null,
    createdAt: string,
    updatedAt: string,
    thumbnail?:  {
      __typename: "Thumbnail",
      id: string,
      ext: string,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnDeleteUserSubmissionsSubscription = {
  onDeleteUserSubmissions?:  {
    __typename: "UserSubmissions",
    id: string,
    title: string,
    description: string,
    comment: string,
    source?: Source | null,
    createdAt: string,
    updatedAt: string,
    thumbnail?:  {
      __typename: "Thumbnail",
      id: string,
      ext: string,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnCreateThumbnailSubscription = {
  onCreateThumbnail?:  {
    __typename: "Thumbnail",
    id: string,
    ext: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateThumbnailSubscription = {
  onUpdateThumbnail?:  {
    __typename: "Thumbnail",
    id: string,
    ext: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteThumbnailSubscription = {
  onDeleteThumbnail?:  {
    __typename: "Thumbnail",
    id: string,
    ext: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateSectionSubscription = {
  onCreateSection?:  {
    __typename: "Section",
    id: string,
    label: string,
    createdAt: string,
    updatedAt: string,
    medias?:  {
      __typename: "ModelMediasSectionsConnection",
      items?:  Array< {
        __typename: "MediasSections",
        id: string,
        sectionID: string,
        mediaID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdateSectionSubscription = {
  onUpdateSection?:  {
    __typename: "Section",
    id: string,
    label: string,
    createdAt: string,
    updatedAt: string,
    medias?:  {
      __typename: "ModelMediasSectionsConnection",
      items?:  Array< {
        __typename: "MediasSections",
        id: string,
        sectionID: string,
        mediaID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeleteSectionSubscription = {
  onDeleteSection?:  {
    __typename: "Section",
    id: string,
    label: string,
    createdAt: string,
    updatedAt: string,
    medias?:  {
      __typename: "ModelMediasSectionsConnection",
      items?:  Array< {
        __typename: "MediasSections",
        id: string,
        sectionID: string,
        mediaID: string,
        createdAt: string,
        updatedAt: string,
      } | null > | null,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateMediasSectionsSubscription = {
  onCreateMediasSections?:  {
    __typename: "MediasSections",
    id: string,
    sectionID: string,
    mediaID: string,
    createdAt: string,
    updatedAt: string,
    media:  {
      __typename: "Media",
      id: string,
      title: string,
      description: string,
      highlighted: boolean,
      source?: Source | null,
      createdAt: string,
      updatedAt: string,
      thumbnail?:  {
        __typename: "Thumbnail",
        id: string,
        ext: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      sections?:  {
        __typename: "ModelMediasSectionsConnection",
        nextToken?: string | null,
      } | null,
    },
    section:  {
      __typename: "Section",
      id: string,
      label: string,
      createdAt: string,
      updatedAt: string,
      medias?:  {
        __typename: "ModelMediasSectionsConnection",
        nextToken?: string | null,
      } | null,
    },
  } | null,
};

export type OnUpdateMediasSectionsSubscription = {
  onUpdateMediasSections?:  {
    __typename: "MediasSections",
    id: string,
    sectionID: string,
    mediaID: string,
    createdAt: string,
    updatedAt: string,
    media:  {
      __typename: "Media",
      id: string,
      title: string,
      description: string,
      highlighted: boolean,
      source?: Source | null,
      createdAt: string,
      updatedAt: string,
      thumbnail?:  {
        __typename: "Thumbnail",
        id: string,
        ext: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      sections?:  {
        __typename: "ModelMediasSectionsConnection",
        nextToken?: string | null,
      } | null,
    },
    section:  {
      __typename: "Section",
      id: string,
      label: string,
      createdAt: string,
      updatedAt: string,
      medias?:  {
        __typename: "ModelMediasSectionsConnection",
        nextToken?: string | null,
      } | null,
    },
  } | null,
};

export type OnDeleteMediasSectionsSubscription = {
  onDeleteMediasSections?:  {
    __typename: "MediasSections",
    id: string,
    sectionID: string,
    mediaID: string,
    createdAt: string,
    updatedAt: string,
    media:  {
      __typename: "Media",
      id: string,
      title: string,
      description: string,
      highlighted: boolean,
      source?: Source | null,
      createdAt: string,
      updatedAt: string,
      thumbnail?:  {
        __typename: "Thumbnail",
        id: string,
        ext: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      sections?:  {
        __typename: "ModelMediasSectionsConnection",
        nextToken?: string | null,
      } | null,
    },
    section:  {
      __typename: "Section",
      id: string,
      label: string,
      createdAt: string,
      updatedAt: string,
      medias?:  {
        __typename: "ModelMediasSectionsConnection",
        nextToken?: string | null,
      } | null,
    },
  } | null,
};

export type OnCreateVideoOnDemandSubscription = {
  onCreateVideoOnDemand?:  {
    __typename: "VideoOnDemand",
    id: string,
    src?: string | null,
    createdAt: string,
    updatedAt: string,
    media?:  {
      __typename: "Media",
      id: string,
      title: string,
      description: string,
      highlighted: boolean,
      source?: Source | null,
      createdAt: string,
      updatedAt: string,
      thumbnail?:  {
        __typename: "Thumbnail",
        id: string,
        ext: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      sections?:  {
        __typename: "ModelMediasSectionsConnection",
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnUpdateVideoOnDemandSubscription = {
  onUpdateVideoOnDemand?:  {
    __typename: "VideoOnDemand",
    id: string,
    src?: string | null,
    createdAt: string,
    updatedAt: string,
    media?:  {
      __typename: "Media",
      id: string,
      title: string,
      description: string,
      highlighted: boolean,
      source?: Source | null,
      createdAt: string,
      updatedAt: string,
      thumbnail?:  {
        __typename: "Thumbnail",
        id: string,
        ext: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      sections?:  {
        __typename: "ModelMediasSectionsConnection",
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnDeleteVideoOnDemandSubscription = {
  onDeleteVideoOnDemand?:  {
    __typename: "VideoOnDemand",
    id: string,
    src?: string | null,
    createdAt: string,
    updatedAt: string,
    media?:  {
      __typename: "Media",
      id: string,
      title: string,
      description: string,
      highlighted: boolean,
      source?: Source | null,
      createdAt: string,
      updatedAt: string,
      thumbnail?:  {
        __typename: "Thumbnail",
        id: string,
        ext: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      sections?:  {
        __typename: "ModelMediasSectionsConnection",
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnCreateLivestreamSubscription = {
  onCreateLivestream?:  {
    __typename: "Livestream",
    id: string,
    url?: string | null,
    isLive?: boolean | null,
    createdAt: string,
    updatedAt: string,
    media?:  {
      __typename: "Media",
      id: string,
      title: string,
      description: string,
      highlighted: boolean,
      source?: Source | null,
      createdAt: string,
      updatedAt: string,
      thumbnail?:  {
        __typename: "Thumbnail",
        id: string,
        ext: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      sections?:  {
        __typename: "ModelMediasSectionsConnection",
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnUpdateLivestreamSubscription = {
  onUpdateLivestream?:  {
    __typename: "Livestream",
    id: string,
    url?: string | null,
    isLive?: boolean | null,
    createdAt: string,
    updatedAt: string,
    media?:  {
      __typename: "Media",
      id: string,
      title: string,
      description: string,
      highlighted: boolean,
      source?: Source | null,
      createdAt: string,
      updatedAt: string,
      thumbnail?:  {
        __typename: "Thumbnail",
        id: string,
        ext: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      sections?:  {
        __typename: "ModelMediasSectionsConnection",
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnDeleteLivestreamSubscription = {
  onDeleteLivestream?:  {
    __typename: "Livestream",
    id: string,
    url?: string | null,
    isLive?: boolean | null,
    createdAt: string,
    updatedAt: string,
    media?:  {
      __typename: "Media",
      id: string,
      title: string,
      description: string,
      highlighted: boolean,
      source?: Source | null,
      createdAt: string,
      updatedAt: string,
      thumbnail?:  {
        __typename: "Thumbnail",
        id: string,
        ext: string,
        createdAt: string,
        updatedAt: string,
      } | null,
      sections?:  {
        __typename: "ModelMediasSectionsConnection",
        nextToken?: string | null,
      } | null,
    } | null,
  } | null,
};
