/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import axios from "axios";
import url from "./dbConfig";

export default {
    getPlayers: function (callback) {

        axios.get('http://'+url+'/api/players').then((response) => {
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
        axios.post("http://"+url+"/api/player", {
            name: name
        }).then((response) => {
            callbackSucc();
        }).catch((error) => {
            callbackErr(error);
        });
    },

    deletePlayer: function (id, callbackSucc, callbackErr) {

        axios.delete("http://"+url+"/api/player", {
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
