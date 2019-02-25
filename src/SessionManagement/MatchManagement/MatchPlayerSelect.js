/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import MultiSelect from "@kenshooui/react-multi-select";
import Modal from 'react-responsive-modal';


export class MatchPlayerSelect extends React.Component {

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
            selectedItems: [],
            show: false,
            team: 1
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
        if ((prevProps.show !== this.props.show) && (this.props.show !== this.state.show)) {
            this.setState({show: this.props.show, team: this.props.team});

            const players = this.props.players;
           
//        players.map(x => playersparsed.push(x.name + "#" + x._id));
            this.setState({items: players});
        }
    }

    onClose = () => {
        this.props.onCancel();
    }

    onSubmit = () => {
        if (this.state.team === 1) {
            this.props.onSubmit1(this.state.selectedItems);
        } else if (this.state.team === 2) {
            this.props.onSubmit2(this.state.selectedItems);
        }
        this.setState({ selectedItems: [], items: [] })
    }

    render() {
        const {items, selectedItems, show} = this.state;
        return (
                <Modal open={show} showCloseIcon={false} onClose={this.onClose} center>
                    <MultiSelect
                        items={items}
                        selectedItems={selectedItems}
                        onChange={this.handleChange}
                        showSearch={false}
                        selectAllHeight={45}
                        />
                
                    <button className="button-session-init" onClick={this.onSubmit} >
                        Confirm Team {this.props.team}.
                    </button>
                </Modal>

                );
    }

    handleChange(selectedItems) {
        this.setState({selectedItems});
    }

}

