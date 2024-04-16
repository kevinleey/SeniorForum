FROM node:20.11.0
WORKDIR ./server
COPY ./package*.json ./
RUN npm install
RUN npm install react-bootstrap bootstrap
COPY .. .
EXPOSE 3001
CMD ["npm","start"]
