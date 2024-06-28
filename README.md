[![ActivityPods](https://badgen.net/badge/Powered%20by/ActivityPods/28CDFB)](https://activitypods.org)

# ActivityPods app boilerplate

See the documentation to find how to use this boilerplate:

https://docs.activitypods.org/tutorials/create-your-first-social-app/

## Make Commands for Managing the Activitypods Provider

### For Development

`make start` Starts the activitypods provider using a docker-compose file. This includes the activitypods backend and frontend server, the fuseki db, mailcatcher, redis, and arena.

`make stop` Stops and removes all containers for the activitypods provider.

`make config` Prints the config with the `.env`-file-provided environment variables filled.

`make logs-activitypods` Prints the activitypods provider logs.

`attach-activitypods` Attaches to the [moleculer](https://moleculer.services/) repl of the activitypods backend.

### For Production

`build-prod` Builds the activitypods provider images for production. In addition to the dev images, this includes a traefik reverse proxy.

`start-prod` Starts the activitypods provider containers for production.

`stop-prod` Stops and removes running activitypods provider containers.

`config-prod` Prints the config with the `.env`-file-provided environment variables filled.

`attach-backend-prod` Attaches to the [moleculer](https://moleculer.services/) repl of the activitypods backend.
