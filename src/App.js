import './App.css';
import {useState} from 'react';
import Button from '@material-ui/core/Button';
import HandleDeck from './ShowDeck';
import Header from './Header';
import Table from './Table';
import {Card} from './Card';
import ValidateWin, {ValidateTotal, CalculateTotal} from './ValidateWin';
import Display from './Display';


function App() {
  const [deck, setDeck] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isSetStarted, setIsSetStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [hold, setHold] = useState(false);
  const [open, setOpen] = useState(false);
  const [totalMoney, setTotalMoney] = useState(50);
  const [bet, setBet] = useState(5);

  const Init = () => {
    setDeck([]);
    setPlayerCards([]);
    setDealerCards([]);
    setIsGameStarted(true);
    setIsGameOver(false);
    setHold(false);
    setTotalMoney(50);
    setBet(5);
  }

  const HandleModalClose = (win, over) => {
    if(open){
      setOpen(false);
      setTotalMoney(win ? totalMoney + (bet * 2) : totalMoney)
      if(over){
        Init();
      }
      setIsGameStarted(!over);
    }
  };

  const SortDeck = (cards) => {
    let newDeck = cards.sort((a, b) => a.order - b.order);
    return newDeck;
  }

  const CreateDeck = () => {
    Init();
    let cardDeck = [];

    for(let i = 1; i <= 4; i++){
      for(let j = 1; j<=13; j++){
        let value = j > 9 ? 10 : (j === 1 ? 11 : j);
        value = value === 1 ? 11 : value;
        let image = j + "_" + i;
        let random = Math.floor(Math.random() * 1000); 
        let card  = new Card(((i-1)* 13) + j, i, random, value, image);

        cardDeck.push(card);
      }
    }
    cardDeck = SortDeck(cardDeck);
    cardDeck = DealInitial(cardDeck);
  }

  const DealOne = () => {
    let card = deck.shift();
    setPlayerCards((cards) => [...cards, card])
  }

  const DealInitial = (cardDeck) => {
    cardDeck = cardDeck.concat(...dealerCards);
    cardDeck = cardDeck.concat(...playerCards);

    let card1 = cardDeck.shift();
    let card2 = cardDeck.shift();
    let card3 = cardDeck.shift();
    let card4 = cardDeck.shift();

    setPlayerCards([card1,card3]);
    setDealerCards([card2,card4]);
    setDeck(cardDeck); 
    setIsGameOver(false);
    setIsSetStarted(true);
    setTotalMoney(totalMoney - bet);
    setHold(false);

    return cardDeck;
  }

  const CompleteDeal = () =>{
    setHold(true);
    let cards = dealerCards;

    while(CalculateTotal(cards) < 17 || (CalculateTotal(cards) > 21 && ValidateTotal(cards) < 17)){
      let card = deck.shift();
      cards.push(card);
    }

    setDealerCards((cards) => [...cards]);
    setIsGameOver(true);
    setIsSetStarted(false);
    setOpen(true);
  }
  
  return (
    <div className="App">
      <Header/>
      <div className="background">
      {!isGameStarted && 
        <Button className="newGame" onClick={() => CreateDeck()} variant="contained" color="primary">Play New Game</Button>}
          <HandleDeck cards={dealerCards} show={hold} className={"dealerArea"}/>
          <Display totalMoney={totalMoney}/>
          <HandleDeck cards={playerCards} show={true} className={"playerArea"}/>
          {isGameOver && 
            <ValidateWin playerCards={playerCards} dealerCards={dealerCards} totalMoney={totalMoney} 
              open={open} HandleModalClose={HandleModalClose}/>}
          <Table bet={bet} isSetStarted={isSetStarted} deck={deck} totalMoney={totalMoney} isGameStarted={isGameStarted}
             setBet={setBet} DealOne={DealOne} CompleteDeal={CompleteDeal} DealInitial={DealInitial}/>
      </div>
    </div>
  );
}

export default App;
