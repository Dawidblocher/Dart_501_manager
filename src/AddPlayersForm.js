import React, { Component } from 'react';

class AddPlayersForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            inputNumber: 0,
         }
    }

    handleInputNumber(e){
        this.setState({
            inputNumber: e.target.value
        })
    }

    render() { 
        return ( 
            <form>
                <p>Na ile osób stworzyć rozgrywkę?</p>
                <input type="number" onChange={e => this.handleInputNumber(e)}/>
                <input type="submit" value="stwórz" onClick={e => this.props.addPlayers(e, this.state.inputNumber)}/>
            </form>
         );
    }
}
 
export default AddPlayersForm;
 