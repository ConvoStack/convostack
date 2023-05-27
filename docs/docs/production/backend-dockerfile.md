# ConvoStack Backend Dockerfile

Please find an reference Dockerfile that works with the ConvoStack backend below. It is also compatible with Fly.io. 

Please note that you must set your env vars outside the Docker image.

### Reference `.dockerignore`

The Dockerfile is important, but it's almost equally as important to exclude certain files from your Docker image:

```dockerignore
# If you use SQLite for development, ensure that you're ignoring the *.db* files
sqlite-storage/*.db*
# If you are using dotenv in development for managing env vars, be sure to exclude these!
# They have no place in a Docker image and are a great way to accidentally leak secrets.
*.env
# Ignore the backend dist files. We want Docker to rebuild these during the image creation process.
dist/
```

### Reference `Dockerfile`

```dockerfile
# syntax = docker/dockerfile:1

# Adjust NODE_VERSION as desired
ARG NODE_VERSION=18.12.1
FROM node:${NODE_VERSION}-slim as base

LABEL fly_launch_runtime="Node.js"

# Node.js app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV=production


# Throw-away build stage to reduce size of final image
FROM base as build

# Install packages needed to build node modules
RUN apt-get update -qq && \
    apt-get install -y python-is-python3 pkg-config build-essential

# Install node modules
COPY --link package.json ./
RUN npm install --include=dev

# Copy application code
COPY --link . .

# Build application
RUN npm run build

# Remove development dependencies
RUN npm prune --omit=dev


# Final stage for app image
FROM base

# Copy built application
COPY --from=build /app /app

# Start the server by default, this can be overwritten at runtime
EXPOSE 3000
CMD [ "npm", "run", "start" ]

```