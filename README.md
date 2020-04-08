# <img src='assets/ConnectDraw.svg' width='400'>

<h1>General Assembly Project One: Connect Draw</h1>

<h2>Goal: Build a game of Connect Four</h2>

| Contents                      |                |
| ------------------------------|----------------|
|1. [Overview](#overview)       |6. [Future content](#future)  
|2. [Brief](#brief)             |7. [Wins](#wins)
|3. [Technologies used](#tech)  |8. [Blockers](#blockers)
|4. [App](#app)                 |9. [Bugs](#bugs)
|5. [Approach](#approach)       |10. [Future learnings](#learn)

<h2 name='overview'>Overview</h2>

<h3>Introduction</h3>

Connect 4 is a game where players attempt to make a line of four pieces in a 7 x 6 grid. Players can drop their pieces into columns, so that their piece rests in the lowest available space in that column. The winner is the first to create a line of four in any direction, including diagonally. If the board is filled before a line of 4 can be made, the game is declared a draw. I decided to create a western themed game because four and draw sounded similar, in westerns the word 'draw' has connotations with dueling. I though these parallels were enough to create a fun theme.

<h3>Deployment</h3>

The app is deployed on GitHub pages and can be found here: https://darbjm.github.io/Connet-draw<br>

<h3>Timeframe</h3>

10 days

<h2 name='brief'>Brief</h2>

* The game should be playable for two players on the same computer, taking turns to make their moves
* The winner should be displayed when the game is over

Suggested enhancements

* Responsive design
* Single player mode with the computer making reasonable moves

<h2>Note</h2>

After the 10 days was completed the single player mode was the only unfinished part. You can see the logic for the game after 10 days in the TenDayApp.js file. After the project was finished it took me 2 days to complete the single player mode.

<h2 name='tech'>Technologies used</h2>
<p>1. HTML5 with audio<br>
2. CSS3 with animation<br>
3. JavaScript<br>
4. Z shell<br>
5. GitHub<br><p/>

<h2 name='app'>App</h2>

My app has two game modes, single player or two player. If two player (Duel) is selected, two people play on the same machine taking turns to drop tokens into the grid to create four in a row. You drop a token by clicking on the column you want it in, the token will fall to the last available spot.<br>
<br>
<br>
<img src='readme/duelWorking.gif' width='600'>
<br>
<br>
<br>
If single player is selected, the user will compete against a computer that is designed to play at an average level.<br>
<br>
<br>
<img src='readme/singlePlayerWorking.gif' width='600'>
<br>
<br>
<br>
The game has sound that can be toggled and a reset button<br>
<br>
<br>
<img src='readme/ResetButton.gif' width='600'>
<br>
<br>
<br>
<h3 name='approach'>Approach</h3>
I looped through an array of divs to create my grid.

```JavaScript
  //loop empty array
  Array(width * height).join('.').split('.').forEach((num, i) => {
    const circle = document.createElement('div')
    circle.classList.add('grid-item')
    circle.setAttribute('data-id', i)
    circles.push(circle)
    grid.appendChild(circle)
  })
```

It was the a simple case of styling and creating columns from the divs using the filter function and modulus operator.

```JavaScript
  const col0 = circles.filter((e, i) => i % 7 === 0)
  const col1 = circles.filter((e, i) => i % 7 === 1)
  const col2 = circles.filter((e, i) => i % 7 === 2)
  const col3 = circles.filter((e, i) => i % 7 === 3)
  const col4 = circles.filter((e, i) => i % 7 === 4)
  const col5 = circles.filter((e, i) => i % 7 === 5)
  const col6 = circles.filter((e, i) => i % 7 === 6)
  ```

Once the columns were created I used event listeners for each column. When the column was clicked the users turns were switched and so the current users colour was dropped to the last empty space.

```JavaScript
    function dropColor01() {
    for (let i = 0; i < col0.length; i++) {
      if (col0[col0.length - 1].classList.contains(P1Cls) || col0[col0.length - 1].classList.contains(P2Cls)) { // check if last cell has a color
        const found = col0.indexOf(col0.find(e => e.classList.contains(P1Cls) || e.classList.contains(P2Cls))) // if so find the first cell with a color
        return col0[found - 1].classList.add(P1Cls) // add yellow to the cell above the one found
      } else return (col0[col0.length - 1].classList.add(P1Cls)) // else add yellow to the bottom cell
    }
  }
```

Now that the columns could be filled I had the task of checking if the latest move mean't a user had won. The code for this became very long and prone to mistakes as I did not fully understand objects yet (although I used objects for the computers decisions, which is how I would now create this code).

```JavaScript
    function checkWinC0P1() { // checkWin col0 player 1
    const pIdx = col0.indexOf(col0.find(e => e.classList.contains(P1Cls))) // find the index of color 1
    // horizontal check
    if (col0[pIdx].classList.contains(P1Cls) && col1[pIdx].classList.contains(P1Cls) && col2[pIdx].classList.contains(P1Cls) && col3[pIdx].classList.contains(P1Cls)){
      col0[pIdx].classList.add(winFlip)
      col1[pIdx].classList.add(winFlip)
      col2[pIdx].classList.add(winFlip)
      col3[pIdx].classList.add(winFlip)
      return checkWin()
    }
```
As you can see from the code above, without using objects I had to go through each column and check if the available places had the users tokens in them. This got complicated with the diagonal wins in just the center column.<br>

```JavaScript
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
    }
```

<h3>Styling</h3>
I decided to begin work on the styling after the MVP was finished and really enjoyed using my skills as a designer to create unique shotgun shell tokens and sound effects. As well as creating dynamic menus.

```JavaScript
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
```

<h2 name='future'>Future content</h2>
<h3>Smarter computer</h3>
After the 10 days were up I had fully styled and completed the two player game. The computer for the single player mode was unfinished, had bugs, and was incapable of making intelligent moves. However I fixed this and it now works well. I would like to continue making the computer more intelligent by implementing the Minimax method with Node.js<br>
<br>
<br>
<img src='readme/singlePlayerBroken.gif' width='600'>
<br>
<br>

<h2 name='wins'>Wins</h2>
<h3>Objects</h3>
As we have seen I learned my lesson when it came to objects. The amount of time and struggle I would of saved if I had started out with them, may of mean't the single player would have been finished in 10 days. However I decided to use objects when building the single player computer, This meant the computer was able to loop through each column and give it a score according to how smart it would be to place its token in that column. The code below is a small section of this.

This was really interesting to me as it was another way to interpret the grid, instead of seeing it, I was reading it with code.

```javascript
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
            arrayChoice[i] += 2 // add two to the score of this column
            if (i < 5){
              if (colTwoRight[avaiSpot].classList.contains(P2Cls)){
                arrayChoice[i] += 5 // add five to the score of this column
                if (i < 4){
                  if (colThreeRight[avaiSpot].classList.contains(P2Cls)){
                    arrayChoice[i] += 1300 // this score is so large because this means it wins, therefore it should always go here
                  }
                }
              }
            }
          }
        }
      }
    }
  }
```

<h3>Computer</h3>

After a lot of research I discovered that a great way to get computers to make decisions was with maths, simply give each column a score and then it places its token in the highest scoring column. Getting the scores right and finding different ways to score each column was riveting, after testing I believe I produced a computer that is a challenge to the average player.

<h2 name='blockers'>Blockers</h2>
<h3>Amount of code</h3>
Being my first project I've learned a really important lesson. That is keeping code simple and readable, although the majority of this code is fairly simple it actually impacts its overall simplicity and readability because there is so much of it. There are around 2000 lines of JavaScript, this makes it hard to understand and edit.
<br>
<br>
<h3>Player turns</h3>
In the single player mode I struggled with blocking the player from going many times in one go. I used a simple function that would change the variable 'Wait' from true to false but I couldn't work out where to put it. I was trying to use setTimeout() functions to pause the players turn, but this didn't work. I found that I just needed to change the variable at the end of both the players and the computers go.
<br>
<br>
<img src='readme/WaitGlitch.gif' width='600'>
<br>
<br>
<h3>Seeing in code</h3>
Having to read the board in code was really interesting but also a massive challenge as I couldn't make one mistake otherwise the single player mode would crash. It was very time intensive and took a lot of concentration and planning.
<h2 name='bugs'>Bugs</h2>
<h3>CSS</h3>
The app is not responsive for mobile and the grid appears very small for it.
<h2 name='learn'>Future learnings</h2>
• Learn more about objects<br>
• Take a look into the Minimax method<br>
