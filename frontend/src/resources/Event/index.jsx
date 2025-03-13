import urlJoin from 'url-join';
import EventIcon from '@mui/icons-material/Event';
import EventCreate from './EventCreate';
import EventEdit from './EventEdit';
import EventList from './EventList';
import EventShow from './EventShow';

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
    shapeTreeUri: urlJoin(import.meta.env.VITE_SHAPE_REPOSITORY_URL, 'shapetrees/as/Event')
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
