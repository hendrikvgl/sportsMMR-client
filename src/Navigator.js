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
    }
    
    onNavPlayer() {
        this.props.onNavPlayer();
    }
    
    onNavSession() {
        this.props.onNavSession();
    }

    render()
    {
        return (
                <Container fluid={true} className="nav-container">
                    <Row noGutters={true}>
                        <Col xs={3}/>
                        <Col xs={3}>
                        <div className="nav-item nav-item-left" onClick={this.onNavPlayer} >
                            Players
                        </div>
                        </Col>
                
                        <Col xs={3}>
                        <div className="nav-item nav-item-right" onClick={this.onNavSession}>
                            Sessions
                        </div>
                        </Col>
                        <Col xs={3}/>
                    </Row>
                </Container>
                );
    }
}


