const chai = require('chai');
const assert = chai.assert;

const SudokuSolver = require('../controllers/sudoku-solver.js');
let solver = new SudokuSolver();

let puzzlesAndSolutions = require('../controllers/puzzle-strings.js').puzzlesAndSolutions;
suite('UnitTests', () => {

  // suite('Valid', () => {
  //   test('Logic handles a valid puzzle string of 81 characters', ()=>{
  //     let test ='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
  //     assert.isTrue(solver.validate(test).valid);
  //   });
  //   test('Logic handles a invalid puzzle string of not 81 characters', ()=>{
  //     let test='..9..5.1.85.4.2432....1...69.83.9...6.62.71...9......1945....4.37.4.3..6..'
  //     let result = solver.validate(test);
  //     assert.deepEqual(result, { error: 'Expected puzzle to be 81 characters long' });
  //   });
  //   test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', ()=>{
  //     let test ='..9..5.1.85.4.b..2432...a..1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
  //     assert.deepEqual(solver.validate(test), { error: 'Invalid characters in puzzle' });
  //   });
  //   test('Valid puzzle strings pass the solver', ()=>{
  //     let test ='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
  //     assert.isTrue(solver.validate(test).valid);
  //   });
  //   test('Invalid puzzle strings fail the solver', ()=>{
  //     let test ='.99..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
  //     assert.deepEqual(solver.validate(test), { error: 'Puzzle cannot be solved' });
  //   });
  // });

  suite('placement', ()=>{
    // test('Logic handles a valid row placement', ()=>{
    //   let test ='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    //   assert.deepEqual(solver.checkRowPlacement(test, 1, 1, 7), {valid: true});
    // });
    // test('Logic handles a valid column placement', ()=>{
    //   let test ='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    //   assert.deepEqual(solver.checkColPlacement(test, 1, 1, 7), {valid: true});
    // });
    // test('Logic handles an invalid row placement', ()=>{
    //   let test ='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    //   assert.deepEqual(solver.checkRowPlacement(test, 1, 1, 1), {valid : false, conflict: "row"});
    // });
    // test('Logic handles an invalid column placement', ()=>{
    //   let test ='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    //   assert.deepEqual(solver.checkColPlacement(test, 1, 1, 1), {valid : false, conflict: "column"});
    // });
    // test('Logic handles an invalid column placement', ()=>{
    //   let test ='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    //   let result = solver.checkSafe(test, 1, 1, 1);
    //   assert.isFalse(result.valid);
    //   assert.isArray(result.conflict)
    //   assert.equal(result.conflict[0], 'row')
    //    assert.equal(result.conflict[1], 'col')
    // });
    // test('Logic handles a valid region (3x3 grid) placement', ()=>{
    //   let test ='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    //   assert.deepEqual(solver.checkRegionPlacement(test, 1, 1, 1), {valid: true});
    // });
    // test('Logic handles an invalid region (3x3 grid) placement', ()=>{
    //   let test ='..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    //   assert.deepEqual(solver.checkRegionPlacement(test, 1, 1, 3), {valid : false, conflict: "region"});
    // });
  })

  suite('solve', ()=>{
    test('Solve returns the the expected solution', ()=>{
      assert.deepEqual(solver.solve(puzzlesAndSolutions[0][0]), {solution: puzzlesAndSolutions[0][1]});
    })
    test('Solve returns the the expected solution', ()=>{
      assert.hasAllKeys(solver.solve('..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'), ['solution']);
    })
  })

});