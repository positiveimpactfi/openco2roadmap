# Open CO2 roadmap backend

The backend is a Node application written in Typescript. The server creates a GraphQL endpoint built usign the Apollo framework. Authorization is implemented with sessions, which sends a cookie to the client. PostgreSQL is used for the database, and Redis is used as a fast storage for key-value pairs. Emails are sent with SendGrid, which requires an account in order to function.

Docker compose file that creates a PostgreSQL database and a Redis instance, as well as runs the server code, is used.

## Requirements

- Docker and docker compose
- SendGrid account with verified sender identity

## Environment variables

| Variable         | Purpose                                         |
| ---------------- | ----------------------------------------------- |
| PORT             | Port on which the server runs, defaults to 4000 |
| PG_HOST          | PostgreSQL host, defaults to "db"               |
| PG_PORT          | PostgreSQL port, defaults to 5432               |
| PG_USERNAME      | PostgreSQL database username                    |
| PG_DB            | PostgreSQL database name                        |
| PG_PW            | PostgreSQL database password                    |
| REDIS_PW         | Redis instance password                         |
| REDIS_HOST       | Redis host, defaults to "redis"                 |
| REDIS_PORT       | Redis port, defaults to 6379                    |
| SESSION_SECRET   | Session secret                                  |
| COOKIE_NAME      | Name for the auth cookie sent to client         |
| CORS_ORIGIN      | CORS origin                                     |
| SENDGRID_API_KEY | SendGrid API key                                |
| SENDGRID_EMAIL   | SendGrid sender email                           |
| SUPERADMIN_EMAIL | Email for the initial SuperAdmin user           |
| SUPERADMIN_PW    | Password for the initial SuperAdmin user        |

## Available scripts

| Script           | Description                                                       |
| ---------------- | ----------------------------------------------------------------- |
| start            | starts the server                                                 |
| dev              | starts the development server that constantly watches for changes |
| build            | builds javascript from the typescript source                      |
| migration:run    | runs all typeorm migrations                                       |
| migration:revert | reverts the latest applied migration                              |
| db:seed          | seeds the database with initial data                              |
| db:drop          | drops the entire database                                         |
| db:reset         | resets the database to the initial state = drop then seed         |

## Getting started

1. Clone the repository
1. cd into the `server` directory
1. Duplicate the `.env.example` file, rename it to `.env` and fill in the missing values
1. Fill in the environment variables

### Local development

1. Make sure you're in the same directory as the `docker-compose-dev.yml` file.
1. Start the server `docker compose -f docker-compose.dev.yml --env-file server/.env up --build`
1. Run the migrations `docker exec -it openco2roadmap-backend yarn migration:run`
1. Databases are not populated on first launch, so run `docker exec -it openco2roadmap-backend yarn db:seed` to seed SuperAdmin user, emission categories and components, business fields, physical quantities and measurement units.'

### Production deployment

1. Clone the repository
1. Set up the environment variables
1. While in the same directory as the `docker-compose.yml` file, run `docker compose -f docker-compose.yml --env-file server/.env up -d --build` to start the server
1. Run the migrations `docker exec -it openco2roadmap-backend yarn migration:run`
1. Seed the initial database if you haven't `docker exec -it openco2roadmap-backend yarn db:seed`

If you're deploying to the internet, you also need to install SSL certificates (for example using Certbot) and if you're behind a reverse proxy like nginx, you need to configure that as well.

### Database backup

You can dump the database from its docker container: `docker exec -t openco2roadmap_db_1 pg_dump --dbname=postgresql://${PG_USERNAME}:${PG_PW}@${PG_HOST}:${PG_PORT}/${PG_DB} > db_dump.sql`. Substitute the variables in the postgres connection string with the values from your environment variables and run the command. Check the dump file to see that the operation succeeded `cat db_dump.sql`.

### Restore from database dump

You can restore a previously dumped database: `cat dump.sql | docker exec -i openco2roadmap-db-1 psql --dbname=postgresql://${PG_USERNAME}:${PG_PW}@${PG_HOST}:${PG_PORT}/${PG_DB}`. Substitute the variables in the postgres connection string with the values from your environment variables and run the command.
