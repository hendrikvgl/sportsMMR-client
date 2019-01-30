/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from "react";
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

export class HistorySessionItem extends React.Component {

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

        return(dt+'.' + month + '.'+year + ' ' + hours + ':' + minutes );
    }

    render() {
        return(
                (
                        <Row flex={true} className="container-session-item">
                            <div className="standard-font font-session-date">{this.parseTimestamp(this.props.createdAt)}</div>
                        </Row>
                        )
                );
    }
}

