/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from "react";
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

export class MatchItem extends React.Component {
    render() {
        return (
                (
                <Row>{this.props.json.teamOne}*{this.props.json.results[0]}-{this.props.json.results[1]}*{this.props.json.teamTwo}</Row>
                )
                );
    }
}

