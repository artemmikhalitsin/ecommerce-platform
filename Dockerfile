FROM 343docker/express
WORKDIR /usr/src/project
CMD apt-get update && find /var/lib/mysql/mysql -exec touch -c -a {} + && service mysql start && cd /usr/src/project && npm install --no-bin-links && npm run migrate && node index.js
