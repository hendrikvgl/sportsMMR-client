/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import axios from "axios";
import url from "./dbConfig";

export default {
    findActiveMatch: function (callbackSuccess, callbackError) {
        axios.get("http://"+url+"/api/activematch").then((response) => {
            
            callbackSuccess(response);
        }).catch((error) => {
            alert(JSON.stringify(error));
            callbackError(error);
        });
    },
    findSessionMatches: function (id, callbackSuccess, callbackError) {
        axios.get("http://"+url+"/api/match", {
            _id: id
        }).then((response) => {
            callbackSuccess(response);
        }).catch((error) => {
            callbackError(error);
        });
    },
    
    postMatch: function (sessionId,teamOne, teamTwo, callbackSuccess, callbackError) {
        axios.post("http://"+url+"/api/match", {
            sessionId: sessionId,
            teamOne: teamOne,
            teamTwo
        }).then((response) => {
            callbackSuccess(response);
        }).catch((error) => {
            callbackError(error);
        });
    },
    endMatch: function(id, results, winners, callbackSuccess, callbackError) {
        axios.put("http://"+url+"/api/match", {
            _id: id,
            results: results,
            winners: winners
            
        }).then((response) => {
            callbackSuccess(response);
        }).catch((error) => {
            callbackError(error);
        });
    }

}
