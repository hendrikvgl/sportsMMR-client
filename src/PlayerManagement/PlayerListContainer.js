/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from "react";
import axios from "axios";

export class PlayerListContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data: []};
    }
    
    componentDidMount() {
        getDataFromDb();
    }
    
    render() {
        return (
                <div/>
                );
    }
    
    getDataFromDb = () => {
    fetch("http://localhost:3001/api/getData")
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }));
  };
    
}


