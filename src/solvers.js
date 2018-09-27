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

// window.findNRooksSolution = function(n) {
  
//   var solution;
//   var board = new Board({'n': n});
//   var pieces = 0;
  
//   var helper = function(board, row, column) {
//     if (pieces === n) {
//       solution = board;
//       return;
//     }
//     board.togglePiece(row, column);
//     row += 1;
//     column += 1;
//     pieces += 1;
//     helper(board, row, column);
//   };
//   helper(board, 0, 0);
//   //debugger;
//   console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
//   return solution.rows();
// };

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other

window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  
  // let board = new Board({'n': n});
  
  // let rows = board.rows();
  // for (var i = 0; i < rows.length; i++) {
  //   let row = rows[i];
  //   for (var j = 0; j < row.length; j++) {
  //     board.toggledPiece(i, j);
  //   }
  // }
  
  
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

// window.countNRooksSolutions = function(n) {
//   var solutionCount = 0; //fixme
  
//   var findSolution = (board = new Board({'n': n}), pieces = 0) => {
    
//     if (pieces === n) {
//       solutionCount++;
//       return;
//     }
    
//     var rows = board.rows();
    
//     for (var i = 0; i < rows.length; i++) {
//       var row = rows[i];
//       for (var j = 0; j < row.length; j++) {
//         if (board.hasAnyRooksConflicts()) {
//           continue;
//         } 
//         // var toggle = i.toString() + j.toString();
//         // if (toggledPieces[toggle]) {
//         //   continue;
//         // } 
//         else {
//           board.togglePiece(i, j);
//           // toggledPieces[toggle] = [i, j];
//           pieces++;
//           //var newBoard = new Board({'n': n});
//           // for (var key in toggledPieces) {
//           //   board.togglePiece(toggledPieces[key][0], toggledPieces[key][1]);
//           //   pieces++;
//           // }
//           findSolution(board, pieces);
//           // pieces = 0;
//           // delete toggledPieces[toggle];
//         }
//       }
    
//     }
//   };
//   findSolution();

//   console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
//   return solutionCount;

// }; 

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
// window.findNQueensSolution = function(n) {
//   let board = new Board({'n': n});
//   var solution; //fixme
  
//   let helper = (board, pieces = 0, rowIndex = 0, colIndex = 0) => {
//     let rows = board.rows();
    
//     if (n === 0) {
//       solution = board;
//       return;
//     }
    
//     var start = 'start';
    
//     for (var i = rowIndex; i < rows.length; i++) {
//       let row = rows[i];
//       var startIndex = 0;
//       if (start === 'start') {
//         startIndex = colIndex;
//         start = 'started';
//       }
//       for (var j = startIndex; j < row.length; j++) {
//         console.log(startIndex);
//         board.togglePiece(i, j);
//         pieces++;
//         // console.log(board.rows(), pieces, "178");
//         if (board.hasAnyQueenConflictsOn(i, j)) {
//           //console.log(i, j);
//           board.togglePiece(i, j);
//           // console.log(board.rows(), pieces, "181");
//           pieces--;
//         }

//       }
//     }
//     if (pieces === n) {
//       solution = board; 
//       return;
//     }
    
//     if (pieces !== n) {
//       board = new Board({'n': n});
//       if (colIndex === rows.length - 1) {
//         return;      
//       } 
//       helper(board, 0, rowIndex, 0, colIndex + 1);
//     } 
//   };

//   helper(board);

//   console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
//   return solution.rows();
// };

window.findNQueensSolution = function(n) {
  let board = new Board({'n': n});
  var solution; //fixme
  var storedItems = {};
  
  let helper = (board, rowIndex = 0, piecesUsed = {}) => {
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
        // if (colIndex[j]) {
        //   continue;
        // } else {
        //   colIndex[j] = j;
        // }
        board.togglePiece(i, j);
        if (board.hasAnyQueenConflictsOn(i, j)) {
          board.togglePiece(i, j);
          continue;
        }
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
        // console.log(keyCount);
        if (keyCount === n) {
          solution = newBoard;
          return;  
        }
        var newPiecesUsed = Object.assign({}, piecesUsed);
        // var newColIndex = Object.assign({}, colIndex);
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

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
// window.countNQueensSolutions = function(n) {
//   var solutionCount = 0; //fixme
//   let board = new Board({'n': n});
//   var storedItems = {};

//   let helper = (board, rowIndex = 0, piecesUsed = {}) => {
//     let rows = board.rows();
    
//     if (n === 0) {
//       solutionCount = 1;
//       return;
//     }
    
//     if (n === 2 || n === 3) {
//       return;
//     }
    
//     for (var i = rowIndex; i < rows.length; i++) {
//       let row = rows[i];
//       for (var j = 0; j < row.length; j++) {
//         board.togglePiece(i, j);
//         if (board.hasAnyQueenConflictsOn(i, j)) {
//           board.togglePiece(i, j);
//           continue;
//         }
//         var store = board.rows().toString();
//         if (storedItems[store]) {
//           return;
//         } else {
//           storedItems[store] = store;
//         }
//         // var newBoard = new Board({'n': n});
//         var toggle = i.toString() + j.toString();
//         piecesUsed[toggle] = [i, j];
//         var keyCount = 0;
//         for (var key in piecesUsed) {
//           // newBoard.togglePiece(piecesUsed[key][0], piecesUsed[key][1]);
//           keyCount++;
//         }
//         // console.log(keyCount);
//         if (keyCount === n) {
//           solutionCount++;
//         }
//         var newPiecesUsed = Object.assign({}, piecesUsed);
//         helper(board, i + 1, newPiecesUsed);
//         delete piecesUsed[toggle];
//         board.togglePiece(i, j);
//       }
//     } 
//   };

//   helper(board);

//   console.log('Number of solutions for ' + n + ' queens:', solutionCount);
//   return solutionCount;
// };

//Above is exponential O(e^n)

window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
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
        // var newBoard = new Board({'n': n});
        var toggle = i.toString() + j.toString();
        piecesUsed[toggle] = [i, j];
        var keyCount = 0;
        for (var key in piecesUsed) {
          // newBoard.togglePiece(piecesUsed[key][0], piecesUsed[key][1]);
          keyCount++;
        }
        // console.log(keyCount);
        if (keyCount === n) {
          solutionCount++;
        }
        var newPiecesUsed = Object.assign({}, piecesUsed);
        var newColCheck = Object.assign({}, colCheck);
        helper(board, i + 1, newPiecesUsed, newColCheck);
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

// window.findUnqiueSolution = function(n, i, j, solutionCount) {
//   let board = Board({'n': n});
//   //board.togglePiece(toggleRow, toggleColumn);
//   let rows = board.rows();
//   let solution;
  
//   // for (var i = 0; i < rows.length; i++) {
//   //   let row = rows[i];
//   //   for (var j = 0; i < row.length; j++) {
//   //     if (i === toggleRow && j === toggleColumn) {
//   //       continue;
//   //     }
//   //     board.togglePiece(i, j);
//   //     if (board.hasAnyQueenConflictsAt(i, j)) {
//   //       board.togglePiece(i, j);
//   //       continue;
//   //     }
//   //   }
//   while(!solution) {
//     let row = rows[i];
//     if(row[j])
//   }
  
// }


// window.countNQueensSolutions = function(n) {
//   var solutionCount = 0;
//   let board = new Board({'n': n});
//   var storedItems = {};
  
//   var oneSolution = findUnqiueSolution(n, 1);
  
  
//   board.flipX();
  

//   console.log('Number of solutions for ' + n + ' queens:', solutionCount);
//   return solutionCount;
// };
