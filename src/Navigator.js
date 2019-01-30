/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import './styles/navigator.css'

export class Navigator extends React.Component {

    constructor(props) {
        super(props);
        this.onNavPlayer = this.onNavPlayer.bind(this);
        this.onNavSession = this.onNavSession.bind(this);
        this.onNavHistory = this.onNavHistory.bind(this);
    }
    
    onNavPlayer() {
        this.props.onNavPlayer();
    }
    
    onNavSession() {
        this.props.onNavSession();
    }
    
    onNavHistory() {
        this.props.onNavHistory();
    }

    render()
    {
        return (
                <Container fluid={true} className="nav-container">
                    <Row noGutters={true}>
                        
                        <Col xs={4}>
                        <div className="nav-item nav-item-left" onClick={this.onNavPlayer} >
                            Players
                        </div>
                        </Col>
                
                        <Col xs={4}>
                        <div className="nav-item" onClick={this.onNavSession}>
                            Session
                        </div>
                        </Col>
                        
                        <Col xs={4}>
                        <div className="nav-item nav-item-right" onClick={this.onNavHistory}>
                            History
                        </div>
                        </Col>
                        
                        
                    </Row>
                </Container>
                );
    }
}


