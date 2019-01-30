import React from 'react';
import ReactDOM from 'react-dom';
import { PlayerManager } from './PlayerManager';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { Navigator } from './Navigator';
import { SessionManager } from './SessionManagement/SessionManager';
import { HistoryManager } from './HistoryManagement/HistoryManager'

import { colorBranding } from './styles/ColorBranding';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import "./styles/mainpage.css";

document.body.style = 'background: ' + colorBranding.primaryBackground;

class Index extends React.Component {
    
    constructor(props) {
        super(props);
        this.onNavPlayer = this.onNavPlayer.bind(this);
        this.onNavSession = this.onNavSession.bind(this);
        this.onNavHistory = this.onNavHistory.bind(this);
        this.state = { nav: "player" }
    }
    
    onNavPlayer() {
        this.setState({nav: "player"});
    }
    
    onNavSession() {
        this.setState({nav: "session"});
    }
    
    onNavHistory() {
        this.setState({nav: "history"});
    }
    
    navState() {
        let component = <div/>;
        if (this.state.nav === "player") {
            component = <PlayerManager />;
        } else if (this.state.nav === "session") {
            component = <SessionManager />;
        } else {
            component = <HistoryManager />;
        }
        
        return component;
    }
    
    render() {
        return (
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
                        <Navigator onNavPlayer={this.onNavPlayer} onNavSession={this.onNavSession} onNavHistory={this.onNavHistory} />
                    </Row>
                
                    <Row>
                        <Col> </Col>
                        <Col xs={10} className="dummy" >

                                { this.navState() }
                        
                        </Col>
                        <Col> </Col>               
                    </Row>
                </Container>
                )
                );
    }
    
}


ReactDOM.render(
        <Index />,
        document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
