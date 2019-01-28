/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from "react";
import Container from 'react-bootstrap/lib/Container';
import '../../styles/matchmanagement.css';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import matchService from '../../DatabaseServices/MatchDbService';
export class MatchManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {activeMatch: false, teamOne: [], teamTwo: []};
        this.getMatchesSuccessCallback = this.getMatchesSuccessCallback.bind(this);
        this.onMatchShuffle = this.onMatchShuffle.bind(this);
        this.matchCreationSuccCallback = this.matchCreationSuccCallback.bind(this);
    }

    componentWillMount() {
        matchService.findActiveMatch(this.getMatchesSuccessCallback, this.getMatchesErrorCallback);
    }

    onMatchShuffle() {
        let players = this.props.players;
        let playershuffle = this.shuffle(players);
        const playerCount = playershuffle.length;
        let teamOne = [];
        let teamTwo = [];
        var i;
        for (i = 0; i < playerCount / 2; i++) {

            teamOne.push(playershuffle[i]);
        }

        let odd = (playerCount % 2 !== 0);
        let bounder = playerCount / 2;
        if (odd) {
            bounder = bounder + 1;
        }

        playershuffle.splice(0, bounder);
        teamTwo = playershuffle;
        matchService.postMatch(this.props.sessionId, teamOne, teamTwo, this.matchCreationSuccCallback, this.matchCreationErrorCallback);
    }

    matchCreationSuccCallback(response) {
        matchService.findSessionMatches(this.props.sessionId, this.getMatchesSuccessCallback, this.getMatchesErrorCallback);
    }

    matchCreationErrorCallback(error) {
        alert(error);
    }

    getMatchesSuccessCallback(response) {
        let activeBool = false;
        let teamOne = [];
        let teamTwo = [];
        if (response.data.data !== false) {
            activeBool = true;
            teamOne = response.data.data.teamOne;
            teamTwo = response.data.data.teamTwo;
        }
        this.setState({activeMatch: activeBool, teamOne: teamOne, teamTwo: teamTwo});
    }

    getMatchesErrorCallback(error) {
        alert(JSON.stringify(error));
    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

// Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    render() {
        const activeMatch = this.state.activeMatch;
        let teamOnePlayers = "";
        this.state.teamOne.map(x => teamOnePlayers = teamOnePlayers + x.label + "\n");
        let teamTwoPlayers = "";
        this.state.teamTwo.map(x => teamTwoPlayers = teamTwoPlayers + x.label + "\n");

        return(<Container>
            <Row>
                <div className="standard-font new-match-font">Matches</div>
            </Row>
            { !activeMatch ? (
                            <Container>
                                <Row className="row-new-button">
                                    <Col> </Col>
                                    <Col xs={8}>
                                    <button onClick={this.onMatchShuffle} className="match-button"> New - Shuffle </button>
                                    </Col>
                                    <Col> </Col>  
                                </Row>
                            </Container>
                                ) : (
                            <Container flex={true}>
                                <Row>
                                    <div className="standard-font active-match-font">Active Match</div>
                                </Row>
                        
                                <Row flex={true} className="row-active-match" noGutters={true}>
                                    <Col className="team-players" xs={4}> 
                                    <textarea disabled className="team-players-area">
                                                                                                                                    {teamOnePlayers}
                                    </textarea>
                                    </Col>
                        
                                    <Col className="col-result-left" xs={1}> 
                                    <input type="number" className="match-result"/>
                                    </Col>
                        
                                    <Col xs={2}>
                                    <div className="match-double-dot">:</div>
                                    </Col>
                        
                                    <Col className="col-result-right" xs={1}> 
                                    <input type="number" className="match-result"/>
                                    </Col>
                        
                                    <Col className="team-players" xs={4}> 
                                    <textarea disabled className="team-players-area team-players-area-right">
                                                                                                                                    {teamTwoPlayers}
                                    </textarea>
                                    </Col>
                        
                                </Row>
                                <Row>
                                    <Col></Col>
                                    <Col xs={4}>
                                    <button>Confirm Results</button>
                                    </Col>
                                    <Col></Col>
                                </Row>
                        
                            </Container>

                                )}
            <Row>
                <div className="standard-font active-match-font">Recent Matches</div>
            </Row>
            <Row className="match-dummy">
        
            </Row>
        </Container>);
    }

}

