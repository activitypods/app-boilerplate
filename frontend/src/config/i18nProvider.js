import polyglotI18nProvider from 'ra-i18n-polyglot';
import raEnglishMessages from 'ra-language-english';
import raFrenchMessages from 'ra-language-french';
import { frenchMessages as authFrenchMessages, englishMessages as authEnglishMessages } from '@semapps/auth-provider';
import { frenchMessages as apodsFrenchMessages, englishMessages as apodsEnglishMessages } from '@activitypods/react';

const getMessages = lang => {
  if (lang === 'en') {
    return {
      ...raEnglishMessages,
      ...authEnglishMessages,
      ...apodsEnglishMessages,
      resources: {
        Contact: {
          name: 'Contact |||| Contacts',
          fields: {
            describes: 'User ID',
            'vcard:given-name': 'Surname',
            'vcard:family-name': 'Family name',
            'vcard:note': 'About you',
            'vcard:photo': 'Picture',
            'vcard:hasAddress': 'Home address',
            'dc:created': 'Account created'
          }
        },
        Event: {
          name: 'Event |||| Events',
          fields: {
            name: 'Title',
            content: 'Description',
            startTime: 'Start time'
          }
        }
      }
    };
  } else if (lang === 'fr') {
    return {
      ...raFrenchMessages,
      ...authFrenchMessages,
      ...apodsFrenchMessages,
      resources: {
        Contact: {
          name: 'Profil |||| Profils',
          fields: {
            describes: 'Identifiant',
            'vcard:given-name': 'Prénom',
            'vcard:family-name': 'Nom de famille',
            'vcard:note': 'En deux mots',
            'vcard:photo': 'Photo',
            'vcard:hasAddress': 'Adresse du domicile',
            'dc:created': "Date d'inscription"
          }
        },
        Event: {
          name: 'Evénement |||| Evénements',
          fields: {
            name: 'Titre',
            content: 'Description',
            startTime: 'Date de début'
          }
        }
      }
    };
  } else {
    throw new Error('Language not handled: ' + lang);
  }
};

const i18nProvider = polyglotI18nProvider(getMessages, import.meta.env.VITE_APP_LANG);

export default i18nProvider;
