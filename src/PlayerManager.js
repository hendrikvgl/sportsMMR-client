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
    }

    handlePlayerChange() {
        playerService.getPlayers(this);
    }

    componentWillMount() {
        playerService.getPlayers(this);
    }

    render() {
        return (
                (<Container className="top-lvl-container">
                    <Row>            
                        <h3 className="standard-font">Enter new player.</h3>
                    </Row>
                    <Row>
                        <PlayerCreationContainer onCreation={this.handlePlayerChange} />
                    </Row>
                    <Row>
                        <PlayerListContainer onDelete={this.handlePlayerChange} players={this.state.players}/>
                    </Row>
                </Container>)
                );
    }
}


