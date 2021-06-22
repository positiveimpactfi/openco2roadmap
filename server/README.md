# Open CO2 roadmap backend

The backend is a Node application written in Typescript. The server creates a GraphQL endpoint built usign the Apollo framework. Authorization is implemented with sessions, which sends a cookie to the client. PostgreSQL is used for the database, and Redis is used as a fast storage for key-value pairs.

Docker compose file that creates a database and redis instances, as well as runs the server code.

## Requirements

- Docker and docker compose

## Local development

1. Make sure you're in the `server` directory
1. Duplicate the `.env.example` file and fill in the missing values
1. Start the server `docker compose -f docker-compose.dev.yml up --build`

## Deployment

Instructions for deploying on a server running Ubuntu:

1. Install docker and docker-compose
1. Install nginx and certbot
1. Modify the nginx config file to reverse-proxy the server
1. Clone the repository and run the docker compose file
1. Install LetsEncrypt SSL certificate with certbot
