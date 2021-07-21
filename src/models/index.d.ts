import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum Source {
  TWITCH = "TWITCH",
  YOUTUBE = "YOUTUBE",
  SELF = "SELF"
}



export declare class Media {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly highlighted: boolean;
  readonly sections?: (MediasSections | null)[];
  readonly source?: Source | keyof typeof Source;
  readonly thumbnail?: Thumbnail;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Media>);
  static copyOf(source: Media, mutator: (draft: MutableModel<Media>) => MutableModel<Media> | void): Media;
}

export declare class MediasSections {
  readonly id: string;
  readonly section: Section;
  readonly media: Media;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<MediasSections>);
  static copyOf(source: MediasSections, mutator: (draft: MutableModel<MediasSections>) => MutableModel<MediasSections> | void): MediasSections;
}

export declare class Section {
  readonly id: string;
  readonly label: string;
  readonly medias?: (MediasSections | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Section>);
  static copyOf(source: Section, mutator: (draft: MutableModel<Section>) => MutableModel<Section> | void): Section;
}

export declare class Thumbnail {
  readonly id: string;
  readonly ext: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Thumbnail>);
  static copyOf(source: Thumbnail, mutator: (draft: MutableModel<Thumbnail>) => MutableModel<Thumbnail> | void): Thumbnail;
}

export declare class UserSubmissions {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly comment: string;
  readonly source?: Source | keyof typeof Source;
  readonly thumbnail?: Thumbnail;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<UserSubmissions>);
  static copyOf(source: UserSubmissions, mutator: (draft: MutableModel<UserSubmissions>) => MutableModel<UserSubmissions> | void): UserSubmissions;
}

export declare class VideoOnDemand {
  readonly id: string;
  readonly media?: Media;
  readonly src?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<VideoOnDemand>);
  static copyOf(source: VideoOnDemand, mutator: (draft: MutableModel<VideoOnDemand>) => MutableModel<VideoOnDemand> | void): VideoOnDemand;
}

export declare class Livestream {
  readonly id: string;
  readonly media?: Media;
  readonly url?: string;
  readonly isLive: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Livestream>);
  static copyOf(source: Livestream, mutator: (draft: MutableModel<Livestream>) => MutableModel<Livestream> | void): Livestream;
}