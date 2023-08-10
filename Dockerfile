FROM node:18-alpine AS builder

ARG NODE_ENV=production

WORKDIR /misskey

COPY . ./

RUN apk add --no-cache ca-certificates git alpine-sdk g++ build-base cmake clang libressl-dev
RUN git submodule update --init
RUN yarn install
RUN yarn build
RUN rm -rf .git

FROM node:18-alpine AS runner

ARG UID="991"
ARG GID="991"

RUN apk add --no-cache ca-certificates tini curl
	&& groupadd -g "${GID}" misskey \
	&& useradd -u "${UID}" -G misskey -D -h /misskey misskey \
	&& find / -type d -path /proc -prune -o -type f -perm /u+s -ignore_readdir_race -exec chmod u-s {} \; \
	&& find / -type d -path /proc -prune -o -type f -perm /g+s -ignore_readdir_race -exec chmod g-s {} \;

USER misskey
WORKDIR /misskey

COPY --chown=misskey:misskey --from=builder /misskey/node_modules ./node_modules
COPY --chown=misskey:misskey --from=builder /misskey/built ./built
COPY --chown=misskey:misskey --from=builder /misskey/packages/backend/node_modules ./packages/backend/node_modules
COPY --chown=misskey:misskey --from=builder /misskey/packages/backend/built ./packages/backend/built
COPY --chown=misskey:misskey --from=builder /misskey/packages/client/node_modules ./packages/client/node_modules
COPY --chown=misskey:misskey . ./

ENV NODE_ENV=production
ENTRYPOINT ["/usr/bin/tini", "--"]
CMD ["npm", "run", "migrateandstart"]
