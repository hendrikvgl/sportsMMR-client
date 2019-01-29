/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import MultiSelect from "@kenshooui/react-multi-select";

export class SessionPlayerSelect extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            items: [
                {id: 0, label: "item 1"},
                {id: 2, label: "item 2"},
                {id: 3, label: "item 3"},
                {id: 4, label: "item 4"}
            ],
            selectedItems: []
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillMount() {
        const players = this.props.players;
        let playersparsed = [];

        for (let x in players) {
            const player = JSON.parse(players[x]);
            playersparsed.push({id: player._id, label: player.name});
        }
//        players.map(x => playersparsed.push(x.name + "#" + x._id));
        this.setState({items: playersparsed});
    }
    
    onSubmit() {
        this.props.onSubmit(this.state.selectedItems);
    }

    render() {
        const {items, selectedItems} = this.state;
        return (
                <div>
                    <MultiSelect
                        items={items}
                        selectedItems={selectedItems}
                        onChange={this.handleChange}
                        showSearch={false}
                        selectAllHeight={45}
                        />
                        
                    <button className="button-session-init" onClick={this.onSubmit} >Start Session.</button>
                        
                </div>

                );
    }

    handleChange(selectedItems) {
        this.setState({selectedItems});
    }

}

