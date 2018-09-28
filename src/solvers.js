/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  let board = new Board({'n': n});
  var solution;
  let pieces = 0;
  
  let helper = (board, rowIndex = 0, colIndex = 0, alreadyFound = {}) => {
    
    let rows = board.rows();
    
    for (var i = 0; i < rows.length; i++) {
      let row = rows[i];
      for (var j = 0; j < row.length; j++) {
        board.togglePiece(i, j);
        pieces++;
        if (board.hasAnyRowConflicts() || board.hasAnyColConflicts()) {
          board.togglePiece(i, j);
          pieces--;
        }
        
        if (pieces === n) {
          break;
        }
      }
    }
    solution = board;  
  };
  
  helper(board);
  
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// Above is quadratic O(n^2)

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other

window.countNRooksSolutions = function(n) {
  var solutionCount = 0; 
  
  if (n === 0) {
    return 1;
  }
  
  var algo = (arr = [1], number = 0) => {
    if (number === n) {
      solutionCount = arr[arr.length - 1];
      return;
    }
    
    number++;
    const value = arr[arr.length - 1] * number;
    arr.push(value);  
    algo(arr, number);
  };
  algo();
  
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;

}; 

// Above is Linear. O(n);

window.findNQueensSolution = function(n) {
  let board = new Board({'n': n});
  var solution;
  var storedItems = {};
  
  let helper = (board, rowIndex = 0, piecesUsed = {}, colCheck = {}, majCheck = {}, minCheck = {}) => {
    let rows = board.rows();
    
    if (solution) {
      return;
    }
    
    if (n === 0) {
      solution = board;
      return;
    }
    
    for (var i = rowIndex; i < rows.length; i++) {
      let row = rows[i];
      for (var j = 0; j < row.length; j++) {
        var maj = board._getFirstRowColumnIndexForMajorDiagonalOn(i, j);
        var min = board._getFirstRowColumnIndexForMinorDiagonalOn(i, j);
        if (colCheck[j] || majCheck[maj] || minCheck[min]) {
          continue;
        }
        board.togglePiece(i, j);
        if (board.hasAnyQueenConflictsOn(i, j)) {
          board.togglePiece(i, j);
          continue;
        }
        colCheck[j] = j;
        majCheck[maj] = maj;
        minCheck[min] = min;
        var store = board.rows().toString();
        if (storedItems[store]) {
          return;
        } else {
          storedItems[store] = store;
        }
        var newBoard = new Board({'n': n});
        var toggle = i.toString() + j.toString();
        piecesUsed[toggle] = [i, j];
        var keyCount = 0;
        for (var key in piecesUsed) {
          newBoard.togglePiece(piecesUsed[key][0], piecesUsed[key][1]);
          keyCount++;
        }
        if (keyCount === n) {
          solution = newBoard;
          return;  
        }
        var newPiecesUsed = Object.assign({}, piecesUsed);
        helper(board, i + 1, newPiecesUsed);
        delete piecesUsed[toggle];
        board.togglePiece(i, j);
      }
    } 
  };

  helper(board);

  if (solution === undefined) {
    solution = new Board({'n': n});
    return solution.rows();  
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};

// Above is exponential O(e^n)


//Below is exponential O(e^n)

window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  let board = new Board({'n': n});
  var storedItems = {};

  let helper = (board, rowIndex = 0, piecesUsed = {}, colCheck = {}, majCheck = {}, minCheck = {}) => {
    let rows = board.rows();
    
    if (n === 0) {
      solutionCount = 1;
      return;
    }
    
    if (n === 2 || n === 3) {
      return;
    }   
    
    for (var i = rowIndex; i < rows.length; i++) {
      let row = rows[i];
      var colCount = 0;
      for (var j = 0; j < row.length; j++) {
        var maj = board._getFirstRowColumnIndexForMajorDiagonalOn(i, j);
        var min = board._getFirstRowColumnIndexForMinorDiagonalOn(i, j);
        if (colCheck[j] || majCheck[maj] || minCheck[min]) {
          continue;
        }
        board.togglePiece(i, j);
        if (board.hasAnyQueenConflictsAt(i, j)) {
          board.togglePiece(i, j);
          if (j === row.length - 1) {
            if (colCount === 0) {
              return;
            }
          }
          continue;
        }
        colCheck[j] = j;
        majCheck[maj] = maj;
        minCheck[min] = min;
        colCount++;
        var store = board.rows().toString();
        if (storedItems[store]) {
          return;
        } else {
          storedItems[store] = store;
        }
        var toggle = i.toString() + j.toString();
        piecesUsed[toggle] = [i, j];
        var keyCount = 0;
        for (var key in piecesUsed) {
          keyCount++;
        }
        if (keyCount === n) {
          solutionCount++;
        }
        var newPiecesUsed = Object.assign({}, piecesUsed);
        helper(board, i + 1, newPiecesUsed);
        delete piecesUsed[toggle];
        delete colCheck[j];
        board.togglePiece(i, j);
      }
    } 
  };

  helper(board);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
