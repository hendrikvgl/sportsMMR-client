/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


import axios from "axios";

export default {
    postCrew: function (name, email, password, adminPassword, callbackSuccess, callbackError) {
        axios.post("/api/crew", {
            name: name,
            email: email,
            password: password,
            adminPassword: adminPassword
        }).then((response) => {
            callbackSuccess(response);
        }).catch((error) => {
            callbackError(error);
        });
    },
    login: function (admin, name, password, callbackSuccess, callbackError) {
        fetch('/api/auth', {
            method: 'POST',
            credentials: "same-origin",
            body: JSON.stringify({
                admin: admin,
                name: name,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status === 200) {
                callbackSuccess(res);
            } else {
                callbackError(res.error);
            }
        }).catch(err => {
            console.error(err);
            alert('Error logging in please try again');
        });
    },
    logout: function (callbackSuccess, callbackError) {
        fetch('/api/logout', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status === 200) {
                callbackSuccess(res);
            } else {
                callbackError(res.error);
            }
        }).catch(err => {
            console.error(err);
            alert('Error logging in please try again');
        });
    },
    getCrewId: function (callbackSuccess, callbackError) {
        fetch("/api/crew", {
            method: 'GET',
            credentials: "same-origin",
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
