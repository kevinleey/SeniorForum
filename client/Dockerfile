FROM node:20.11.0
WORKDIR .
COPY ./package*.json ./
RUN npm install
RUN npm install react-bootstrap bootstrap
COPY . .
EXPOSE 3000
CMD ["npm","start"]