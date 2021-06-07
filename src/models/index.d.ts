import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class vodAsset {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly highlighted: boolean;
  readonly video?: videoObject;
  readonly thumbnail?: thumbnailObject;
  readonly sections?: (VideoSection | null)[];
  constructor(init: ModelInit<vodAsset>);
  static copyOf(source: vodAsset, mutator: (draft: MutableModel<vodAsset>) => MutableModel<vodAsset> | void): vodAsset;
}

export declare class videoObject {
  readonly id: string;
  readonly token?: string;
  constructor(init: ModelInit<videoObject>);
  static copyOf(source: videoObject, mutator: (draft: MutableModel<videoObject>) => MutableModel<videoObject> | void): videoObject;
}

export declare class thumbnailObject {
  readonly id: string;
  readonly ext: string;
  constructor(init: ModelInit<thumbnailObject>);
  static copyOf(source: thumbnailObject, mutator: (draft: MutableModel<thumbnailObject>) => MutableModel<thumbnailObject> | void): thumbnailObject;
}

export declare class VideoSection {
  readonly id: string;
  readonly section: section;
  readonly video: vodAsset;
  constructor(init: ModelInit<VideoSection>);
  static copyOf(source: VideoSection, mutator: (draft: MutableModel<VideoSection>) => MutableModel<VideoSection> | void): VideoSection;
}

export declare class section {
  readonly id: string;
  readonly label: string;
  readonly videos?: (VideoSection | null)[];
  constructor(init: ModelInit<section>);
  static copyOf(source: section, mutator: (draft: MutableModel<section>) => MutableModel<section> | void): section;
}