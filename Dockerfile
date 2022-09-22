FROM alpine
RUN apk add --update nodejs npm
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 3000
ENV MONGO_IP=0.0.0.0
ENV MONGO_PORT=27017
ENV MONGO_COLLECTION=TestDatabase
CMD ["npm", "start"] 