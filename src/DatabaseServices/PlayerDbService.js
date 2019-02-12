/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import axios from "axios";
import url from "./dbConfig";
export default {
    getPlayers: function (callback) {
        fetch('http://' + url + '/api/players', {
            method: 'GET',
            credentials: "include",
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
        fetch('http://' + url + '/api/player', {
            method: 'POST',
            credentials: "include",
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

        axios.delete("http://" + url + "/api/player", {
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
        fetch("http://" + url + "/api/playersmmr", {
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
