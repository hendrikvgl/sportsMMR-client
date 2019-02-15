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
import playerService from '../../DatabaseServices/PlayerDbService';
import { SessionMatchList } from './SessionMatchList';
import Carousel from 'react-bootstrap/lib/Carousel'

export class MatchManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {activeMatch: false, activeMatchId: null, teamOne: [], teamTwo: [], resultsOne: null, resultsTwo: null, matchListToggle: false, teamOneMMR: null, teamTwoMMR: null};
        this.getMatchesSuccessCallback = this.getMatchesSuccessCallback.bind(this);
        this.onMatchShuffle = this.onMatchShuffle.bind(this);
        this.matchCreationSuccCallback = this.matchCreationSuccCallback.bind(this);
        this.onChangeResultsOne = this.onChangeResultsOne.bind(this);
        this.onChangeResultsTwo = this.onChangeResultsTwo.bind(this);
        this.confirmMatchResults = this.confirmMatchResults.bind(this);
        this.onMatchEndSuccessCallback = this.onMatchEndSuccessCallback.bind(this);
        this.onTMMRSuccessCallback = this.onTMMRSuccessCallback.bind(this);
        this.onPlayersMMRSuccessCallback = this.onPlayersMMRSuccessCallback.bind(this);
        this.onMatchOTC = this.onMatchOTC.bind(this);
        this.onMatchRematch = this.onMatchRematch.bind(this);
        this.onMostRecentSuccess = this.onMostRecentSuccess.bind(this);
    }

    componentWillMount() {
        matchService.findActiveMatch(this.props.sessionId, this.getMatchesSuccessCallback, this.getMatchesErrorCallback);
    }

    onChangeResultsOne(e) {
        const input = e.target.value;
        this.setState({resultsOne: input});
    }

    onChangeResultsTwo(e) {
        const input = e.target.value;
        this.setState({resultsTwo: input});
    }

    onMatchShuffle() {

        let players = [];
//        alert(JSON.stringify(this.props.players));

        this.props.players.map(x => players.push(x));
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

    onMatchOTC() {

        let players = [];
//        alert(JSON.stringify(this.props.players));

        this.props.players.map(x => players.push(x));
        playerService.getPlayersMMR(players, this.onPlayersMMRSuccessCallback, this.onPlayersMMRErrorCallback);
    }

    onMatchRematch() {
        matchService.getMostRecentSessionMatch(this.props.sessionId, this.onMostRecentSuccess, this.onMostRecentError);
    }

    onMostRecentSuccess(response) {
 
        let teamOne = null;
        let teamTwo = null;

        if (response.hasOwnProperty('data')) {
            teamOne = response.data.teamOne;
            teamTwo = response.data.teamTwo;
        }


        if (teamOne !== null && teamTwo !== null) {
            matchService.postMatch(this.props.sessionId, teamOne, teamTwo, this.matchCreationSuccCallback, this.matchCreationErrorCallback);
        } else {
            alert("There seems to be no match in this session to replay.");
        }
    }

    onMostRecentError(error) {

    }

    onPlayersMMRSuccessCallback(response) {
        const players = response.data;
        const playerCount = players.length;
        let teamOne = [];
        let teamTwo = [];
        const sortedPlayers = this.sortPlayerMMR(players);
        //based on playground rules. Best two players are 'captains'. worst captain starts voting for best player available
        if (playerCount >= 2) {
            teamOne.push(sortedPlayers[0]);
            teamTwo.push(sortedPlayers[1]);
            let teamOneP = false;
            for (var i = 2; i < playerCount; i++) {
                if (teamOneP) {
                    teamOne.push(sortedPlayers[i]);
                    teamOneP = false;
                } else {
                    teamTwo.push(sortedPlayers[i]);
                    teamOneP = true;
                }

            }
            matchService.postMatch(this.props.sessionId, teamOne, teamTwo, this.matchCreationSuccCallback, this.matchCreationErrorCallback);
        } else {
            alert("There need to be atleast 2 players in the session.");
        }
    }

    sortPlayerMMR(players) {
        players.sort((a, b) => parseFloat(b.mmr) - parseFloat(a.mmr));
        return players;
    }

    onPlayersMMRErrorCallback(error) {

    }

    matchCreationSuccCallback(response) {
        matchService.findActiveMatch(this.props.sessionId, this.getMatchesSuccessCallback, this.getMatchesErrorCallback);
    }

    matchCreationErrorCallback(error) {
//        alert(error);
    }

    getMatchesSuccessCallback(response) {
        let activeBool = false;
        let teamOne = [];
        let teamTwo = [];
        let activeMatchId = "";
        if (response.data !== null) {
            activeBool = true;
            teamOne = response.data.teamOne;
            teamTwo = response.data.teamTwo;
            activeMatchId = response.data._id;
            matchService.getTMMR(teamOne, teamTwo, this.onTMMRSuccessCallback, this.onTMMRErrorCallback);
        }
        this.setState({activeMatch: activeBool, teamOne: teamOne, teamTwo: teamTwo, activeMatchId: activeMatchId});
    }

    onTMMRSuccessCallback(response) {

        const teamOneMMR = response.teamOneMMR;
        const teamTwoMMR = response.teamTwoMMR;
        this.setState({teamOneMMR: teamOneMMR, teamTwoMMR: teamTwoMMR});
    }

    onTMMRErrorCallback(error) {

    }

    confirmMatchResults() {
        const resultOne = parseInt(this.state.resultsOne);
        const resultTwo = parseInt(this.state.resultsTwo);
        let winners = [];
        if (resultOne > resultTwo) {
            winners = this.state.teamOne;
        } else if (resultOne < resultTwo) {
            winners = this.state.teamTwo;
        } else {
            return alert("One team needs to be the winner");
        }

        if ((resultOne !== null && resultOne !== "") && (resultTwo !== null && resultTwo !== "")) {
            matchService.endMatch(this.state.activeMatchId, [resultOne, resultTwo], winners, this.onMatchEndSuccessCallback, this.onMatchEndErrorCallback);
        }

    }

    onMatchEndSuccessCallback(response) {
        this.setState({matchListToggle: !this.state.matchListToggle});
        matchService.findActiveMatch(this.props.sessionId, this.getMatchesSuccessCallback, this.getMatchesErrorCallback);
    }

    onMatchEndErrorCallback(error) {
//        alert(JSON.stringify(error));
    }

    getMatchesErrorCallback(error) {
//        alert(JSON.stringify(error));
    }

    shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {


            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    renderMatchModes() {
        const html = (
                <div>
                    <hr className="border-line" />
                
                    <Carousel className="carousel-modes" wrap={true} interval={null} indicators={false}>
                        <Carousel.Item>
                            <div className="carousel-item-content">
                                <div className="modes-title">
                                    Shuffle mode
                                </div>
                                <div className="modes-descr" >
                                    Play a match with random teams.
                                </div>
                                <button onClick={this.onMatchShuffle} className="match-button-new">Enter the Court</button>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="carousel-item-content">
                                <div className="modes-title">
                                    OTC mode
                                </div>
                                <div className="modes-descr" >
                                    Play a match with the most optimal team composition.
                                </div>
                                <button onClick={this.onMatchOTC} className="match-button-new">Enter the Court</button>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className="carousel-item-content">
                                <div className="modes-title">
                                    Rematch mode
                                </div>
                                <div className="modes-descr" >
                                    Go again with the most recent matchup.
                                </div>
                                <button onClick={this.onMatchRematch} className="match-button-new">Enter the Court</button>
                            </div>
                        </Carousel.Item>
                    </Carousel>
                    <hr className="border-line" />
                </div>
                );

        return html;
    }

    render() {
        const activeMatch = this.state.activeMatch;
        let teamOnePlayers = "";
        let teamTwoPlayers = "";
        if (activeMatch) {
            this.state.teamOne.map(x => teamOnePlayers = teamOnePlayers + x.label + "\n");
            this.state.teamTwo.map(x => teamTwoPlayers = teamTwoPlayers + x.label + "\n");
        }

        let teamOnePerc = null;
        let teamTwoPerc = null;
        if (this.state.teamOneMMR !== null && this.state.teamTwoMMR !== null) {
            teamOnePerc = this.state.teamOneMMR / (this.state.teamOneMMR + this.state.teamTwoMMR) * 100;
            teamTwoPerc = 100 - teamOnePerc;
        }

        let teamOneProbStyle = {
            width: teamOnePerc + '%'
        };
        let teamTwoProbStyle = {
            width: teamTwoPerc + '%'
        };
        return(<Container>
        
            { !activeMatch ? (
                            <div>
                                <Row>
                                    <div className="standard-font active-match-font">Start new match</div>
                                </Row>
                        
                                {this.renderMatchModes()}
                        
                            </div>
                                ) : (
                            <Container flex={true}>
                                <Row>
                                    <div className="standard-font active-match-font">Active Match</div>
                                </Row>
                                { teamOnePerc && teamTwoPerc ? (
                                                            <Row flex={true} className="row-match-prob" noGutters={true}>
                                                                <div style={teamOneProbStyle} className="win-prob win-prob-one">{teamOnePerc.toFixed(2)}</div>
                                                                <div style={teamTwoProbStyle} className="win-prob win-prob-two">{teamTwoPerc.toFixed(2)}</div>
                                                            </Row>
                                                        ) : (<div/>)}
                                <Row flex={true} className="row-active-match" noGutters={true}>
                                    <Col className="team-players" xs={4}> 
                                    <textarea disabled className="team-players-area">
                                                                                                                                                                                                                                                                                                                {teamOnePlayers}
                                    </textarea>
                                    </Col>
                        
                        
                                    <Col xs={4} className="container-match-results">
                        
                                    <div className="match-double-dot">:</div>
                        
                                    <input type="number" onChange={this.onChangeResultsOne} className="match-result-left"/>
                        
                                    <input type="number" onChange={this.onChangeResultsTwo} className="match-result-right"/>
                        
                                    </Col>
                        
                        
                                    <Col className="team-players" xs={4}> 
                                    <textarea disabled className="team-players-area team-players-area-right">
                                                                                                                                                                                                                                                                                                                {teamTwoPlayers}
                                    </textarea>
                                    </Col>
                        
                                </Row>
                                <Row>
                        
                                    <button className="button-results-confirm" onClick={this.confirmMatchResults} >Confirm Results</button>
                        
                                </Row>
                        
                            </Container>

                                )}
            <Row>
                <div className="standard-font active-match-font">Recent Matches</div>
            </Row>
            <SessionMatchList sessionId={this.props.sessionId} matchListToggle={this.state.matchListToggle}  />
        </Container>);
    }

}

