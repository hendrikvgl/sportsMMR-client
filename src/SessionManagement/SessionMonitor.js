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
    }

    onCreateSession() {
        this.setState({creationButton: false});
        this.props.onCreateSession();
    }

    noActiveSession() {
        return((
                <Row className="row-session-monitor">
                    <div className="standard-font session-info">
                        No active Session.
                    </div>
                    {this.state.creationButton ? (
                                            <button onClick={this.onCreateSession} className="session-start-btn">
                                                Start new.
                                            </button>) :
                                (<div/>)}
                </Row>
                ));
    }

    activeSession() {
        let playerstring = "";
        this.props.sessionPlayers.map(x => playerstring = playerstring + " " + x.label);
        return(
                (<div>
                    <Row className="standard-font session-info">
                        Active Session.
                
                        <button onClick={this.props.onEndSession} className="session-button-end">End Session</button>
                    </Row>
                    <div className="standard-font session-players">
                        Players: {playerstring}
                    </div>
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

