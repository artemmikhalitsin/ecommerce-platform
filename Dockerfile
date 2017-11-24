FROM 343docker/expresspg
WORKDIR /usr/src/project
CMD /etc/init.d/postgresql start && cd /usr/src/project && npm install --no-bin-links --no-optional && npm install -g nodemon && npm install -g rimraf && npm install -g babel-cli && npm install -g knex && npm run migrate && npm run seed && npm start
