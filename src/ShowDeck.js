function HandleDeck(props){
    let cardImage = "blue_back";
    return (
      <div className={props.className}>
        <div>
          {props.cards.map(card => (
            <div className={"card"} 
            style={{ backgroundImage:`url(${process.env.PUBLIC_URL + `/PNG/${props.show ? card.image : cardImage}.png`})`}} 
            key={card.id}></div>
          ))}
        </div>
      </div>
    )
  }

  export default HandleDeck;