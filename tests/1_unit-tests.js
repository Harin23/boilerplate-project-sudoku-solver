const chai = require('chai');
const assert = chai.assert;

const SudokuSolver = require('../controllers/sudoku-solver.js');
let solver = new SudokuSolver();

let puzzlesAndSolutions = require('../controllers/puzzle-strings.js').puzzlesAndSolutions;

suite('UnitTests', () => {
 let testValue = solver.stringToMatrix('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..');

  suite('Valid', () => {
    test('Logic handles a valid puzzle string of 81 characters', ()=>{
      assert.isTrue(solver.validate('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'));
    });
    test('Logic handles a invalid puzzle string of not 81 characters', ()=>{
      let testValue1='..9..5.1.85.4.2432....1...69.83.9...6.62.71...9......1945....4.37.4.3..6..'
      let result = solver.validate(testValue1);
      assert.deepEqual(result, { error: 'Expected puzzle to be 81 characters long' });
    });
    test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', ()=>{
  let testValue2='..9..5.1.85.4.b..2432...a..1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
      assert.deepEqual(solver.validate(testValue2), { error: 'Invalid characters in puzzle' });
    });
    test('Valid puzzle strings pass the solver', ()=>{
      assert.isTrue(solver.validate('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'));
    });
    test('Invalid puzzle strings fail the solver', ()=>{
  let testValue3='.99..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
      assert.deepEqual(solver.validate(testValue3), { error: 'Puzzle cannot be solved' });
    });
  });

  suite('placement', ()=>{
    test('Logic handles a valid row placement', ()=>{
  
      assert.isTrue(solver.checkRowPlacement(testValue, 1, 1, 7));
    });
    test('Logic handles a valid column placement', ()=>{
  
      assert.isTrue(solver.checkColPlacement(testValue, 1, 1, 7));
    });
    test('Logic handles an invalid row placement', ()=>{
  
      assert.isFalse(solver.checkRowPlacement(testValue, 1, 1, 1));
    });
    test('Logic handles an invalid column placement', ()=>{
  
      assert.isFalse(solver.checkColPlacement(testValue, 1, 1, 1));
    });
    test('check Safe', ()=>{
      let testSafe='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
      let result = solver.checkSafe(testSafe, 1, 1, 1);
      assert.isFalse(result.valid);
      assert.isArray(result.conflict)
      assert.equal(result.conflict[0], 'row')
       assert.equal(result.conflict[1], 'column')
    });
    test('Logic handles a valid region (3x3 grid) placement', ()=>{
  
      assert.isTrue(solver.checkRegionPlacement(testValue, 1, 1, 1));
    });
    test('Logic handles an invalid region (3x3 grid) placement', ()=>{
  
      assert.isFalse(solver.checkRegionPlacement(testValue, 1, 1, 3));
    });
  })

  suite('solve', ()=>{
    test('Solve returns the the expected solution', ()=>{
      assert.deepEqual(solver.solve(puzzlesAndSolutions[0][0]), {solution: puzzlesAndSolutions[0][1]});
    })
    test('Solve returns the the expected solution', ()=>{
      assert.hasAllKeys(solver.solve(testValue), ['solution']);
    })
  })

});