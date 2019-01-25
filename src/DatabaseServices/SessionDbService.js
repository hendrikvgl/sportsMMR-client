/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import axios from "axios";

export default {
    findActiveSession: function (callbackActive, callbackNoActive, callbackError) {
        axios.get("http://localhost:3001/api/session").then((response) => {
            alert(JSON.stringify(response));
        }).catch((error) => {
            callbackError(error);
        });
    }

}
