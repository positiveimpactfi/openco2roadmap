# Open CO2 Roadmap frontend

The frontend is a NextJS application written in Typescript. TailwindCSS is used for styling, and grapql-codegen is used to automaticaly generate React Apollo hooks for fetching data from the backend.

## Getting started

1. Install the dependencies `yarn`
1. Create .env.local file and set the GraphQL backend URI (.env.example can be used as a template)

## Environment variables

Note that all envs must start with NEXT_PUBLIC if you're deploying to Vercel!

| Variable                  | Purpose                                               |
| ------------------------- | ----------------------------------------------------- |
| NEXT_PUBLIC_API_URI       | URI of the GraphQL server                             |
| NEXT_PUBLIC_SLACK_WEBHOOK | Sends a slack message every time users leave feedback |

## Available scripts

| Script | Description                                                       |
| ------ | ----------------------------------------------------------------- |
| start  | starts the server in production mode                              |
| dev    | starts the development server that constantly watches for changes |
| build  | builds an optimized version of the application                    |
| gen    | generates Apollo hooks for graphql queries and mutations          |
| lint   | runs eslint to check for linting errors                           |

## Local development

1. Clone the repository
1. cd into the `web` directory
1. Fill in the environment variables
1. Install dependencies `yarn`
1. Start the development server with `yarn dev`

## Production deployment

1. Fill in the environment variables
1. Install dependencies `yarn`
1. Build an optimized version of the app `yarn build`
1. Start the application `yarn start`
