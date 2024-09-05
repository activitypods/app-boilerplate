[![ActivityPods](https://badgen.net/badge/Powered%20by/ActivityPods/28CDFB)](https://activitypods.org)

# ActivityPods app boilerplate

See the documentation to find how to use this boilerplate:

https://docs.activitypods.org/tutorials/create-your-first-social-app/

## Commands

### For development

`make start` Starts the activitypods provider using a docker-compose file. This includes the activitypods backend and frontend server, the fuseki db, mailcatcher, redis, and arena.

`make stop` Stops and removes all containers for the activitypods provider.

`make config` Prints the config with the `.env`-file-provided environment variables filled.

`make logs-activitypods` Prints the activitypods provider logs.

`make attach-activitypods` Attaches to the [moleculer](https://moleculer.services/) repl of the activitypods backend.

### For production

`make build-prod` Builds the activitypods provider images for production. In addition to the dev images, this includes a traefik reverse proxy.

`make start-prod` Starts the activitypods provider containers for production.

`make stop-prod` Stops and removes running activitypods provider containers.

`make config-prod` Prints the config with the `.env`-file-provided environment variables filled.

`make attach-backend-prod` Attaches to the [moleculer](https://moleculer.services/) repl of the activitypods backend.
