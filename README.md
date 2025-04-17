# resync-games

## Overview
This is a platform for creating multiplayer web games, similar to Jackbox or Drawbattle.io. We wanted a place where we can experiment with various game concepts, without having to worry about the multiplayer aspects.

## How to build a game
The platform itself is not ready for general use, it's still clunky and hard to understand, but we're making progress! We'll have more detailed guides on how to build games in here once we've managed to create something compelling.

## Stack
NextJS - frontend
NestJS - backend
Postgres - DB

Deployed on
NextJS - vercel
NestJS - AWS, EC2
Postgres - Neon

## Package breakdown
api -> the API definitions for the network calls between the backend and the frontend
backend -> NestJS
database -> prisma client
frontend -> NextJS
games -> shared between the backend and frontend packages, greatly simplifies the build tooling while still allowing the dev to share types between FE files and BE files when creating a game

The repo uses yarn pnp (4.7.0) for its package management (which in turn allows us to use docker-compose for local development) and turborepo for its build system. We're aiming for a [zero-installs](https://yarnpkg.com/features/caching) setup, though we've got a few more steps to go.
