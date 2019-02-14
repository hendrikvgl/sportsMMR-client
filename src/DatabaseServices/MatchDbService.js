/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import axios from "axios";
import url from "./dbConfig";

export default {
    findActiveMatch: function (callbackSuccess, callbackError) {
        axios.get("http://" + url + "/api/activematch", {withCredentials: true}).then((response) => {

            callbackSuccess(response);
        }).catch((error) => {
//            alert(JSON.stringify(error));
            callbackError(error);
        });
    },
    findSessionMatches: function (sessionId, callbackSuccess, callbackError) {
        fetch('http://' + url + '/api/matches', {
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
        fetch("http://" + url + "/api/match", {
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
        fetch("http://" + url + "/api/match", {
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
        fetch("http://" + url + "/api/match/tmmr", {
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
