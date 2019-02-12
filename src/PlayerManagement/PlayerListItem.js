/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from "react";
import playerService from "../DatabaseServices/PlayerDbService";
import "../styles/playermanagement.css";
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

export class PlayerListItem extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.onDeleteSuccess = this.onDeleteSuccess.bind(this);
    }

    handleClick() {
        const id = this.props.json._id;
        playerService.deletePlayer(id, this.onDeleteSuccess, this.onDeleteError);
    }

    onDeleteSuccess() {
        this.props.onDelete();
    }

    onDeleteError() {

    }

    render() {
        return (
                <Row className="player-list-item">
                
                    <div className="player-list-item-name" id="playerName">{this.props.json.name} - {this.props.json.mmr.toFixed(2)}</div>
                
                    {this.props.admin &&
                                    <button className="player-delete-button" onClick={this.handleClick} >x</button>
                    }
                
                </Row>
                );
    }
}


