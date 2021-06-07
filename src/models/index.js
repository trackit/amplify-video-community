// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { vodAsset, videoObject, thumbnailObject, VideoSection, section } = initSchema(schema);

export {
  vodAsset,
  videoObject,
  thumbnailObject,
  VideoSection,
  section
};