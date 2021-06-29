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

## Getting started

1. Clone the repository
1. CD into the `server` directory
1. Fill in the environment variables

### Local development

1. Make sure you're in the `server` directory
1. Duplicate the `.env.example` file and fill in the missing values
1. Start the server `docker compose -f docker-compose.dev.yml up --build`

### Deployment

Instructions for deploying on a server running Ubuntu:

1. Install docker and docker-compose
1. Install nginx and certbot
1. Modify the nginx config file to reverse-proxy the server
1. Clone the repository and run the docker compose file
1. Install LetsEncrypt SSL certificate with certbot
