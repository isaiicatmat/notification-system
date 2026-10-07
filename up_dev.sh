#!/bin/sh
set -a
source .env.docker
set +a
docker-compose -f docker-compose.yml up --build --force-recreate
