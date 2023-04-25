# PSUT Archive API

This is the API for [PSUT Archive](https://github.com/Marje3PSUT/psutarchive). It's built with [Strapi 4](https://strapi.io/).

## Run Locally

- Start the API with autoReload enabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-develop)
```
npm run develop
# or
yarn develop
```

- Start the API with autoReload disabled. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-start)
```
npm run start
# or
yarn start
```

- Build the admin panel. [Learn more](https://docs.strapi.io/developer-docs/latest/developer-resources/cli/CLI.html#strapi-build)
```
npm run build
# or
yarn build
```

### Developing from Docker 🐋 (SQLite)

1. Make sure Docker is installed on your system, or get it [from here](https://docs.docker.com/get-docker/).

2. Generate random base64 strings ([from here](https://generate.plus/en/base64)) then replace 'tobemodified' in `.env.example` with these strings. Then rename it to `.env` or `cat .env.example > .env`.

3. Build the docker image
   
   ```sh
   docker build . -t psutarchive-api-dev
   ```

4. Run the docker container and pass `.env`
   
   ```sh
   docker run -p 1337:1337 --env-file .env psutarchive-api-dev:latest
   ```

## Strapi Resources

- [Resource center](https://strapi.io/resource-center) - Strapi resource center.
- [Strapi documentation](https://docs.strapi.io) - Official Strapi documentation.
- [Strapi tutorials](https://strapi.io/tutorials) - List of tutorials made by the core team and the community.
- [Awesome Strapi](https://github.com/strapi-community/awesome-strapi).

