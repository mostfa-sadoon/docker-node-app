FROM node:22 as base

WORKDIR /app
COPY package.json .
COPY . .
EXPOSE  4000

FROM base as development

RUN npm install
CMD [ "npm","run" ,"start-dev" ]

FROM base as production
RUN npm install --only=production;
CMD [ "npm","run" ,"start" ]


