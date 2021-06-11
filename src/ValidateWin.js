import GameModal from './GameModal';

const ValidateTotal = (cardHand) =>{
    let numberOfAces = cardHand.filter(x => x.value === 11).length;
    let total =  CalculateTotal(cardHand);

    if (numberOfAces === 0 || total < 21){
      return total;
    }
    for (let i = 0; i < numberOfAces; i++)
    {
        total -= 10;
        if (total < 21)
        {
            break;
        }
    }
    return total;
  }

  const CalculateTotal = (cardHand) => {
    let total =  cardHand.reduce( function(a, b){
      return a + b.value;
    }, 0);
    return total;
  }
  

const HandTotal = (cards) => {
    return CalculateTotal(cards) <= 21 ? CalculateTotal(cards) : ValidateTotal(cards);
  }

  const Result = (playerTotal, dealerTotal) => {
    return (playerTotal > dealerTotal && playerTotal <= 21) || (playerTotal <= 21 && dealerTotal > 21);
  }

export default function ValidateResult(props){
    let win = Result(HandTotal(props.playerCards), HandTotal(props.dealerCards))
    let gameOver = props.totalMoney <= 0 && !win;
    let winMessage = win ? "You Win!" : (gameOver ? "Game Over" : "You Lose!") ;
    
    return <GameModal win={win} winMessage={winMessage} gameOver={gameOver} open={props.open} HandleModalClose={props.HandleModalClose}/>
  }

  export {ValidateTotal, CalculateTotal};