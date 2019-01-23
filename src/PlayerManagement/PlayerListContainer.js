/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from "react";
import axios from "axios";
import playerService from "../DatabaseServices/PlayerDbService";

export class PlayerListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {players: []};
    }

    componentWillMount() {
         playerService.getPlayers(this);
    }

    render() {
        return (
                <div>{ this.state.players }</div>
                );
    }

    componentDidUpdate(prevProps, prevState) {
//        alert(JSON.stringify(this.state));
    }

}


