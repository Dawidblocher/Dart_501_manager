import React, {
    Component
} from 'react';

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            points: 501,
            inGame: false
        }
    }

    createPlayer(e){
        e.preventDefault()
        const players = this.props.game.state.players;
        players.push(this)
        this.setState({
            inGame: true
        })
        this.props.game.setState({
            players
        })
    }

    handleInput(e){
        this.setState({
            name: e.target.value,
        })   
    }

    changePoints(number){
        if((this.state.points - number) >= 0){
            this.setState({
                points: this.state.points - number
            })
        }
        
    }

    render() {
        return (
            (this.state.inGame ?
             <div className="player-wrap">
                <header>{this.state.name }</header>
                <div>{this.state.points} pkt</div>
             </div>   

             
             : <form>  
                <input type="text" onChange={e => this.handleInput(e)} value={this.state.name}/>
                <input type="submit" value="dodaj" onClick={e => this.createPlayer(e)}/>
            </form>)    
            
            
        );
    }
}
 
export default Player;
