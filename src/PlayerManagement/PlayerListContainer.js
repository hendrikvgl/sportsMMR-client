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


export class PlayerListContainer extends React.Component {

    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
    }

    onDelete() {
        this.props.onDelete();
    }

    render() {

        return (
                (
                <Container>
                            {this.props.players.map(player => (
                                                                <PlayerListItem onDelete={this.onDelete} json={JSON.parse(player)} />
                                                    ))}
                        </Container>
                                )
        );
    }

}

