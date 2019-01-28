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
        this.state = { matches: [] };
        this.componentWillMount = this.componentWillMount.bind(this);
        this.onMatchLoadSuccessCallback = this.onMatchLoadSuccessCallback.bind(this);
    }

    componentWillMount() {
        matchService.findSessionMatches(this.props.sessionId, this.onMatchLoadSuccessCallback, this.onMatchLoadErrorCallback);
    }

    onMatchLoadSuccessCallback(response) {
        this.setState({matches: JSON.parse(response)});
    }

    onMatchLoadErrorCallback(error) {

    }

    render() {
        const matches = this.state.matches;
        return(
                (
                        <Row>
                        
                            {matches.map(match => (
                                                                <MatchItem json={JSON.parse(match)} />
                                                    ))}
                        
                        </Row>
                        )
                );
    }

}


