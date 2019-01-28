/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from "react";
import matchService from '../../DatabaseServices/MatchDbService';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { MatchItem } from "./MatchItem";
export class SessionMatchList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {teamOne: [], teamTwo: [], results: []};
        this.componentWillMount = this.componentWillMount.bind(this);
        this.onMatchLoadSuccessCallback = this.onMatchLoadSuccessCallback.bind(this);
    }

    componentWillMount() {
        matchService.findSessionMatches(this.props.sessionId, this.onMatchLoadSuccessCallback, this.onMatchLoadErrorCallback);
    }
    
    componentWillReceiveProps() {
        matchService.findSessionMatches(this.props.sessionId, this.onMatchLoadSuccessCallback, this.onMatchLoadErrorCallback);
    }

    onMatchLoadSuccessCallback(response) {
   
        const matches = response.data.data;
        let teamOne = [];
        let teamTwo = [];
        let results = [];
        var arrayLength = matches.length;
        for (var i = 0; i < arrayLength; i++) {
            let oneString = "";
            const one = matches[i].teamOne;
            one.map(x => oneString = oneString + " " + x.label);
            teamOne.push(oneString);
            
            let twoString = "";
            const two = matches[i].teamTwo;
            two.map(x => twoString = twoString + " " + x.label);
            teamTwo.push(twoString);

            results.push(matches[i].results);
        }

        this.setState({teamOne: teamOne, teamTwo: teamTwo, results: results});
    }

    onMatchLoadErrorCallback(error) {

    }

    render() {
        const teamOne = this.state.teamOne;
        const teamTwo = this.state.teamTwo;
        const results = this.state.results;
        
        var rows = [];
        for (var i = 0; i < teamOne.length; i++) {
            rows.push(<MatchItem teamOne={teamOne[i]} teamTwo={teamTwo[i]} results={results[i]} />);
        }
        return(
                (
                        <Row>
                            {rows}
                        </Row>
                        )
                );
    }

}


