/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from "react";
import axios from "axios";
import { PlayerListItem } from "./PlayerListItem";
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import "../styles/playermanagement.css";


export class PlayerListContainer extends React.Component {

    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete() {
        this.props.onDelete();
    }

    render() {
        let {players} = this.props;

        players.sort(function (a, b) {
            return JSON.parse(b).mmr - JSON.parse(a).mmr;
        });
        
        return (
                (
                        <Container className="container-player-list" >
                            {players.map(player => (
                                                                <PlayerListItem admin={this.props.admin} onDelete={this.onDelete} json={JSON.parse(player)} />
                                                    ))}
                        </Container>
                        )
                );
    }

}


