FROM 343docker/express
WORKDIR /usr/src/project
CMD apt-get update && service mysql start && cd /usr/src/project && npm install && node index.js
