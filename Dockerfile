FROM 343docker/express
WORKDIR /usr/src/project
CMD find /var/lib/mysql/mysql -exec touch -c -a {} + && service mysql start && cd /usr/src/project && npm install --no-bin-links && npm install -g knex && npm run migrate && node index.js
