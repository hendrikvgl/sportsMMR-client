/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import axios from "axios";
import url from "./dbConfig";

export default {
    findActiveSession: function (callbackSuccess, callbackError) {
        axios.get("http://" + url + "/api/session").then((response) => {
            callbackSuccess(response);
        }).catch((error) => {
            callbackError(error);
        });
    },
    findAllSessions: function (callbackSuccess, callbackError) {
        axios.get("http://" + url + "/api/sessions").then((response) => {
            callbackSuccess(response);
        }).catch((error) => {
            callbackError(error);
        });
    },
    postSession: function (players, callbackSuccess, callbackError) {
        axios.post("http://" + url + "/api/session", {
            players: players
        }).then((response) => {
            callbackSuccess(response);
        }).catch((error) => {
            callbackError(error);
        });
    },
    endSession: function (id, callbackSuccess, callbackError) {
        axios.put("http://" + url + "/api/session", {
            _id: id
        }).then((response) => {
            callbackSuccess(response);
        }).catch((error) => {
            callbackError(error);
        });
    }

}
