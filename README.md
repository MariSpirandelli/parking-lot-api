# Parking lot system

Parking system that allows a simple configuration of the number of spaces for each type of vehicle accepted, in addition to allowing vehicles to park, leave the parking lot and show an updated panel with the status of spaces for each type of vehicle supported space and notifies when the parking lot is full.

It was developed applying best development practices such as clean architecture and SOLID principles.

## Stack

- NodeJs
- Express
- Typescript
- Jest
- Postgres

## Client app

- [check it out](https://github.com/MariSpirandelli/parking-lot-app)

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
1. [start the project](#how-to-run-the-project-locally)

#### Through Docker

1. run command: ```docker exec -it parking-lot-api-local-1 yarn seed```

## How to run tests

1. run command `yarn test` or `npm test`

# REST API

## Set up parking lot slots

### Request

`PUT /api/parking-lots/:parkingLotId/setup`

Example:

```curl
curl --location --request PUT 'http://localhost:3000/api/parking-lots/1/setup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "slots": [
        {
            "vehicleTypeId": 1,
            "quantity": 3
        },
        {
            "vehicleTypeId": 2,
            "quantity": 5
        },
        {
            "vehicleTypeId": 3,
            "quantity": 2
        }
    ]
}'
```

### Response

```json
[
    {
        "vehicleTypeId": 1,
        "parkingLotId": 1,
        "createdAt": "2023-02-14T20:35:59.946Z",
        "id": 1,
        "updatedAt": null,
        "leftSlotId": null,
        "rightSlotId": null
    },
    ...
    {
        "vehicleTypeId": 3,
        "parkingLotId": 1,
        "createdAt": "2023-02-14T20:35:59.946Z",
        "id": 10,
        "updatedAt": null,
        "leftSlotId": null,
        "rightSlotId": null
    }
]
```

## Get available slots

### Request

`GET /api/slots/:parkingLot`

Example

```curl
curl --location --request GET 'http://localhost:3000/api/slots/1' \
--header 'Content-Type: application/json' \
--data-raw '{
    "inUse": false
}'
```

### Response

```json
[
    {
        "id": 1,
        "createdAt": "2023-02-14T23:55:33.130Z",
        "updatedAt": null,
        "parkingLotId": 1,
        "vehicleTypeId": 1,
        "leftSlotId": null,
        "rightSlotId": null,
        "parking": [],
        "vehicleType": {
            "id": 1,
            "createdAt": "2023-02-14T22:56:02.702Z",
            "updatedAt": null,
            "type": "motorcycle",
            "order": 1
        }
    },
    ...
    {
        "id": 10,
        "createdAt": "2023-02-14T23:55:33.130Z",
        "updatedAt": null,
        "parkingLotId": 1,
        "vehicleTypeId": 3,
        "leftSlotId": null,
        "rightSlotId": null,
        "parking": [],
        "vehicleType": {
            "id": 3,
            "createdAt": "2023-02-14T22:56:02.702Z",
            "updatedAt": null,
            "type": "van",
            "order": 3
        }
    }
]

```