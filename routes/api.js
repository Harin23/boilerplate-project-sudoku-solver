'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      if(!req.body.puzzle || !req.body.coordinate || !req.body.value){
        res.json({ error: 'Required field(s) missing' });
      }else if(req.body.value.match(/[1-9]+/g) == null){
        res.json({ error: 'Invalid value' });
      }else{
        let puzzle = req.body.puzzle;
        let valid=solver.validate(puzzle);
        if(valid!=true){
          res.json(valid);
        }else{
          let coords = req.body.coordinate.split('');
          if(coords.length>2 || coords[0].match(/[A-I]+/gi) == null || coords[1].match(/[1-9]+/g) == null){
            res.json({ error: 'Invalid coordinate' });
          }else{
            let value = req.body.value;
            let column = parseInt(coords[1]);
            let row = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'].indexOf(coords[0].toLowerCase())
            let rowCheck = solver.checkRowPlacement(puzzle, row, value);
            if(rowCheck.valid==false){
              res.json(rowCheck);
            }else{
              let colCheck = solver.checkColPlacement(puzzle, column, value);
              if(colCheck.valid==false){
                res.json(colCheck);
              }else{
                let regionCheck = solver.checkRegionPlacement(puzzle, row, column, value);
                res.json(regionCheck);
              }
            }
          }
        }
      }
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
