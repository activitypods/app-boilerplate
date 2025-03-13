import { Admin, CustomRoutes, Resource, memoryStore } from 'react-admin';
import { BrowserRouter, Route } from 'react-router-dom';
import { LoginPage, RedirectPage } from '@activitypods/react';
import authProvider from './config/authProvider';
import dataProvider from './config/dataProvider';
import i18nProvider from './config/i18nProvider';
import Layout from './Layout';
import ContactShow from './resources/contacts/ContactShow';
import ContactList from './resources/contacts/ContactList';
import EventShow from './resources/events/EventShow';
import EventList from './resources/events/EventList';
import EventCreate from './resources/events/EventCreate';
import EventEdit from './resources/events/EventEdit';
import ContactIcon from '@mui/icons-material/Contacts';
import EventIcon from '@mui/icons-material/Event';

// If a custom Pod provider is defined, use it instead of loading all available Pod providers
const MyLoginPage = props => (
  <LoginPage
    customPodProviders={
      import.meta.env.VITE_POD_PROVIDER_BASE_URL && [
        { 'apods:baseUrl': import.meta.env.VITE_POD_PROVIDER_BASE_URL, 'apods:area': 'Local' }
      ]
    }
    clientId={import.meta.env.VITE_BACKEND_CLIENT_ID}
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
      loginPage={MyLoginPage}
      layout={Layout}
      store={memoryStore()}
      requireAuth
      disableTelemetry
    >
      <Resource
        name="events"
        show={EventShow}
        list={EventList}
        create={EventCreate}
        edit={EventEdit}
        icon={EventIcon}
        recordRepresentation="vcard:given-name"
      />
      <Resource
        name="contacts"
        show={ContactShow}
        list={ContactList}
        icon={ContactIcon}
        recordRepresentation="vcard:given-name"
      />
      <CustomRoutes noLayout>
        <Route path="/r" element={<RedirectPage />} />
      </CustomRoutes>
    </Admin>
  </BrowserRouter>
);

export default App;
