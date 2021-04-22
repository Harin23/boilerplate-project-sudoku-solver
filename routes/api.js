'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      if(!req.body.puzzle){
        res.json({ error: 'Required field missing' })
      }else{
        let puzzle = req.body.puzzle;
        let valid=solver.validate(puzzle);
        if(valid!=true){
          res.json(valid);
        }else{
          res.json({solved: "true"})
        }
      }

    });
};
