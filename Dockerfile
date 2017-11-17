FROM 343docker/express-quick
WORKDIR /usr/src/project
CMD find /var/lib/mysql/mysql -exec touch -c -a {} + && service mysql start && cd /usr/src/project && npm install --no-bin-links --no-optional && npm run migrate && npm run seed && npm start
