const urlJoin = require('url-join');
const { triple, namedNode, literal } = require('@rdfjs/data-model');
const { PodResourcesHandlerMixin } = require('@activitypods/app');
const CONFIG = require('../config/config');

module.exports = {
  name: 'events',
  mixins: [PodResourcesHandlerMixin],
  settings: {
    shapeTreeUri: urlJoin(CONFIG.SHAPE_REPOSITORY_URL, 'shapetrees/as/Event')
  },
  actions: {
    async tagAsStarted(ctx) {
      const { event } = ctx.params;
      this.logger.info(`The event ${event.name} has started !!`);
    }
  },
  methods: {
    async onCreate(ctx, resource, actorUri) {
      await this.actions.patch(
        {
          resourceUri: resource.id || resource['@id'],
          triplesToAdd: [
            triple(
              namedNode(resource.id || resource['@id']),
              namedNode('https://www.w3.org/ns/activitystreams#summary'),
              literal('An example backend-generated summary')
            )
          ],
          actorUri
        },
        { parentCtx: ctx }
      );

      await ctx.call('timer.set', {
        key: [resource.id, 'started'],
        time: resource.startTime,
        actionName: 'events.tagAsStarted',
        params: { event: resource }
      });
    },
    async onUpdate(ctx, resource) {
      const existingTimer = await ctx.call('timer.get', { key: [resource.id, 'started'] });

      // If no timer is set, or if the startTime changed
      if (!existingTimer || resource.startTime !== existingTimer.time) {
        this.logger.info('Setting a new timer because the startTime changed...');

        await ctx.call('timer.set', {
          key: [resource.id, 'started'],
          time: resource.startTime,
          actionName: 'events.tagAsStarted',
          params: { event: resource }
        });
      }
    }
  }
};
