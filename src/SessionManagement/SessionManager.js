/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import { SessionMonitor } from './SessionMonitor';
import { SessionPlayerSelect } from './SessionPlayerSelect';
import sessionService from "../DatabaseServices/SessionDbService";
import playerService from "../DatabaseServices/PlayerDbService";
import matchService from '../DatabaseServices/MatchDbService';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { MatchManager } from './MatchManagement/MatchManager';


export class SessionManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {activeSession: false, playerSelection: false, players: [], sessionPlayers: [], sessionId: "", rerender: false};
        this.onCreateSession = this.onCreateSession.bind(this);
        this.onPlayerLoad = this.onPlayerLoad.bind(this);
        this.onSessionCreation = this.onSessionCreation.bind(this);
        this.onSessionQuerySuccess = this.onSessionQuerySuccess.bind(this);
        this.handleEndSession = this.handleEndSession.bind(this);
        this.onEndSessionSuccessCallback = this.onEndSessionSuccessCallback.bind(this);
        this.onSessionCreationSuccessCallback = this.onSessionCreationSuccessCallback.bind(this);
        this.getMatchesSuccessCallback = this.getMatchesSuccessCallback.bind(this);
    }

    onCreateSession() {
        playerService.getPlayers(this.onPlayerLoad);
    }

    onPlayerLoad(players) {
        this.setState({playerSelection: true, players: players});
    }

    componentWillMount() {
        sessionService.findActiveSession(this.onSessionQuerySuccess, this.onSessionQueryError);
    }

    onSessionQuerySuccess(response) {
        
        let activeBool = false;
        let sessionPlayers = [{}];
        let sessionId = "";

        if (response.data.data !== null) {
            activeBool = true;
            sessionPlayers = response.data.data.players[0];
            sessionId = response.data.data._id;
        }

        this.setState({activeSession: activeBool, sessionPlayers: sessionPlayers, sessionId: sessionId, rerender: !this.state.rerender });
    }

    onSessionQueryError(error) {
//        alert("onSessionQueryError " + JSON.stringify(error));
    }

    onSessionCreation(sessionplayers) {
        let sessPlayers = [];
        sessPlayers.push(sessionplayers);
        this.setState({playerSelection: false, sessionPlayers: sessPlayers});
        sessionService.postSession(sessPlayers, this.onSessionCreationSuccessCallback, this.onSessionCreationErrorCallback);
    }

    onSessionCreationSuccessCallback(response) {
        sessionService.findActiveSession(this.onSessionQuerySuccess, this.onSessionQueryError);
    }

    onSessionCreationErrorCallback(error) {
//        alert("errDB " + JSON.stringify(error));
    }

    handleEndSession() {
        matchService.findActiveMatch(this.getMatchesSuccessCallback, this.getMatchesErrorCallback);
    }

    getMatchesSuccessCallback(response) {
        if (response.data.data !== null) {
            alert("Please finish all active matches first.");
        } else {
            sessionService.endSession(this.state.sessionId, this.onEndSessionSuccessCallback, this.onEndSessionErrorCallback);
        }
    }

    getMatchesErrorCallback(error) {
//        alert("GetMatchesErrorCallback" + JSON.stringify(error));
    }

    onEndSessionSuccessCallback(response) {
        sessionService.findActiveSession(this.onSessionQuerySuccess, this.onSessionQueryError);

    }

    onEndSessionErrorCallback(error) {
//        alert("endSessionErrorCallback " + JSON.stringify(error));
    }

    render() {

        const playerSelection = this.state.playerSelection;
        const activeSession = this.state.activeSession;
        return (
                (
                        <div>
                            <div>
                                <SessionMonitor onEndSession={this.handleEndSession} onCreateSession={this.onCreateSession} activeSession={this.state.activeSession} sessionPlayers={this.state.sessionPlayers} />
                                {activeSession ? (
                                                            <div><hr className="border-line" />
                                                                <MatchManager sessionId={this.state.sessionId} players={ this.state.sessionPlayers } /></div>
                                                    ) : <div/>}
                            </div>
                        
                            {playerSelection ? (
                                                    <div>
                                                        <div>Select Players.</div>                                        
                                                        <div>
                                                            <SessionPlayerSelect onSubmit={this.onSessionCreation} players={this.state.players}/>
                                                        </div>
                                                    </div>
                                        ) : <div/> } 
                        </div>
                        )
                );
    }
}

