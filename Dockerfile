
FROM node:14

RUN apt-get update && apt-get -y install cron
# WORKDIR /app
# COPY package*.json ./app
COPY app.js /bin/app.js
COPY root /var/spool/cron/crontabs/root
RUN chmod +x /bin/app.js
CMD crond -l 2 -f