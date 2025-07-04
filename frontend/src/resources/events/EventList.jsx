import { List, SimpleList } from 'react-admin';

const EventList = () => {
  return (
    <List sort={{ field: 'vcard:given-name', order: 'ASC' }} perPage={50}>
      <SimpleList primaryText={record => record.name} secondaryText={record => record.startTime} linkType="show" />
    </List>
  );
};

export default EventList;
