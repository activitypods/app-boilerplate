import { Show, SimpleShowLayout, TextField, DateField, TopToolbar, EditButton } from 'react-admin';
import { ReferenceField } from '@semapps/field-components';
import { RemoteShareButton } from '@activitypods/react';
import JoinButton from '../../common/buttons/JoinButton';

const EventShowActions = () => (
  <TopToolbar>
    <EditButton />
    <JoinButton color="primary" />
    <RemoteShareButton color="primary" clientId={import.meta.env.VITE_BACKEND_CLIENT_ID} />
  </TopToolbar>
);

const EventShow = () => (
  <Show actions={<EventShowActions />}>
    <SimpleShowLayout>
      <TextField source="name" />
      <ReferenceField source="dc:creator" reference="contacts">
        <TextField source="foaf:nick" />
      </ReferenceField>
      <DateField source="startTime" />
      <TextField source="content" />
    </SimpleShowLayout>
  </Show>
);

export default EventShow;
