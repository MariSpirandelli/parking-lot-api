## Clean Architecture

The application follows the Uncle Bob "[Clean Architecture](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html)" principles and project structure :

## Project anatomy

```
node_modules (generated)            → NPM dependencies
__tests__                           → Source folder for unit or functional tests
src 
  └ business                      → Application business rules 
    └ factories                   → Factory layers
    └ interfaces                  → Business rules classes interfaces
  └ core                          → Application controllers
    └ interfaces                  → Application controllers interfaces
  └ domain                        → Enterprise core business layer such as domain model objects (Aggregates, Entities, Value Objects) and repository interfaces
    └ model                       → Domain model objects
        └ interfaces              → Domain model objects interfaces
    └ repositories                → Implementation of domain repository interfaces
        └ interfaces              → Repository layer interfaces        
  └ infrastructure                → Frameworks, drivers and tools such as Database, the Web Framework, etc.
    └ config                      → Application configuration files, modules and services
        └ index.ts                → Module that centralize all the environment variables of the application. There MUST NOT be any `process.env` instruction in any other application file
        └ knexfile.ts             → Module of db config
    └ express                     → Module that centralize all express services as middlewares and service setup
        └ errors                  → Error middleware abstraction of each error type
        └ middlewares             → Middlewares implementations 
        └ index.ts                → Express server entry point
    └ orm                         → Database ORMs middleware (Objection for PostgreSQL)
        └ objection               → Objection client, migrations and seeds
  └ routes                        → Routes endpoints and definitions 
       └ index.ts                 → Express routes definitions
  └ server.ts                     → Main application entry point
.env                              → environment variables config
docker-compose.yml                → docker compose file config
Dockerfile                        → docker file image config
```

### The Dependency Rule

> The overriding rule that makes this architecture work is The Dependency Rule. This rule says that source code dependencies can only point inwards. Nothing in an inner circle can know anything at all about something in an outer circle. In particular, the name of something declared in an outer circle must not be mentioned by the code in the an inner circle. That includes, functions, classes. variables, or any other named software entity.
  
src. https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html#the-dependency-rule

## Flow of Control

