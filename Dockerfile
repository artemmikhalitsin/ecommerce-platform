FROM 343docker/alpine-node-blanked
CMD cd /usr/src/app && npm install && node index.js
