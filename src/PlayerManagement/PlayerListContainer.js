/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from "react";
import axios from "axios";

export class PlayerListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { players: [] };
    }

    componentWillMount() {
        this.getPlayers();
    }

    render() {
        return (
                <div/>
                );
    }
    
    componentDidUpdate(prevProps, prevState) {
        alert(JSON.stringify(this.state));
    }
    
    getPlayers() {
        axios.get('http://localhost:3001/api/players').then(function (response) {
            alert("RESPONSE " + JSON.stringify(response.data.data));
            this.setState({ players: response.data.data });
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        }).then(function () {
            // always executed
        });
    }

}


