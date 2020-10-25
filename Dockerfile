FROM node:current-slim

COPY app.js /bin/app.js
COPY root /var/spool/cron/crontabs/root
RUN chmod +x /bin/app.js
CMD crond -l 2 -f