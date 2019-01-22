/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';

export class PlayerCreationForm extends React.Component {
    
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleSubmit(e) {
        e.preventDefault();
        this.props.onSubmit();
    }
    
    render() {
        return (
                (<form onSubmit={this.handleSubmit}>
                    <label>
                        Name:
                        <input type="text" name="name" onChange={this.props.onChange}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>)
                );
    }
}


