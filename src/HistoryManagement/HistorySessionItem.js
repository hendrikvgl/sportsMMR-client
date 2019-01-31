/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from "react";
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import matchService from '../DatabaseServices/MatchDbService'

export class HistorySessionItem extends React.Component {

    constructor(props) {
        super(props);
        this.toggleSelected = this.toggleSelected.bind(this);
        this.matches = [];
        this.state = {selected: false};
        this.displayMatches = this.displayMatches.bind(this);
        this.onMatchFetchSuccessCallback = this.onMatchFetchSuccessCallback.bind(this);
    }

    displayMatches() {
        return this.matches;
    }

    toggleSelected() {
        this.setState({selected: !this.state.selected});
    }

    componentWillMount() {
        matchService.findSessionMatches(this.props.sessionId, this.onMatchFetchSuccessCallback, this.onMatchFetchErrorCallback);
    }

    onMatchFetchSuccessCallback(response) {
        let matchesJSON = response.data.data;

        var i;
        for (i = 0; i < matchesJSON.length; i++) {
            let teamOne = matchesJSON[i].teamOne;
            let teamOneString = "";

            var j;
            for (j = 0; j < teamOne.length; j++) {
                teamOneString = teamOneString + " " + teamOne[j].label;
            }

            let teamTwo = matchesJSON[i].teamTwo;
            let teamTwoString = "";

            for (j = 0; j < teamTwo.length; j++) {
                teamTwoString = teamTwoString + " " + teamTwo[j].label;
            }

            this.matches.push((<Row fluid={true} noGutters={true} className="item-history-match">
                <Col xs={5}>{teamOneString}</Col> 
                <Col xs={2} className="col-history-match-result">{matchesJSON[i].results[0]}:{matchesJSON[i].results[1]}</Col> 
                <Col xs={5} className="col-history-match-teamtwo" >{teamTwoString}</Col>
            </Row>));

//    {teamOneString} {matchesJSON.results[0]}:{matchesJSON.results[1]} {teamTwoString}
        }

    }

    onMatchFetchErrorCallback(error) {

    }

    parseTimestamp(datetime) {
        let date = new Date(datetime);

        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let dt = date.getDate();

        let hours = date.getHours();
        let minutes = date.getMinutes();

        if (dt < 10) {
            dt = '0' + dt;
        }
        if (month < 10) {
            month = '0' + month;
        }
        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        return(dt + '.' + month + '.' + year + ' ' + hours + ':' + minutes);
    }

    render() {

        let selected = "none";
        let icon = "+";

        if (this.state.selected) {
            selected = "block";
            icon = "-";
        }

        const matchContainer = {
            display: selected
        };

        return(
                (
                        <div>
                            <Row onClick={this.toggleSelected} flex={true} className="container-session-item">
                                <div className="standard-font font-session-date">{this.parseTimestamp(this.props.createdAt)}</div>
                                <div className="session-extend-icon standard-font">{icon}</div>
                            </Row>
                            <div style={matchContainer}>
                                {this.displayMatches()}
                            </div>
                        </div>
                        )
                );
    }
}

