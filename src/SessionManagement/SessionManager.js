/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import { SessionMonitor } from './SessionMonitor';
import sessionService from "../DatabaseServices/SessionDbService";

export class SessionManager extends React.Component {

    constructor(props) {
        super(props);
        this.state = {activeSession: false}
    }

    componentWillMount() {
        sessionService.findActiveSession();
    }

    render() {
        return (
                (
                        <div>
                            <SessionMonitor activeSession={false}/>
                        </div>
                        )
                );
    }
}

