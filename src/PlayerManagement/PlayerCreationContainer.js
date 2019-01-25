/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import { PlayerCreationForm } from './PlayerCreationForm';
import axios from "axios";
import playerService from "../DatabaseServices/PlayerDbService";
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'

export class PlayerCreationContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {name: ""};
        this.onNameChange = this.onNameChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCreationSuccess = this.onCreationSuccess.bind(this);
    }

    onNameChange(e) {
        const input = e.target.value;

        this.setState({name: input});
    }

    onSubmit() {
        playerService.postPlayer(this.state.name, this.onCreationSuccess, this.onCreationError);
    }

    onCreationSuccess() {
        //TODO: Implement form wipe and PlayerListCOntainer rerender

        this.setState({name: ""});

        this.props.onCreation();

    }

    onCreationError(e) {
        alert("Error " + e);
    }

    render() {
        return(
                (<Container>
                    <Row>
                        < PlayerCreationForm value={this.state.name} onChange={this.onNameChange} onSubmit={this.onSubmit} />
                    </Row>
                </Container>)
                );
    }
}

