import { GiPokerHand } from 'react-icons/gi';

function Header(){
    return(
        <header className="App-header">
            <div>
                <GiPokerHand className="pokerHand"/>
                <h2 className="header">BlackJack</h2>
            </div>
        </header>
    )
}

export default Header;