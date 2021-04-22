class SudokuSolver {

  valueOccurances(string){
    let arr = string.match(/[0-9]/g);
    let result = true;
    for(let i=arr.length; i>=0; i--){
      let val=arr.pop();
      if(val!="." && arr.indexOf(val)!=-1){
        result = false;
        break;
      }
    }
    return result;
  }

  validate(puzzle) {
    if(puzzle.match(/([^0-9\.]+)/g)!=null){
      return { error: 'Invalid characters in puzzle' };
    }else if(puzzle.length != 81){
      return { error: 'Expected puzzle to be 81 characters long' };
    }else{
      let solveable=true;
      for(let i=0; i<9; i++){
        var start=i*9;
        var end=(i+1)*9;
        if(this.valueOccurances(puzzle.slice(start, end))==false){
          solveable=false;
          break;
        }
      }
      if(solveable==false){
        console.log("fail")
        return { error: 'Puzzle cannot be solved' };
      }else{
        console.log("pass")
        return true;
      }
    }
  }

  checkRowPlacement(puzzle, row, column, value) {

  }

  checkColPlacement(puzzle, row, column, value) {

  }

  checkRegionPlacement(puzzle, row, column, value) {

  }

  solve(puzzle) {
    
  }
}

module.exports = SudokuSolver;

