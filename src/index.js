import React from 'react';
import ReactDOM from 'react-dom';
import { PlayerManager } from './PlayerManager';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';


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
                            sportsMMR
                        </h1>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                        <h2 className="subtitle">
                            Competitive for fun.
                        </h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col> </Col>
                        <Col xs={10} className="dummy" >
                        <PlayerManager />
                        </Col>
                        <Col> </Col>               
                    </Row>
                </Container>
                ),
        document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
