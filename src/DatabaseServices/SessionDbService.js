/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import axios from "axios";

export default {
    findActiveSession: function (callbackSuccess, callbackError) {
        axios.get("http://localhost:3001/api/session").then((response) => {
            callbackSuccess(response);
        }).catch((error) => {
            callbackError(error);
        });
    },
    postSession: function (players, callbackSuccess, callbackError) {
        axios.post("http://localhost:3001/api/session", {
            players: players
        }).then((response) => {
            callbackSuccess(response);
        }).catch((error) => {
            callbackError(error);
        });
    },
    endSession: function(id, callbackSuccess, callbackError) {
        axios.put("http://localhost:3001/api/session", {
            _id: id
        }).then((response) => {
            callbackSuccess(response);
        }).catch((error) => {
            callbackError(error);
        });
    }

}
