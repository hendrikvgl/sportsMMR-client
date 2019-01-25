/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
import React from 'react';
import Container from 'react-bootstrap/lib/Container';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import '../styles/playermanagement.css';
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
                (<Container >
                
                    <Row>
                        <label className="standard-font">Name:</label>
                    </Row>
                    <Row className="flex-container player-input-form">
                
                        <input className="fill-width" type="text" name="name" value={this.props.value} onChange={this.props.onChange}/>
                
                        <input type="submit" value="Submit" onClick={this.handleSubmit} />
                
                    </Row>
                                                                                 
                </Container>)
                );
    }
}


