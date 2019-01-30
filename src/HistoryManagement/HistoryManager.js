/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from "react";
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import "../styles/historymanagement.css"

import { HistorySessionItem } from "./HistorySessionItem";

import sessionService from "./../DatabaseServices/SessionDbService";

export class HistoryManager extends React.Component {

    constructor(props) {
        super(props);

        this.state = {sessions: []};

        this.onSessionLoadSuccessCallback = this.onSessionLoadSuccessCallback.bind(this);
        this.createSessionItems = this.createSessionItems.bind(this);
    }

    componentWillMount() {

        sessionService.findAllSessions(this.onSessionLoadSuccessCallback, this.onSessionLoadErrorCallback);
    }

    onSessionLoadSuccessCallback(response) {

        let sessionJson = response.data.data;
        let stateSessions = [];

        let i;

        for (i = 0; i < sessionJson.length; i++) {
            let session = [];
            session[0] = sessionJson[i]._id;
            session[1] = sessionJson[i].createdAt;

            stateSessions.push(session);
        }

        this.setState({sessions: stateSessions});

    }

    onSessionLoadErrorCallback(error) {

    }

    createSessionItems() {

        const sessions = this.state.sessions;
        let sessionItems = [];

        let i;
        for (i = 0; i < sessions.length; i++) {
            sessionItems.push(<HistorySessionItem sessionId={sessions[i][0]} createdAt={sessions[i][1]} />);
        }

        return(sessionItems);
    }

    render() {
        return(
                (
                        <div>
                            <Container>
                                <Row>
                                    <div className="standard-font header-session-list">Sessions</div>
                                </Row>
                            </Container>
                            <Container className="container-session-list">
                                {this.createSessionItems()}
                            </Container>
                        </div>
                        )
                );
    }
}


