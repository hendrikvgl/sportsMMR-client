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

    noActiveSession() {
        return((
                <Row>
                    <div className="standard-font session-info">
                        No active Session.
                    </div>
                    <button className="session-start-btn">
                        Start new.
                    </button>
                </Row>
                ));
    }

    activeSession() {
        return(<div className="standard-font session-info">Active Session.</div>);
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

