// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Source = {
  "TWITCH": "TWITCH",
  "YOUTUBE": "YOUTUBE",
  "SELF": "SELF"
};

const { Media, MediasSections, Section, Thumbnail, VideoObject, VideoOnDemand, Livestream } = initSchema(schema);

export {
  Media,
  MediasSections,
  Section,
  Thumbnail,
  VideoObject,
  VideoOnDemand,
  Livestream,
  Source
};