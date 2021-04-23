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
        let coords = req.body.coordinate.split('');
        if(coords.length>2 || coords[0].match(/[A-I]+/gi) == null || coords[1].match(/[1-9]+/g) == null){
          res.json({ error: 'Invalid coordinate' });
        }else{
          let row = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'].indexOf(coords[0].toLowerCase())+1
          let col = parseInt(coords[1]);
          let val =  parseInt(req.body.value);
          let puzzle = req.body.puzzle;
          let validate=solver.validate(puzzle);
          if(validate !== true){
            res.json(validate)
          }else{
            let safe=solver.checkSafe(puzzle, row, col, val);
            res.json(safe);
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
        if(valid!==true){
          res.json(valid);
        }else{
          let solution = solver.solve(puzzle);
          res.json(solution);
        }
      }

    });
};
