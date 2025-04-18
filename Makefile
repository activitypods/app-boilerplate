.DEFAULT_GOAL := help
.PHONY: docker-build docker-up build start log stop restart

DOCKER_COMPOSE_DEV=docker compose -f docker-compose-dev.yml  --env-file .env
DOCKER_COMPOSE_PROD=docker compose -f docker-compose-prod.yml --env-file .env.production --env-file .env.production.local

create-env-local-file:
	touch .env.local

# Dev commands

start: create-env-local-file
	$(DOCKER_COMPOSE_DEV) up -d

stop:
	$(DOCKER_COMPOSE_DEV) kill
	$(DOCKER_COMPOSE_DEV) rm -fv

config:
	$(DOCKER_COMPOSE_DEV) config

upgrade:
	$(DOCKER_COMPOSE_DEV) pull
	$(DOCKER_COMPOSE_DEV) up -d

logs-activitypods:
	$(DOCKER_COMPOSE_DEV) logs activitypods-backend

attach-activitypods:
	$(DOCKER_COMPOSE_DEV) exec activitypods-backend pm2 attach 0

# Prod commands

build-prod:
	$(DOCKER_COMPOSE_PROD) build

start-prod:
	$(DOCKER_COMPOSE_PROD) up -d

stop-prod:
	$(DOCKER_COMPOSE_PROD) kill
	$(DOCKER_COMPOSE_PROD) rm -fv

config-prod:
	$(DOCKER_COMPOSE_PROD) config

upgrade-prod:
	$(DOCKER_COMPOSE_PROD) pull
	$(DOCKER_COMPOSE_PROD) up -d

logs-backend-prod:
	$(DOCKER_COMPOSE_PROD) logs app-backend

attach-backend-prod:
	$(DOCKER_COMPOSE_PROD) exec app-backend pm2 attach 0

# Publish commands

publish-frontend:
	export TAG=`git describe --tags --abbrev=0`
	$(DOCKER_COMPOSE_PROD) build frontend
	$(DOCKER_COMPOSE_PROD) push frontend

publish-backend:
	export TAG=`git describe --tags --abbrev=0`
	$(DOCKER_COMPOSE_PROD) build backend
	$(DOCKER_COMPOSE_PROD) push backend

publish-frontend-latest:
	export TAG=latest
	$(DOCKER_COMPOSE_PROD) build frontend
	$(DOCKER_COMPOSE_PROD) push frontend

publish-backend-latest:
	export TAG=latest
	$(DOCKER_COMPOSE_PROD) build backend
	$(DOCKER_COMPOSE_PROD) push backend

