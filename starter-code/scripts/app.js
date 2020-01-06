
function init() {
  //  DOM Variables
  const grid = document.querySelector('.grid')
  const circles = [] //Belongs here as you fill the array with DOM references eventhough genallly it should be in the game variables
  // Game Variables
  const width = 7 //if you want grid bigger, change this then change styling in css accordingly
  const height = 6
  const lastPlayed = 1
  const player1class = 'yellow'
  const player2class = 'red'
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

  const column0 = circles.filter((e, i) => i % 7 === 0) //make into object for refactoring
  const column1 = circles.filter((e, i) => i % 7 === 1)
  const column2 = circles.filter((e, i) => i % 7 === 2)
  const column3 = circles.filter((e, i) => i % 7 === 3)
  const column4 = circles.filter((e, i) => i % 7 === 4)
  const column5 = circles.filter((e, i) => i % 7 === 5)
  const column6 = circles.filter((e, i) => i % 7 === 6)


  column0.forEach(e => {
    e.addEventListener('click', () => {
      if (column0[0].classList.contains(player1class) || column0[0].classList.contains(player2class)) return
      if (player1Go === true) {
        player1Go = false
        player2Go = true
        dropColor01()
        checkWinC0P1()
      } else if (player2Go === true) {
        player2Go = false
        player1Go = true
        dropColor02()
        checkWinC0P2()
      }
    })
  })

  function checkWinC0P1() { // checkWin column0 player 1
    const playerIndex = column0.indexOf(column0.find(e => e.classList.contains(player1class)))
    // horizontal check
    if (column0[playerIndex].classList.contains(player1class) && column1[playerIndex].classList.contains(player1class) && column2[playerIndex].classList.contains(player1class) && column3[playerIndex].classList.contains(player1class)){
      console.log('p1 wins')
    // vertical check
    } else if (playerIndex < 3) { 
      if (column0[playerIndex].classList.contains(player1class) && column0[playerIndex + 1].classList.contains(player1class) && column0[playerIndex + 2].classList.contains(player1class) && column0[playerIndex + 3].classList.contains(player1class)){
        console.log('p1 wins')
      } // diagonal check
    } while (playerIndex > 2) {
      if (column0[playerIndex].classList.contains(player1class)) {
        return console.log('working')
      }
    }
  }

  function checkWinC0P2() { // checkWin column0 player 2
    const playerIndex = column0.indexOf(column0.find(e => e.classList.contains(player2class)))
    // horizontal check
    if (column0[playerIndex].classList.contains(player2class) && column1[playerIndex].classList.contains(player2class) && column2[playerIndex].classList.contains(player2class) && column3[playerIndex].classList.contains(player2class)){
      console.log('p2 wins')
    // vertical check 
    } else if (playerIndex < 3) {
      if (column0[playerIndex].classList.contains(player2class) && column0[playerIndex + 1].classList.contains(player2class) && column0[playerIndex + 2].classList.contains(player2class) && column0[playerIndex + 3].classList.contains(player2class)){
        console.log('p2 wins')
      }
    }
  }

  function dropColor01() {
    for (let i = 0; i < column0.length; i++) {
      if (column0[column0.length - 1].classList.contains(player1class) || column0[column0.length - 1].classList.contains(player2class)) { // check if last cell has a color
        const found = column0.indexOf(column0.find(e => e.classList.contains(player1class) || e.classList.contains(player2class))) // if so find the first cell with a color
        return column0[found - 1].classList.add(player1class) // add yellow to the cell above the one found
      } else return (column0[column0.length - 1].classList.add(player1class)) // else add yellow to the bottom cell
    }
  }
  function dropColor02() {
    for (let i = 0; i < column0.length; i++) {
      if (column0[column0.length - 1].classList.contains(player1class) || column0[column0.length - 1].classList.contains(player2class)) { // check if last cell has a color
        const found = column0.indexOf(column0.find(e => e.classList.contains(player1class) || e.classList.contains(player2class))) // if so find the first cell with a color
        return column0[found - 1].classList.add(player2class) // add red to the cell above the one found
      } else return (column0[column0.length - 1].classList.add(player2class)) // else add red to the bottom cell
    }
  }

  column1.forEach(e => {
    e.addEventListener('click', () => {
      if (column1[0].classList.contains(player1class) || column1[0].classList.contains(player2class)) return // If column is full do nothing
      if (player1Go === true) {
        player1Go = false
        player2Go = true
        dropColor11()
        checkWinC1P1()
      } else if (player2Go === true) {
        player2Go = false
        player1Go = true
        dropColor12()
        checkWinC1P2()
      }
    })
  })

  function checkWinC1P1() { // checkWin column1 player 1
    const playerIndex = column1.indexOf(column1.find(e => e.classList.contains(player1class)))
    // horizontal check
    if (column1[playerIndex].classList.contains(player1class) && column2[playerIndex].classList.contains(player1class) && column3[playerIndex].classList.contains(player1class) && column4[playerIndex].classList.contains(player1class)){
      console.log('p1 wins')
    // horizontal check
    } else if (column0[playerIndex].classList.contains(player1class) && column1[playerIndex].classList.contains(player1class) && column2[playerIndex].classList.contains(player1class) && column3[playerIndex].classList.contains(player1class)){
      console.log('p1 wins')
    // vertical check
    } else if (playerIndex < 3) {
      if (column1[playerIndex].classList.contains(player1class) && column1[playerIndex + 1].classList.contains(player1class) && column1[playerIndex + 2].classList.contains(player1class) && column1[playerIndex + 3].classList.contains(player1class)){
        console.log('p1 wins')
      }
    }
  }

  function checkWinC1P2() { // checkWin column1 player 2
    const playerIndex = column1.indexOf(column1.find(e => e.classList.contains(player2class)))
    // horizontal check
    if (column1[playerIndex].classList.contains(player2class) && column2[playerIndex].classList.contains(player2class) && column3[playerIndex].classList.contains(player2class) && column4[playerIndex].classList.contains(player2class)){
      console.log('p2 wins')
    // horizontal check
    } else if (column0[playerIndex].classList.contains(player2class) && column1[playerIndex].classList.contains(player2class) && column2[playerIndex].classList.contains(player2class) && column3[playerIndex].classList.contains(player2class)){
      console.log('p2 wins')
    // vertical check
    } else if (playerIndex < 3) { 
      if (column1[playerIndex].classList.contains(player2class) && column1[playerIndex + 1].classList.contains(player2class) && column1[playerIndex + 2].classList.contains(player2class) && column1[playerIndex + 3].classList.contains(player2class)){
        console.log('p2 wins')
      }
    }
  }

  function dropColor11() {
    for (let i = 0; i < column1.length; i++) {
      if (column1[column1.length - 1].classList.contains(player1class) || column1[column1.length - 1].classList.contains(player2class)) { // check if last cell has a color
        const found = column1.indexOf(column1.find(e => e.classList.contains(player1class) || e.classList.contains(player2class))) // if so find the first cell with a color
        return column1[found - 1].classList.add(player1class) // add yellow to the cell above the one found
      } else return (column1[column1.length - 1].classList.add(player1class)) // else add yellow to the bottom cell
    }
  }
  function dropColor12() {
    for (let i = 0; i < column1.length; i++) {
      if (column1[column1.length - 1].classList.contains(player1class) || column1[column1.length - 1].classList.contains(player2class)) { // check if last cell has a color
        const found = column1.indexOf(column1.find(e => e.classList.contains(player1class) || e.classList.contains(player2class))) // if so find the first cell with a color
        return column1[found - 1].classList.add(player2class) // add red to the cell above the one found
      } else return (column1[column1.length - 1].classList.add(player2class)) // else add red to the bottom cell
    }
  }

  column2.forEach(e => {
    e.addEventListener('click', () => {
      if (column2[0].classList.contains(player1class) || column2[0].classList.contains(player2class)) return
      if (player1Go === true) {
        player1Go = false
        player2Go = true
        dropColor21()
        checkWinC2P1()
      } else if (player2Go === true) {
        player2Go = false
        player1Go = true
        dropColor22()
        checkWinC2P2()
      }
    })
  })

  function checkWinC2P1() { // checkWin column2 player 1
    const playerIndex = column2.indexOf(column2.find(e => e.classList.contains(player1class)))
    // horizontal check
    if (column2[playerIndex].classList.contains(player1class) && column3[playerIndex].classList.contains(player1class) && column4[playerIndex].classList.contains(player1class) && column5[playerIndex].classList.contains(player1class)){
      console.log('p1 wins')
    // horizontal check
    } else if (column3[playerIndex].classList.contains(player1class) && column2[playerIndex].classList.contains(player1class) && column1[playerIndex].classList.contains(player1class) && column0[playerIndex].classList.contains(player1class)){
      console.log('p1 wins')
    // horizontal check
    } else if (column1[playerIndex].classList.contains(player1class) && column2[playerIndex].classList.contains(player1class) && column3[playerIndex].classList.contains(player1class) && column4[playerIndex].classList.contains(player1class)){
      console.log('p1 wins')
    // vertical check
    } else if (playerIndex < 3) { 
      if (column2[playerIndex].classList.contains(player1class) && column2[playerIndex + 1].classList.contains(player1class) && column2[playerIndex + 2].classList.contains(player1class) && column2[playerIndex + 3].classList.contains(player1class)){
        console.log('p1 wins')
      }
    }
  }

  function checkWinC2P2() { // checkWin column2 player 2
    const playerIndex = column2.indexOf(column2.find(e => e.classList.contains(player2class)))
    // horizontal check
    if (column2[playerIndex].classList.contains(player2class) && column3[playerIndex].classList.contains(player2class) && column4[playerIndex].classList.contains(player2class) && column5[playerIndex].classList.contains(player2class)){
      console.log('p2 wins')
    // horizontal check
    } else if (column3[playerIndex].classList.contains(player2class) && column2[playerIndex].classList.contains(player2class) && column1[playerIndex].classList.contains(player2class) && column0[playerIndex].classList.contains(player2class)){
      console.log('p2 wins')
    // horizontal check
    } else if (column1[playerIndex].classList.contains(player2class) && column2[playerIndex].classList.contains(player2class) && column3[playerIndex].classList.contains(player2class) && column4[playerIndex].classList.contains(player2class)){
      console.log('p2 wins')
    // vertical check
    } else if (playerIndex < 3) { 
      if (column2[playerIndex].classList.contains(player2class) && column2[playerIndex + 1].classList.contains(player2class) && column2[playerIndex + 2].classList.contains(player2class) && column2[playerIndex + 3].classList.contains(player2class)){
        console.log('p2 wins')
      }
    }
  }

  function dropColor21() {
    for (let i = 0; i < column2.length; i++) {
      if (column2[column2.length - 1].classList.contains(player1class) || column2[column2.length - 1].classList.contains(player2class)) { // check if last cell has a color
        const found = column2.indexOf(column2.find(e => e.classList.contains(player1class) || e.classList.contains(player2class))) // if so find the first cell with a color
        return column2[found - 1].classList.add(player1class) // add yellow to the cell above the one found
      } else return (column2[column2.length - 1].classList.add(player1class)) // else add yellow to the bottom cell
    }
  }
  function dropColor22() {
    for (let i = 0; i < column2.length; i++) {
      if (column2[column2.length - 1].classList.contains(player1class) || column2[column2.length - 1].classList.contains(player2class)) { // check if last cell has a color
        const found = column2.indexOf(column2.find(e => e.classList.contains(player1class) || e.classList.contains(player2class))) // if so find the first cell with a color
        return column2[found - 1].classList.add(player2class) // add red to the cell above the one found
      } else return (column2[column2.length - 1].classList.add(player2class)) // else add red to the bottom cell
    }
  }

  column3.forEach(e => {
    e.addEventListener('click', () => {
      if (column3[0].classList.contains(player1class) || column3[0].classList.contains(player2class)) return
      if (player1Go === true) {
        player1Go = false
        player2Go = true
        dropColor31()
        checkWinC3P1()
      } else if (player2Go === true) {
        player2Go = false
        player1Go = true
        dropColor32()
        checkWinC3P2()
      }
    })
  })

  function checkWinC3P1() { // checkWin column3 player 1
    const playerIndex = column3.indexOf(column3.find(e => e.classList.contains(player1class)))
    // horizontal check
    if (column3[playerIndex].classList.contains(player1class) && column4[playerIndex].classList.contains(player1class) && column5[playerIndex].classList.contains(player1class) && column6[playerIndex].classList.contains(player1class) ||
    column3[playerIndex].classList.contains(player1class) && column2[playerIndex].classList.contains(player1class) && column1[playerIndex].classList.contains(player1class) && column0[playerIndex].classList.contains(player1class)){
      console.log('p1 wins')
    // horizontal check
    } else if (column5[playerIndex].classList.contains(player1class) && column4[playerIndex].classList.contains(player1class) && column3[playerIndex].classList.contains(player1class) && column2[playerIndex].classList.contains(player1class)) {
      console.log('p1 wins')
    // horizontal check
    } else if (column4[playerIndex].classList.contains(player1class) && column3[playerIndex].classList.contains(player1class) && column2[playerIndex].classList.contains(player1class) && column1[playerIndex].classList.contains(player1class)) {
      console.log('p1 wins')
    // horizontal check
    } else if (column2[playerIndex].classList.contains(player1class) && column3[playerIndex].classList.contains(player1class) && column4[playerIndex].classList.contains(player1class) && column5[playerIndex].classList.contains(player1class)) {
      console.log('p1 wins')
    // horizontal check
    } else if (column1[playerIndex].classList.contains(player1class) && column2[playerIndex].classList.contains(player1class) && column3[playerIndex].classList.contains(player1class) && column4[playerIndex].classList.contains(player1class)) {
      console.log('p1 wins')
    // vertical check
    } else if (playerIndex < 3) { 
      if (column3[playerIndex].classList.contains(player1class) && column3[playerIndex + 1].classList.contains(player1class) && column3[playerIndex + 2].classList.contains(player1class) && column3[playerIndex + 3].classList.contains(player1class)){
        console.log('p1 wins')
      }
    }
  }

  function checkWinC3P2() { // checkWin column3 player 2
    const playerIndex = column3.indexOf(column3.find(e => e.classList.contains(player2class)))
    // horizontal check
    if (column3[playerIndex].classList.contains(player2class) && column4[playerIndex].classList.contains(player2class) && column5[playerIndex].classList.contains(player2class) && column6[playerIndex].classList.contains(player2class) ||
    column3[playerIndex].classList.contains(player2class) && column2[playerIndex].classList.contains(player2class) && column1[playerIndex].classList.contains(player2class) && column0[playerIndex].classList.contains(player2class)){
      console.log('p2 wins')
    // horizontal check
    } else if (column5[playerIndex].classList.contains(player2class) && column4[playerIndex].classList.contains(player2class) && column3[playerIndex].classList.contains(player2class) && column2[playerIndex].classList.contains(player2class)) {
      console.log('p2 wins')
    // horizontal check
    } else if (column4[playerIndex].classList.contains(player2class) && column3[playerIndex].classList.contains(player2class) && column2[playerIndex].classList.contains(player2class) && column1[playerIndex].classList.contains(player2class)) {
      console.log('p2 wins')
    // horizontal check
    } else if (column2[playerIndex].classList.contains(player2class) && column3[playerIndex].classList.contains(player2class) && column4[playerIndex].classList.contains(player2class) && column5[playerIndex].classList.contains(player2class)) {
      console.log('p2 wins')
    // horizontal check
    } else if (column1[playerIndex].classList.contains(player2class) && column2[playerIndex].classList.contains(player2class) && column3[playerIndex].classList.contains(player2class) && column4[playerIndex].classList.contains(player2class)) {
      console.log('p2 wins')
    // vertical check
    } else if (playerIndex < 3) { 
      if (column3[playerIndex].classList.contains(player2class) && column3[playerIndex + 1].classList.contains(player2class) && column3[playerIndex + 2].classList.contains(player2class) && column3[playerIndex + 3].classList.contains(player2class)){
        console.log('p2 wins')
      }
    }
  }

  function dropColor31() {
    for (let i = 0; i < column3.length; i++) {
      if (column3[column3.length - 1].classList.contains(player1class) || column3[column3.length - 1].classList.contains(player2class)) { // check if last cell has a color
        const found = column3.indexOf(column3.find(e => e.classList.contains(player1class) || e.classList.contains(player2class))) // if so find the first cell with a color
        return column3[found - 1].classList.add(player1class) // add yellow to the cell above the one found
      } else return (column3[column3.length - 1].classList.add(player1class)) // else add yellow to the bottom cell
    }
  }
  function dropColor32() {
    for (let i = 0; i < column3.length; i++) {
      if (column3[column3.length - 1].classList.contains(player1class) || column3[column3.length - 1].classList.contains(player2class)) { // check if last cell has a color
        const found = column3.indexOf(column3.find(e => e.classList.contains(player1class) || e.classList.contains(player2class))) // if so find the first cell with a color
        return column3[found - 1].classList.add(player2class) // add red to the cell above the one found
      } else return (column3[column3.length - 1].classList.add(player2class)) // else add red to the bottom cell
    }
  }

  column4.forEach(e => {
    e.addEventListener('click', () => {
      if (player1Go === true) {
        if (column4[0].classList.contains(player1class) || column4[0].classList.contains(player2class)) return
        player1Go = false
        player2Go = true
        dropColor41()
        checkWinC4P1()
      } else if (player2Go === true) {
        player2Go = false
        player1Go = true
        dropColor42()
        checkWinC4P2()
      }
    })
  })

  function checkWinC4P1() { // checkWin column4 player 1
    const playerIndex = column4.indexOf(column4.find(e => e.classList.contains(player1class)))
    // horizontal check
    if (column4[playerIndex].classList.contains(player1class) && column3[playerIndex].classList.contains(player1class) && column2[playerIndex].classList.contains(player1class) && column1[playerIndex].classList.contains(player1class)){
      console.log('p1 wins')
    // horizontal check
    }  else if (column5[playerIndex].classList.contains(player1class) && column4[playerIndex].classList.contains(player1class) && column3[playerIndex].classList.contains(player1class) && column2[playerIndex].classList.contains(player1class)){
      console.log('p1 wins')
    // horizontal check
    } else if (column6[playerIndex].classList.contains(player1class) && column5[playerIndex].classList.contains(player1class) && column4[playerIndex].classList.contains(player1class) && column3[playerIndex].classList.contains(player1class)){
      console.log('p1 wins')
    // vertical check
    } else if (playerIndex < 3) { 
      if (column4[playerIndex].classList.contains(player1class) && column4[playerIndex + 1].classList.contains(player1class) && column4[playerIndex + 2].classList.contains(player1class) && column4[playerIndex + 3].classList.contains(player1class)){
        console.log('p1 wins')
      }
    }
  }

  function checkWinC4P2() { // checkWin column4 player 2
    const playerIndex = column4.indexOf(column4.find(e => e.classList.contains(player2class)))
    // horizontal check
    if (column4[playerIndex].classList.contains(player2class) && column3[playerIndex].classList.contains(player2class) && column2[playerIndex].classList.contains(player2class) && column1[playerIndex].classList.contains(player2class)){
      console.log('p2 wins')
    // horizontal check
    } else if (column5[playerIndex].classList.contains(player2class) && column4[playerIndex].classList.contains(player2class) && column3[playerIndex].classList.contains(player2class) && column2[playerIndex].classList.contains(player2class)){
      console.log('p2 wins')
    // horizontal check
    } else if (column6[playerIndex].classList.contains(player2class) && column5[playerIndex].classList.contains(player2class) && column4[playerIndex].classList.contains(player2class) && column3[playerIndex].classList.contains(player2class)){
      console.log('p2 wins')
    // vertical check
    } else if (playerIndex < 3) { 
      if (column4[playerIndex].classList.contains(player2class) && column4[playerIndex + 1].classList.contains(player2class) && column4[playerIndex + 2].classList.contains(player2class) && column4[playerIndex + 3].classList.contains(player2class)){
        console.log('p2 wins')
      }
    }
  }

  function dropColor41() {
    for (let i = 0; i < column4.length; i++) {
      if (column4[column4.length - 1].classList.contains(player1class) || column4[column4.length - 1].classList.contains(player2class)) { // check if last cell has a color
        const found = column4.indexOf(column4.find(e => e.classList.contains(player1class) || e.classList.contains(player2class))) // if so find the first cell with a color
        return column4[found - 1].classList.add(player1class) // add yellow to the cell above the one found
      } else return (column4[column4.length - 1].classList.add(player1class)) // else add yellow to the bottom cell
    }
  }
  function dropColor42() {
    for (let i = 0; i < column4.length; i++) {
      if (column4[column4.length - 1].classList.contains(player1class) || column4[column4.length - 1].classList.contains(player2class)) { // check if last cell has a color
        const found = column4.indexOf(column4.find(e => e.classList.contains(player1class) || e.classList.contains(player2class))) // if so find the first cell with a color
        return column4[found - 1].classList.add(player2class) // add red to the cell above the one found
      } else return (column4[column4.length - 1].classList.add(player2class)) // else add red to the bottom cell
    }
  }

  column5.forEach(e => {
    e.addEventListener('click', () => {
      if (column5[0].classList.contains(player1class) || column5[0].classList.contains(player2class)) return
      if (player1Go === true) {
        player1Go = false
        player2Go = true
        dropColor51()
        checkWinC5P1()
      } else if (player2Go === true) {
        player2Go = false
        player1Go = true
        dropColor52()
        checkWinC5P2()
      }
    })
  })

  function checkWinC5P1() { // checkWin column5 player 1
    const playerIndex = column5.indexOf(column5.find(e => e.classList.contains(player1class)))
    // horizontal check
    if (column5[playerIndex].classList.contains(player1class) && column4[playerIndex].classList.contains(player1class) && column3[playerIndex].classList.contains(player1class) && column2[playerIndex].classList.contains(player1class)){
      console.log('p1 wins')
    // horizontal check
    } else if (column6[playerIndex].classList.contains(player1class) && column5[playerIndex].classList.contains(player1class) && column4[playerIndex].classList.contains(player1class) && column3[playerIndex].classList.contains(player1class)){
      console.log('p1 wins')
    // vertical check
    } else if (playerIndex < 3) { 
      if (column5[playerIndex].classList.contains(player1class) && column5[playerIndex + 1].classList.contains(player1class) && column5[playerIndex + 2].classList.contains(player1class) && column5[playerIndex + 3].classList.contains(player1class)){
        console.log('p1 wins')
      }
    }
  }

  function checkWinC5P2() { // checkWin column5 player 2
    const playerIndex = column5.indexOf(column5.find(e => e.classList.contains(player2class)))
    // horizontal check
    if (column5[playerIndex].classList.contains(player2class) && column4[playerIndex].classList.contains(player2class) && column3[playerIndex].classList.contains(player2class) && column2[playerIndex].classList.contains(player2class)){
      console.log('p2 wins')
    // horizontal check
    } else if (column6[playerIndex].classList.contains(player2class) && column5[playerIndex].classList.contains(player2class) && column4[playerIndex].classList.contains(player2class) && column3[playerIndex].classList.contains(player2class)){
      console.log('p2 wins')
    // vertical check
    } else if (playerIndex < 3) { 
      if (column5[playerIndex].classList.contains(player2class) && column5[playerIndex + 1].classList.contains(player2class) && column5[playerIndex + 2].classList.contains(player2class) && column5[playerIndex + 3].classList.contains(player2class)){
        console.log('p2 wins')
      }
    }
  }

  function dropColor51() {
    for (let i = 0; i < column5.length; i++) {
      if (column5[column5.length - 1].classList.contains(player1class) || column5[column5.length - 1].classList.contains(player2class)) { // check if last cell has a color
        const found = column5.indexOf(column5.find(e => e.classList.contains(player1class) || e.classList.contains(player2class))) // if so find the first cell with a color
        return column5[found - 1].classList.add(player1class) // add yellow to the cell above the one found
      } else return (column5[column5.length - 1].classList.add(player1class)) // else add yellow to the bottom cell
    }
  }
  function dropColor52() {
    for (let i = 0; i < column5.length; i++) {
      if (column5[column5.length - 1].classList.contains(player1class) || column5[column5.length - 1].classList.contains(player2class)) { // check if last cell has a color
        const found = column5.indexOf(column5.find(e => e.classList.contains(player1class) || e.classList.contains(player2class))) // if so find the first cell with a color
        return column5[found - 1].classList.add(player2class) // add red to the cell above the one found
      } else return (column5[column5.length - 1].classList.add(player2class)) // else add red to the bottom cell
    }
  }

  column6.forEach(e => {
    e.addEventListener('click', () => {
      if (column6[0].classList.contains(player1class) || column6[0].classList.contains(player2class)) return
      if (player1Go === true) {
        player1Go = false
        player2Go = true
        dropColor61()
        checkWinC6P1()
      } else if (player2Go === true) {
        player2Go = false
        player1Go = true
        dropColor62()
        checkWinC6P2()
      }
    })
  })

  function checkWinC6P1() { // checkWin column6 player 1
    const playerIndex = column6.indexOf(column6.find(e => e.classList.contains(player1class)))
    // horizontal check
    if (column6[playerIndex].classList.contains(player1class) && column5[playerIndex].classList.contains(player1class) && column4[playerIndex].classList.contains(player1class) && column3[playerIndex].classList.contains(player1class)){
      console.log('p1 wins')
    // vertical check
    } else if (playerIndex < 3) { 
      if (column6[playerIndex].classList.contains(player1class) && column6[playerIndex + 1].classList.contains(player1class) && column6[playerIndex + 2].classList.contains(player1class) && column6[playerIndex + 3].classList.contains(player1class)){
        console.log('p1 wins')
      }
    }
  }

  function checkWinC6P2() { // checkWin column6 player 2
    const playerIndex = column6.indexOf(column6.find(e => e.classList.contains(player2class)))
    // horizontal check
    if (column6[playerIndex].classList.contains(player2class) && column5[playerIndex].classList.contains(player2class) && column4[playerIndex].classList.contains(player2class) && column3[playerIndex].classList.contains(player2class)){
      console.log('p2 wins')
    // vertical check
    } else if (playerIndex < 3) { 
      if (column6[playerIndex].classList.contains(player2class) && column6[playerIndex + 1].classList.contains(player2class) && column6[playerIndex + 2].classList.contains(player2class) && column6[playerIndex + 3].classList.contains(player2class)){
        console.log('p2 wins')
      }
    }
  }

  function dropColor61() {
    for (let i = 0; i < column6.length; i++) {
      if (column6[column6.length - 1].classList.contains(player1class) || column6[column6.length - 1].classList.contains(player2class)) { // check if last cell has a color
        const found = column6.indexOf(column6.find(e => e.classList.contains(player1class) || e.classList.contains(player2class))) // if so find the first cell with a color
        return column6[found - 1].classList.add(player1class) // add yellow to the cell above the one found
      } else return (column6[column6.length - 1].classList.add(player1class)) // else add yellow to the bottom cell
    }
  }
  function dropColor62() {
    for (let i = 0; i < column6.length; i++) {
      if (column6[column6.length - 1].classList.contains(player1class) || column6[column6.length - 1].classList.contains(player2class)) { // check if last cell has a color
        const found = column6.indexOf(column6.find(e => e.classList.contains(player1class) || e.classList.contains(player2class))) // if so find the first cell with a color
        return column6[found - 1].classList.add(player2class) // add red to the cell above the one found
      } else return (column6[column6.length - 1].classList.add(player2class)) // else add red to the bottom cell
    }
  }




}
window.addEventListener('DOMContentLoaded', init)



// switch (i){
//   case i:
//     if (i + 35 < ){
//     playerIndex += width //move down
//     console.log(playerIndex)
// }
//   break
// case 37:
//   if (playerIndex % width > 0){
//     playerIndex-- //move one by everytime left
//   }
//   break
// case 40:
//   if (playerIndex + width < width * height){
//     playerIndex += width //move down
//     console.log(playerIndex)
//   }
//   break
// case 38:
//   if (playerIndex - width >= 0 ){
//     playerIndex -= width// move up
//   }
//   break
// default: 
//   console.log('player shouldnt move')


// circles.forEach(e => e.addEventListener('click', () => {
//   if(e.circles)
// }
// )
// )

// circles.forEach(e => 
//   e.addEventListener('click', () => {
//     e.classList.add('red')
//   })
// )
