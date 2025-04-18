import { List, SimpleList } from 'react-admin';

const ContactList = () => (
  <List sort={{ field: 'vcard:given-name', order: 'ASC' }} perPage={1000}>
    <SimpleList
      primaryText={record => record['vcard:given-name']}
      secondaryText={record => record.describes}
      linkType="show"
    />
  </List>
);

export default ContactList;
