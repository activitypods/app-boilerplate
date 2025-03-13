import urlJoin from 'url-join';
import { dataProvider, configureUserStorage, fetchAppRegistration } from '@semapps/semantic-data-provider';

const { origin: backendOrigin } = new URL(import.meta.env.VITE_BACKEND_URL);

export default dataProvider({
  resources: {
    Event: {
      shapeTreeUri: urlJoin(import.meta.env.VITE_SHAPE_REPOSITORY_URL, 'shapetrees/as/Event')
    },
    Contact: {
      shapeTreeUri: urlJoin(import.meta.env.VITE_SHAPE_REPOSITORY_URL, 'shapetrees/as/Profile')
    }
  },
  jsonContext: ['https://www.w3.org/ns/activitystreams', urlJoin(backendOrigin, '.well-known/context.jsonld')],
  returnFailedResources: true,
  plugins: [configureUserStorage(), fetchAppRegistration()]
});
