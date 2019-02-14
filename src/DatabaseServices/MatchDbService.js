/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import axios from "axios";


export default {
    findActiveMatch: function (sessionId, callbackSuccess, callbackError) {
        fetch("/api/activematch", {
            method: 'POST',
            credentials: "same-origin",
            body: JSON.stringify({
                sessionId: sessionId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json()).then((res) => {

            callbackSuccess(res);

        }).catch(err => {
            callbackError(err);
        });
    },
    findSessionMatches: function (sessionId, callbackSuccess, callbackError) {
        fetch('/api/matches', {
            method: 'POST',
            credentials: "same-origin",
            body: JSON.stringify({
                sessionId: sessionId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json()).then((res) => {

            callbackSuccess(res);

        }).catch(err => {
            console.error(err);
        });
    },

    postMatch: function (sessionId, teamOne, teamTwo, callbackSuccess, callbackError) {
        fetch("/api/match", {
            method: 'POST',
            credentials: "same-origin",
            body: JSON.stringify({
                sessionId: sessionId,
                teamOne: teamOne,
                teamTwo: teamTwo
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json()).then((res) => {
            callbackSuccess(res);
        }).catch(err => {
            callbackError(err);
        });

    },
    endMatch: function (id, results, winners, callbackSuccess, callbackError) {
        fetch("/api/match", {
            method: 'PUT',
            credentials: "same-origin",
            body: JSON.stringify({
                _id: id,
                results: results,
                winners: winners
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json()).then((res) => {
            callbackSuccess(res);
        }).catch(err => {
            callbackError(err);
        });
    },
    getTMMR: function (teamOne, teamTwo, callbackSuccess, callbackError) {
        fetch("/api/match/tmmr", {
            method: 'POST',
            credentials: "same-origin",
            body: JSON.stringify({
                teamOne: teamOne,
                teamTwo: teamTwo
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json()).then((res) => {
            callbackSuccess(res);
        }).catch(err => {
            callbackError(err);
        });

    }

}
