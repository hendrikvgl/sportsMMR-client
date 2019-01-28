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
import { SessionMatchList } from './SessionMatchList';
export class MatchManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {activeMatch: false, activeMatchId: null, teamOne: [], teamTwo: [], resultsOne: null, resultsTwo: null, matchListToggle: false};
        this.getMatchesSuccessCallback = this.getMatchesSuccessCallback.bind(this);
        this.onMatchShuffle = this.onMatchShuffle.bind(this);
        this.matchCreationSuccCallback = this.matchCreationSuccCallback.bind(this);
        this.onChangeResultsOne = this.onChangeResultsOne.bind(this);
        this.onChangeResultsTwo = this.onChangeResultsTwo.bind(this);
        this.confirmMatchResults = this.confirmMatchResults.bind(this);
        this.onMatchEndSuccessCallback = this.onMatchEndSuccessCallback.bind(this);
    }

    componentWillMount() {
        matchService.findActiveMatch(this.getMatchesSuccessCallback, this.getMatchesErrorCallback);
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

    matchCreationSuccCallback(response) {
        matchService.findActiveMatch(this.getMatchesSuccessCallback, this.getMatchesErrorCallback);
    }

    matchCreationErrorCallback(error) {
//        alert(error);
    }

    getMatchesSuccessCallback(response) {
        let activeBool = false;
        let teamOne = [];
        let teamTwo = [];
        let activeMatchId = "";
        if (response.data.data !== null) {
            activeBool = true;
            teamOne = response.data.data.teamOne;
            teamTwo = response.data.data.teamTwo;
            activeMatchId = response.data.data._id;
        }
        this.setState({activeMatch: activeBool, teamOne: teamOne, teamTwo: teamTwo, activeMatchId: activeMatchId});
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
        matchService.findActiveMatch(this.getMatchesSuccessCallback, this.getMatchesErrorCallback);
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

    render() {
        const activeMatch = this.state.activeMatch;
        let teamOnePlayers = "";
        let teamTwoPlayers = "";
        if (activeMatch) {
            this.state.teamOne.map(x => teamOnePlayers = teamOnePlayers + x.label + "\n");
            this.state.teamTwo.map(x => teamTwoPlayers = teamTwoPlayers + x.label + "\n");
        }

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
                                    <input type="number" onChange={this.onChangeResultsOne} className="match-result"/>
                                    </Col>
                        
                                    <Col xs={2}>
                                    <div className="match-double-dot">:</div>
                                    </Col>
                        
                                    <Col className="col-result-right" xs={1}> 
                                    <input type="number" onChange={this.onChangeResultsTwo} className="match-result"/>
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
                                    <button onClick={this.confirmMatchResults} >Confirm Results</button>
                                    </Col>
                                    <Col></Col>
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

