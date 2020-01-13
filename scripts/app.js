
function init() {
  //  DOM Variables
  const grid = document.querySelector('.grid') //The game grid
  const circles = [] //Belongs here as you fill the array with DOM references eventhough genallly it should be in the game variables
  const musicbttn = document.querySelector('#Banjo') //The banjo that plays music when clicked
  const music = document.querySelector('#music') //Audio music
  const soundFX = document.querySelector('#guns') //Audio guns
  const soundFX2 = document.querySelector('#guns2') //Audio guns2
  const soundFX3 = document.querySelector('#yeehaw') //Audio yeehaw
  const twoPlayerBtns = document.querySelectorAll('.duel') // 2 Player mode button
  const singlePlayerBtns = document.querySelectorAll('.single') // Single player
  const start = document.querySelector('.start') //Start Menu
  const sides = document.querySelectorAll('.side') //Sides the show player name and token
  const resetbtn = document.querySelector('#reset') //Reset button
  const finish = document.querySelector('.finish') //End menu
  const winner = document.querySelector('#winner') //Winner name html

  // Game Variables
  const width = 7 //if you want grid bigger, change this then change styling in css accordingly
  const height = 6 //if you want grid bigger, change this then change styling in css accordingly
  const P1Cls = 'yellow' // Player 1 colour
  const P2Cls = 'red' // Player 2 colour
  const winFlip = 'flip' // Win animation
  let playerGo = true //if its true it's Player 1's go
  let inPlay = true //if its true the game is in play
  let musicplaying = false //if its true music is playing
  let computer = false
  let turns = 0
  let playerMessage = true
  let wait = true
  
  //loop empty array (HOW TO MAKE A SIMPLE GRID)
  Array(width * height).join('.').split('.').forEach((num, i) => {
    const circle = document.createElement('div')
    circle.classList.add('grid-item')
    circle.setAttribute('data-id', i)
    circles.push(circle)
    grid.appendChild(circle)
  })

  const col0 = circles.filter((e, i) => i % 7 === 0) //make into object for refactoring
  const col1 = circles.filter((e, i) => i % 7 === 1)
  const col2 = circles.filter((e, i) => i % 7 === 2)
  const col3 = circles.filter((e, i) => i % 7 === 3)
  const col4 = circles.filter((e, i) => i % 7 === 4)
  const col5 = circles.filter((e, i) => i % 7 === 5)
  const col6 = circles.filter((e, i) => i % 7 === 6)

  // Change Player
  function changePlayer(){ 
    playerMessage = !playerMessage
    if (!computer){
      playerGo = !playerGo
    }
  }

  function columnFunctionsP1(){
    playguns()
    draw()
    changePlayer()
    compturn()
    changeWait()
    turns++
  }

  function columnFunctionsP2(){
    playguns2()
    draw()
    changePlayer()
    changeWait()
    turns++
  }

  //Event listener for music button
  musicbttn.addEventListener('click', playSound)
  function playSound() {
    if (!musicplaying){
      musicplaying = !musicplaying
      musicbttn.src = 'assets/banjo_off.png'
      music.play()
    } else if (musicplaying){
      musicbttn.src = 'assets/banjo.png'
      musicplaying = !musicplaying
      music.pause()
    }
  }

  //Play buttons

  //start game single player
  singlePlayerBtns.forEach(btn => {
    btn.addEventListener('click', singleStartGame)
  })

  function singleStartGame(){
    turns = 0
    playguns()
    computer = true
    playerGo = true
    inPlay = true
    start.style.display = 'none'
    grid.style.display = 'flex'
    resetbtn.style.visibility = 'visible'
    sides.forEach(side => {
      side.style.display = 'flex'
    })
    finish.style.display = 'none'
  }

  //start game 2 player
  twoPlayerBtns.forEach(btn => {
    btn.addEventListener('click', duelStartGame)
  })

  //singleplayer game
  function duelStartGame(){
    turns = 0
    playguns()
    playerGo = true
    inPlay = true
    start.style.display = 'none'
    grid.style.display = 'flex'
    resetbtn.style.visibility = 'visible'
    sides.forEach(side => {
      side.style.display = 'flex'
    })
    finish.style.display = 'none'
  }

  // play computer
  function compturn(){
    if (computer){
      setTimeout(createMove, 300)
      draw()
      setTimeout(changeWait, 200)
      turns++
    }
  }

  //reset
  resetbtn.addEventListener('click', reset)
  //Clears grid and goes back to menu
  function reset(){
    clearGrid()
    grid.style.display = 'none'
    start.style.display = 'flex'
    finish.style.display = 'none'
    resetbtn.style.visibility = 'hidden'
    sides.forEach(side => {
      side.style.display = 'none'
    })
  }

  //clears grid
  function clearGrid() {
    wipevals()
    circles.map(e => {
      e.classList.remove(P1Cls)
      e.classList.remove(P2Cls)
      e.classList.remove(winFlip)
    })
  }

  //Clears grid and goes to win or draw menu
  function finMenu(){
    clearGrid()
    grid.style.display = 'none'
    finish.style.display = 'flex'
    resetbtn.style.visibility = 'hidden'
    sides.forEach(side => {
      side.style.display = 'none'
    })
  }

  //Draw
  function draw(){
    if (turns === 41){
      wipevals() // computer = false, turns = 0, inplay = !inplay
      resetbtn.style.visibility = 'hidden'
      setTimeout(finMenu, 2000)
      winner.innerHTML = '<br>It\'s a tie!'
    }
  }
  
  //Choose winner
  function checkWin(){
    if (computer){
      if (!playerMessage){
        winner.innerHTML = '<br>Congrats You win!'
      } else {
        winner.innerHTML = '<br>You lose'
      }
      wipevals() // computer = false, turns = 0, inplay = !inplay
      resetbtn.style.visibility = 'hidden'
      yeehaw() //Plays cowboy sound
      setTimeout(finMenu, 2000)
      
    } else {
      wipevals() // computer = false, turns = 0, inplay = !inplay
      resetbtn.style.visibility = 'hidden'
      yeehaw() //Plays cowboy sound
      setTimeout(finMenu, 2000)
      if (playerGo){
        winner.innerHTML = '<br>Congrats Player 1'
      } else winner.innerHTML = '<br>Congrats Player 2'
    }
  }

  function changeWait(){
    wait = !wait
  }

  // wipes values
  function wipevals(){
    computer = false
    turns = 0
    inPlay = !inPlay
    playerMessage = true
    wait = true
  }


  // Code for AI

  //columns
  const columns = {
    i: circles.filter((e, i) => i % 7 === 0),
    ii: circles.filter((e, i) => i % 7 === 1),
    iii: circles.filter((e, i) => i % 7 === 2),
    iiii: circles.filter((e, i) => i % 7 === 3),
    iiiii: circles.filter((e, i) => i % 7 === 4),
    iiiiii: circles.filter((e, i) => i % 7 === 5),
    iiiiiii: circles.filter((e, i) => i % 7 === 6)
  }

  const col = Object.keys(columns)

  function checkMove(){
    for (let i = 0; i < col.length; i++){
      let count = 0
      const curntCol = columns[col[i]] // Loop through each coloumn
      let avaiSpot = curntCol.indexOf(curntCol.find(e => e.classList.contains(P1Cls) || e.classList.contains(P2Cls)))
      avaiSpot-- //find spot above a filled spot
      if (avaiSpot === -2){ // if empty return it as 5
        avaiSpot = 5
      }
      const below = avaiSpot + 1
      //verticle check
      console.log(curntCol)
      if (avaiSpot === 5) count = 0 // gets to the end of the second coloum and stops
    
      if (curntCol[below]){
        console.log('below')
      }
    
      // }

    // 
    // if (belowAvaiSpot === 6) return
    // console.log(count)
    // console.log(belowAvaiSpot)
    // if (belowAvaiSpot < 6) {
    //   for (let b = 1; b < 5; b++){
    //     if (curntCol[belowAvaiSpot + b].classList.contains(P2Cls)) {
    //       count++
    //       console.log('hi')
    //       console.log(count)
    //     } 
    //   }
    }
  }

  function createMove(){
    checkMove()
    const arrayChoice = [0,0,0,0,0,0,0]
    arrayChoice[0] = 0
    arrayChoice[1] = 0
    arrayChoice[2] = 0
    arrayChoice[3] = 4
    arrayChoice[4] = 0
    arrayChoice[5] = 0
    arrayChoice[6] = 0

    const maxNumber = Math.max(...arrayChoice)
    const playHere = arrayChoice.indexOf(maxNumber)

    if (playHere === 0) {
      dropColor02()
      checkWinC0P2()
    }
    if (playHere === 1) {
      dropColor12()
      checkWinC1P2()
    }
    if (playHere === 2) {
      dropColor22()
      checkWinC2P2()
    }
    if (playHere === 3) {
      dropColor32()
      checkWinC3P2()
    }
    if (playHere === 4) {
      dropColor42()
      checkWinC4P2()
    }
    if (playHere === 5) {
      dropColor52()
      checkWinC5P2()
    }
    if (playHere === 6) {
      dropColor62()
      checkWinC6P2()
    }
  }

  // function checkMove(){
    
  //   let spot = col3.indexOf(col3.find(e => e.classList.contains(P1Cls) || e.classList.contains(P2Cls)))
  //   spot = spot - 1 // find available spot in coloumn
  //   if (spot === -2){ // if empty return it as 5
  //     spot = 5
  //   }
  //   const a = 3
  //   const col = col
  //   if (col + a + [spot + 1].classList.contains(P2Cls)) {
  //     console.log('work')
  //   }
    
  // console.log(spot)
      
      
      
  // console.log(typeof(col + `${a}` + `[${spot + i}]` + class2))
  // const vertcheck = col + `${a}` + `[${spot + i}]` + class2
  // console.log(vertcheck)
  // if (vertcheck){
  //   console.log('+1')
  // }
  //}
  // }
  
  
  // for()
  // console.log(columns.`${i}`)


  // when the user clicks AI drops a color
  // AI finds available spot
  // let spot1 = 5
  // spot1 = col1.indexOf(col1.find(e => e.classList.contains(P1Cls) || e.classList.contains(P2Cls)) - 1
  // looks around spot
  // if spot is in a line of two, + 2 to decision

  // arrayChoice[1] = 2

  // scores for AI

  // + 4 for center column or col3
  // + 2 for colour found in line
 
  // find AI's colors (1)
  // place colors in columns
  // [0 0 0 0 0
  //  0 0 0 0 0
  //  0 2 6 0 0
  //  0 x 1 2 2]

  // if (col1[spot1 + 1].classList(P2Cls) && col1[spot1 + 2].classList(P2Cls)) + 5 to arrayChoice[1] two below
  // if (col1[spot1 + 1].classList(P2Cls) && col1[spot1 + 2].classList(P2Cls) && col1[spot1 + 3].classList(P2Cls)) + 20 to arrayChoice[1] three below
  

  // if (col`${a}[spot + i].classList(P2Cls)) cycle through below + 2 for each true
  // if (col`${a}[spot + i].classList(P1Cls)) cycle through below - 2 for each true

  // if (col`${a - i}`[spot].classList(P2Cls)) cycle through left + 2 for each true
  // if (col`${a - i}`[spot].classList(P1Cls)) cycle through left - 2 for each true

  // if (col1[spot1 + 1].classList(P2Cls)){+ 2 to arrayChoice[1]} one below
  // if (col1[spot1 + 2].classList(P2Cls)){+ 2 to arrayChoice[1]} one below
  // if (col1[spot1 + 3].classList(P2Cls)){+ 2 to arrayChoice[1]} one below
  // if (col1[spot1 + 4].classList(P2Cls)){+ 2 to arrayChoice[1]} one below
 

  // if (col2[spot1].classList(P2Cls)) + 2 to arrayChoice[1] one below
  // columnx[aiColor] && columx + 1 [aiColor] horizontal right
  // columx[aiColor] && columx + 2 [aiColor] horizontal right
  // columx[aiColor] && columx + 3 [aiColor] horizontal right
 
  
  // columnx[aiColor] && columx - 1 [aiColor] horizontal left
  // columnx[aiColor] && columx - 2 [aiColor] horizontal left
  // columnx[aiColor] && columx - 1 [aiColor] horizontal left
  // columnx[aiColor] && columx - 4 [aiColor] horizontal left
  
  // columnx[aiColor] && columx - 1 [aiColor + 1] diagonal down left
  // columnx[aiColor] && columx - 1 [aiColor - 1] diagonal up left
  // columnx[aiColor] && columx + 1 [aiColor + 1] diagonal down right
  // columnx[aiColor] && columx + 1 [aiColor - 1] diagonal up right

  // so a line of 3 would be + 5 
  // columnx[aiColor] && columx[aiColor - 1] && columx[aiColor - 2]   two above

  // columnx[aiColor] && columx + 1 [aiColor] && columx + 2 [aiColor] horizontal right
  // columnx[aiColor] && columx - 1 [aiColor] && columx - 2 [aiColor] horizontal left
  // columnx[aiColor] && columx - 1 [aiColor] && columx + 1 [aiColor] horizontal center

  // columnx[aiColor] && columx - 1 [aiColor + 1] && columx - 2 [aiColor + 2] diagonal down left/
  // columnx[aiColor] && columx - 1 [aiColor + 1] && columx + 1 [aiColor - 1] diagonal center/
  // columnx[aiColor] && columx + 1 [aiColor - 1] && columx + 2 [aiColor - 2] diagonal up right/

  // columnx[aiColor] && columx + 1 [aiColor + 1] && columx + 2 [aiColor + 2] diagonal down right\
  // columnx[aiColor] && columx + 1 [aiColor + 1] && columx - 1 [aiColor - 1] diagonal center\
  // columnx[aiColor] && columx - 1 [aiColor - 1] && columx - 2 [aiColor - 2] diagonal up left\

  
  // columnx[aiColor] && columx + 1 [aiColor + 1] diagonal up right

  // + 5 for lines of three
  
  // function minmax(position, depth, maxPlayer){}

  //sounds

  // Winning sound
  function yeehaw() { //Plays cowboy sound
    if (musicplaying) {
      soundFX3.play()
    }
  }

  // gun sounds
  function playguns() {
    if (musicplaying) {
      const randomNum = (Math.ceil(Math.random() * 10))
      if (randomNum > 5) {
        randomNum - 4
      }
      switch (randomNum){
        case 1:
          soundFX.src = 'assets/Gun1.mp3'
          soundFX.play()
          break
        case 2:
          soundFX.src = 'assets/Gun2.mp3'
          soundFX.play()
          break
        case 3:
          soundFX.src = 'assets/Gun3.mp3'
          soundFX.play()
          break
        case 4:
          soundFX.src = 'assets/Gun4.mp3'
          soundFX.play()
          break
        case 5:
          soundFX.src = 'assets/Gun5.mp3'
          soundFX.play()
          break
        default:
          soundFX2.src = 'assets/Gun1.mp3'
          soundFX2.play()
      }
    }
  }
  function playguns2() {
    if (musicplaying) {
      const randomNum = (Math.ceil(Math.random() * 10))
      if (randomNum < 5) {
        randomNum + 5
      }
      switch (randomNum){
        case 6:
          soundFX2.src = 'assets/Gun6.mp3'
          soundFX2.play()
          break
        case 7:
          soundFX2.src = 'assets/Gun7.mp3'
          soundFX2.play()
          break
        case 8:
          soundFX2.src = 'assets/Gun8.mp3'
          soundFX2.play()
          break
        case 9:
          soundFX2.src = 'assets/Gun9.mp3'
          soundFX2.play()
          break
        case 10:
          soundFX2.src = 'assets/Gun10.mp3'
          soundFX2.play()
          break
        default:
          soundFX2.src = 'assets/Gun1.mp3'
          soundFX2.play()
      }
    }
  }

  col0.forEach(e => { // Listener for column 0
    e.addEventListener('click', () => {
      if (col0[0].classList.contains(P1Cls) || col0[0].classList.contains(P2Cls)) return // do nothing if col is full or winner is found
      if (!inPlay) return
      if (playerGo && wait) {
        dropColor01()
        checkWinC0P1()
        columnFunctionsP1()
      } else if (!playerGo && !computer) {
        dropColor02()
        checkWinC0P2()
        columnFunctionsP2()
      }
    })
  })

  function checkWinC0P1() { // checkWin col0 player 1
    const pIdx = col0.indexOf(col0.find(e => e.classList.contains(P1Cls))) // find the index of color 1
    // horizontal check
    if (col0[pIdx].classList.contains(P1Cls) && col1[pIdx].classList.contains(P1Cls) && col2[pIdx].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls)){
      col0[pIdx].classList.add(winFlip)
      col1[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()

      // vertical check
    } if (pIdx < 3) { 
      if (col0[pIdx].classList.contains(P1Cls) && col0[pIdx + 1].classList.contains(P1Cls) && col0[pIdx + 2].classList.contains(P1Cls) && col0[pIdx + 3].classList.contains(P1Cls)){
        col0[pIdx].classList.add(winFlip)
        col0[pIdx + 1].classList.add(winFlip)
        col0[pIdx + 2].classList.add(winFlip)
        col0[pIdx + 3].classList.add(winFlip)
        return checkWin()

        // diagonal down right
      } if (col3[pIdx + 3].classList.contains(P1Cls) && col2[pIdx + 2].classList.contains(P1Cls) && col1[pIdx + 1].classList.contains(P1Cls) && col0[pIdx].classList.contains(P1Cls)) {
        col0[pIdx].classList.add(winFlip)
        col1[pIdx + 1].classList.add(winFlip)
        col2[pIdx + 2].classList.add(winFlip)
        col3[pIdx + 3].classList.add(winFlip)
        return checkWin()
      } 
    
      // diagonal up right
    } if (pIdx > 2) {
      if (col3[pIdx - 3].classList.contains(P1Cls) && col2[pIdx - 2].classList.contains(P1Cls) && col1[pIdx - 1].classList.contains(P1Cls) && col0[pIdx].classList.contains(P1Cls)) {
        col0[pIdx].classList.add(winFlip)
        col1[pIdx - 1].classList.add(winFlip)
        col2[pIdx - 2].classList.add(winFlip)
        col3[pIdx - 3].classList.add(winFlip)
        return checkWin()
      }
    }
  }

  function checkWinC0P2() { // checkWin col0 player 2
    const pIdx = col0.indexOf(col0.find(e => e.classList.contains(P2Cls)))
    // horizontal check
    if (col0[pIdx].classList.contains(P2Cls) && col1[pIdx].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls)){
      col0[pIdx].classList.add(winFlip)
      col1[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()

      // vertical check 
    } if (pIdx < 3) {
      if (col0[pIdx].classList.contains(P2Cls) && col0[pIdx + 1].classList.contains(P2Cls) && col0[pIdx + 2].classList.contains(P2Cls) && col0[pIdx + 3].classList.contains(P2Cls)){
        col0[pIdx].classList.add(winFlip)
        col0[pIdx + 1].classList.add(winFlip)
        col0[pIdx + 2].classList.add(winFlip)
        col0[pIdx + 3].classList.add(winFlip)
        return checkWin()

        // diagonal down right \
      } if (col3[pIdx + 3].classList.contains(P2Cls) && col2[pIdx + 2].classList.contains(P2Cls) && col1[pIdx + 1].classList.contains(P2Cls) && col0[pIdx].classList.contains(P2Cls)) {
        col0[pIdx].classList.add(winFlip)
        col1[pIdx + 1].classList.add(winFlip)
        col2[pIdx + 2].classList.add(winFlip)
        col3[pIdx + 3].classList.add(winFlip)
        return checkWin()
      } 
      
      // diagonal up right /
    } if (pIdx > 2) {
      if (col3[pIdx - 3].classList.contains(P2Cls) && col2[pIdx - 2].classList.contains(P2Cls) && col1[pIdx - 1].classList.contains(P2Cls) && col0[pIdx].classList.contains(P2Cls)) {
        col0[pIdx].classList.add(winFlip)
        col1[pIdx - 1].classList.add(winFlip)
        col2[pIdx - 2].classList.add(winFlip)
        col3[pIdx - 3].classList.add(winFlip)
        return checkWin()
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
      if (col1[0].classList.contains(P1Cls) || col1[0].classList.contains(P2Cls)) return // do nothing if col is full or winner is found
      if (!inPlay) return
      if (playerGo) {
        dropColor11()
        checkWinC1P1()
        columnFunctionsP1()
      } else if (!playerGo) {
        dropColor12()
        checkWinC1P2()
        columnFunctionsP2()
      }
    })
  })

  function checkWinC1P1() { // checkWin col1 player 1
    const pIdx = col1.indexOf(col1.find(e => e.classList.contains(P1Cls)))
    // horizontal check
    if (col1[pIdx].classList.contains(P1Cls) && col2[pIdx].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls)){
      col4[pIdx].classList.add(winFlip)
      col1[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()
    } if (col0[pIdx].classList.contains(P1Cls) && col1[pIdx].classList.contains(P1Cls) && col2[pIdx].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls)){
      col0[pIdx].classList.add(winFlip)
      col1[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()

      // diagonal up right /
    } if (pIdx > 2) {
      if (col4[pIdx - 3].classList.contains(P1Cls) && col3[pIdx - 2].classList.contains(P1Cls) && col2[pIdx - 1].classList.contains(P1Cls) && col1[pIdx].classList.contains(P1Cls)) {
        col1[pIdx].classList.add(winFlip)
        col2[pIdx - 1].classList.add(winFlip)
        col3[pIdx - 2].classList.add(winFlip)
        col4[pIdx - 3].classList.add(winFlip)
        return checkWin()
      }
      // diagonal up right /
    } if (pIdx < 5 && pIdx > 1 ) {
      if (col3[pIdx - 2].classList.contains(P1Cls) && col2[pIdx - 1].classList.contains(P1Cls) && col1[pIdx].classList.contains(P1Cls) && col0[pIdx + 1].classList.contains(P1Cls)) {
        col0[pIdx + 1].classList.add(winFlip)
        col1[pIdx].classList.add(winFlip)
        col2[pIdx - 1].classList.add(winFlip)
        col3[pIdx - 2].classList.add(winFlip)
        return checkWin()
      }
    
      // diagonal down right \
    } if (pIdx < 3) {
      if (col4[pIdx + 3].classList.contains(P1Cls) && col3[pIdx + 2].classList.contains(P1Cls) && col2[pIdx + 1].classList.contains(P1Cls) && col1[pIdx].classList.contains(P1Cls)) {
        col1[pIdx].classList.add(winFlip)
        col2[pIdx + 1].classList.add(winFlip)
        col3[pIdx + 2].classList.add(winFlip)
        col4[pIdx + 3].classList.add(winFlip)
        return checkWin()
      }
      // diagonal down right \
    } if (pIdx < 4 && pIdx > 0) {
      if (col3[pIdx + 2].classList.contains(P1Cls) && col2[pIdx + 1].classList.contains(P1Cls) && col1[pIdx].classList.contains(P1Cls) && col0[pIdx - 1].classList.contains(P1Cls)) {
        col0[pIdx - 1].classList.add(winFlip)
        col1[pIdx].classList.add(winFlip)
        col2[pIdx + 1].classList.add(winFlip)
        col3[pIdx + 2].classList.add(winFlip)
        return checkWin()
      }

      // vertical check
    } if (pIdx < 3) {
      if (col1[pIdx].classList.contains(P1Cls) && col1[pIdx + 1].classList.contains(P1Cls) && col1[pIdx + 2].classList.contains(P1Cls) && col1[pIdx + 3].classList.contains(P1Cls)){
        col1[pIdx].classList.add(winFlip)
        col1[pIdx + 1].classList.add(winFlip)
        col1[pIdx + 2].classList.add(winFlip)
        col1[pIdx + 3].classList.add(winFlip)
        return checkWin()
      }
    }
  }
    
  function checkWinC1P2() { // checkWin col1 player 2
    const pIdx = col1.indexOf(col1.find(e => e.classList.contains(P2Cls)))
    // horizontal check
    if (col1[pIdx].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls)){
      col4[pIdx].classList.add(winFlip)
      col1[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()
    } if (col0[pIdx].classList.contains(P2Cls) && col1[pIdx].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls)){
      col0[pIdx].classList.add(winFlip)
      col1[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()
  
      // diagonal up right /
    } if (pIdx > 2) {
      if (col4[pIdx - 3].classList.contains(P2Cls) && col3[pIdx - 2].classList.contains(P2Cls) && col2[pIdx - 1].classList.contains(P2Cls) && col1[pIdx].classList.contains(P2Cls)) {
        col1[pIdx].classList.add(winFlip)
        col2[pIdx - 1].classList.add(winFlip)
        col3[pIdx - 2].classList.add(winFlip)
        col4[pIdx - 3].classList.add(winFlip)
        return checkWin()
      }
      // diagonal up right /
    } if (pIdx < 5 && pIdx > 1 ) {
      if (col3[pIdx - 2].classList.contains(P2Cls) && col2[pIdx - 1].classList.contains(P2Cls) && col1[pIdx].classList.contains(P2Cls) && col0[pIdx + 1].classList.contains(P2Cls)) {
        col0[pIdx + 1].classList.add(winFlip)
        col1[pIdx].classList.add(winFlip)
        col2[pIdx - 1].classList.add(winFlip)
        col3[pIdx - 2].classList.add(winFlip)
        return checkWin()
      }
      
      // diagonal down right \
    } if (pIdx < 3) {
      if (col4[pIdx + 3].classList.contains(P2Cls) && col3[pIdx + 2].classList.contains(P2Cls) && col2[pIdx + 1].classList.contains(P2Cls) && col1[pIdx].classList.contains(P2Cls)) {
        col1[pIdx].classList.add(winFlip)
        col2[pIdx + 1].classList.add(winFlip)
        col3[pIdx + 2].classList.add(winFlip)
        col4[pIdx + 3].classList.add(winFlip)
        return checkWin()
      }
      // diagonal down right \
    } if (pIdx < 4 && pIdx > 0) {
      if (col3[pIdx + 2].classList.contains(P2Cls) && col2[pIdx + 1].classList.contains(P2Cls) && col1[pIdx].classList.contains(P2Cls) && col0[pIdx - 1].classList.contains(P2Cls)) {
        col0[pIdx - 1].classList.add(winFlip)
        col1[pIdx].classList.add(winFlip)
        col2[pIdx + 1].classList.add(winFlip)
        col3[pIdx + 2].classList.add(winFlip)
        return checkWin()
      }
  
      // vertical check
    } if (pIdx < 3) {
      if (col1[pIdx].classList.contains(P2Cls) && col1[pIdx + 1].classList.contains(P2Cls) && col1[pIdx + 2].classList.contains(P2Cls) && col1[pIdx + 3].classList.contains(P2Cls)){
        col1[pIdx].classList.add(winFlip)
        col1[pIdx + 1].classList.add(winFlip)
        col1[pIdx + 2].classList.add(winFlip)
        col1[pIdx + 3].classList.add(winFlip)
        return checkWin()
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
      if (col2[0].classList.contains(P1Cls) || col2[0].classList.contains(P2Cls)) return // do nothing if col is full or winner is found
      if (!inPlay) return
      if (playerGo) {
        dropColor21()
        checkWinC2P1()
        columnFunctionsP1()
      } else if (!playerGo) {
        dropColor22()
        checkWinC2P2()
        columnFunctionsP2()
      }
    })
  })

  function checkWinC2P1() { // checkWin col2 player 1
    const pIdx = col2.indexOf(col2.find(e => e.classList.contains(P1Cls)))
    // horizontal check
    if (col2[pIdx].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls) && col5[pIdx].classList.contains(P1Cls)){
      col5[pIdx].classList.add(winFlip)
      col4[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()
    } if (col1[pIdx].classList.contains(P1Cls) && col2[pIdx].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls)){
      col4[pIdx].classList.add(winFlip)
      col1[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()
    } if (col0[pIdx].classList.contains(P1Cls) && col1[pIdx].classList.contains(P1Cls) && col2[pIdx].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls)){
      col0[pIdx].classList.add(winFlip)
      col1[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()
  
      // diagonal up right /
    } if (pIdx > 2) {
      if (col5[pIdx - 3].classList.contains(P1Cls) && col4[pIdx - 2].classList.contains(P1Cls) && col3[pIdx - 1].classList.contains(P1Cls) && col2[pIdx].classList.contains(P1Cls)) {
        col2[pIdx].classList.add(winFlip)
        col3[pIdx - 1].classList.add(winFlip)
        col4[pIdx - 2].classList.add(winFlip)
        col5[pIdx - 3].classList.add(winFlip)
        return checkWin()
      }
      // diagonal up right / 
    } if (pIdx < 5 && pIdx > 1 ) {
      if (col4[pIdx - 2].classList.contains(P1Cls) && col3[pIdx - 1].classList.contains(P1Cls) && col2[pIdx].classList.contains(P1Cls) && col1[pIdx + 1].classList.contains(P1Cls)) {
        col1[pIdx + 1].classList.add(winFlip)
        col2[pIdx].classList.add(winFlip)
        col3[pIdx - 1].classList.add(winFlip)
        col4[pIdx - 2].classList.add(winFlip)
        return checkWin()
      }
      // diagonal up right /
    } if (pIdx < 4 && pIdx > 0 ) {
      if (col3[pIdx - 1].classList.contains(P1Cls) && col2[pIdx].classList.contains(P1Cls) && col1[pIdx + 1].classList.contains(P1Cls) && col0[pIdx + 2].classList.contains(P1Cls)) {
        col0[pIdx + 2].classList.add(winFlip)
        col1[pIdx + 1].classList.add(winFlip)
        col2[pIdx].classList.add(winFlip)
        col3[pIdx - 1].classList.add(winFlip)
        return checkWin()
      }
      
      // diagonal down right \
    } if (pIdx < 3) {
      if (col5[pIdx + 3].classList.contains(P1Cls) && col4[pIdx + 2].classList.contains(P1Cls) && col3[pIdx + 1].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls)) {
        col2[pIdx].classList.add(winFlip)
        col3[pIdx + 1].classList.add(winFlip)
        col4[pIdx + 2].classList.add(winFlip)
        col5[pIdx + 3].classList.add(winFlip)
        return checkWin()
      }
      // diagonal down right \
    } if (pIdx < 4 && pIdx > 0) {
      if (col4[pIdx + 2].classList.contains(P1Cls) && col3[pIdx + 1].classList.contains(P1Cls) && col2[pIdx].classList.contains(P1Cls) && col1[pIdx - 1].classList.contains(P1Cls)) {
        col1[pIdx - 1].classList.add(winFlip)
        col2[pIdx].classList.add(winFlip)
        col3[pIdx + 1].classList.add(winFlip)
        col4[pIdx + 2].classList.add(winFlip)
        return checkWin()
      }
      // diagonal down right \
    } if (pIdx < 5 && pIdx > 1) {
      if (col3[pIdx + 1].classList.contains(P1Cls) && col2[pIdx].classList.contains(P1Cls) && col1[pIdx - 1].classList.contains(P1Cls) && col0[pIdx - 2].classList.contains(P1Cls)) {
        col0[pIdx - 2].classList.add(winFlip)
        col1[pIdx - 1].classList.add(winFlip)
        col2[pIdx].classList.add(winFlip)
        col3[pIdx + 1].classList.add(winFlip)
        return checkWin()
      }
  
      // vertical check
    } if (pIdx < 3) {
      if (col2[pIdx].classList.contains(P1Cls) && col2[pIdx + 1].classList.contains(P1Cls) && col2[pIdx + 2].classList.contains(P1Cls) && col2[pIdx + 3].classList.contains(P1Cls)){
        col2[pIdx].classList.add(winFlip)
        col2[pIdx + 1].classList.add(winFlip)
        col2[pIdx + 2].classList.add(winFlip)
        col2[pIdx + 3].classList.add(winFlip)
        return checkWin()
      }
    }
  }

  function checkWinC2P2() { // checkWin col2 player 2
    const pIdx = col2.indexOf(col2.find(e => e.classList.contains(P2Cls)))
    // horizontal check
    if (col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col5[pIdx].classList.contains(P2Cls)){
      col5[pIdx].classList.add(winFlip)
      col4[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()
    } if (col1[pIdx].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls)){
      col4[pIdx].classList.add(winFlip)
      col1[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()
    } if (col0[pIdx].classList.contains(P2Cls) && col1[pIdx].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls)){
      col0[pIdx].classList.add(winFlip)
      col1[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()
  
      // diagonal up right /
    } if (pIdx > 2) {
      if (col5[pIdx - 3].classList.contains(P2Cls) && col4[pIdx - 2].classList.contains(P2Cls) && col3[pIdx - 1].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls)) {
        col2[pIdx].classList.add(winFlip)
        col3[pIdx - 1].classList.add(winFlip)
        col4[pIdx - 2].classList.add(winFlip)
        col5[pIdx - 3].classList.add(winFlip)
        return checkWin()
      }
      // diagonal up right / 
    } if (pIdx < 5 && pIdx > 1 ) {
      if (col4[pIdx - 2].classList.contains(P2Cls) && col3[pIdx - 1].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col1[pIdx + 1].classList.contains(P2Cls)) {
        col1[pIdx + 1].classList.add(winFlip)
        col2[pIdx].classList.add(winFlip)
        col3[pIdx - 1].classList.add(winFlip)
        col4[pIdx - 2].classList.add(winFlip)
        return checkWin()
      }
      // diagonal up right /
    } if (pIdx < 4 && pIdx > 0 ) {
      if (col3[pIdx - 1].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col1[pIdx + 1].classList.contains(P2Cls) && col0[pIdx + 2].classList.contains(P2Cls)) {
        col0[pIdx + 2].classList.add(winFlip)
        col1[pIdx + 1].classList.add(winFlip)
        col2[pIdx].classList.add(winFlip)
        col3[pIdx - 1].classList.add(winFlip)
        return checkWin()
      }
      
      // diagonal down right \
    } if (pIdx < 3) {
      if (col5[pIdx + 3].classList.contains(P2Cls) && col4[pIdx + 2].classList.contains(P2Cls) && col3[pIdx + 1].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls)) {
        col2[pIdx].classList.add(winFlip)
        col3[pIdx + 1].classList.add(winFlip)
        col4[pIdx + 2].classList.add(winFlip)
        col5[pIdx + 3].classList.add(winFlip)
        return checkWin()
      }
      // diagonal down right \
    } if (pIdx < 4 && pIdx > 0) {
      if (col4[pIdx + 2].classList.contains(P2Cls) && col3[pIdx + 1].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col1[pIdx - 1].classList.contains(P2Cls)) {
        col1[pIdx - 1].classList.add(winFlip)
        col2[pIdx].classList.add(winFlip)
        col3[pIdx + 1].classList.add(winFlip)
        col4[pIdx + 2].classList.add(winFlip)
        return checkWin()
      }
      // diagonal down right \
    } if (pIdx < 5 && pIdx > 1) {
      if (col3[pIdx + 1].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col1[pIdx - 1].classList.contains(P2Cls) && col0[pIdx - 2].classList.contains(P2Cls)) {
        col0[pIdx - 2].classList.add(winFlip)
        col1[pIdx - 1].classList.add(winFlip)
        col2[pIdx].classList.add(winFlip)
        col3[pIdx + 1].classList.add(winFlip)
        return checkWin()
      }
  
      // vertical check
    } if (pIdx < 3) {
      if (col2[pIdx].classList.contains(P2Cls) && col2[pIdx + 1].classList.contains(P2Cls) && col2[pIdx + 2].classList.contains(P2Cls) && col2[pIdx + 3].classList.contains(P2Cls)){
        col2[pIdx].classList.add(winFlip)
        col2[pIdx + 1].classList.add(winFlip)
        col2[pIdx + 2].classList.add(winFlip)
        col2[pIdx + 3].classList.add(winFlip)
        return checkWin()
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
      if (col3[0].classList.contains(P1Cls) || col3[0].classList.contains(P2Cls)) return // do nothing if col is full or winner is found
      if (!inPlay) return
      if (playerGo) {
        dropColor31()
        checkWinC3P1()
        columnFunctionsP1()
      } else if (!playerGo) {
        dropColor32()
        checkWinC3P2()
        columnFunctionsP2()
      }
    })
  })

  function checkWinC3P1() { // checkWin col3 player 1
    const pIdx = col3.indexOf(col3.find(e => e.classList.contains(P1Cls)))
    // horizontal check
    if (col3[pIdx].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls) && col5[pIdx].classList.contains(P1Cls) && col6[pIdx].classList.contains(P1Cls)){
      col6[pIdx].classList.add(winFlip)
      col5[pIdx].classList.add(winFlip)
      col4[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()
    } if (col2[pIdx].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls) && col5[pIdx].classList.contains(P1Cls)){
      col5[pIdx].classList.add(winFlip)
      col4[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()
    } if (col1[pIdx].classList.contains(P1Cls) && col2[pIdx].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls)){
      col4[pIdx].classList.add(winFlip)
      col1[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()
    } if (col0[pIdx].classList.contains(P1Cls) && col1[pIdx].classList.contains(P1Cls) && col2[pIdx].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls)){
      col0[pIdx].classList.add(winFlip)
      col1[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()
  
      // diagonal up right /
    } if (pIdx > 2) {
      if (col6[pIdx - 3].classList.contains(P1Cls) && col5[pIdx - 2].classList.contains(P1Cls) && col4[pIdx - 1].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls)) {
        col6[pIdx - 3].classList.add(winFlip)
        col5[pIdx - 2].classList.add(winFlip)
        col4[pIdx - 1].classList.add(winFlip)
        col3[pIdx].classList.add(winFlip)
        return checkWin()
      }
      // diagonal up right / 
    } if (pIdx < 5 && pIdx > 1 ) {
      if (col5[pIdx - 2].classList.contains(P1Cls) && col4[pIdx - 1].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls) && col2[pIdx + 1].classList.contains(P1Cls)) {
        col5[pIdx - 2].classList.add(winFlip)
        col4[pIdx - 1].classList.add(winFlip)
        col3[pIdx].classList.add(winFlip)
        col2[pIdx + 1].classList.add(winFlip)
        return checkWin()
      }
      // diagonal up right /
    } if (pIdx < 4 && pIdx > 0 ) {
      if (col4[pIdx - 1].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls) && col2[pIdx + 1].classList.contains(P1Cls) && col1[pIdx + 2].classList.contains(P1Cls)) {
        col4[pIdx - 1].classList.add(winFlip)
        col3[pIdx].classList.add(winFlip)
        col2[pIdx + 1].classList.add(winFlip)
        col1[pIdx + 2].classList.add(winFlip)
        return checkWin()
      }
      // diagonal up left \
    } if (pIdx > 2) {
      if (col3[pIdx].classList.contains(P1Cls) && col2[pIdx - 1].classList.contains(P1Cls) && col1[pIdx - 2].classList.contains(P1Cls) && col0[pIdx - 3].classList.contains(P1Cls)) {
        col3[pIdx].classList.add(winFlip)
        col2[pIdx - 1].classList.add(winFlip)
        col1[pIdx - 2].classList.add(winFlip)
        col0[pIdx - 3].classList.add(winFlip)
        return checkWin()
      }

      // diagonal down right \
    } if (pIdx < 3) {
      if (col6[pIdx + 3].classList.contains(P1Cls) && col5[pIdx + 2].classList.contains(P1Cls) && col4[pIdx + 1].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls)) {
        col6[pIdx + 3].classList.add(winFlip)
        col5[pIdx + 2].classList.add(winFlip)
        col4[pIdx + 1].classList.add(winFlip)
        col3[pIdx].classList.add(winFlip)
        return checkWin()
      }
      // diagonal down right \
    } if (pIdx < 4 && pIdx > 0) {
      if (col5[pIdx + 2].classList.contains(P1Cls) && col4[pIdx + 1].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls) && col2[pIdx - 1].classList.contains(P1Cls)) {
        col5[pIdx + 2].classList.add(winFlip)
        col4[pIdx + 1].classList.add(winFlip)
        col3[pIdx].classList.add(winFlip)
        col2[pIdx - 1].classList.add(winFlip)
        return checkWin()
      }
      // diagonal down right \
    } if (pIdx < 5 && pIdx > 1) {
      if (col4[pIdx + 1].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls) && col2[pIdx - 1].classList.contains(P1Cls) && col1[pIdx - 2].classList.contains(P1Cls)) {
        col4[pIdx + 1].classList.add(winFlip)
        col3[pIdx].classList.add(winFlip)
        col2[pIdx - 1].classList.add(winFlip)
        col1[pIdx - 2].classList.add(winFlip)
        return checkWin()
      }
      // diagonal down left /
    } if (pIdx < 3) {
      if (col3[pIdx].classList.contains(P1Cls) && col2[pIdx + 1].classList.contains(P1Cls) && col1[pIdx + 2].classList.contains(P1Cls) && col0[pIdx + 3].classList.contains(P1Cls)) {
        col3[pIdx].classList.add(winFlip)
        col2[pIdx + 1].classList.add(winFlip)
        col1[pIdx + 2].classList.add(winFlip)
        col0[pIdx + 3].classList.add(winFlip)
        return checkWin()
      }
  
      // vertical check
    } if (pIdx < 3) {
      if (col3[pIdx].classList.contains(P1Cls) && col3[pIdx + 1].classList.contains(P1Cls) && col3[pIdx + 2].classList.contains(P1Cls) && col3[pIdx + 3].classList.contains(P1Cls)){
        col3[pIdx].classList.add(winFlip)
        col3[pIdx + 1].classList.add(winFlip)
        col3[pIdx + 2].classList.add(winFlip)
        col3[pIdx + 3].classList.add(winFlip)
        return checkWin()
      }
    }
  }
    
  function checkWinC3P2() { // checkWin col3 player 2
    const pIdx = col3.indexOf(col3.find(e => e.classList.contains(P2Cls)))
    // horizontal check
    if (col3[pIdx].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col5[pIdx].classList.contains(P2Cls) && col6[pIdx].classList.contains(P2Cls)){
      col6[pIdx].classList.add(winFlip)
      col5[pIdx].classList.add(winFlip)
      col4[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()
    } if (col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col5[pIdx].classList.contains(P2Cls)){
      col5[pIdx].classList.add(winFlip)
      col4[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()
    } if (col1[pIdx].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls)){
      col4[pIdx].classList.add(winFlip)
      col1[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()
    } if (col0[pIdx].classList.contains(P2Cls) && col1[pIdx].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls)){
      col0[pIdx].classList.add(winFlip)
      col1[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()
  
      // diagonal up right /
    } if (pIdx > 2) {
      if (col6[pIdx - 3].classList.contains(P2Cls) && col5[pIdx - 2].classList.contains(P2Cls) && col4[pIdx - 1].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls)) {
        col6[pIdx - 3].classList.add(winFlip)
        col5[pIdx - 2].classList.add(winFlip)
        col4[pIdx - 1].classList.add(winFlip)
        col3[pIdx].classList.add(winFlip)
        return checkWin()
      }
      // diagonal up right / 
    } if (pIdx < 5 && pIdx > 1 ) {
      if (col5[pIdx - 2].classList.contains(P2Cls) && col4[pIdx - 1].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col2[pIdx + 1].classList.contains(P2Cls)) {
        col5[pIdx - 2].classList.add(winFlip)
        col4[pIdx - 1].classList.add(winFlip)
        col3[pIdx].classList.add(winFlip)
        col2[pIdx + 1].classList.add(winFlip)
        return checkWin()
      }
      // diagonal up right /
    } if (pIdx < 4 && pIdx > 0 ) {
      if (col4[pIdx - 1].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col2[pIdx + 1].classList.contains(P2Cls) && col1[pIdx + 2].classList.contains(P2Cls)) {
        col4[pIdx - 1].classList.add(winFlip)
        col3[pIdx].classList.add(winFlip)
        col2[pIdx + 1].classList.add(winFlip)
        col1[pIdx + 2].classList.add(winFlip)
        return checkWin()
      }
      // diagonal up left \
    } if (pIdx > 2) {
      if (col3[pIdx].classList.contains(P2Cls) && col2[pIdx - 1].classList.contains(P2Cls) && col1[pIdx - 2].classList.contains(P2Cls) && col0[pIdx - 3].classList.contains(P2Cls)) {
        col3[pIdx].classList.add(winFlip)
        col2[pIdx - 1].classList.add(winFlip)
        col1[pIdx - 2].classList.add(winFlip)
        col0[pIdx - 3].classList.add(winFlip)
        return checkWin()
      }
    
      
      // diagonal down right \
    } if (pIdx < 3) {
      if (col6[pIdx + 3].classList.contains(P2Cls) && col5[pIdx + 2].classList.contains(P2Cls) && col4[pIdx + 1].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls)) {
        col6[pIdx + 3].classList.add(winFlip)
        col5[pIdx + 2].classList.add(winFlip)
        col4[pIdx + 1].classList.add(winFlip)
        col3[pIdx].classList.add(winFlip)
        return checkWin()
      }
      // diagonal down right \
    } if (pIdx < 4 && pIdx > 0) {
      if (col5[pIdx + 2].classList.contains(P2Cls) && col4[pIdx + 1].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col2[pIdx - 1].classList.contains(P2Cls)) {
        col5[pIdx + 2].classList.add(winFlip)
        col4[pIdx + 1].classList.add(winFlip)
        col3[pIdx].classList.add(winFlip)
        col2[pIdx - 1].classList.add(winFlip)
        return checkWin()
      }
      // diagonal down right \
    } if (pIdx < 5 && pIdx > 1) {
      if (col4[pIdx + 1].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col2[pIdx - 1].classList.contains(P2Cls) && col1[pIdx - 2].classList.contains(P2Cls)) {
        col4[pIdx + 1].classList.add(winFlip)
        col3[pIdx].classList.add(winFlip)
        col2[pIdx - 1].classList.add(winFlip)
        col1[pIdx - 2].classList.add(winFlip)
        return checkWin()
      }
      // diagonal down left /
    } if (pIdx < 3) {
      if (col3[pIdx].classList.contains(P2Cls) && col2[pIdx + 1].classList.contains(P2Cls) && col1[pIdx + 2].classList.contains(P2Cls) && col0[pIdx + 3].classList.contains(P2Cls)) {
        col3[pIdx].classList.add(winFlip)
        col2[pIdx + 1].classList.add(winFlip)
        col1[pIdx + 2].classList.add(winFlip)
        col0[pIdx + 3].classList.add(winFlip)
        return checkWin()
      }
  
      // vertical check
    } if (pIdx < 3) {
      if (col3[pIdx].classList.contains(P2Cls) && col3[pIdx + 1].classList.contains(P2Cls) && col3[pIdx + 2].classList.contains(P2Cls) && col3[pIdx + 3].classList.contains(P2Cls)){
        col3[pIdx].classList.add(winFlip)
        col3[pIdx + 1].classList.add(winFlip)
        col3[pIdx + 2].classList.add(winFlip)
        col3[pIdx + 3].classList.add(winFlip)
        return checkWin()
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
      if (col4[0].classList.contains(P1Cls) || col4[0].classList.contains(P2Cls)) return // do nothing if col is full or winner is found
      if (!inPlay) return
      if (playerGo) {
        dropColor41()
        checkWinC4P1()
        columnFunctionsP1()
      } else if (!playerGo) {
        dropColor42()
        checkWinC4P2()
        columnFunctionsP2()
      }
    })
  })

  function checkWinC4P1() { // checkWin col4 player 1
    const pIdx = col4.indexOf(col4.find(e => e.classList.contains(P1Cls)))
    // horizontal check
    if (col3[pIdx].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls) && col5[pIdx].classList.contains(P1Cls) && col6[pIdx].classList.contains(P1Cls)){
      col6[pIdx].classList.add(winFlip)
      col5[pIdx].classList.add(winFlip)
      col4[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()
    } if (col2[pIdx].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls) && col5[pIdx].classList.contains(P1Cls)){
      col5[pIdx].classList.add(winFlip)
      col4[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()
    } if (col1[pIdx].classList.contains(P1Cls) && col2[pIdx].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls)){
      col4[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col1[pIdx].classList.add(winFlip)
      return checkWin()
  
      // diagonal up right /
    } if (pIdx < 5 && pIdx > 1) {
      if (col6[pIdx - 2].classList.contains(P1Cls) && col5[pIdx - 1].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls) && col3[pIdx + 1].classList.contains(P1Cls)) {
        col6[pIdx - 2].classList.add(winFlip)
        col5[pIdx - 1].classList.add(winFlip)
        col4[pIdx].classList.add(winFlip)
        col3[pIdx + 1].classList.add(winFlip)
        return checkWin()
      }
      // diagonal up right / 
    } if (pIdx < 4 && pIdx > 0 ) {
      if (col5[pIdx - 1].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls) && col3[pIdx + 1].classList.contains(P1Cls) && col2[pIdx + 2].classList.contains(P1Cls)) {
        col5[pIdx - 1].classList.add(winFlip)
        col4[pIdx].classList.add(winFlip)
        col3[pIdx + 1].classList.add(winFlip)
        col2[pIdx + 2].classList.add(winFlip)
        return checkWin()
      }
      // diagonal up left \
    } if (pIdx > 2) {
      if (col4[pIdx].classList.contains(P1Cls) && col3[pIdx - 1].classList.contains(P1Cls) && col2[pIdx - 2].classList.contains(P1Cls) && col1[pIdx - 3].classList.contains(P1Cls)) {
        col4[pIdx].classList.add(winFlip)
        col3[pIdx - 1].classList.add(winFlip)
        col2[pIdx - 2].classList.add(winFlip)
        col1[pIdx - 3].classList.add(winFlip)
        return checkWin()
      }

      // diagonal down left /
    } if (pIdx < 3) {
      if (col4[pIdx].classList.contains(P1Cls) && col3[pIdx + 1].classList.contains(P1Cls) && col2[pIdx + 2].classList.contains(P1Cls) && col1[pIdx + 3].classList.contains(P1Cls)) {
        col4[pIdx].classList.add(winFlip)
        col3[pIdx + 1].classList.add(winFlip)
        col2[pIdx + 2].classList.add(winFlip)
        col1[pIdx + 3].classList.add(winFlip)
        return checkWin()
      }
      // diagonal down right \
    } if (pIdx < 5 && pIdx > 1) {
      if (col5[pIdx + 1].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls) && col3[pIdx - 1].classList.contains(P1Cls) && col2[pIdx - 2].classList.contains(P1Cls)) {
        col5[pIdx + 1].classList.add(winFlip)
        col4[pIdx].classList.add(winFlip)
        col3[pIdx - 1].classList.add(winFlip)
        col2[pIdx - 2].classList.add(winFlip)
        return checkWin()
      }
      // diagonal down right \
    } if (pIdx < 4 && pIdx > 0) {
      if (col6[pIdx + 2].classList.contains(P1Cls) && col5[pIdx + 1].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls) && col3[pIdx - 1].classList.contains(P1Cls)) {
        col6[pIdx + 2].classList.add(winFlip)
        col5[pIdx + 1].classList.add(winFlip)
        col4[pIdx].classList.add(winFlip)
        col3[pIdx - 1].classList.add(winFlip)
        return checkWin()
      }
  
      // vertical check
    } if (pIdx < 3) {
      if (col4[pIdx].classList.contains(P1Cls) && col4[pIdx + 1].classList.contains(P1Cls) && col4[pIdx + 2].classList.contains(P1Cls) && col4[pIdx + 3].classList.contains(P1Cls)){
        col4[pIdx].classList.add(winFlip)
        col4[pIdx + 1].classList.add(winFlip)
        col4[pIdx + 2].classList.add(winFlip)
        col4[pIdx + 3].classList.add(winFlip)
        return checkWin()
      }
    }
  }

  function checkWinC4P2() { // checkWin col4 player 2
    const pIdx = col4.indexOf(col4.find(e => e.classList.contains(P2Cls)))
    // horizontal check
    if (col3[pIdx].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col5[pIdx].classList.contains(P2Cls) && col6[pIdx].classList.contains(P2Cls)){
      col6[pIdx].classList.add(winFlip)
      col5[pIdx].classList.add(winFlip)
      col4[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()
    } if (col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col5[pIdx].classList.contains(P2Cls)){
      col5[pIdx].classList.add(winFlip)
      col4[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()
    } if (col1[pIdx].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls)){
      col4[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col1[pIdx].classList.add(winFlip)
      return checkWin()
  
      // diagonal up right /
    } if (pIdx < 5 && pIdx > 1) {
      if (col6[pIdx - 2].classList.contains(P2Cls) && col5[pIdx - 1].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col3[pIdx + 1].classList.contains(P2Cls)) {
        col6[pIdx - 2].classList.add(winFlip)
        col5[pIdx - 1].classList.add(winFlip)
        col4[pIdx].classList.add(winFlip)
        col3[pIdx + 1].classList.add(winFlip)
        return checkWin()
      }
      // diagonal up right / 
    } if (pIdx < 4 && pIdx > 0 ) {
      if (col5[pIdx - 1].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col3[pIdx + 1].classList.contains(P2Cls) && col2[pIdx + 2].classList.contains(P2Cls)) {
        col5[pIdx - 1].classList.add(winFlip)
        col4[pIdx].classList.add(winFlip)
        col3[pIdx + 1].classList.add(winFlip)
        col2[pIdx + 2].classList.add(winFlip)
        return checkWin()
      }
      // diagonal up left \
    } if (pIdx > 2) {
      if (col4[pIdx].classList.contains(P2Cls) && col3[pIdx - 1].classList.contains(P2Cls) && col2[pIdx - 2].classList.contains(P2Cls) && col1[pIdx - 3].classList.contains(P2Cls)) {
        col4[pIdx].classList.add(winFlip)
        col3[pIdx - 1].classList.add(winFlip)
        col2[pIdx - 2].classList.add(winFlip)
        col1[pIdx - 3].classList.add(winFlip)
        return checkWin()
      }

      // diagonal down left /
    } if (pIdx < 3) {
      if (col4[pIdx].classList.contains(P2Cls) && col3[pIdx + 1].classList.contains(P2Cls) && col2[pIdx + 2].classList.contains(P2Cls) && col1[pIdx + 3].classList.contains(P2Cls)) {
        col4[pIdx].classList.add(winFlip)
        col3[pIdx + 1].classList.add(winFlip)
        col2[pIdx + 2].classList.add(winFlip)
        col1[pIdx + 3].classList.add(winFlip)
        return checkWin()
      }
      // diagonal down right \
    } if (pIdx < 5 && pIdx > 1) {
      if (col5[pIdx + 1].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col3[pIdx - 1].classList.contains(P2Cls) && col2[pIdx - 2].classList.contains(P2Cls)) {
        col5[pIdx + 1].classList.add(winFlip)
        col4[pIdx].classList.add(winFlip)
        col3[pIdx - 1].classList.add(winFlip)
        col2[pIdx - 2].classList.add(winFlip)
        return checkWin()
      }
      // diagonal down right \
    } if (pIdx < 4 && pIdx > 0) {
      if (col6[pIdx + 2].classList.contains(P2Cls) && col5[pIdx + 1].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col3[pIdx - 1].classList.contains(P2Cls)) {
        col6[pIdx + 2].classList.add(winFlip)
        col5[pIdx + 1].classList.add(winFlip)
        col4[pIdx].classList.add(winFlip)
        col3[pIdx - 1].classList.add(winFlip)
        return checkWin()
      }
      
      // vertical check
    } if (pIdx < 3) {
      if (col4[pIdx].classList.contains(P2Cls) && col4[pIdx + 1].classList.contains(P2Cls) && col4[pIdx + 2].classList.contains(P2Cls) && col4[pIdx + 3].classList.contains(P2Cls)){
        col4[pIdx].classList.add(winFlip)
        col4[pIdx + 1].classList.add(winFlip)
        col4[pIdx + 2].classList.add(winFlip)
        col4[pIdx + 3].classList.add(winFlip)
        return checkWin()
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
      if (col5[0].classList.contains(P1Cls) || col5[0].classList.contains(P2Cls)) return // do nothing if col is full or winner is found
      if (!inPlay) return
      if (playerGo) {
        dropColor51()
        checkWinC5P1()
        columnFunctionsP1()
      } else if (!playerGo) {
        dropColor52()
        checkWinC5P2()
        columnFunctionsP2()
      }
    })
  })

  function checkWinC5P1() { // checkWin col5 player 1
    const pIdx = col5.indexOf(col5.find(e => e.classList.contains(P1Cls)))
    // horizontal check
    if (col3[pIdx].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls) && col5[pIdx].classList.contains(P1Cls) && col6[pIdx].classList.contains(P1Cls)){
      col6[pIdx].classList.add(winFlip)
      col5[pIdx].classList.add(winFlip)
      col4[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()
    } if (col2[pIdx].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls) && col5[pIdx].classList.contains(P1Cls)){
      col5[pIdx].classList.add(winFlip)
      col4[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()
  
      // diagonal up right / 
    } if (pIdx < 4 && pIdx > 0 ) {
      if (col6[pIdx - 1].classList.contains(P1Cls) && col5[pIdx].classList.contains(P1Cls) && col4[pIdx + 1].classList.contains(P1Cls) && col3[pIdx + 2].classList.contains(P1Cls)) {
        col6[pIdx - 1].classList.add(winFlip)
        col5[pIdx].classList.add(winFlip)
        col4[pIdx + 1].classList.add(winFlip)
        col3[pIdx + 2].classList.add(winFlip)
        return checkWin()
      }
      // diagonal up left \
    } if (pIdx > 2) {
      if (col5[pIdx].classList.contains(P1Cls) && col4[pIdx - 1].classList.contains(P1Cls) && col3[pIdx - 2].classList.contains(P1Cls) && col2[pIdx - 3].classList.contains(P1Cls)) {
        col5[pIdx].classList.add(winFlip)
        col4[pIdx - 1].classList.add(winFlip)
        col3[pIdx - 2].classList.add(winFlip)
        col2[pIdx - 3].classList.add(winFlip)
        return checkWin()
      }

      // diagonal down right \
    } if (pIdx < 5 && pIdx > 1) {
      if (col6[pIdx + 1].classList.contains(P1Cls) && col5[pIdx].classList.contains(P1Cls) && col4[pIdx - 1].classList.contains(P1Cls) && col3[pIdx - 2].classList.contains(P1Cls)) {
        col6[pIdx + 1].classList.add(winFlip)
        col5[pIdx].classList.add(winFlip)
        col4[pIdx - 1].classList.add(winFlip)
        col3[pIdx - 2].classList.add(winFlip)
        return checkWin()
      }
      // diagonal down left /
    } if (pIdx < 3) {
      if (col5[pIdx].classList.contains(P1Cls) && col4[pIdx + 1].classList.contains(P1Cls) && col3[pIdx + 2].classList.contains(P1Cls) && col2[pIdx + 3].classList.contains(P1Cls)) {
        col5[pIdx].classList.add(winFlip)
        col4[pIdx + 1].classList.add(winFlip)
        col3[pIdx + 2].classList.add(winFlip)
        col2[pIdx + 3].classList.add(winFlip)
        return checkWin()
      }
    
  
      // vertical check
    } if (pIdx < 3) {
      if (col5[pIdx].classList.contains(P1Cls) && col5[pIdx + 1].classList.contains(P1Cls) && col5[pIdx + 2].classList.contains(P1Cls) && col5[pIdx + 3].classList.contains(P1Cls)){
        col5[pIdx].classList.add(winFlip)
        col5[pIdx + 1].classList.add(winFlip)
        col5[pIdx + 2].classList.add(winFlip)
        col5[pIdx + 3].classList.add(winFlip)
        return checkWin()
      }
    }
  }

  function checkWinC5P2() { // checkWin col5 player 2
    const pIdx = col5.indexOf(col5.find(e => e.classList.contains(P2Cls)))
    // horizontal check
    if (col3[pIdx].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col5[pIdx].classList.contains(P2Cls) && col6[pIdx].classList.contains(P2Cls)){
      col6[pIdx].classList.add(winFlip)
      col5[pIdx].classList.add(winFlip)
      col4[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()
    } if (col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col5[pIdx].classList.contains(P2Cls)){
      col5[pIdx].classList.add(winFlip)
      col4[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()
  
      // diagonal up right / 
    } if (pIdx < 4 && pIdx > 0 ) {
      if (col6[pIdx - 1].classList.contains(P2Cls) && col5[pIdx].classList.contains(P2Cls) && col4[pIdx + 1].classList.contains(P2Cls) && col3[pIdx + 2].classList.contains(P2Cls)) {
        col6[pIdx - 1].classList.add(winFlip)
        col5[pIdx].classList.add(winFlip)
        col4[pIdx + 1].classList.add(winFlip)
        col3[pIdx + 2].classList.add(winFlip)
        return checkWin()
      }
      // diagonal up left \
    } if (pIdx > 2) {
      if (col5[pIdx].classList.contains(P2Cls) && col4[pIdx - 1].classList.contains(P2Cls) && col3[pIdx - 2].classList.contains(P2Cls) && col2[pIdx - 3].classList.contains(P2Cls)) {
        col5[pIdx].classList.add(winFlip)
        col4[pIdx - 1].classList.add(winFlip)
        col3[pIdx - 2].classList.add(winFlip)
        col2[pIdx - 3].classList.add(winFlip)
        return checkWin()
      }

      // diagonal down right \
    } if (pIdx < 5 && pIdx > 1) {
      if (col6[pIdx + 1].classList.contains(P2Cls) && col5[pIdx].classList.contains(P2Cls) && col4[pIdx - 1].classList.contains(P2Cls) && col3[pIdx - 2].classList.contains(P2Cls)) {
        col6[pIdx + 1].classList.add(winFlip)
        col5[pIdx].classList.add(winFlip)
        col4[pIdx - 1].classList.add(winFlip)
        col3[pIdx - 2].classList.add(winFlip)
        return checkWin()
      }
      // diagonal down left /
    } if (pIdx < 3) {
      if (col5[pIdx].classList.contains(P2Cls) && col4[pIdx + 1].classList.contains(P2Cls) && col3[pIdx + 2].classList.contains(P2Cls) && col2[pIdx + 3].classList.contains(P2Cls)) {
        col5[pIdx].classList.add(winFlip)
        col4[pIdx + 1].classList.add(winFlip)
        col3[pIdx + 2].classList.add(winFlip)
        col2[pIdx + 3].classList.add(winFlip)
        return checkWin()
      }
  
      // vertical check
    } if (pIdx < 3) {
      if (col5[pIdx].classList.contains(P2Cls) && col5[pIdx + 1].classList.contains(P2Cls) && col5[pIdx + 2].classList.contains(P2Cls) && col5[pIdx + 3].classList.contains(P2Cls)){
        col5[pIdx].classList.add(winFlip)
        col5[pIdx + 1].classList.add(winFlip)
        col5[pIdx + 2].classList.add(winFlip)
        col5[pIdx + 3].classList.add(winFlip)
        return checkWin()
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
      if (col6[0].classList.contains(P1Cls) || col6[0].classList.contains(P2Cls)) return // do nothing if col is full or winner is found
      if (!inPlay) return
      if (playerGo) {
        dropColor61()
        checkWinC6P1()
        columnFunctionsP1()
      } else if (!playerGo) {
        dropColor62()
        checkWinC6P2()
        columnFunctionsP2()
      }
    })
  })

  function checkWinC6P1() { // checkWin col6 player 1
    const pIdx = col6.indexOf(col6.find(e => e.classList.contains(P1Cls)))
    // horizontal check
    if (col3[pIdx].classList.contains(P1Cls) && col4[pIdx].classList.contains(P1Cls) && col5[pIdx].classList.contains(P1Cls) && col6[pIdx].classList.contains(P1Cls)){
      col6[pIdx].classList.add(winFlip)
      col5[pIdx].classList.add(winFlip)
      col4[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()
  
      // diagonal down right / 
    } if (pIdx < 3) {
      if (col6[pIdx].classList.contains(P1Cls) && col5[pIdx + 1].classList.contains(P1Cls) && col4[pIdx + 2].classList.contains(P1Cls) && col3[pIdx + 3].classList.contains(P1Cls)) {
        col6[pIdx].classList.add(winFlip)
        col5[pIdx + 1].classList.add(winFlip)
        col4[pIdx + 2].classList.add(winFlip)
        col3[pIdx + 3].classList.add(winFlip)
        return checkWin()
      }

      // diagonal up left \
    } if (pIdx > 2) {
      if (col6[pIdx].classList.contains(P1Cls) && col5[pIdx - 1].classList.contains(P1Cls) && col4[pIdx - 2].classList.contains(P1Cls) && col3[pIdx - 3].classList.contains(P1Cls)) {
        col6[pIdx].classList.add(winFlip)
        col5[pIdx - 1].classList.add(winFlip)
        col4[pIdx - 2].classList.add(winFlip)
        col3[pIdx - 3].classList.add(winFlip)
        return checkWin()
      }
  
      // vertical check
    } if (pIdx < 3) {
      if (col6[pIdx].classList.contains(P1Cls) && col6[pIdx + 1].classList.contains(P1Cls) && col6[pIdx + 2].classList.contains(P1Cls) && col6[pIdx + 3].classList.contains(P1Cls)){
        col6[pIdx].classList.add(winFlip)
        col6[pIdx + 1].classList.add(winFlip)
        col6[pIdx + 2].classList.add(winFlip)
        col6[pIdx + 3].classList.add(winFlip)
        return checkWin()
      }
    }
  }

  function checkWinC6P2() { // checkWin col6 player 2
    const pIdx = col6.indexOf(col6.find(e => e.classList.contains(P2Cls)))
    // horizontal check
    if (col3[pIdx].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col5[pIdx].classList.contains(P2Cls) && col6[pIdx].classList.contains(P2Cls)){
      col6[pIdx].classList.add(winFlip)
      col5[pIdx].classList.add(winFlip)
      col4[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()
  
      // diagonal down right / 
    } if (pIdx < 3) {
      if (col6[pIdx].classList.contains(P2Cls) && col5[pIdx + 1].classList.contains(P2Cls) && col4[pIdx + 2].classList.contains(P2Cls) && col3[pIdx + 3].classList.contains(P2Cls)) {
        col6[pIdx].classList.add(winFlip)
        col5[pIdx + 1].classList.add(winFlip)
        col4[pIdx + 2].classList.add(winFlip)
        col3[pIdx + 3].classList.add(winFlip)
        return checkWin()
      }

      // diagonal up left \
    } if (pIdx > 2) {
      if (col6[pIdx].classList.contains(P2Cls) && col5[pIdx - 1].classList.contains(P2Cls) && col4[pIdx - 2].classList.contains(P2Cls) && col3[pIdx - 3].classList.contains(P2Cls)) {
        col6[pIdx].classList.add(winFlip)
        col5[pIdx - 1].classList.add(winFlip)
        col4[pIdx - 2].classList.add(winFlip)
        col3[pIdx - 3].classList.add(winFlip)
        return checkWin()
      }
  
      // vertical check
    } if (pIdx < 3) {
      if (col6[pIdx].classList.contains(P2Cls) && col6[pIdx + 1].classList.contains(P2Cls) && col6[pIdx + 2].classList.contains(P2Cls) && col6[pIdx + 3].classList.contains(P2Cls)){
        col6[pIdx].classList.add(winFlip)
        col6[pIdx + 1].classList.add(winFlip)
        col6[pIdx + 2].classList.add(winFlip)
        col6[pIdx + 3].classList.add(winFlip)
        return checkWin()
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
