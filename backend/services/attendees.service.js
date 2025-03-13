const urlJoin = require('url-join');
const { PodCollectionsHandlerMixin } = require('@activitypods/app');
const CONFIG = require('../config/config');

module.exports = {
  name: 'attendees',
  mixins: [PodCollectionsHandlerMixin],
  settings: {
    shapeTreeUri: urlJoin(CONFIG.SHAPE_REPOSITORY_URL, 'shapetrees/as/Event'),
    attachPredicate: 'http://activitypods.org/ns/core#attendees',
    collectionOptions: {
      ordered: false,
      summary: 'Event attendees'
    },
    createWacGroup: true
  }
};
