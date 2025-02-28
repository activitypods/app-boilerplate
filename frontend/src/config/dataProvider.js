import urlJoin from 'url-join';
import { dataProvider, configureUserStorage, fetchAppRegistration } from '@semapps/semantic-data-provider';
import ontologies from './ontologies.json';
import * as resources from '../resources';

const { origin: backendOrigin } = new URL(import.meta.env.VITE_BACKEND_URL);

export default dataProvider({
  resources: Object.fromEntries(Object.entries(resources).map(([k, v]) => [k, v.dataModel])),
  ontologies,
  jsonContext: ['https://www.w3.org/ns/activitystreams', urlJoin(backendOrigin, '.well-known/context.jsonld')],
  returnFailedResources: true,
  plugins: [configureUserStorage(), fetchAppRegistration()]
});
