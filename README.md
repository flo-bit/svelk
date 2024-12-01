# svelk - custom bsky client

this client aims to be more an exploration of what a social media client could be like and what features could be useful than a polished clone of the bluesky client.

based on [myb](https://github.com/zeucapua/myb)

work in progress

deployed at https://svelk.vercel.app

## run locally

1. clone repo
2. `npm install`
3. rename `.env.example` to `.env` and set the variables
  - `DATABASE_URL="file:local.db"`
  - `DATABASE_AUTH_TOKEN="abc"`
  
  - `MYB_PASSWORD` = create a password with `openssl rand -base64 32` 
4. `npm run db:migrate`
5. `npm run dev`
6. open browser and navigate to `http://localhost:5173`


## Tech Stack
- Svelte(Kit): JS UI and meta framework
- Drizzle: Database ORM
- Turso: SQLite hosted service
- Bits-UI: Svelte component library
- `@atproto/api` and `@atproto/oauth-client-node`: AT protocol SDK and OAuth libraries