import EventCreate from './EventCreate';
import EventEdit from './EventEdit';
import EventList from './EventList';
import EventShow from './EventShow';
import EventIcon from '@mui/icons-material/Event';

export default {
  config: {
    list: EventList,
    show: EventShow,
    create: EventCreate,
    edit: EventEdit,
    icon: EventIcon,
    recordRepresentation: 'vcard:given-name'
  },
  dataModel: {
    types: ['as:Event']
  },
  translations: {
    en: {
      name: 'Event |||| Events',
      fields: {
        name: 'Title',
        content: 'Description',
        startTime: 'Start time'
      }
    },
    fr: {
      name: 'Evénement |||| Evénements',
      fields: {
        name: 'Titre',
        content: 'Description',
        startTime: 'Date de début'
      }
    }
  }
};
