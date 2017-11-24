'use strict';
const mockKnex = require('mock-knex');
let rootDir = require('app-root-dir').get();
const chai = require('chai');
const tracker = mockKnex.getTracker();
const expect = chai.expect;
const userService = require(rootDir +'/DataSource/TableDataGateway/DesktopsTDG.js');


describe('Test DAO library with mock-knex', () => {
    tracker.install();

    describe('When calling userService.findAll', () => {
        before(() => {
            tracker.on('query', (query) => {
                const results = [
                  {
                      'model_number': '913871307-1',
                      'comp_id': 1,
                      'dimension_id': 1},
                ];
                query.response(results);
            });
        });

        it('should return 3 users', () => {
          const newdesktop = new userService();
            newdesktop.add(1, 3, {
                'model_number': '913871307-1',
                'comp_id': 1,
                'dimension_id': 1});
            let test = newdesktop.getAll();

            return test
                .then((res) => {
                    const users = res.toJSON();

                    expect(users).to.have.property('length', 3);
                    expect(users[0]).to.have.property('esp', false);
                    expect(users[1]).to.have.property('firstName', 'B');
                    expect(users[2]).to.have.property('lastName', 'C');
                });
        });
    });
  });
