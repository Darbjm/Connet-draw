
function init() {
  //  DOM Variables
  const grid = document.querySelector('.grid')
  const circles = [] //Belongs here as you fill the array with DOM references eventhough genallly it should be in the game variables
  // Game Variables
  const width = 7 //if you want grid bigger, change this then change styling in css accordingly
  const height = 6
  const P1Cls = 'yellow' // Player 1 colour
  const P2Cls = 'red' // Player 2 colour
  let player1Go = true
  let player2Go = false

  //loop empty array (HOW TO MAKE A SIMPLE GRID)
  Array(width * height).join('.').split('.').forEach((num, i) => {
    const circle = document.createElement('div')
    circle.classList.add('grid-item')
    circle.setAttribute('data-id', i)
    circles.push(circle)
    grid.appendChild(circle)
  })
  //columns
  const col0 = circles.filter((e, i) => i % 7 === 0) //make into object for refactoring
  const col1 = circles.filter((e, i) => i % 7 === 1)
  const col2 = circles.filter((e, i) => i % 7 === 2)
  const col3 = circles.filter((e, i) => i % 7 === 3)
  const col4 = circles.filter((e, i) => i % 7 === 4)
  const col5 = circles.filter((e, i) => i % 7 === 5)
  const col6 = circles.filter((e, i) => i % 7 === 6)

  function changePlayer(){ // Change Player
    player1Go = !player1Go
    player2Go = !player2Go
  }

  col0.forEach(e => { // Listener for column 0
    e.addEventListener('click', () => {
      if (col0[0].classList.contains(P1Cls) || col0[0].classList.contains(P2Cls)) return
      if (player1Go) {
        dropColor01()
        checkWinC0P1()
        changePlayer()
      } else if (player2Go) {
        dropColor02()
        checkWinC0P2()
        changePlayer()
      }
    })
  })

  function checkWinC0P1() { // checkWin col0 player 1
    const pIdx = col0.indexOf(col0.find(e => e.classList.contains(P1Cls)))
    // horizontal check
    if (col0[pIdx].classList.contains(P1Cls) && col1[pIdx].classList.contains(P1Cls) && col2[pIdx].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls)){
      console.log('p1 wins')

    // vertical check
    } if (pIdx < 3) { 
      if (col0[pIdx].classList.contains(P1Cls) && col0[pIdx + 1].classList.contains(P1Cls) && col0[pIdx + 2].classList.contains(P1Cls) && col0[pIdx + 3].classList.contains(P1Cls)){
        console.log('p1 wins')

      // diagonal down right
      } if (col3[pIdx + 3].classList.contains(P1Cls) && col2[pIdx + 2].classList.contains(P1Cls) && col1[pIdx + 1].classList.contains(P1Cls) && col0[pIdx].classList.contains(P1Cls)) {
        console.log('p1 wins')
      } 
    
    // diagonal up right
    } if (pIdx > 2) {
      if (col3[pIdx - 3].classList.contains(P1Cls) && col2[pIdx - 2].classList.contains(P1Cls) && col1[pIdx - 1].classList.contains(P1Cls) && col0[pIdx].classList.contains(P1Cls)) {
        console.log('p1 wins')
      }
    }
  }


  function checkWinC0P2() { // checkWin col0 player 2
    const pIdx = col0.indexOf(col0.find(e => e.classList.contains(P2Cls)))
    // horizontal check
    if (col0[pIdx].classList.contains(P2Cls) && col1[pIdx].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls)){
      console.log('p2 wins')

    // vertical check 
    } if (pIdx < 3) {
      if (col0[pIdx].classList.contains(P2Cls) && col0[pIdx + 1].classList.contains(P2Cls) && col0[pIdx + 2].classList.contains(P2Cls) && col0[pIdx + 3].classList.contains(P2Cls)){
        console.log('p2 wins')

      // diagonal down right \
      } if (col3[pIdx + 3].classList.contains(P2Cls) && col2[pIdx + 2].classList.contains(P2Cls) && col1[pIdx + 1].classList.contains(P2Cls) && col0[pIdx].classList.contains(P2Cls)) {
        console.log('p2 wins')
      } 
      
    // diagonal up right /
    } if (pIdx > 2) {
      if (col3[pIdx - 3].classList.contains(P2Cls) && col2[pIdx - 2].classList.contains(P2Cls) && col1[pIdx - 1].classList.contains(P2Cls) && col0[pIdx].classList.contains(P2Cls)) {
        console.log('p2 wins')
      }
    }
  }

  function dropColor01() {
    for (let i = 0; i < col0.length; i++) {
      if (col0[col0.length - 1].classList.contains(P1Cls) || col0[col0.length - 1].classList.contains(P2Cls)) { // check if last cell has a color
        const found = col0.indexOf(col0.find(e => e.classList.contains(P1Cls) || e.classList.contains(P2Cls))) // if so find the first cell with a color
        return col0[found - 1].classList.add(P1Cls) // add yellow to the cell above the one found
      } else return (col0[col0.length - 1].classList.add(P1Cls)) // else add yellow to the bottom cell
    }
  }
  function dropColor02() {
    for (let i = 0; i < col0.length; i++) {
      if (col0[col0.length - 1].classList.contains(P1Cls) || col0[col0.length - 1].classList.contains(P2Cls)) { // check if last cell has a color
        const found = col0.indexOf(col0.find(e => e.classList.contains(P1Cls) || e.classList.contains(P2Cls))) // if so find the first cell with a color
        return col0[found - 1].classList.add(P2Cls) // add red to the cell above the one found
      } else return (col0[col0.length - 1].classList.add(P2Cls)) // else add red to the bottom cell
    }
  }

  col1.forEach(e => { // Listener for column 1
    e.addEventListener('click', () => {
      if (col1[0].classList.contains(P1Cls) || col1[0].classList.contains(P2Cls)) return // If column is full do nothing
      if (player1Go) {
        dropColor11()
        checkWinC1P1()
        changePlayer()
      } else if (player2Go) {
        dropColor12()
        checkWinC1P2()
        changePlayer()
      }
    })
  })

  function checkWinC1P1() { // checkWin col1 player 1
    const pIdx = col1.indexOf(col1.find(e => e.classList.contains(P1Cls)))
    // horizontal check
    if (col1[pIdx].classList.contains(P1Cls) && col2[pIdx].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls)){
      console.log('p1 wins')
    } if (col0[pIdx].classList.contains(P1Cls) && col1[pIdx].classList.contains(P1Cls) && col2[pIdx].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls)){
      console.log('p1 wins')

    // diagonal up right /
    } if (pIdx > 2) {
      if (col4[pIdx - 3].classList.contains(P1Cls) && col3[pIdx - 2].classList.contains(P1Cls) && col2[pIdx - 1].classList.contains(P1Cls) && col1[pIdx].classList.contains(P1Cls)) {
        console.log('p1 wins')
      }
    // diagonal up right /
    } if (pIdx < 5 && pIdx > 1 ) {
      if (col3[pIdx - 2].classList.contains(P1Cls) && col2[pIdx - 1].classList.contains(P1Cls) && col1[pIdx].classList.contains(P1Cls) && col0[pIdx + 1].classList.contains(P1Cls)) {
        console.log('p1 wins')
      }
    
    // diagonal down right \
    } if (pIdx < 3) {
      if (col4[pIdx + 3].classList.contains(P1Cls) && col3[pIdx + 2].classList.contains(P1Cls) && col2[pIdx + 1].classList.contains(P1Cls) && col1[pIdx].classList.contains(P1Cls)) {
        console.log('p1 wins')
      }
      // diagonal down right \
    } if (pIdx < 4 && pIdx > 0) {
      if (col3[pIdx + 2].classList.contains(P1Cls) && col2[pIdx + 1].classList.contains(P1Cls) && col1[pIdx].classList.contains(P1Cls) && col0[pIdx - 1].classList.contains(P1Cls)) {
        console.log('p1 wins')
      }

      // vertical check
    } if (pIdx < 3) {
      if (col1[pIdx].classList.contains(P1Cls) && col1[pIdx + 1].classList.contains(P1Cls) && col1[pIdx + 2].classList.contains(P1Cls) && col1[pIdx + 3].classList.contains(P1Cls)){
        console.log('p1 wins')
      }
    }
  }
    
    
  

  function checkWinC1P2() { // checkWin col1 player 2
    const pIdx = col1.indexOf(col1.find(e => e.classList.contains(P2Cls)))
    // horizontal check
    if (col1[pIdx].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls)){
      console.log('p2 wins')
    } if (col0[pIdx].classList.contains(P2Cls) && col1[pIdx].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls)){
      console.log('p2 wins')
  
      // diagonal up right /
    } if (pIdx > 2) {
      if (col4[pIdx - 3].classList.contains(P2Cls) && col3[pIdx - 2].classList.contains(P2Cls) && col2[pIdx - 1].classList.contains(P2Cls) && col1[pIdx].classList.contains(P2Cls)) {
        console.log('p2 wins')
      }
      // diagonal up right /
    } if (pIdx < 5 && pIdx > 1 ) {
      if (col3[pIdx - 2].classList.contains(P2Cls) && col2[pIdx - 1].classList.contains(P2Cls) && col1[pIdx].classList.contains(P2Cls) && col0[pIdx + 1].classList.contains(P2Cls)) {
        console.log('p2 wins')
      }
      
      // diagonal down right \
    } if (pIdx < 3) {
      if (col4[pIdx + 3].classList.contains(P2Cls) && col3[pIdx + 2].classList.contains(P2Cls) && col2[pIdx + 1].classList.contains(P2Cls) && col1[pIdx].classList.contains(P2Cls)) {
        console.log('p2 wins')
      }
      // diagonal down right \
    } if (pIdx < 4 && pIdx > 0) {
      if (col3[pIdx + 2].classList.contains(P2Cls) && col2[pIdx + 1].classList.contains(P2Cls) && col1[pIdx].classList.contains(P2Cls) && col0[pIdx - 1].classList.contains(P2Cls)) {
        console.log('p2 wins')
      }
  
      // vertical check
    } if (pIdx < 3) {
      if (col1[pIdx].classList.contains(P2Cls) && col1[pIdx + 1].classList.contains(P2Cls) && col1[pIdx + 2].classList.contains(P2Cls) && col1[pIdx + 3].classList.contains(P2Cls)){
        console.log('p2 wins')
      }
    }
  }

  function dropColor11() {
    for (let i = 0; i < col1.length; i++) {
      if (col1[col1.length - 1].classList.contains(P1Cls) || col1[col1.length - 1].classList.contains(P2Cls)) { // check if last cell has a color
        const found = col1.indexOf(col1.find(e => e.classList.contains(P1Cls) || e.classList.contains(P2Cls))) // if so find the first cell with a color
        return col1[found - 1].classList.add(P1Cls) // add yellow to the cell above the one found
      } else return (col1[col1.length - 1].classList.add(P1Cls)) // else add yellow to the bottom cell
    }
  }
  function dropColor12() {
    for (let i = 0; i < col1.length; i++) {
      if (col1[col1.length - 1].classList.contains(P1Cls) || col1[col1.length - 1].classList.contains(P2Cls)) { // check if last cell has a color
        const found = col1.indexOf(col1.find(e => e.classList.contains(P1Cls) || e.classList.contains(P2Cls))) // if so find the first cell with a color
        return col1[found - 1].classList.add(P2Cls) // add red to the cell above the one found
      } else return (col1[col1.length - 1].classList.add(P2Cls)) // else add red to the bottom cell
    }
  }

  col2.forEach(e => { // Listener for column 2
    e.addEventListener('click', () => {
      if (col2[0].classList.contains(P1Cls) || col2[0].classList.contains(P2Cls)) return
      if (player1Go) {
        dropColor21()
        checkWinC2P1()
        changePlayer()
      } else if (player2Go) {
        dropColor22()
        checkWinC2P2()
        changePlayer()
      }
    })
  })

  function checkWinC2P1() { // checkWin col2 player 1
    const pIdx = col2.indexOf(col2.find(e => e.classList.contains(P1Cls)))
    // horizontal check
    if (col2[pIdx].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls) && col5[pIdx].classList.contains(P1Cls)){
      console.log('p1 wins')
    } if (col1[pIdx].classList.contains(P1Cls) && col2[pIdx].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls)){
      console.log('p1 wins')
    } if (col0[pIdx].classList.contains(P1Cls) && col1[pIdx].classList.contains(P1Cls) && col2[pIdx].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls)){
      console.log('p1 wins')
  
      // diagonal up right /
    } if (pIdx > 2) {
      if (col5[pIdx - 3].classList.contains(P1Cls) && col4[pIdx - 2].classList.contains(P1Cls) && col3[pIdx - 1].classList.contains(P1Cls) && col2[pIdx].classList.contains(P1Cls)) {
        console.log('p1 wins')
      }
      // diagonal up right / 
    } if (pIdx < 5 && pIdx > 1 ) {
      if (col4[pIdx - 2].classList.contains(P1Cls) && col3[pIdx - 1].classList.contains(P1Cls) && col2[pIdx].classList.contains(P1Cls) && col1[pIdx + 1].classList.contains(P1Cls)) {
        console.log('p1 wins')
      }
      // diagonal up right /
    } if (pIdx < 4 && pIdx > 0 ) {
      if (col3[pIdx - 1].classList.contains(P1Cls) && col2[pIdx].classList.contains(P1Cls) && col1[pIdx + 1].classList.contains(P1Cls) && col0[pIdx + 2].classList.contains(P1Cls)) {
        console.log('p1 wins')
      }
      
      // diagonal down right \
    } if (pIdx < 3) {
      if (col5[pIdx + 3].classList.contains(P1Cls) && col4[pIdx + 2].classList.contains(P1Cls) && col3[pIdx + 1].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls)) {
        console.log('p1 wins')
      }
      // diagonal down right \
    } if (pIdx < 4 && pIdx > 0) {
      if (col4[pIdx + 2].classList.contains(P1Cls) && col3[pIdx + 1].classList.contains(P1Cls) && col2[pIdx].classList.contains(P1Cls) && col1[pIdx - 1].classList.contains(P1Cls)) {
        console.log('p1 wins')
      }
      // diagonal down right \
    } if (pIdx < 5 && pIdx > 1) {
      if (col3[pIdx + 1].classList.contains(P1Cls) && col2[pIdx].classList.contains(P1Cls) && col1[pIdx - 1].classList.contains(P1Cls) && col0[pIdx - 2].classList.contains(P1Cls)) {
        console.log('p1 wins')
      }
  
      // vertical check
    } if (pIdx < 3) {
      if (col2[pIdx].classList.contains(P1Cls) && col2[pIdx + 1].classList.contains(P1Cls) && col2[pIdx + 2].classList.contains(P1Cls) && col2[pIdx + 3].classList.contains(P1Cls)){
        console.log('p1 wins')
      }
    }
  }

  function checkWinC2P2() { // checkWin col2 player 2
    const pIdx = col2.indexOf(col2.find(e => e.classList.contains(P2Cls)))
    // horizontal check
    if (col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col5[pIdx].classList.contains(P2Cls)){
      console.log('p2 wins')
    } if (col1[pIdx].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls)){
      console.log('p2 wins')
    } if (col0[pIdx].classList.contains(P2Cls) && col1[pIdx].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls)){
      console.log('p2 wins')
  
      // diagonal up right /
    } if (pIdx > 2) {
      if (col5[pIdx - 3].classList.contains(P2Cls) && col4[pIdx - 2].classList.contains(P2Cls) && col3[pIdx - 1].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls)) {
        console.log('p2 wins')
      }
      // diagonal up right / 
    } if (pIdx < 5 && pIdx > 1 ) {
      if (col4[pIdx - 2].classList.contains(P2Cls) && col3[pIdx - 1].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col1[pIdx + 1].classList.contains(P2Cls)) {
        console.log('p2 wins')
      }
      // diagonal up right /
    } if (pIdx < 4 && pIdx > 0 ) {
      if (col3[pIdx - 1].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col1[pIdx + 1].classList.contains(P2Cls) && col0[pIdx + 2].classList.contains(P2Cls)) {
        console.log('p2 wins')
      }
      
      // diagonal down right \
    } if (pIdx < 3) {
      if (col5[pIdx + 3].classList.contains(P2Cls) && col4[pIdx + 2].classList.contains(P2Cls) && col3[pIdx + 1].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls)) {
        console.log('p2 wins')
      }
      // diagonal down right \
    } if (pIdx < 4 && pIdx > 0) {
      if (col4[pIdx + 2].classList.contains(P2Cls) && col3[pIdx + 1].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col1[pIdx - 1].classList.contains(P2Cls)) {
        console.log('p2 wins')
      }
      // diagonal down right \
    } if (pIdx < 5 && pIdx > 1) {
      if (col3[pIdx + 1].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col1[pIdx - 1].classList.contains(P2Cls) && col0[pIdx - 2].classList.contains(P2Cls)) {
        console.log('p2 wins')
      }
  
      // vertical check
    } if (pIdx < 3) {
      if (col2[pIdx].classList.contains(P2Cls) && col2[pIdx + 1].classList.contains(P2Cls) && col2[pIdx + 2].classList.contains(P2Cls) && col2[pIdx + 3].classList.contains(P2Cls)){
        console.log('p2 wins')
      }
    }
  }

  function dropColor21() {
    for (let i = 0; i < col2.length; i++) {
      if (col2[col2.length - 1].classList.contains(P1Cls) || col2[col2.length - 1].classList.contains(P2Cls)) { // check if last cell has a color
        const found = col2.indexOf(col2.find(e => e.classList.contains(P1Cls) || e.classList.contains(P2Cls))) // if so find the first cell with a color
        return col2[found - 1].classList.add(P1Cls) // add yellow to the cell above the one found
      } else return (col2[col2.length - 1].classList.add(P1Cls)) // else add yellow to the bottom cell
    }
  }
  function dropColor22() {
    for (let i = 0; i < col2.length; i++) {
      if (col2[col2.length - 1].classList.contains(P1Cls) || col2[col2.length - 1].classList.contains(P2Cls)) { // check if last cell has a color
        const found = col2.indexOf(col2.find(e => e.classList.contains(P1Cls) || e.classList.contains(P2Cls))) // if so find the first cell with a color
        return col2[found - 1].classList.add(P2Cls) // add red to the cell above the one found
      } else return (col2[col2.length - 1].classList.add(P2Cls)) // else add red to the bottom cell
    }
  }

  col3.forEach(e => { // Listener for column 3
    e.addEventListener('click', () => {
      if (col3[0].classList.contains(P1Cls) || col3[0].classList.contains(P2Cls)) return
      if (player1Go) {
        dropColor31()
        checkWinC3P1()
        changePlayer()
      } else if (player2Go) {
        dropColor32()
        checkWinC3P2()
        changePlayer()
      }
    })
  })

  function checkWinC3P1() { // checkWin col3 player 1
    const pIdx = col3.indexOf(col3.find(e => e.classList.contains(P1Cls)))
    // horizontal check
    if (col3[pIdx].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls) && col5[pIdx].classList.contains(P1Cls) && col6[pIdx].classList.contains(P1Cls)){
      console.log('p1 wins')
    } if (col2[pIdx].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls) && col5[pIdx].classList.contains(P1Cls)){
      console.log('p1 wins')
    } if (col1[pIdx].classList.contains(P1Cls) && col2[pIdx].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls)){
      console.log('p1 wins')
    } if (col0[pIdx].classList.contains(P1Cls) && col1[pIdx].classList.contains(P1Cls) && col2[pIdx].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls)){
      console.log('p1 wins')
  
      // diagonal up right /
    } if (pIdx > 2) {
      if (col6[pIdx - 3].classList.contains(P1Cls) && col5[pIdx - 2].classList.contains(P1Cls) && col4[pIdx - 1].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls)) {
        console.log('p1 wins')
      }
      // diagonal up right / 
    } if (pIdx < 5 && pIdx > 1 ) {
      if (col5[pIdx - 2].classList.contains(P1Cls) && col4[pIdx - 1].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls) && col2[pIdx + 1].classList.contains(P1Cls)) {
        console.log('p1 wins')
      }
      // diagonal up right /
    } if (pIdx < 4 && pIdx > 0 ) {
      if (col4[pIdx - 1].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls) && col2[pIdx + 1].classList.contains(P1Cls) && col1[pIdx + 2].classList.contains(P1Cls)) {
        console.log('p1 wins')
      }

      // diagonal down right \
    } if (pIdx < 3) {
      if (col6[pIdx + 3].classList.contains(P1Cls) && col5[pIdx + 2].classList.contains(P1Cls) && col4[pIdx + 1].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls)) {
        console.log('p1 wins')
      }
      // diagonal down right \
    } if (pIdx < 4 && pIdx > 0) {
      if (col5[pIdx + 2].classList.contains(P1Cls) && col4[pIdx + 1].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls) && col2[pIdx - 1].classList.contains(P1Cls)) {
        console.log('p1 wins')
      }
      // diagonal down right \
    } if (pIdx < 5 && pIdx > 1) {
      if (col4[pIdx + 1].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls) && col2[pIdx - 1].classList.contains(P1Cls) && col1[pIdx - 2].classList.contains(P1Cls)) {
        console.log('p1 wins')
      }
      // diagonal down right \
    } if (pIdx > 2) {
      if (col3[pIdx].classList.contains(P1Cls) && col2[pIdx - 1].classList.contains(P1Cls) && col1[pIdx - 2].classList.contains(P1Cls) && col0[pIdx - 3].classList.contains(P1Cls)) {
        console.log('p1 wins')
      }
  
      // vertical check
    } if (pIdx < 3) {
      if (col3[pIdx].classList.contains(P1Cls) && col3[pIdx + 1].classList.contains(P1Cls) && col3[pIdx + 2].classList.contains(P1Cls) && col3[pIdx + 3].classList.contains(P1Cls)){
        console.log('p1 wins')
      }
    }
  }
    

  function checkWinC3P2() { // checkWin col3 player 2
    const pIdx = col3.indexOf(col3.find(e => e.classList.contains(P2Cls)))
    // horizontal check
    if (col3[pIdx].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col5[pIdx].classList.contains(P2Cls) && col6[pIdx].classList.contains(P2Cls)){
      console.log('p2 wins')
    } if (col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col5[pIdx].classList.contains(P2Cls)){
      console.log('p2 wins')
    } if (col1[pIdx].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls)){
      console.log('p2 wins')
    } if (col0[pIdx].classList.contains(P2Cls) && col1[pIdx].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls)){
      console.log('p2 wins')
  
      // diagonal up right /
    } if (pIdx > 2) {
      if (col6[pIdx - 3].classList.contains(P2Cls) && col5[pIdx - 2].classList.contains(P2Cls) && col4[pIdx - 1].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls)) {
        console.log('p2 wins')
      }
      // diagonal up right / 
    } if (pIdx < 5 && pIdx > 1 ) {
      if (col5[pIdx - 2].classList.contains(P2Cls) && col4[pIdx - 1].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col2[pIdx + 1].classList.contains(P2Cls)) {
        console.log('p2 wins')
      }
      // diagonal up right /
    } if (pIdx < 4 && pIdx > 0 ) {
      if (col4[pIdx - 1].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col2[pIdx + 1].classList.contains(P2Cls) && col1[pIdx + 2].classList.contains(P2Cls)) {
        console.log('p2 wins')
      }
      
      // diagonal down right \
    } if (pIdx < 3) {
      if (col6[pIdx + 3].classList.contains(P2Cls) && col5[pIdx + 2].classList.contains(P2Cls) && col4[pIdx + 1].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls)) {
        console.log('p2 wins')
      }
      // diagonal down right \
    } if (pIdx < 4 && pIdx > 0) {
      if (col5[pIdx + 2].classList.contains(P2Cls) && col4[pIdx + 1].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col2[pIdx - 1].classList.contains(P2Cls)) {
        console.log('p2 wins')
      }
      // diagonal down right \
    } if (pIdx < 5 && pIdx > 1) {
      if (col4[pIdx + 1].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col2[pIdx - 1].classList.contains(P2Cls) && col1[pIdx - 2].classList.contains(P2Cls)) {
        console.log('p2 wins')
      }
      // diagonal down right \
    } if (pIdx > 2) {
      if (col3[pIdx].classList.contains(P2Cls) && col2[pIdx - 1].classList.contains(P2Cls) && col1[pIdx - 2].classList.contains(P2Cls) && col0[pIdx - 3].classList.contains(P2Cls)) {
        console.log('p2 wins')
      }
  
      // vertical check
    } if (pIdx < 3) {
      if (col3[pIdx].classList.contains(P2Cls) && col3[pIdx + 1].classList.contains(P2Cls) && col3[pIdx + 2].classList.contains(P2Cls) && col3[pIdx + 3].classList.contains(P2Cls)){
        console.log('p2 wins')
      }
    }
  }

  function dropColor31() {
    for (let i = 0; i < col3.length; i++) {
      if (col3[col3.length - 1].classList.contains(P1Cls) || col3[col3.length - 1].classList.contains(P2Cls)) { // check if last cell has a color
        const found = col3.indexOf(col3.find(e => e.classList.contains(P1Cls) || e.classList.contains(P2Cls))) // if so find the first cell with a color
        return col3[found - 1].classList.add(P1Cls) // add yellow to the cell above the one found
      } else return (col3[col3.length - 1].classList.add(P1Cls)) // else add yellow to the bottom cell
    }
  }
  function dropColor32() {
    for (let i = 0; i < col3.length; i++) {
      if (col3[col3.length - 1].classList.contains(P1Cls) || col3[col3.length - 1].classList.contains(P2Cls)) { // check if last cell has a color
        const found = col3.indexOf(col3.find(e => e.classList.contains(P1Cls) || e.classList.contains(P2Cls))) // if so find the first cell with a color
        return col3[found - 1].classList.add(P2Cls) // add red to the cell above the one found
      } else return (col3[col3.length - 1].classList.add(P2Cls)) // else add red to the bottom cell
    }
  }

  col4.forEach(e => { // Listener for column 4
    e.addEventListener('click', () => {
      if (col4[0].classList.contains(P1Cls) || col4[0].classList.contains(P2Cls)) return
      if (player1Go) {
        dropColor41()
        checkWinC4P1()
        changePlayer()
      } else if (player2Go) {
        dropColor42()
        checkWinC4P2()
        changePlayer()
      }
    })
  })

  function checkWinC4P1() { // checkWin col4 player 1
    const pIdx = col4.indexOf(col4.find(e => e.classList.contains(P1Cls)))
    // horizontal check
    if (col3[pIdx].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls) && col5[pIdx].classList.contains(P1Cls) && col6[pIdx].classList.contains(P1Cls)){
      console.log('p1 wins')
    } if (col2[pIdx].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls) && col5[pIdx].classList.contains(P1Cls)){
      console.log('p1 wins')
    } if (col1[pIdx].classList.contains(P1Cls) && col2[pIdx].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls)){
      console.log('p1 wins')
  
      // diagonal up right /
    } if (pIdx < 5 && pIdx > 1) {
      if (col6[pIdx - 2].classList.contains(P1Cls) && col5[pIdx - 1].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls) && col3[pIdx + 1].classList.contains(P1Cls)) {
        console.log('p1 wins')
      }
      // diagonal up right / 
    } if (pIdx < 4 && pIdx > 0 ) {
      if (col5[pIdx - 1].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls) && col3[pIdx + 1].classList.contains(P1Cls) && col2[pIdx + 2].classList.contains(P1Cls)) {
        console.log('p1 wins')
      }
      // diagonal up right /
    } if (pIdx > 2) {
      if (col4[pIdx].classList.contains(P1Cls) && col3[pIdx - 1].classList.contains(P1Cls) && col2[pIdx - 2].classList.contains(P1Cls) && col1[pIdx - 3].classList.contains(P1Cls)) {
        console.log('p1 wins')
      }

      // diagonal down right \
    } if (pIdx < 3) {
      if (col4[pIdx].classList.contains(P1Cls) && col3[pIdx + 1].classList.contains(P1Cls) && col2[pIdx + 2].classList.contains(P1Cls) && col1[pIdx + 3].classList.contains(P1Cls)) {
        console.log('p1 wins')
      }
      // diagonal down right \
    } if (pIdx < 4 && pIdx > 0) {
      if (col6[pIdx + 2].classList.contains(P1Cls) && col5[pIdx + 1].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls) && col3[pIdx - 1].classList.contains(P1Cls)) {
        console.log('p1 wins')
      }
      // diagonal down right \
    } if (pIdx < 5 && pIdx > 1) {
      if (col5[pIdx + 1].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls) && col3[pIdx - 1].classList.contains(P1Cls) && col2[pIdx - 2].classList.contains(P1Cls)) {
        console.log('p1 wins')
      }
  
      // vertical check
    } if (pIdx < 3) {
      if (col4[pIdx].classList.contains(P1Cls) && col4[pIdx + 1].classList.contains(P1Cls) && col4[pIdx + 2].classList.contains(P1Cls) && col4[pIdx + 3].classList.contains(P1Cls)){
        console.log('p1 wins')
      }
    }
  }

  function checkWinC4P2() { // checkWin col4 player 2
    const pIdx = col4.indexOf(col4.find(e => e.classList.contains(P2Cls)))
    // horizontal check
    if (col3[pIdx].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col5[pIdx].classList.contains(P2Cls) && col6[pIdx].classList.contains(P2Cls)){
      console.log('p2 wins')
    } if (col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col5[pIdx].classList.contains(P2Cls)){
      console.log('p2 wins')
    } if (col1[pIdx].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls)){
      console.log('p2 wins')
  
      // diagonal up right /
    } if (pIdx < 5 && pIdx > 1) {
      if (col6[pIdx - 2].classList.contains(P2Cls) && col5[pIdx - 1].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col3[pIdx + 1].classList.contains(P2Cls)) {
        console.log('p2 wins')
      }
      // diagonal up right / 
    } if (pIdx < 4 && pIdx > 0 ) {
      if (col5[pIdx - 1].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col3[pIdx + 1].classList.contains(P2Cls) && col2[pIdx + 2].classList.contains(P2Cls)) {
        console.log('p2 wins')
      }
      // diagonal up right /
    } if (pIdx > 2) {
      if (col4[pIdx].classList.contains(P2Cls) && col3[pIdx - 1].classList.contains(P2Cls) && col2[pIdx - 2].classList.contains(P2Cls) && col1[pIdx - 3].classList.contains(P2Cls)) {
        console.log('p2 wins')
      }

      // diagonal down right \
    } if (pIdx < 3) {
      if (col4[pIdx].classList.contains(P2Cls) && col3[pIdx + 1].classList.contains(P2Cls) && col2[pIdx + 2].classList.contains(P2Cls) && col1[pIdx + 3].classList.contains(P2Cls)) {
        console.log('p2 wins')
      }
      // diagonal down right \
    } if (pIdx < 4 && pIdx > 0) {
      if (col6[pIdx + 2].classList.contains(P2Cls) && col5[pIdx + 1].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col3[pIdx - 1].classList.contains(P2Cls)) {
        console.log('p2 wins')
      }
      // diagonal down right \
    } if (pIdx < 5 && pIdx > 1) {
      if (col5[pIdx + 1].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col3[pIdx - 1].classList.contains(P2Cls) && col2[pIdx - 2].classList.contains(P2Cls)) {
        console.log('p2 wins')
      }
  
      // vertical check
    } if (pIdx < 3) {
      if (col4[pIdx].classList.contains(P2Cls) && col4[pIdx + 1].classList.contains(P2Cls) && col4[pIdx + 2].classList.contains(P2Cls) && col4[pIdx + 3].classList.contains(P2Cls)){
        console.log('p2 wins')
      }
    }
  }

  function dropColor41() {
    for (let i = 0; i < col4.length; i++) {
      if (col4[col4.length - 1].classList.contains(P1Cls) || col4[col4.length - 1].classList.contains(P2Cls)) { // check if last cell has a color
        const found = col4.indexOf(col4.find(e => e.classList.contains(P1Cls) || e.classList.contains(P2Cls))) // if so find the first cell with a color
        return col4[found - 1].classList.add(P1Cls) // add yellow to the cell above the one found
      } else return (col4[col4.length - 1].classList.add(P1Cls)) // else add yellow to the bottom cell
    }
  }
  function dropColor42() {
    for (let i = 0; i < col4.length; i++) {
      if (col4[col4.length - 1].classList.contains(P1Cls) || col4[col4.length - 1].classList.contains(P2Cls)) { // check if last cell has a color
        const found = col4.indexOf(col4.find(e => e.classList.contains(P1Cls) || e.classList.contains(P2Cls))) // if so find the first cell with a color
        return col4[found - 1].classList.add(P2Cls) // add red to the cell above the one found
      } else return (col4[col4.length - 1].classList.add(P2Cls)) // else add red to the bottom cell
    }
  }

  col5.forEach(e => { // Listener for column 5
    e.addEventListener('click', () => {
      if (col5[0].classList.contains(P1Cls) || col5[0].classList.contains(P2Cls)) return
      if (player1Go) {
        dropColor51()
        checkWinC5P1()
        changePlayer()
      } else if (player2Go) {
        dropColor52()
        checkWinC5P2()
        changePlayer()
      }
    })
  })

  function checkWinC5P1() { // checkWin col5 player 1
    const pIdx = col5.indexOf(col5.find(e => e.classList.contains(P1Cls)))
    // horizontal check
    if (col3[pIdx].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls) && col5[pIdx].classList.contains(P1Cls) && col6[pIdx].classList.contains(P1Cls)){
      console.log('p1 wins')
    } if (col2[pIdx].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls) && col5[pIdx].classList.contains(P1Cls)){
      console.log('p1 wins')
  
      // diagonal up right / 
    } if (pIdx < 4 && pIdx > 0 ) {
      if (col6[pIdx - 1].classList.contains(P1Cls) && col5[pIdx].classList.contains(P1Cls) && col4[pIdx + 1].classList.contains(P1Cls) && col3[pIdx + 2].classList.contains(P1Cls)) {
        console.log('p1 wins')
      }
      // diagonal up right /
    } if (pIdx < 3) {
      if (col5[pIdx].classList.contains(P1Cls) && col4[pIdx + 1].classList.contains(P1Cls) && col3[pIdx + 2].classList.contains(P1Cls) && col2[pIdx + 3].classList.contains(P1Cls)) {
        console.log('p1 wins')
      }

      // diagonal down right \
    } if (pIdx < 5 && pIdx > 1) {
      if (col6[pIdx + 1].classList.contains(P1Cls) && col5[pIdx].classList.contains(P1Cls) && col4[pIdx - 1].classList.contains(P1Cls) && col3[pIdx - 2].classList.contains(P1Cls)) {
        console.log('p1 wins')
      }
      // diagonal down right \
    } if (pIdx > 2) {
      if (col5[pIdx].classList.contains(P1Cls) && col4[pIdx - 1].classList.contains(P1Cls) && col3[pIdx - 2].classList.contains(P1Cls) && col2[pIdx - 3].classList.contains(P1Cls)) {
        console.log('p1 wins')
      }
  
      // vertical check
    } if (pIdx < 3) {
      if (col5[pIdx].classList.contains(P1Cls) && col5[pIdx + 1].classList.contains(P1Cls) && col5[pIdx + 2].classList.contains(P1Cls) && col5[pIdx + 3].classList.contains(P1Cls)){
        console.log('p1 wins')
      }
    }
  }

  function checkWinC5P2() { // checkWin col5 player 2
    const pIdx = col5.indexOf(col5.find(e => e.classList.contains(P2Cls)))
    // horizontal check
    if (col3[pIdx].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col5[pIdx].classList.contains(P2Cls) && col6[pIdx].classList.contains(P2Cls)){
      console.log('p2 wins')
    } if (col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col5[pIdx].classList.contains(P2Cls)){
      console.log('p2 wins')
  
      // diagonal up right / 
    } if (pIdx < 4 && pIdx > 0 ) {
      if (col6[pIdx - 1].classList.contains(P2Cls) && col5[pIdx].classList.contains(P2Cls) && col4[pIdx + 1].classList.contains(P2Cls) && col3[pIdx + 2].classList.contains(P2Cls)) {
        console.log('p2 wins')
      }
      // diagonal up right /
    } if (pIdx < 3) {
      if (col5[pIdx].classList.contains(P2Cls) && col4[pIdx + 1].classList.contains(P2Cls) && col3[pIdx + 2].classList.contains(P2Cls) && col2[pIdx + 3].classList.contains(P2Cls)) {
        console.log('p2 wins')
      }

      // diagonal down right \
    } if (pIdx < 5 && pIdx > 1) {
      if (col6[pIdx + 1].classList.contains(P2Cls) && col5[pIdx].classList.contains(P2Cls) && col4[pIdx - 1].classList.contains(P2Cls) && col3[pIdx - 2].classList.contains(P2Cls)) {
        console.log('p2 wins')
      }
      // diagonal down right \
    } if (pIdx > 2) {
      if (col5[pIdx].classList.contains(P2Cls) && col4[pIdx - 1].classList.contains(P2Cls) && col3[pIdx - 2].classList.contains(P2Cls) && col2[pIdx - 3].classList.contains(P2Cls)) {
        console.log('p2 wins')
      }
  
      // vertical check
    } if (pIdx < 3) {
      if (col5[pIdx].classList.contains(P2Cls) && col5[pIdx + 1].classList.contains(P2Cls) && col5[pIdx + 2].classList.contains(P2Cls) && col5[pIdx + 3].classList.contains(P2Cls)){
        console.log('p2 wins')
      }
    }
  }

  function dropColor51() {
    for (let i = 0; i < col5.length; i++) {
      if (col5[col5.length - 1].classList.contains(P1Cls) || col5[col5.length - 1].classList.contains(P2Cls)) { // check if last cell has a color
        const found = col5.indexOf(col5.find(e => e.classList.contains(P1Cls) || e.classList.contains(P2Cls))) // if so find the first cell with a color
        return col5[found - 1].classList.add(P1Cls) // add yellow to the cell above the one found
      } else return (col5[col5.length - 1].classList.add(P1Cls)) // else add yellow to the bottom cell
    }
  }
  function dropColor52() {
    for (let i = 0; i < col5.length; i++) {
      if (col5[col5.length - 1].classList.contains(P1Cls) || col5[col5.length - 1].classList.contains(P2Cls)) { // check if last cell has a color
        const found = col5.indexOf(col5.find(e => e.classList.contains(P1Cls) || e.classList.contains(P2Cls))) // if so find the first cell with a color
        return col5[found - 1].classList.add(P2Cls) // add red to the cell above the one found
      } else return (col5[col5.length - 1].classList.add(P2Cls)) // else add red to the bottom cell
    }
  }

  col6.forEach(e => { // Listener for column 6
    e.addEventListener('click', () => {
      if (col6[0].classList.contains(P1Cls) || col6[0].classList.contains(P2Cls)) return
      if (player1Go) {
        dropColor61()
        checkWinC6P1()
        changePlayer()
      } else if (player2Go) {
        dropColor62()
        checkWinC6P2()
        changePlayer()
      }
    })
  })

  function checkWinC6P1() { // checkWin col6 player 1
    const pIdx = col6.indexOf(col6.find(e => e.classList.contains(P1Cls)))
    // horizontal check
    if (col3[pIdx].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls) && col5[pIdx].classList.contains(P1Cls) && col6[pIdx].classList.contains(P1Cls)){
      console.log('p1 wins')
  
      // diagonal up right / 
    } if (pIdx < 3) {
      if (col6[pIdx].classList.contains(P1Cls) && col5[pIdx + 1].classList.contains(P1Cls) && col4[pIdx + 2].classList.contains(P1Cls) && col3[pIdx + 3].classList.contains(P1Cls)) {
        console.log('p1 wins')
      }

      // diagonal down right \
    } if (pIdx > 2) {
      if (col6[pIdx].classList.contains(P1Cls) && col5[pIdx - 1].classList.contains(P1Cls) && col4[pIdx - 2].classList.contains(P1Cls) && col3[pIdx - 3].classList.contains(P1Cls)) {
        console.log('p1 wins')
      }
  
      // vertical check
    } if (pIdx < 3) {
      if (col6[pIdx].classList.contains(P1Cls) && col6[pIdx + 1].classList.contains(P1Cls) && col6[pIdx + 2].classList.contains(P1Cls) && col6[pIdx + 3].classList.contains(P1Cls)){
        console.log('p1 wins')
      }
    }
  }

  function checkWinC6P2() { // checkWin col6 player 2
    const pIdx = col6.indexOf(col6.find(e => e.classList.contains(P2Cls)))
    // horizontal check
    if (col3[pIdx].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col5[pIdx].classList.contains(P2Cls) && col6[pIdx].classList.contains(P2Cls)){
      console.log('p2 wins')
  
      // diagonal up right / 
    } if (pIdx < 3) {
      if (col6[pIdx].classList.contains(P2Cls) && col5[pIdx + 1].classList.contains(P2Cls) && col4[pIdx + 2].classList.contains(P2Cls) && col3[pIdx + 3].classList.contains(P2Cls)) {
        console.log('p2 wins')
      }

      // diagonal down right \
    } if (pIdx > 2) {
      if (col6[pIdx].classList.contains(P2Cls) && col5[pIdx - 1].classList.contains(P2Cls) && col4[pIdx - 2].classList.contains(P2Cls) && col3[pIdx - 3].classList.contains(P2Cls)) {
        console.log('p2 wins')
      }
  
      // vertical check
    } if (pIdx < 3) {
      if (col6[pIdx].classList.contains(P2Cls) && col6[pIdx + 1].classList.contains(P2Cls) && col6[pIdx + 2].classList.contains(P2Cls) && col6[pIdx + 3].classList.contains(P2Cls)){
        console.log('p2 wins')
      }
    }
  }

  function dropColor61() {
    for (let i = 0; i < col6.length; i++) {
      if (col6[col6.length - 1].classList.contains(P1Cls) || col6[col6.length - 1].classList.contains(P2Cls)) { // check if last cell has a color
        const found = col6.indexOf(col6.find(e => e.classList.contains(P1Cls) || e.classList.contains(P2Cls))) // if so find the first cell with a color
        return col6[found - 1].classList.add(P1Cls) // add yellow to the cell above the one found
      } else return (col6[col6.length - 1].classList.add(P1Cls)) // else add yellow to the bottom cell
    }
  }
  function dropColor62() {
    for (let i = 0; i < col6.length; i++) {
      if (col6[col6.length - 1].classList.contains(P1Cls) || col6[col6.length - 1].classList.contains(P2Cls)) { // check if last cell has a color
        const found = col6.indexOf(col6.find(e => e.classList.contains(P1Cls) || e.classList.contains(P2Cls))) // if so find the first cell with a color
        return col6[found - 1].classList.add(P2Cls) // add red to the cell above the one found
      } else return (col6[col6.length - 1].classList.add(P2Cls)) // else add red to the bottom cell
    }
  }

}
window.addEventListener('DOMContentLoaded', init)
