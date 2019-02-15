/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import '../styles/sessionmanagement.css'

export class SessionMonitor extends React.Component {

    constructor(props) {
        super(props);
        this.onCreateSession = this.onCreateSession.bind(this);
        this.state = {creationButton: true};
        this.renderPlayers = this.renderPlayers.bind(this);
    }

    onCreateSession() {
        this.setState({creationButton: false});
        this.props.onCreateSession();
    }

    noActiveSession() {
        return((
                <div>
                    <Row className="row-session-monitor">
                        <div className="standard-font session-info">
                            No active Session.
                        </div>
                
                    </Row>
                    <Row>
                        {this.state.creationButton ? (
                                            <button onClick={this.onCreateSession} className="session-start-btn">
                                                Start new.
                                            </button>
                                            ) :
                                    (<div/>)}
                    </Row>
                </div>
                ));
    }

    renderPlayers() {
        const players = this.props.sessionPlayers;
        let playerArray = [];
        
        for (var i = 0; i<players.length; i++) {
            const playerDOM = (<div className="item-player"> {players[i].label}</div>);
            playerArray.push(playerDOM);
        }
        
        return playerArray;
    }

    activeSession() {
        
        return(
                (<div>
                    <Row className="standard-font session-info">
                        Active Session
                    </Row>
                    <Row className="standard-font session-players">
                        Players
                    </Row>
                    <Row>
                        {this.renderPlayers()}
                    </Row>
                </div>)
                );
    }

    render() {
        return (
                <div className="session-info-toplvl">{this.props.activeSession === false ?
                                this.noActiveSession() :
                                this.activeSession()
                    }
                </div>
                );
    }

}

