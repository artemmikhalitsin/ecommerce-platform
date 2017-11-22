

let expect = require('chai').expect;
let request = require('request');
describe('Testing file', function() {
it('Main page content', function(done) {
    request('http://localhost:8080', function(error, response, body) {
        expect(body).to.equal('Hello World');
        done();
    });
});

it('Main page status', function(done) {
    request('http://localhost:8080', function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});

it('About page content', function(done) {
    request('http://localhost:8080/about', function(error, response, body) {
        expect(response.statusCode).to.equal(404);
        done();
    });
});
});
