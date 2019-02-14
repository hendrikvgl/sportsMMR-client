/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import axios from "axios";
import url from "./dbConfig";

export default {
    findActiveSession: function (callbackSuccess, callbackError) {
        axios.get("/api/session", {withCredentials: true}).then((response) => {
            callbackSuccess(response);
        }).catch((error) => {
            callbackError(error);
        });
    },
    findAllSessions: function (callbackSuccess, callbackError) {
        axios.get("/api/sessions", {withCredentials: true}).then((response) => {
            callbackSuccess(response);
        }).catch((error) => {
            callbackError(error);
        });
    },
    postSession: function (players, callbackSuccess, callbackError) {
        fetch("/api/session", {
            method: 'POST',
            credentials: "same-origin",
            body: JSON.stringify({
                players: players
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json()).then((res) => {
            callbackSuccess(res);
        }).catch(err => {
//            callbackError(err);
        });
        
    },
    endSession: function (id, callbackSuccess, callbackError) {
        fetch("/api/session", {
            method: 'PUT',
            credentials: "same-origin",
            body: JSON.stringify({
                _id: id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json()).then((res) => {
            callbackSuccess(res);
        }).catch(err => {
//            callbackError(err);
        });
    }

}
