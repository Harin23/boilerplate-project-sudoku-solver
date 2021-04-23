class SudokuSolver {

  validate(puzzle) {
    if(puzzle.match(/([^1-9\.]+)/g)!=null){
      return { error: 'Invalid characters in puzzle' };
    }else if(puzzle.length != 81){
      return { error: 'Expected puzzle to be 81 characters long' };
    }else{
      let mat = this.stringToMatrix(puzzle);
      let result=true, test=true;
      for(let row=0; row<9; row++){
        for(let col=0; col<9; col++){
          let val = mat[row][col];
          if(val!=null){
            test=this.checkPlacement(mat, row, col, val);
            if(test==false){
              result = { error: 'Puzzle cannot be solved' };
              break;
            }
          }
        }
        if(test==false){
          break;
        };
      }
      return result;
    }
  }

  checkRowPlacement(puzzle, row, column, value) {
    var rowArr = [...puzzle[row-1]];
    rowArr[column-1]=null;
    if(rowArr.indexOf(value)==-1){
      return true;
    }else{
      return false;
    }
  }

  checkColPlacement(puzzle, row, column, value) {
    var col=puzzle.map(selectedRow=>{
      return selectedRow[column-1];
    });
    col[row-1]=null;
    if(col.indexOf(value)==-1){
      return true;
    }else{
      return false;
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
    let rowGroup = this.groupFinder(row);
    let colGroup = this.groupFinder(column);
    let region = [];
    for(var i=rowGroup[0]; i<=rowGroup[1]; i++){
      for(var j=colGroup[0]; j<=colGroup[1]; j++){
        if(i==row-1 && j==column-1){
          region.push(null);
        }else{
          region.push(puzzle[i][j]);
        }
      }
    }
    if(region.indexOf(value)==-1){
      return true;
    }else{
      return false;
    }
  }

  solve(puzzle){
   let matrix = this.stringToMatrix(puzzle);
   if(this.fill(matrix)==true){
     return {solution: matrix.flat().join('')};
   }else{
     return { error: 'Puzzle cannot be solved' }
   }
  }

  stringToMatrix(puzzle){
    var matrix = [
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null, null]
    ];
    for(var i=0; i<81; i++){
      if(puzzle[i]!="."){
        matrix[Math.floor(i/9)][Math.floor(i%9)]=parseInt(puzzle[i]);
      }
    }
    return matrix;
  }

  fill(matrix){
    let coords = this.increasingSearch(matrix);
    var row=coords[0], col=coords[1];
    if(coords[0]===false){
      //base case:
      return true;
    }else{
      for(let guess=1; guess<10; guess++){
        if(this.checkPlacement(matrix, row, col, guess)){
          matrix[coords[0]][coords[1]]=guess;
          //call recursively
          if(this.fill(matrix)){
            return true;
          }
        }
        //backtrack
        matrix[coords[0]][coords[1]]=null;
      }
    }
  }

  increasingSearch(matrix){
    for(let row=0; row<9; row++){
      for(let col=0; col<9; col++){
        if(matrix[row][col]==null){
          return [row, col]
        }
      }
    }
    return [false, false]
  }

  checkPlacement(soduku, row, col, val){
    row+=1;
    col+=1;
    if(this.checkRowPlacement(soduku, row, col, val)==false || this.checkColPlacement(soduku, row, col, val)==false || this.checkRegionPlacement(soduku, row, col, val)==false){
      return false;
    }else{
      return true;
    }
  }

  checkSafe(puzzle, row, col, val){
    let mat = this.stringToMatrix(puzzle);
    let conflicts = [];
    let rowCheck=this.checkRowPlacement(mat, row, col, val);
    let colCheck=this.checkColPlacement(mat, row, col, val);
    let regCheck=this.checkRegionPlacement(mat, row, col, val);
    if(rowCheck==false){
      conflicts.push('row');
    }
    if(colCheck==false){
      conflicts.push('col');
    }
    if(regCheck==false){
      conflicts.push('region');
    }
    if(rowCheck==false || colCheck==false || regCheck==false){
      return {valid: false, conflict: conflicts};
    }else{
      return {valid: true};
    }
  }


}

module.exports = SudokuSolver;