# Título
Description

### Features
- Create new users with their Pokemon Ids
- Get users list
- Get users by Id and gathering Pokemon Names from Poke API
- Update User
- Delete User

## Pre-Requisites
- Docker installed without DUSO Permission
- Docker compose installed without SUDO
- Ports free: 3000 and 5432

## How to run the app

```
chmod 711 ./up_dev.sh
./up_dev.sh
```

## How to run the tests

```
chmod 711 ./up_test.sh
./up_test.sh
```

## Areas to improve
- Data should be moved from tests to an external file
- Generic method should be used to mock endpoints
- Error handling could be improved (I. E handle already existing user error)
- A Seed migrtion would be useful to have an already working app with data
- The ORM is being used with Synchronize instead of migrations. Migrations would be the best option
- Deployment could be done

## Errors to be fixed

- Docker app is not running properly

## Techs

- Fastify: Fastify5.12.5
- Node: Node26.8.2
- Prisma: Prisma6.19.3
- Postgres

## Decisions made

- Clean Architecture: To ble able to handle further changes in the future in a proper way.
- Prisma ORM: Because it is the most moderns and type safe option. It is easy to find fixes and people that know to use it
- Docker: To make portable
- Testing pending

## Route

- : [![API Swagger](https://localhost:3000/docs)

## Env vars should be defined

To find an example of the values you can use .env.example