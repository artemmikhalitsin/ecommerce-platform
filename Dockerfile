FROM 343docker/alpine-node
CMD cd /usr/src/app && npm init -y && npm install express --save-dev && node index.js
