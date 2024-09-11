import React from 'react';
import { Admin, CustomRoutes, Resource, memoryStore } from 'react-admin';
import { BrowserRouter, Route } from 'react-router-dom';
import { PodLoginPage, RedirectPage } from '@activitypods/react';
import authProvider from './config/authProvider';
import dataProvider from './config/dataProvider';
import i18nProvider from './config/i18nProvider';
import ontologies from './config/ontologies.json';
import Layout from './Layout';
import * as resources from './resources';

// If a custom Pod provider is defined, use it instead of loading all available Pod providers
const LoginPage = props => (
  <PodLoginPage
    customPodProviders={
      import.meta.env.VITE_POD_PROVIDER_BASE_URL && [
        { 'apods:baseUrl': import.meta.env.VITE_POD_PROVIDER_BASE_URL, 'apods:area': 'Local' }
      ]
    }
    {...props}
  />
);

const App = () => (
  <BrowserRouter>
    <Admin
      title={import.meta.env.VITE_APP_NAME}
      authProvider={authProvider}
      dataProvider={dataProvider}
      i18nProvider={i18nProvider}
      loginPage={LoginPage}
      layout={Layout}
      store={memoryStore()}
      requireAuth
    >
      {Object.entries(resources).map(([key, resource]) => (
        <Resource key={key} name={key} {...resource.config} />
      ))}
      <CustomRoutes noLayout>
        <Route path="/r" element={<RedirectPage ontologies={ontologies} />} />
      </CustomRoutes>
    </Admin>
  </BrowserRouter>
);

export default App;
