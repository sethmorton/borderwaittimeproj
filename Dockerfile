
FROM node:14
WORKDIR /app
COPY app.js .
EXPOSE 8080
CMD [ "node", "app.js" ]

