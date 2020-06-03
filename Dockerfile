# Build stage #1
FROM node:13-alpine AS build

WORKDIR /srv

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build:production
RUN npm prune --production

# Build stage #2
FROM node:13-alpine

WORKDIR /usr/app

COPY --from=build /srv/build ./build
COPY --from=build /srv/.env.production ./
COPY --from=build /srv/node_modules ./node_modules

EXPOSE 3001
CMD ["node", "build/app.js"]