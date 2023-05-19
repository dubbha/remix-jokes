# Remix Jokes App Tutorial

- [Tutorial](https://remix.run/docs/en/main/tutorials/jokes)
- [Walkthrough with Kent 🚀](https://www.youtube.com/watch?v=hsIWJpuxNj0)
- [remix-jokes.lol](https://remix-jokes.lol/)

## More Examples
Throwing more stuff at the `/more` route: [dubbha-remix-jokes.fly.dev/more](https://dubbha-remix-jokes.fly.dev/more)

## Deployment
Deployed to [dubbha-remix-jokes.fly.dev](https://dubbha-remix-jokes.fly.dev/). Depending on the security configuration of your local machine the Deployment part of the tutorial might not go exactly as described, e.g. due to the `api.machines.dev` host access being blocked by `Infoblox BloxOne`, as in my case. I was able use the nice [Fly's Web CLI](https://fly.io/terminal) instead to deploy from github directly. If you've tried deploying locally and failed, first rollback all the local leftovers, or just don't push them to the repo. You might need to run the following commands:
```
fly launch --region waw --name dubbha-remix-jokes

fly secrets set SESSION_SECRET=your-secret-here
fly secrets set DATABASE_URL="file:./dev.db"
fly secrets set PUBLIC_KEY="I'm available to client-side"

DATABASE_URL="file:./dev.db" npx prisma db push
DATABASE_URL="file:./dev.db" npx prisma db seed

fly deploy
```

If we want a single machine to run constantly, using a permanent volume mount:
```sh
# fly.toml file

app = "dubbha-remix-jokes"
primary_region = "waw"

[http_service]
  internal_port = 3000
  force_https = true
  auto_stop_machines = true
  auto_start_machines = true
  min_machines_running = 1

[mounts]
  source="remix_jokes_data"
  destination="/data"
```

Comment this out from `.dockerignore`, if you want DB redeployed:
```sh
# .dockerignore file

...

#prisma/db.dev
```
