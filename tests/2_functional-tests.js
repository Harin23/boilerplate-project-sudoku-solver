const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);
let puzzlesAndSolutions = require('../controllers/puzzle-strings.js').puzzlesAndSolutions;

suite('Functional Tests', () => {

  suite('solve', () => {

    test("Solve a puzzle with valid puzzle string", function (done) {
      chai
        .request(server)
        .post('/api/solve')
        .send({puzzle: puzzlesAndSolutions[0][0]})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, {solution: puzzlesAndSolutions[0][1]});
          done();
        });
    });

    test("Required field missing", function (done) {
      chai
        .request(server)
        .post('/api/solve')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'Required field missing' });
          done();
        });
    });

    test("Invalid characters in puzzle", function (done) {
      chai
        .request(server)
        .post('/api/solve')
        .send({puzzle: puzzlesAndSolutions[5][0]})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'Invalid characters in puzzle' });
          done();
        });
    });

    test("Expected puzzle to be 81 characters long", function (done) {
      chai
        .request(server)
        .post('/api/solve')
        .send({puzzle: puzzlesAndSolutions[6][0]})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'Expected puzzle to be 81 characters long' });
          done();
        });
    });

    test("Puzzle cannot be solved", function (done) {
      chai
        .request(server)
        .post('/api/solve')
        .send({puzzle: puzzlesAndSolutions[7][0]})
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'Puzzle cannot be solved' });
          done();
        });
    });
  
  });

  suite('check', () => {
    
    test("Check a puzzle placement with all fields", function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle: puzzlesAndSolutions[8][0],
          coordinate:'A1',
          value:'7',
          })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, {valid: true});
          done();
        });
    });

    test("single placement conflict", function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle: puzzlesAndSolutions[8][0],
          coordinate:'A1',
          value:'6',
          })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, {valid: false, conflict: ['column']});
          done();
        });
    });

    test("multiple placement conflicts", function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle: puzzlesAndSolutions[8][0],
          coordinate:'a1',
          value:'1',
          })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, {valid: false, conflict: ['row', 'column']});
          done();
        });
    });

    test("all placement conflicts", function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle: puzzlesAndSolutions[8][0],
         coordinate:'a1',
          value:'5',
          })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, {valid: false, conflict: ['row', 'column', 'region']});
          done();
        });
    });

    test("missing required fields", function (done) {
      chai
        .request(server)
        .post('/api/check')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'Required field(s) missing' });
          done();
        });
    });

    test(" invalid characters", function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle: puzzlesAndSolutions[5][0],
          coordinate:'a1',
          value:'1',
          })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'Invalid characters in puzzle' });
          done();
        });
    });

    test(" incorrect length", function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle: puzzlesAndSolutions[6][0],
          coordinate:'a1',
          value:'1',
          })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'Expected puzzle to be 81 characters long' });
          done();
        });
    });

    test(" invalid placement coordinate", function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle: puzzlesAndSolutions[8][0],
          coordinate:'f12',
          value:'1',
          })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'Invalid coordinate' });
          done();
        });
    });

    test("invalid placement value", function (done) {
      chai
        .request(server)
        .post('/api/check')
        .send({
          puzzle: puzzlesAndSolutions[8][0],
          coordinate:'a1',
          value:'0',
          })
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.deepEqual(res.body, { error: 'Invalid value' });
          done();
        });
    });

  });

});

