FROM 343docker/express
WORKDIR /usr/src/project
CMD find /var/lib/mysql/mysql -exec touch -c -a {} + && service mysql start && cd /usr/src/project && npm install --no-bin-links --no-optional && npm install -g nodemon && npm install -g knex && npm run migrate && npm start
