/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import axios from "axios";

export default {
    getPlayers: function (callback) {

        axios.get('http://localhost:3001/api/players').then((response) => {
            console.log(response);
            const playerArray = [];
            response.data.data.map(x => playerArray.push(JSON.stringify(x)));
            //TODO change to callback
            callback( playerArray);

        }).catch((error) => {
            console.log(error);
        });
    },

    postPlayer: function (name, callbackSucc, callbackErr) {
        axios.post("http://localhost:3001/api/player", {
            name: name
        }).then((response) => {
            callbackSucc();
        }).catch((error) => {
            callbackErr(error);
        });
    },

    deletePlayer: function (id, callbackSucc, callbackErr) {

        axios.delete("http://localhost:3001/api/player", {
            data: {
                _id: id
            }
        }).then((response) => {
            callbackSucc();
        }).catch((error) => {
            callbackErr(error);
        });
    }

}
