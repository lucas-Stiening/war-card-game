let deckId = ''

fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        deckId = data.deck_id
      })
      .catch(err => {
          console.log(`error ${err}`)
      });

document.querySelector('#dealTwo').addEventListener('click', drawTwo)
document.querySelector('#war').addEventListener('click', war, )

function drawTwo(){
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector('#player1').src = data.cards[0].image
        document.querySelector('#player2').src = data.cards[1].image
        let playerOneVal = convertToNum(data.cards[0].value)
        let playerTwoVal = convertToNum(data.cards[1].value)
        if(playerOneVal > playerTwoVal){
          document.querySelector('h3').innerText = 'Player 1 wins'
        }else if(playerOneVal < playerTwoVal){
          document.querySelector('h3').innerText = 'Player 2 wins'
        }else{
          document.querySelector('h3').innerText = 'WAR!'
          document.querySelector('#dealTwo').style.display = 'none'
          document.querySelector('#war').style.display = 'flex'
          }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

function war(){
  const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=8`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)
        document.querySelector('#player1War1').src = data.cards[0].image
        document.querySelector('#player2War1').src = data.cards[1].image
        document.querySelector('#player1War2').src = data.cards[2].image
        document.querySelector('#player2War2').src = data.cards[3].image
        document.querySelector('#player1War3').src = data.cards[4].image
        document.querySelector('#player2War3').src = data.cards[5].image
        document.querySelector('#player1BattleCard').src = data.cards[6].image
        document.querySelector('#player2BattleCard').src = data.cards[7].image
        let playerOneVal = convertToNum(data.cards[6].value)
        let playerTwoVal = convertToNum(data.cards[7].value)
        if(playerOneVal > playerTwoVal){
          document.querySelector('h3').innerText = 'Player 1 wins'
        }else if(playerOneVal < playerTwoVal){
          document.querySelector('h3').innerText = 'Player 2 wins'

        }else{
          document.querySelector('h3').innerText = 'WAR!'
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}

function convertToNum(val){
  if(val === 'JACK'){
    return 11
  }else if(val ==='QUEEN'){
    return 12
  }else if(val ==='KING'){
    return 15
  }else if(val ==='ACE'){
    return 14
  }else{
    return Number(val)
  }
}