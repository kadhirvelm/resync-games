#!/bin/bash

sudo -E docker build -f packages/backend/Dockerfile -t resync-games-backend .;

export $(grep -v '^#' .env | xargs)
yarn && yarn --cwd packages/database db:migrate

sudo -E docker stop resync-games-backend;
sudo -E docker rm resync-games-backend;

sudo -E docker run -d -p 8080:8080 --name resync-games-backend resync-games-backend:latest

sudo -E docker system prune -f
