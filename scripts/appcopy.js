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
    changeWait()
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
    compturn()
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

  function compWin(){
    winner.innerHTML = '<br>You lose'
    wipevals() // computer = false, turns = 0, inplay = !inplay
    resetbtn.style.visibility = 'hidden'
    yeehaw() //Plays cowboy sound
    setTimeout(finMenu, 2000)
  }
  
  //Choose winner
  function checkWin(){
    if (computer){
      winner.innerHTML = '<br>Congrats You win!'
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
      arrayChoice[i] = 0
      const curntCol = columns[col[i]] // Loop through each coloumn
      let avaiSpot = curntCol.indexOf(curntCol.find(e => e.classList.contains(P1Cls) || e.classList.contains(P2Cls)))
      avaiSpot-- //find spot above a filled spot
      if (avaiSpot === -2){ // if column empty return it as 5
        avaiSpot = 5
      }
      if (avaiSpot !== -1) {

        const colOneRight = columns[col[i + 1]]
        const colTwoRight = columns[col[i + 2]]
        const colThreeRight = columns[col[i + 3]]

        // horizontal right check own color
        if (i < 6){
          if (colOneRight[avaiSpot].classList.contains(P2Cls)){
            arrayChoice[i] += 2
            if (i < 5){
              if (colTwoRight[avaiSpot].classList.contains(P2Cls)){
                arrayChoice[i] += 5
                if (i < 4){
                  if (colThreeRight[avaiSpot].classList.contains(P2Cls)){
                    arrayChoice[i] += 1300
                  }
                }
              }
            }
          }
        }

        // horizontal right check opponents color
        if (i < 6){
          if (colOneRight[avaiSpot].classList.contains(P1Cls)){
            arrayChoice[i] += 2
            if (i < 5){
              if (colTwoRight[avaiSpot].classList.contains(P1Cls)){
                arrayChoice[i] += 5
                if (i < 4){
                  if (colThreeRight[avaiSpot].classList.contains(P1Cls)){
                    arrayChoice[i] += 1000
                  }
                }
              }
            }
          }
        }

        const colOneLeft = columns[col[i - 1]]
        const colTwoLeft = columns[col[i - 2]]
        const colThreeLeft = columns[col[i - 3]]

        // horizontal Left check own color
        if (i > 0){
          if (colOneLeft[avaiSpot].classList.contains(P2Cls)){
            arrayChoice[i] += 2
            if (i > 1){
              if (colTwoLeft[avaiSpot].classList.contains(P2Cls)){
                arrayChoice[i] += 5
                if (i > 2){
                  if (colThreeLeft[avaiSpot].classList.contains(P2Cls)){
                    arrayChoice[i] += 1300
                  }
                }
              }
            }
          }
        }
      
        // horizontal Left check opponents color
        if (i > 0){
          if (colOneLeft[avaiSpot].classList.contains(P1Cls)){
            arrayChoice[i] += 2
            if (i > 1){
              if (colTwoLeft[avaiSpot].classList.contains(P1Cls)){
                arrayChoice[i] += 5
                if (i > 2){
                  if (colThreeLeft[avaiSpot].classList.contains(P1Cls)){
                    arrayChoice[i] += 1000
                  }
                }
              }
            }
          }
        }

        // horizontal Both sides check own color
        if (i > 0 && i < 6) {
          if (colOneLeft[avaiSpot].classList.contains(P2Cls) && colOneRight[avaiSpot].classList.contains(P2Cls)) {
            arrayChoice[i] += 5
            if (i > 1 && i < 6) {
              if (colOneLeft[avaiSpot].classList.contains(P2Cls) && colTwoLeft[avaiSpot].classList.contains(P2Cls) && colOneRight[avaiSpot].classList.contains(P2Cls)) {
                arrayChoice[i] += 1300
              }
            } if (i > 0 && i < 5) {
              if (colOneLeft[avaiSpot].classList.contains(P2Cls) && colTwoRight[avaiSpot].classList.contains(P2Cls) && colOneRight[avaiSpot].classList.contains(P2Cls)) {
                arrayChoice[i] += 1300
              }
            }
          }
        }

        // horizontal Both sides check opponents color
        if (i > 0 && i < 6) {
          if (colOneLeft[avaiSpot].classList.contains(P1Cls) && colOneRight[avaiSpot].classList.contains(P1Cls)) {
            arrayChoice[i] += 5
            if (i > 1 && i < 6) {
              if (colOneLeft[avaiSpot].classList.contains(P1Cls) && colTwoLeft[avaiSpot].classList.contains(P1Cls) && colOneRight[avaiSpot].classList.contains(P1Cls)) {
                arrayChoice[i] += 1000
              }
            } if (i > 0 && i < 5) {
              if (colOneLeft[avaiSpot].classList.contains(P1Cls) && colTwoRight[avaiSpot].classList.contains(P1Cls) && colOneRight[avaiSpot].classList.contains(P1Cls)) {
                arrayChoice[i] += 1000
              }
            }
          }
        }

        // diagonal left up check own color
        if (i > 0 && avaiSpot > 0){
          if (colOneLeft[avaiSpot - 1].classList.contains(P2Cls)){
            arrayChoice[i] += 2
            if (i > 1 && avaiSpot > 1){
              if (colTwoLeft[avaiSpot - 2].classList.contains(P2Cls)){
                arrayChoice[i] += 5
                if (i > 2 && avaiSpot > 2){
                  if (colThreeLeft[avaiSpot - 3].classList.contains(P2Cls)){
                    arrayChoice[i] += 1300
                  }
                }
              }
            }
          }
        }

        // diagonal left down check own color
        if (i > 0 && avaiSpot < 5){
          if (colOneLeft[avaiSpot + 1].classList.contains(P2Cls)){
            arrayChoice[i] += 2
            if (i > 1 && avaiSpot < 4){
              if (colTwoLeft[avaiSpot + 2].classList.contains(P2Cls)){
                arrayChoice[i] += 5
                if (i > 2 && avaiSpot < 3){
                  if (colThreeLeft[avaiSpot + 3].classList.contains(P2Cls)){
                    arrayChoice[i] += 1300
                  }
                }
              }
            }
          }
        }

        // diagonal left up check opponents color
        if (i > 0 && avaiSpot > 0){
          if (colOneLeft[avaiSpot - 1].classList.contains(P1Cls)){
            arrayChoice[i] += 2
            if (i > 1 && avaiSpot > 1){
              if (colTwoLeft[avaiSpot - 2].classList.contains(P1Cls)){
                arrayChoice[i] += 5
                if (i > 2 && avaiSpot > 2){
                  if (colThreeLeft[avaiSpot - 3].classList.contains(P1Cls)){
                    arrayChoice[i] += 1000
                  }
                }
              }
            }
          }
        }

        // diagonal left down check opponents color
        if (i > 0 && avaiSpot < 5){
          if (colOneLeft[avaiSpot + 1].classList.contains(P1Cls)){
            arrayChoice[i] += 2
            if (i > 1 && avaiSpot < 4){
              if (colTwoLeft[avaiSpot + 2].classList.contains(P1Cls)){
                arrayChoice[i] += 5
                if (i > 2 && avaiSpot < 3){
                  if (colThreeLeft[avaiSpot + 3].classList.contains(P1Cls)){
                    arrayChoice[i] += 1000
                  }
                }
              }
            }
          }
        }

        // diagonal middle of 3 check own color
        if (i < 6 && i > 0 && avaiSpot < 5 && avaiSpot > 0){
          if ((colOneRight[avaiSpot + 1].classList.contains(P2Cls) && colOneLeft[avaiSpot - 1].classList.contains(P2Cls)) || (colOneRight[avaiSpot - 1].classList.contains(P2Cls) && colOneLeft[avaiSpot + 1].classList.contains(P2Cls))) {
            arrayChoice[i] += 5
          }
        }
        
        // diagonal middle of 3 check opponents color
        if (i < 6 && i > 0 && avaiSpot < 5 && avaiSpot > 0){
          if ((colOneRight[avaiSpot + 1].classList.contains(P1Cls) && colOneLeft[avaiSpot - 1].classList.contains(P1Cls)) || (colOneRight[avaiSpot - 1].classList.contains(P1Cls) && colOneLeft[avaiSpot + 1].classList.contains(P1Cls))) {
            arrayChoice[i] += 5
          }
        }

        // diagonal left down middle check own color
        if (i > 1 && i < 6 && avaiSpot < 4 && avaiSpot > 0){
          if (colOneLeft[avaiSpot + 1].classList.contains(P2Cls) && colTwoLeft[avaiSpot + 2].classList.contains(P2Cls) && colOneRight[avaiSpot - 1].classList.contains(P2Cls)){
            arrayChoice[i] += 1300
          }
        }

        // diagonal left down middle check opponents color
        if (i > 1 && i < 6 && avaiSpot < 4 && avaiSpot > 0){
          if (colOneLeft[avaiSpot + 1].classList.contains(P1Cls) && colTwoLeft[avaiSpot + 2].classList.contains(P1Cls) && colOneRight[avaiSpot - 1].classList.contains(P1Cls)){
            arrayChoice[i] += 1000
          }
        }

        // diagonal right up middle check own color
        if (i > 0 && i < 5 && avaiSpot < 5 && avaiSpot > 1){
          if (colOneLeft[avaiSpot + 1].classList.contains(P2Cls) && colOneRight[avaiSpot - 1].classList.contains(P2Cls) && colTwoRight[avaiSpot - 2].classList.contains(P2Cls)){
            arrayChoice[i] += 1300
          }
        }
        
        // diagonal right up middle check opponents color
        if (i > 0 && i < 5 && avaiSpot < 5 && avaiSpot > 1){
          if (colOneLeft[avaiSpot + 1].classList.contains(P1Cls) && colOneRight[avaiSpot - 1].classList.contains(P1Cls) && colTwoRight[avaiSpot - 2].classList.contains(P1Cls)){
            arrayChoice[i] += 1000
          }
        }

        // diagonal left up middle check own color
        if (i > 1 && i < 6 && avaiSpot < 5 && avaiSpot > 1){
          if (colOneLeft[avaiSpot - 1].classList.contains(P2Cls) && colTwoLeft[avaiSpot - 2].classList.contains(P2Cls) && colOneRight[avaiSpot + 1].classList.contains(P2Cls)){
            arrayChoice[i] += 1300
          }
        }

        // diagonal left up middle check opponents color
        if (i > 1 && i < 6 && avaiSpot < 5 && avaiSpot > 1){
          if (colOneLeft[avaiSpot - 1].classList.contains(P1Cls) && colTwoLeft[avaiSpot - 2].classList.contains(P1Cls) && colOneRight[avaiSpot + 1].classList.contains(P1Cls)){
            arrayChoice[i] += 1000
          }
        }

        // diagonal right down middle check own color
        if (i > 0 && i < 5 && avaiSpot < 4 && avaiSpot > 0){
          if (colOneRight[avaiSpot + 1].classList.contains(P2Cls) && colTwoRight[avaiSpot + 2].classList.contains(P2Cls) && colOneLeft[avaiSpot - 1].classList.contains(P2Cls)){
            arrayChoice[i] += 1300
          }
        }

        // diagonal right down middle check opponents color
        if (i > 0 && i < 5 && avaiSpot < 4 && avaiSpot > 0){
          if (colOneRight[avaiSpot + 1].classList.contains(P1Cls) && colTwoRight[avaiSpot + 2].classList.contains(P1Cls) && colOneLeft[avaiSpot - 1].classList.contains(P1Cls)){
            arrayChoice[i] += 1000
          }
        }

        // diagonal Right up check own color
        if (i < 6 && avaiSpot > 0){
          if (colOneRight[avaiSpot - 1].classList.contains(P2Cls)){
            arrayChoice[i] += 2
            if (i < 5 && avaiSpot > 1){
              if (colTwoRight[avaiSpot - 2].classList.contains(P2Cls)){
                arrayChoice[i] += 5
                if (i < 4 && avaiSpot > 2){
                  if (colThreeRight[avaiSpot - 3].classList.contains(P2Cls)){
                    arrayChoice[i] += 1300
                  }
                }
              }
            }
          }
        }
        
        // diagonal Right down check own color
        if (i < 6 && avaiSpot < 5){
          if (colOneRight[avaiSpot + 1].classList.contains(P2Cls)){
            arrayChoice[i] += 2
            if (i < 5 && avaiSpot < 4){
              if (colTwoRight[avaiSpot + 2].classList.contains(P2Cls)){
                arrayChoice[i] += 5
                if (i < 4 && avaiSpot < 3){
                  if (colThreeRight[avaiSpot + 3].classList.contains(P2Cls)){
                    arrayChoice[i] += 1300
                  }
                }
              }
            }
          }
        }
        
        // diagonal Right up check opponents color
        if (i < 6 && avaiSpot > 0){
          if (colOneRight[avaiSpot - 1].classList.contains(P1Cls)){
            arrayChoice[i] += 2
            if (i < 5 && avaiSpot > 1){
              if (colTwoRight[avaiSpot - 2].classList.contains(P1Cls)){
                arrayChoice[i] += 5
                if (i < 4 && avaiSpot > 2){
                  if (colThreeRight[avaiSpot - 3].classList.contains(P1Cls)){
                    arrayChoice[i] += 1000
                  }
                }
              }
            }
          }
        }
        
        // diagonal Right down check opponents color
        if (i < 6 && avaiSpot < 5){
          if (colOneRight[avaiSpot + 1].classList.contains(P1Cls)){
            arrayChoice[i] += 2
            if (i < 5 && avaiSpot < 4){
              if (colTwoRight[avaiSpot + 2].classList.contains(P1Cls)){
                arrayChoice[i] += 5
                if (i < 4 && avaiSpot < 3){
                  if (colThreeRight[avaiSpot + 3].classList.contains(P1Cls)){
                    arrayChoice[i] += 1000
                  }
                }
              }
            }
          }
        }

        // stop computer setting up opponents win on the next round
        // horizonal left
        if (i > 2 && avaiSpot > 0 && avaiSpot <= 5) {
          if (colOneLeft[avaiSpot - 1].classList.contains(P1Cls) && colTwoLeft[avaiSpot - 1].classList.contains(P1Cls) && colThreeLeft[avaiSpot - 1].classList.contains(P1Cls)) {
            arrayChoice[i] -= 100
          }
        }

        // diagonal left up
        if (i > 2 && avaiSpot > 3 && avaiSpot < 5) {
          if (colOneLeft[avaiSpot - 2].classList.contains(P1Cls) && colTwoLeft[avaiSpot - 3].classList.contains(P1Cls) && colThreeLeft[avaiSpot - 4].classList.contains(P1Cls)) {
            arrayChoice[i] -= 100
          }
        }

        // diagonal left down
        if (i > 2 && avaiSpot < 4 && avaiSpot >= 0) {
          if (colOneLeft[avaiSpot].classList.contains(P1Cls) && colTwoLeft[avaiSpot + 1].classList.contains(P1Cls) && colThreeLeft[avaiSpot + 2].classList.contains(P1Cls)) {
            arrayChoice[i] -= 100
          }
        }

        // horizonal middle
        if (i > 1 && i < 6 && avaiSpot > 0 && avaiSpot <= 5) {
          if (colOneLeft[avaiSpot - 1].classList.contains(P1Cls) && colTwoLeft[avaiSpot - 1].classList.contains(P1Cls) && colOneRight[avaiSpot - 1].classList.contains(P1Cls)) {
            arrayChoice[i] -= 100
          }
        }

        // horizonal right
        if (i < 4 && avaiSpot > 0 && avaiSpot <= 5) {
          if (colOneRight[avaiSpot - 1].classList.contains(P1Cls) && colTwoRight[avaiSpot - 1].classList.contains(P1Cls) && colThreeRight[avaiSpot - 1].classList.contains(P1Cls)) {
            arrayChoice[i] -= 100
          }
        }

        // diagonal right up
        if (i < 4 && avaiSpot > 3 && avaiSpot < 5) {
          if (colOneRight[avaiSpot - 2].classList.contains(P1Cls) && colTwoRight[avaiSpot - 3].classList.contains(P1Cls) && colThreeRight[avaiSpot - 4].classList.contains(P1Cls)) {
            arrayChoice[i] -= 100
          }
        }
        
        // diagonal right down
        if (i < 4 && avaiSpot < 4 && avaiSpot >= 0) {
          if (colOneRight[avaiSpot].classList.contains(P1Cls) && colTwoRight[avaiSpot + 1].classList.contains(P1Cls) && colThreeRight[avaiSpot + 2].classList.contains(P1Cls)) {
            arrayChoice[i] -= 100
          }
        }

        // horizonal middle
        if (i < 5 && i > 0 && avaiSpot > 0 && avaiSpot <= 5) {
          if (colOneRight[avaiSpot - 1].classList.contains(P1Cls) && colTwoRight[avaiSpot - 1].classList.contains(P1Cls) && colOneLeft[avaiSpot - 1].classList.contains(P1Cls)) {
            arrayChoice[i] -= 100
          }
        }

        // diagonal middle right up
        if (i < 5 && i > 0 && avaiSpot > 2 && avaiSpot <= 5) {
          if (colOneLeft[avaiSpot].classList.contains(P1Cls) && colOneRight[avaiSpot - 2].classList.contains(P1Cls) && colTwoRight[avaiSpot - 3].classList.contains(P1Cls)) {
            arrayChoice[i] -= 100
          }
        }

        // diagonal middle left up
        if (i < 6 && i > 1 && avaiSpot > 2 && avaiSpot <= 5) {
          if (colOneRight[avaiSpot].classList.contains(P1Cls) && colOneLeft[avaiSpot - 2].classList.contains(P1Cls) && colTwoLeft[avaiSpot - 3].classList.contains(P1Cls)) {
            arrayChoice[i] -= 100
          }
        }

        // diagonal middle right down
        if (i < 5 && i > 0 && avaiSpot > 1 && avaiSpot < 5) {
          if (colOneRight[avaiSpot].classList.contains(P1Cls) && colTwoRight[avaiSpot + 1].classList.contains(P1Cls) && colOneLeft[avaiSpot - 2].classList.contains(P1Cls)) {
            arrayChoice[i] -= 100
          }
        }

        // diagonal middle left down
        if (i < 6 && i > 1 && avaiSpot > 1 && avaiSpot < 5) {
          if (colOneLeft[avaiSpot].classList.contains(P1Cls) && colTwoLeft[avaiSpot + 1].classList.contains(P1Cls) && colOneRight[avaiSpot - 2].classList.contains(P1Cls)) {
            arrayChoice[i] -= 100
          }
        }

        //verticle check own color
        if (avaiSpot < 5) {
          if (curntCol[avaiSpot + 1].classList.contains(P2Cls)){
            arrayChoice[i] += 2
            if (avaiSpot < 4) {
              if (curntCol[avaiSpot + 1].classList.contains(P2Cls) && curntCol[avaiSpot + 2].classList.contains(P2Cls)){
                arrayChoice[i] += 5 
                if (avaiSpot < 3) {
                  if (curntCol[avaiSpot + 1].classList.contains(P2Cls) && curntCol[avaiSpot + 2].classList.contains(P2Cls) && curntCol[avaiSpot + 3].classList.contains(P2Cls)){
                    arrayChoice[i] += 1300
                  }
                }
              }
            }
          }
        }
        
        //verticle check opponents color
        if (avaiSpot < 5) {
          if (curntCol[avaiSpot + 1].classList.contains(P1Cls)){
            arrayChoice[i] += 2
            if (avaiSpot < 4) {
              if (curntCol[avaiSpot + 1].classList.contains(P1Cls) && curntCol[avaiSpot + 2].classList.contains(P1Cls)){
                arrayChoice[i] += 5 
                if (avaiSpot < 3) {
                  if (curntCol[avaiSpot + 1].classList.contains(P1Cls) && curntCol[avaiSpot + 2].classList.contains(P1Cls) && curntCol[avaiSpot + 3].classList.contains(P1Cls)){
                    arrayChoice[i] += 1000
                  }
                }
              }
            }
          }
        }

        if ((i === 4 && avaiSpot === 5) || (i === 2 && avaiSpot === 5)) {
          arrayChoice[i] += 2
        }

        if (avaiSpot < 1 && arrayChoice[i] < 1000) {
          arrayChoice[i] = 0
        }
        
        if (avaiSpot < 6 && avaiSpot >= 0) {
          arrayChoice[i] += 1
        }

        if (i === 3 && avaiSpot > 0) {
          arrayChoice[i] += 7
        }
      } else arrayChoice[i] = 0
    } 
  }

  const arrayChoice = [0,0,0,0,0,0,0]

  function createMove(){
    checkMove()

    console.log(arrayChoice)

    let maxNumber = Math.max(...arrayChoice)
    let playHere = arrayChoice.indexOf(maxNumber)

    if (maxNumber === 0) {
      maxNumber = Math.min(...arrayChoice)
      playHere = arrayChoice.indexOf(maxNumber)
    }

    if (playHere === 0) {
      dropColor02()
      checkWinC0P2()
      return changeWait()
    }
    if (playHere === 1) {
      dropColor12()
      checkWinC1P2()
      return changeWait()
    }
    if (playHere === 2) {
      dropColor22()
      checkWinC2P2()
      return changeWait()
    }
    if (playHere === 3) {
      dropColor32()
      checkWinC3P2()
      return changeWait()
    }
    if (playHere === 4) {
      dropColor42()
      checkWinC4P2()
      return changeWait()
    }
    if (playHere === 5) {
      dropColor52()
      checkWinC5P2()
      return changeWait()
    }
    if (playHere === 6) {
      dropColor62()
      checkWinC6P2()
      return changeWait()
    }
  }

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
      if (computer) return compWin()
      return checkWin()

      // vertical check 
    } if (pIdx < 3) {
      if (col0[pIdx].classList.contains(P2Cls) && col0[pIdx + 1].classList.contains(P2Cls) && col0[pIdx + 2].classList.contains(P2Cls) && col0[pIdx + 3].classList.contains(P2Cls)){
        col0[pIdx].classList.add(winFlip)
        col0[pIdx + 1].classList.add(winFlip)
        col0[pIdx + 2].classList.add(winFlip)
        col0[pIdx + 3].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()

        // diagonal down right \
      } if (col3[pIdx + 3].classList.contains(P2Cls) && col2[pIdx + 2].classList.contains(P2Cls) && col1[pIdx + 1].classList.contains(P2Cls) && col0[pIdx].classList.contains(P2Cls)) {
        col0[pIdx].classList.add(winFlip)
        col1[pIdx + 1].classList.add(winFlip)
        col2[pIdx + 2].classList.add(winFlip)
        col3[pIdx + 3].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      } 
      
      // diagonal up right /
    } if (pIdx > 2) {
      if (col3[pIdx - 3].classList.contains(P2Cls) && col2[pIdx - 2].classList.contains(P2Cls) && col1[pIdx - 1].classList.contains(P2Cls) && col0[pIdx].classList.contains(P2Cls)) {
        col0[pIdx].classList.add(winFlip)
        col1[pIdx - 1].classList.add(winFlip)
        col2[pIdx - 2].classList.add(winFlip)
        col3[pIdx - 3].classList.add(winFlip)
        if (computer) return compWin()
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
      if (playerGo && wait) {
        dropColor11()
        checkWinC1P1()
        columnFunctionsP1()
      } else if (!playerGo && !computer) {
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
      if (computer) return compWin()
      return checkWin()
    } if (col0[pIdx].classList.contains(P2Cls) && col1[pIdx].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls)){
      col0[pIdx].classList.add(winFlip)
      col1[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      if (computer) return compWin()
      return checkWin()
  
      // diagonal up right /
    } if (pIdx > 2) {
      if (col4[pIdx - 3].classList.contains(P2Cls) && col3[pIdx - 2].classList.contains(P2Cls) && col2[pIdx - 1].classList.contains(P2Cls) && col1[pIdx].classList.contains(P2Cls)) {
        col1[pIdx].classList.add(winFlip)
        col2[pIdx - 1].classList.add(winFlip)
        col3[pIdx - 2].classList.add(winFlip)
        col4[pIdx - 3].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      }
      // diagonal up right /
    } if (pIdx < 5 && pIdx > 1 ) {
      if (col3[pIdx - 2].classList.contains(P2Cls) && col2[pIdx - 1].classList.contains(P2Cls) && col1[pIdx].classList.contains(P2Cls) && col0[pIdx + 1].classList.contains(P2Cls)) {
        col0[pIdx + 1].classList.add(winFlip)
        col1[pIdx].classList.add(winFlip)
        col2[pIdx - 1].classList.add(winFlip)
        col3[pIdx - 2].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      }
      
      // diagonal down right \
    } if (pIdx < 3) {
      if (col4[pIdx + 3].classList.contains(P2Cls) && col3[pIdx + 2].classList.contains(P2Cls) && col2[pIdx + 1].classList.contains(P2Cls) && col1[pIdx].classList.contains(P2Cls)) {
        col1[pIdx].classList.add(winFlip)
        col2[pIdx + 1].classList.add(winFlip)
        col3[pIdx + 2].classList.add(winFlip)
        col4[pIdx + 3].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      }
      // diagonal down right \
    } if (pIdx < 4 && pIdx > 0) {
      if (col3[pIdx + 2].classList.contains(P2Cls) && col2[pIdx + 1].classList.contains(P2Cls) && col1[pIdx].classList.contains(P2Cls) && col0[pIdx - 1].classList.contains(P2Cls)) {
        col0[pIdx - 1].classList.add(winFlip)
        col1[pIdx].classList.add(winFlip)
        col2[pIdx + 1].classList.add(winFlip)
        col3[pIdx + 2].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      }
  
      // vertical check
    } if (pIdx < 3) {
      if (col1[pIdx].classList.contains(P2Cls) && col1[pIdx + 1].classList.contains(P2Cls) && col1[pIdx + 2].classList.contains(P2Cls) && col1[pIdx + 3].classList.contains(P2Cls)){
        col1[pIdx].classList.add(winFlip)
        col1[pIdx + 1].classList.add(winFlip)
        col1[pIdx + 2].classList.add(winFlip)
        col1[pIdx + 3].classList.add(winFlip)
        if (computer) return compWin()
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
      if (playerGo && wait) {
        dropColor21()
        checkWinC2P1()
        columnFunctionsP1()
      } else if (!playerGo && !computer) {
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
      if (computer) return compWin()
      return checkWin()
    } if (col1[pIdx].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls)){
      col4[pIdx].classList.add(winFlip)
      col1[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      if (computer) return compWin()
      return checkWin()
    } if (col0[pIdx].classList.contains(P2Cls) && col1[pIdx].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls)){
      col0[pIdx].classList.add(winFlip)
      col1[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      if (computer) return compWin()
      return checkWin()
  
      // diagonal up right /
    } if (pIdx > 2) {
      if (col5[pIdx - 3].classList.contains(P2Cls) && col4[pIdx - 2].classList.contains(P2Cls) && col3[pIdx - 1].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls)) {
        col2[pIdx].classList.add(winFlip)
        col3[pIdx - 1].classList.add(winFlip)
        col4[pIdx - 2].classList.add(winFlip)
        col5[pIdx - 3].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      }
      // diagonal up right / 
    } if (pIdx < 5 && pIdx > 1 ) {
      if (col4[pIdx - 2].classList.contains(P2Cls) && col3[pIdx - 1].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col1[pIdx + 1].classList.contains(P2Cls)) {
        col1[pIdx + 1].classList.add(winFlip)
        col2[pIdx].classList.add(winFlip)
        col3[pIdx - 1].classList.add(winFlip)
        col4[pIdx - 2].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      }
      // diagonal up right /
    } if (pIdx < 4 && pIdx > 0 ) {
      if (col3[pIdx - 1].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col1[pIdx + 1].classList.contains(P2Cls) && col0[pIdx + 2].classList.contains(P2Cls)) {
        col0[pIdx + 2].classList.add(winFlip)
        col1[pIdx + 1].classList.add(winFlip)
        col2[pIdx].classList.add(winFlip)
        col3[pIdx - 1].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      }
      // diagonal down right \
    } if (pIdx < 3) {
      if (col5[pIdx + 3].classList.contains(P2Cls) && col4[pIdx + 2].classList.contains(P2Cls) && col3[pIdx + 1].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls)) {
        col2[pIdx].classList.add(winFlip)
        col3[pIdx + 1].classList.add(winFlip)
        col4[pIdx + 2].classList.add(winFlip)
        col5[pIdx + 3].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      }
      // diagonal down right \
    } if (pIdx < 4 && pIdx > 0) {
      if (col4[pIdx + 2].classList.contains(P2Cls) && col3[pIdx + 1].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col1[pIdx - 1].classList.contains(P2Cls)) {
        col1[pIdx - 1].classList.add(winFlip)
        col2[pIdx].classList.add(winFlip)
        col3[pIdx + 1].classList.add(winFlip)
        col4[pIdx + 2].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      }
      // diagonal down right \
    } if (pIdx < 5 && pIdx > 1) {
      if (col3[pIdx + 1].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col1[pIdx - 1].classList.contains(P2Cls) && col0[pIdx - 2].classList.contains(P2Cls)) {
        col0[pIdx - 2].classList.add(winFlip)
        col1[pIdx - 1].classList.add(winFlip)
        col2[pIdx].classList.add(winFlip)
        col3[pIdx + 1].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      }
  
      // vertical check
    } if (pIdx < 3) {
      if (col2[pIdx].classList.contains(P2Cls) && col2[pIdx + 1].classList.contains(P2Cls) && col2[pIdx + 2].classList.contains(P2Cls) && col2[pIdx + 3].classList.contains(P2Cls)){
        col2[pIdx].classList.add(winFlip)
        col2[pIdx + 1].classList.add(winFlip)
        col2[pIdx + 2].classList.add(winFlip)
        col2[pIdx + 3].classList.add(winFlip)
        if (computer) return compWin()
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
      if (playerGo && wait) {
        dropColor31()
        checkWinC3P1()
        columnFunctionsP1()
      } else if (!playerGo && !computer) {
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
      if (computer) return compWin()
      return checkWin()
    } if (col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col5[pIdx].classList.contains(P2Cls)){
      col5[pIdx].classList.add(winFlip)
      col4[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      if (computer) return compWin()
      return checkWin()
    } if (col1[pIdx].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls)){
      col4[pIdx].classList.add(winFlip)
      col1[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      if (computer) return compWin()
      return checkWin()
    } if (col0[pIdx].classList.contains(P2Cls) && col1[pIdx].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls)){
      col0[pIdx].classList.add(winFlip)
      col1[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      if (computer) return compWin()
      return checkWin()
  
      // diagonal up right /
    } if (pIdx > 2) {
      if (col6[pIdx - 3].classList.contains(P2Cls) && col5[pIdx - 2].classList.contains(P2Cls) && col4[pIdx - 1].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls)) {
        col6[pIdx - 3].classList.add(winFlip)
        col5[pIdx - 2].classList.add(winFlip)
        col4[pIdx - 1].classList.add(winFlip)
        col3[pIdx].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      }
      // diagonal up right / 
    } if (pIdx < 5 && pIdx > 1 ) {
      if (col5[pIdx - 2].classList.contains(P2Cls) && col4[pIdx - 1].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col2[pIdx + 1].classList.contains(P2Cls)) {
        col5[pIdx - 2].classList.add(winFlip)
        col4[pIdx - 1].classList.add(winFlip)
        col3[pIdx].classList.add(winFlip)
        col2[pIdx + 1].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      }
      // diagonal up right /
    } if (pIdx < 4 && pIdx > 0 ) {
      if (col4[pIdx - 1].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col2[pIdx + 1].classList.contains(P2Cls) && col1[pIdx + 2].classList.contains(P2Cls)) {
        col4[pIdx - 1].classList.add(winFlip)
        col3[pIdx].classList.add(winFlip)
        col2[pIdx + 1].classList.add(winFlip)
        col1[pIdx + 2].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      }
      // diagonal up left \
    } if (pIdx > 2) {
      if (col3[pIdx].classList.contains(P2Cls) && col2[pIdx - 1].classList.contains(P2Cls) && col1[pIdx - 2].classList.contains(P2Cls) && col0[pIdx - 3].classList.contains(P2Cls)) {
        col3[pIdx].classList.add(winFlip)
        col2[pIdx - 1].classList.add(winFlip)
        col1[pIdx - 2].classList.add(winFlip)
        col0[pIdx - 3].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      }
    
      // diagonal down right \
    } if (pIdx < 3) {
      if (col6[pIdx + 3].classList.contains(P2Cls) && col5[pIdx + 2].classList.contains(P2Cls) && col4[pIdx + 1].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls)) {
        col6[pIdx + 3].classList.add(winFlip)
        col5[pIdx + 2].classList.add(winFlip)
        col4[pIdx + 1].classList.add(winFlip)
        col3[pIdx].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      }
      // diagonal down right \
    } if (pIdx < 4 && pIdx > 0) {
      if (col5[pIdx + 2].classList.contains(P2Cls) && col4[pIdx + 1].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col2[pIdx - 1].classList.contains(P2Cls)) {
        col5[pIdx + 2].classList.add(winFlip)
        col4[pIdx + 1].classList.add(winFlip)
        col3[pIdx].classList.add(winFlip)
        col2[pIdx - 1].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      }
      // diagonal down right \
    } if (pIdx < 5 && pIdx > 1) {
      if (col4[pIdx + 1].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col2[pIdx - 1].classList.contains(P2Cls) && col1[pIdx - 2].classList.contains(P2Cls)) {
        col4[pIdx + 1].classList.add(winFlip)
        col3[pIdx].classList.add(winFlip)
        col2[pIdx - 1].classList.add(winFlip)
        col1[pIdx - 2].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      }
      // diagonal down left /
    } if (pIdx < 3) {
      if (col3[pIdx].classList.contains(P2Cls) && col2[pIdx + 1].classList.contains(P2Cls) && col1[pIdx + 2].classList.contains(P2Cls) && col0[pIdx + 3].classList.contains(P2Cls)) {
        col3[pIdx].classList.add(winFlip)
        col2[pIdx + 1].classList.add(winFlip)
        col1[pIdx + 2].classList.add(winFlip)
        col0[pIdx + 3].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      }
  
      // vertical check
    } if (pIdx < 3) {
      if (col3[pIdx].classList.contains(P2Cls) && col3[pIdx + 1].classList.contains(P2Cls) && col3[pIdx + 2].classList.contains(P2Cls) && col3[pIdx + 3].classList.contains(P2Cls)){
        col3[pIdx].classList.add(winFlip)
        col3[pIdx + 1].classList.add(winFlip)
        col3[pIdx + 2].classList.add(winFlip)
        col3[pIdx + 3].classList.add(winFlip)
        if (computer) return compWin()
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
      if (playerGo && wait) {
        dropColor41()
        checkWinC4P1()
        columnFunctionsP1()
      } else if (!playerGo && !computer) {
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
      if (computer) return compWin()
      return checkWin()
    } if (col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col5[pIdx].classList.contains(P2Cls)){
      col5[pIdx].classList.add(winFlip)
      col4[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      if (computer) return compWin()
      return checkWin()
    } if (col1[pIdx].classList.contains(P2Cls) && col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls)){
      col4[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col1[pIdx].classList.add(winFlip)
      if (computer) return compWin()
      return checkWin()
  
      // diagonal up right /
    } if (pIdx < 5 && pIdx > 1) {
      if (col6[pIdx - 2].classList.contains(P2Cls) && col5[pIdx - 1].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col3[pIdx + 1].classList.contains(P2Cls)) {
        col6[pIdx - 2].classList.add(winFlip)
        col5[pIdx - 1].classList.add(winFlip)
        col4[pIdx].classList.add(winFlip)
        col3[pIdx + 1].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      }
      // diagonal up right / 
    } if (pIdx < 4 && pIdx > 0 ) {
      if (col5[pIdx - 1].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col3[pIdx + 1].classList.contains(P2Cls) && col2[pIdx + 2].classList.contains(P2Cls)) {
        col5[pIdx - 1].classList.add(winFlip)
        col4[pIdx].classList.add(winFlip)
        col3[pIdx + 1].classList.add(winFlip)
        col2[pIdx + 2].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      }
      // diagonal up left \
    } if (pIdx > 2) {
      if (col4[pIdx].classList.contains(P2Cls) && col3[pIdx - 1].classList.contains(P2Cls) && col2[pIdx - 2].classList.contains(P2Cls) && col1[pIdx - 3].classList.contains(P2Cls)) {
        col4[pIdx].classList.add(winFlip)
        col3[pIdx - 1].classList.add(winFlip)
        col2[pIdx - 2].classList.add(winFlip)
        col1[pIdx - 3].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      }

      // diagonal down left /
    } if (pIdx < 3) {
      if (col4[pIdx].classList.contains(P2Cls) && col3[pIdx + 1].classList.contains(P2Cls) && col2[pIdx + 2].classList.contains(P2Cls) && col1[pIdx + 3].classList.contains(P2Cls)) {
        col4[pIdx].classList.add(winFlip)
        col3[pIdx + 1].classList.add(winFlip)
        col2[pIdx + 2].classList.add(winFlip)
        col1[pIdx + 3].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      }
      // diagonal down right \
    } if (pIdx < 5 && pIdx > 1) {
      if (col5[pIdx + 1].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col3[pIdx - 1].classList.contains(P2Cls) && col2[pIdx - 2].classList.contains(P2Cls)) {
        col5[pIdx + 1].classList.add(winFlip)
        col4[pIdx].classList.add(winFlip)
        col3[pIdx - 1].classList.add(winFlip)
        col2[pIdx - 2].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      }
      // diagonal down right \
    } if (pIdx < 4 && pIdx > 0) {
      if (col6[pIdx + 2].classList.contains(P2Cls) && col5[pIdx + 1].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col3[pIdx - 1].classList.contains(P2Cls)) {
        col6[pIdx + 2].classList.add(winFlip)
        col5[pIdx + 1].classList.add(winFlip)
        col4[pIdx].classList.add(winFlip)
        col3[pIdx - 1].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      }
      
      // vertical check
    } if (pIdx < 3) {
      if (col4[pIdx].classList.contains(P2Cls) && col4[pIdx + 1].classList.contains(P2Cls) && col4[pIdx + 2].classList.contains(P2Cls) && col4[pIdx + 3].classList.contains(P2Cls)){
        col4[pIdx].classList.add(winFlip)
        col4[pIdx + 1].classList.add(winFlip)
        col4[pIdx + 2].classList.add(winFlip)
        col4[pIdx + 3].classList.add(winFlip)
        if (computer) return compWin()
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
      if (playerGo && wait) {
        dropColor51()
        checkWinC5P1()
        columnFunctionsP1()
      } else if (!playerGo && !computer) {
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
      if (computer) return compWin()
      return checkWin()
    } if (col2[pIdx].classList.contains(P2Cls) && col3[pIdx].classList.contains(P2Cls) && col4[pIdx].classList.contains(P2Cls) && col5[pIdx].classList.contains(P2Cls)){
      col5[pIdx].classList.add(winFlip)
      col4[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      if (computer) return compWin()
      return checkWin()
  
      // diagonal up right / 
    } if (pIdx < 4 && pIdx > 0 ) {
      if (col6[pIdx - 1].classList.contains(P2Cls) && col5[pIdx].classList.contains(P2Cls) && col4[pIdx + 1].classList.contains(P2Cls) && col3[pIdx + 2].classList.contains(P2Cls)) {
        col6[pIdx - 1].classList.add(winFlip)
        col5[pIdx].classList.add(winFlip)
        col4[pIdx + 1].classList.add(winFlip)
        col3[pIdx + 2].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      }
      // diagonal up left \
    } if (pIdx > 2) {
      if (col5[pIdx].classList.contains(P2Cls) && col4[pIdx - 1].classList.contains(P2Cls) && col3[pIdx - 2].classList.contains(P2Cls) && col2[pIdx - 3].classList.contains(P2Cls)) {
        col5[pIdx].classList.add(winFlip)
        col4[pIdx - 1].classList.add(winFlip)
        col3[pIdx - 2].classList.add(winFlip)
        col2[pIdx - 3].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      }

      // diagonal down right \
    } if (pIdx < 5 && pIdx > 1) {
      if (col6[pIdx + 1].classList.contains(P2Cls) && col5[pIdx].classList.contains(P2Cls) && col4[pIdx - 1].classList.contains(P2Cls) && col3[pIdx - 2].classList.contains(P2Cls)) {
        col6[pIdx + 1].classList.add(winFlip)
        col5[pIdx].classList.add(winFlip)
        col4[pIdx - 1].classList.add(winFlip)
        col3[pIdx - 2].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      }
      // diagonal down left /
    } if (pIdx < 3) {
      if (col5[pIdx].classList.contains(P2Cls) && col4[pIdx + 1].classList.contains(P2Cls) && col3[pIdx + 2].classList.contains(P2Cls) && col2[pIdx + 3].classList.contains(P2Cls)) {
        col5[pIdx].classList.add(winFlip)
        col4[pIdx + 1].classList.add(winFlip)
        col3[pIdx + 2].classList.add(winFlip)
        col2[pIdx + 3].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      }
  
      // vertical check
    } if (pIdx < 3) {
      if (col5[pIdx].classList.contains(P2Cls) && col5[pIdx + 1].classList.contains(P2Cls) && col5[pIdx + 2].classList.contains(P2Cls) && col5[pIdx + 3].classList.contains(P2Cls)){
        col5[pIdx].classList.add(winFlip)
        col5[pIdx + 1].classList.add(winFlip)
        col5[pIdx + 2].classList.add(winFlip)
        col5[pIdx + 3].classList.add(winFlip)
        if (computer) return compWin()
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
      if (playerGo && wait) {
        dropColor61()
        checkWinC6P1()
        columnFunctionsP1()
      } else if (!playerGo && !computer) {
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
      if (computer) return compWin()
      return checkWin()
  
      // diagonal down right / 
    } if (pIdx < 3) {
      if (col6[pIdx].classList.contains(P2Cls) && col5[pIdx + 1].classList.contains(P2Cls) && col4[pIdx + 2].classList.contains(P2Cls) && col3[pIdx + 3].classList.contains(P2Cls)) {
        col6[pIdx].classList.add(winFlip)
        col5[pIdx + 1].classList.add(winFlip)
        col4[pIdx + 2].classList.add(winFlip)
        col3[pIdx + 3].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      }

      // diagonal up left \
    } if (pIdx > 2) {
      if (col6[pIdx].classList.contains(P2Cls) && col5[pIdx - 1].classList.contains(P2Cls) && col4[pIdx - 2].classList.contains(P2Cls) && col3[pIdx - 3].classList.contains(P2Cls)) {
        col6[pIdx].classList.add(winFlip)
        col5[pIdx - 1].classList.add(winFlip)
        col4[pIdx - 2].classList.add(winFlip)
        col3[pIdx - 3].classList.add(winFlip)
        if (computer) return compWin()
        return checkWin()
      }
  
      // vertical check
    } if (pIdx < 3) {
      if (col6[pIdx].classList.contains(P2Cls) && col6[pIdx + 1].classList.contains(P2Cls) && col6[pIdx + 2].classList.contains(P2Cls) && col6[pIdx + 3].classList.contains(P2Cls)){
        col6[pIdx].classList.add(winFlip)
        col6[pIdx + 1].classList.add(winFlip)
        col6[pIdx + 2].classList.add(winFlip)
        col6[pIdx + 3].classList.add(winFlip)
        if (computer) return compWin()
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
