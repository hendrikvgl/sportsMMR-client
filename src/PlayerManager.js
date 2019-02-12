import React from 'react';
import {PlayerCreationContainer} from './PlayerManagement/PlayerCreationContainer';
import {PlayerListContainer} from './PlayerManagement/PlayerListContainer';
import playerService from "./DatabaseServices/PlayerDbService";
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import './styles/playermanagement.css';

export class PlayerManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {players: []};
        this.handlePlayerChange = this.handlePlayerChange.bind(this);
        this.onPlayerLoad = this.onPlayerLoad.bind(this);
    }

    handlePlayerChange() {
        playerService.getPlayers(this.onPlayerLoad);
    }

    componentWillMount() {
        playerService.getPlayers(this.onPlayerLoad);
    }
    
    onPlayerLoad(players) {
        this.setState({players: players});
    }

    render() {
        return (
                (<Container className="top-lvl-container">
                    <Row>            
                        <h3 className="standard-font">Enter new player.</h3>
                    </Row>
                    <Row>
                        <PlayerCreationContainer playerList={this.state.players} onCreation={this.handlePlayerChange} />
                    </Row>
                    <Row>
                        <PlayerListContainer admin={this.props.admin} onDelete={this.handlePlayerChange} players={this.state.players}/>
                    </Row>
                </Container>)
                );
    }
}


