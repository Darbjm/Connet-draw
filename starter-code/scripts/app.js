// connect 4

// when user clicks on a circle the 
// a square is filled with a colour in that coloumn
// the lowest possible square is filled
// how do we not hard code this?
//

// check to see if there are 4 chips in a row

// if yes finish game

// once user has clicked, delay 2 seconds

// then the computer places its chip

// how does the computer decide to place its chip?
// research

// check to see if there are 4 chips in a row

// if yes finish game

function init() {
  //  DOM Variables
  const grid = document.querySelector('.grid')
  const circles = [] //Belongs here as you fill the array with DOM references eventhough genallly it should be in the game variables
  // Game Variables
  const width = 7 //if you want grid bigger, change this then change styling in css accordingly
  const height = 6
  const playerIndex1 = 0
  const player1class = 'yellow'
  const player2class = 'red'



  //loop empty array (HOW TO MAKE A SIMPLE GRID)
  Array(width * height).join('.').split('.').forEach(() => {
    const circle = document.createElement('div')
    circle.classList.add('grid-item')
    circles.push(circle)
    grid.appendChild(circle)
  })

  const column0 = circles.filter((e, i) => i % 7 === 0) //make into object
  const column1 = circles.filter((e, i) => i % 7 === 1)
  const column2 = circles.filter((e, i) => i % 7 === 2)
  const column3 = circles.filter((e, i) => i % 7 === 3)
  const column4 = circles.filter((e, i) => i % 7 === 4)
  const column5 = circles.filter((e, i) => i % 7 === 5)
  const column6 = circles.filter((e, i) => i % 7 === 6)

  column0.forEach(e => {
    e.addEventListener('click', () => {
      dropColor()
    })
  })

  function dropColor() {
    for (let i = 0; i < column0.length; i++) {
      if (column0[column0.length - 1].classList.contains('red')) {
        const found = column0.indexOf(column0.find(e => e.classList.contains('red')))
        return column0[found - 1].classList.add('red')
      } else return (column0[column0.length - 1].classList.add('red'))
    }
  }
  
  

  // cycle through the array when you find a value (v) with .red or .yellow
  // add player[n]color to indexof(v - 1)
  // If no value has .red or .yellow add player[n]color to last value


  // for (let i = 0; i < circles.length; i++) {
  //   circles[i].addEventListener('click', () => {
  //     playerIndex1 = i
  //     //IF THE CELL CONTAINS RED then add red to the second one
  //     if (circles[i + 35].classList.contains('red')) {
  //       circles[i + 28].classList.add('red')
  //     } if (circles[i + 28].classList.contains('red')) {
  //       circles[i + 21].classList.add('red')
  //     } if (circles[i + 21].classList.contains('red')) {
  //       circles[i + 14].classList.add('red')
  //     } if (circles[i + 14].classList.contains('red')) {
  //       circles[i + 7].classList.add('red')
  //     } if (circles[i + 28].classList.contains('red')) {
  //       circles[i + 21].classList.add('red')
  //     }
  //     //otherwise add RED IN THE LOWEST CELL
  //     circles[i + 35].classList.add(player2class)
  //   }
  //   )
  // }



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
