import React, {Component}from 'react';

import './App.css';
import DartsTarget from './DartsTarget'
import Players from './Player'
import WinnerTable from './WinnerTable'
import AddPlayersForm from './AddPlayersForm'

class App extends Component{
  state = {
    howManyPlayers: 0,
    targets: [],
    players: [],
    howPlaying: 0,
    round: 1,
    winners: [] 
  }

  startGame(){
    document.querySelector('.nextPlayer').addEventListener('click', this.nextPlayer);
  }

  nextPlayer = () =>{
    let points = 0;
    this.state.targets.forEach(item => points += parseFloat(item.attributes.shotvalue.value));
    this.state.players[this.state.howPlaying].changePoints(points);
    if(this.state.howPlaying === this.state.players.length -1){
      this.setState({
        targets: [],
        howPlaying: 0,
        round: this.state.round +1
      })
    }else{
      this.setState({
        targets: [],
        howPlaying: this.state.howPlaying +1
      })
    }
    document.querySelectorAll('.target').forEach(item =>  item.classList.remove('checked'))
  }

  handleClick(e){
    const targets = this.state.targets;
        if(this.state.targets.length < 3){
          targets.push(e.target)
        this.setState({
          targets
        })
      }
  }

  handleReset = () => {
    this.state.targets.forEach(item => {
      item.classList.remove('checked')})
    this.setState({
      targets: [],
    })
  }

  componentDidMount(){
    const targets = document.querySelectorAll('.target');
    targets.forEach(target => {
      target.addEventListener('click', (e) => this.handleClick(e))});
  }

  componentDidUpdate(){
    this.state.targets.forEach(item => {
      item.classList.add('checked')
    })

    if(this.state.players.length === 1){
      this.startGame();
    }

    this.state.players.forEach((player, index) => {   
      if(player.state.points === 0){
        const winners = this.state.winners;
        const players = [];
        let howPlaying; 
        this.state.players.forEach(player2=> {
          if(player !== player2)
            players.push(player2);
        })
        if(index === this.state.players.length -1){
          howPlaying = 0;
        }else{
          howPlaying = this.state.howPlaying -1
        }
        winners.push(player);
        this.setState({
          winners,
          players,
          howPlaying
        })
      }
    })
  }

  addPlayers = (e, number) =>{
    e.preventDefault()
    console.log(this)
    this.setState({
      howManyPlayers: number
    })
  }

  render(){
    let suma = 0;
    this.state.targets.forEach(item => {suma += parseFloat(item.attributes.shotvalue.value)})
    const targetMap = this.state.targets.map((item, index) => <p key={index}> {item.attributes.shotvalue.value}</p>)
    const createPlayers = []
    for(let i=0; i<this.state.howManyPlayers; i++){
      createPlayers.push(<Players key={i} game={this} index={i}/>)
    }
    
    return (
      <div className="App">
        <header className="App-header">
        <DartsTarget />
        </header>
        <section className="game-info">
        {(this.state.targets.length >0 ? <div className="check-target-box">{targetMap}<p>suma: {suma}</p></div> : null)}
          {(this.state.players.length > 0 ? <div className="game-status">
          Runda:<p> {this.state.round}</p>
          </div> : null )}
          
          <button className="nextPlayer">Następna osoba</button>
          <button className="resetShoots" onClick={this.handleReset}>Zaznacz od nowa</button>
          <div className="table-score">
            {(createPlayers.length >= 1 ? createPlayers : <AddPlayersForm addPlayers={this.addPlayers}/>)}
          </div>
          <WinnerTable winner={this.state.winners}/>
        </section>
          {(this.state.players.length > 0 ? 
            
            <p className="now-playing">Teraz Kolej: {this.state.players[this.state.howPlaying].state.name}</p>
          : null )}
      </div>
    );
  }
  
}

export default App;
