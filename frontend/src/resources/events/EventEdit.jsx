import { Edit, TopToolbar, ShowButton } from 'react-admin';
import { RemoteShareButton } from '@activitypods/react';
import EventForm from './EventForm';

const EventEditActions = () => (
  <TopToolbar>
    <ShowButton />
    <RemoteShareButton color="primary" clientId={import.meta.env.VITE_BACKEND_CLIENT_ID} />
  </TopToolbar>
);

const EventEdit = () => (
  <Edit actions={<EventEditActions />}>
    <EventForm />
  </Edit>
);

export default EventEdit;
