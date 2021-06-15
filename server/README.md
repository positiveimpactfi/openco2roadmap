# Open CO2 roadmap backend

The backend is a Node application written in Typescript. The server creates a GraphQL endpoint built usign the Apollo framework. Authorization is implemented with sessions, which sends a cookie to the client. PostgreSQL is used for the database, and Redis is used as a fast storage for key-value pairs.

Docker compose file that creates a database and redis instances is provided for ease of use.

## Getting started

1. Install the dependencies `yarn`
1. Rename .env.example to .env and fill in the missing values
1. Start the database and redis layer `docker compose up -d`
1. Start the GraqhQL server `yarn dev`
