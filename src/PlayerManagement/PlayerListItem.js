/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from "react";
import playerService from "../DatabaseServices/PlayerDbService";

export class PlayerListItem extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.onDeleteSuccess = this.onDeleteSuccess.bind(this);
    }
    
    handleClick() {
        const id = this.props.json._id;
        playerService.deletePlayer(id, this.onDeleteSuccess, this.onDeleteError );
    }
    
    onDeleteSuccess() {
        this.props.onDelete();
    }
    
    onDeleteError() {
        
    }
    
    render() {
        return (
                <div>
                    {this.props.json.name} {this.props.json._id}
                
                    <button onClick={this.handleClick} >x</button>
                
                </div>
                );
    }
}


