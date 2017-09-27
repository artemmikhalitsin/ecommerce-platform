FROM 343docker/express
WORKDIR /usr/src/project
CMD apt-get update && service mysql start && cd /usr/src/project && npm install --no-bin-links && node index.js
