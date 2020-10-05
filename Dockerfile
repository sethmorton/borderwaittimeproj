
FROM node:14

RUN apt-get update && apt-get -y install cron
# WORKDIR /app
# COPY package*.json ./app
COPY app.js /bin/app.js
COPY root /var/at/tabs
RUN chmod +x /bin/app.js
CMD crontab -e 2 -f