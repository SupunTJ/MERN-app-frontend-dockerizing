FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]

# build command
# docker build -t react-app:dev .

#run command
#  docker run -p 3001:3000 react-app:dev

