import React from 'react';
import ReactDOM from 'react-dom';
import { PlayerManager } from './PlayerManager';
import * as serviceWorker from './serviceWorker';

import { colorBranding } from './styles/ColorBranding';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import "./styles/mainpage.css";

document.body.style = 'background: ' + colorBranding.primaryBackground;

ReactDOM.render(
        (
                <Container fluid={true} >
                    <Row>
                        <Col>
                        <h1 className="title">
                            Rise and shine Mr. Vogel, rise and shine...
                        </h1>
                        </Col>
                    </Row>
                    <Row className="show-grid">
                    
                    //TODO: FIX FUCKING LAYOUT 
                        
                        <Col md={4} mdOffset={4} lg={4} lgOffset={4} >
                        <PlayerManager />
                        </Col>
                        
                    </Row>
                </Container>
                ),
        document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
