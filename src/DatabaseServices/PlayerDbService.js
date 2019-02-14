/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import axios from "axios";

export default {
    getPlayers: function (callback) {
        fetch('/api/players', {
            method: 'GET',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json()).then((response) => {
            let playerArray = [];
            response.data.map(x => playerArray.push(JSON.stringify(x)));
            callback(playerArray);
        }).catch(err => {
            console.error(err);
        });
    },

    postPlayer: function (name, callbackSucc, callbackErr) {
        fetch('/api/player', {
            method: 'POST',
            credentials: "same-origin",
            body: JSON.stringify({
                name: name
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            callbackSucc();
        }).catch(err => {
            callbackErr(err);
        });
    },
    deletePlayer: function (id, callbackSucc, callbackErr) {

        axios.delete("/api/player", {
            withCredentials: true,
            data: {
                _id: id
            }
        }).then((response) => {
            callbackSucc();
        }).catch((error) => {
            callbackErr(error);
        });
    },
    getPlayersMMR: function (players, callbackSucc, callbackErr) {
        fetch("/api/playersmmr", {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify({
                players: players
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json()).then((res) => {
            callbackSucc(res);
        }).catch(err => {
            callbackErr(err);
        });
        
    }

}
