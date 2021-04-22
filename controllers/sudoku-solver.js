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
        return { error: 'Puzzle cannot be solved' };
      }else{
        return true;
      }
    }
  }

  checkRowPlacement(puzzle, row, value) {
    value = value.toString();
    let start = (row-1)*9;
    let rowArr = puzzle.slice(start, start+9).split('');
    if(rowArr.indexOf(value)==-1){
      return {valid: true};
    }else{
      return {valid : false, conflict: "row"};
    }
  }

  checkColPlacement(puzzle, column, value) {
    value = value.toString();
    var col = [];
    for(let i=column-1; i<=72+column; i=i+9){
      col.push(puzzle[i]);
    }
    if(col.indexOf(value)==-1){
      return {valid: true};
    }else{
      return {valid : false, conflict: "column"};
    }
  }

  groupFinder(n){
    if(n<=3){
      return [0, 2];
    }else if(n<=6){
      return [3,5];
    }else{
      return [6,8];
    }
  }

  checkRegionPlacement(puzzle, row, column, value) {
    value = value.toString();
    let rowGroup = this.groupFinder(row);
    let colGroup = this.groupFinder(column);
    let region = [];
    for(var i=rowGroup[0]; i<=rowGroup[1]; i++){
      let rowIndex = i*9;
      for(var j=colGroup[0]; j<=colGroup[1]; j++){
        region.push(puzzle[rowIndex+j]);
      }
    }
    if(region.indexOf(value)==-1){
      return {valid: true};
    }else{
      return {valid : false, conflict: "region"};
    }
  }

  solve(puzzle) {
  }
  
}

module.exports = SudokuSolver;

