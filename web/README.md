# Open CO2 Roadmap frontend

The frontend is a NextJS application written in Typescript. TailwindCSS is used for styling, and grapql-codegen is used to automaticaly generate React Apollo hooks for fetching data from the backend.

## Getting started

1. Install the dependencies `yarn`
1. Create .env.local file and set the GraphQL backend URI (.env.example can be used as a template)
1. Start the dev server `yarn dev`
1. Create an optimized version of the app for production `yarn build`

## Environment variables

Note that all envs must start with NEXT_PUBLIC!

| Variable                  | Purpose                                                |
| ------------------------- | ------------------------------------------------------ |
| NEXT_PUBLIC_API_URI       | URI of the GraphQL server                              |
| NEXT_PUBLIC_SLACK_WEBHOOK | Sends a slack messages every time users leave feedback |
