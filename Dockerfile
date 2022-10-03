FROM node:16-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm config set legacy-peer-deps=true   
RUN npm install
ADD . .
ENV NODE_ENV production
RUN npm run build
RUN npm prune --production
CMD ["npm", "start"]
EXPOSE 3000