import {FaCoins} from 'react-icons/fa';

export default function Display(props){
    return (
        <div>
            <h3>Dealer must stand on 17.</h3>
            <h4><FaCoins/>  Total: {props.totalMoney}</h4>
        </div>
        
    )
}