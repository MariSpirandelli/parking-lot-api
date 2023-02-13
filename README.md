# Parking lot system

Parking system that allows a simple configuration of the number of spaces for each type of vehicle accepted, in addition to allowing vehicles to park, leave the parking lot and show an updated panel with the status of spaces for each type of vehicle supported space and notifies when the parking lot is full.

It was developed as a monolithic project for easy execution and testing, applying best development practices such as clean architecture and SOLID principles.

## Stack

- NodeJs
- Express
- Typescript
- React
- Postgres

## How to run the project locally

### Setup

Make sure to rename the file `.env-sample` to `.env` and in case you're not using `docker-compose` to run the project, make sure to update the database related variables to point to your database location.

### With Docker

1. run ```yarn install``` or ```npm install```
1. ```docker-compose up```

### Without Docker

1. start your database
1. update `.env` database related variables to point to your local database
1. run ```yarn install``` or ```npm install```
1. ```yarn dev``` or ```npm dev```

### Seeds

You have two options for seeding:

#### Through .env variable:

1. add `SEED_ON_DEPLOY=true` to the `.env`
1. [start the project](how-to-run-the-project-locally)

#### Through Docker

1. run command: ```docker exec -it parking-lot-api-local-1 yarn seed```

## How to run tests

