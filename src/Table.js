import {RiCoinsFill} from 'react-icons/ri';

function Table(props){
 return(
     <div className="betDiv">
         <div className="betArea">
            <button className="betButton" disabled={props.bet <= 0 || props.isSetStarted} onClick={() => props.setBet(props.bet - 1)}>-</button>
            <div className="bet"><RiCoinsFill/>{props.bet}</div>
            <button className="betButton" disabled={props.bet >= props.totalMoney || props.isSetStarted} onClick={() => props.setBet(props.bet + 1)}>+</button>
          </div>
            <div className="buttonArea">
                <button disabled={!props.isSetStarted} onClick={() => props.DealOne()}>Hit Me</button>
                <button disabled={!props.isSetStarted} onClick={() => props.CompleteDeal()}>Hold</button>
                <button disabled={!props.isGameStarted || props.bet > props.totalMoney || props.isSetStarted} className="NewGame" onClick={() => props.DealInitial(props.deck)}>Deal Again</button>
            </div>
     </div>
 )
}

export default Table;