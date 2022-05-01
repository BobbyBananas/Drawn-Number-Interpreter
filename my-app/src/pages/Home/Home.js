//Code Inspired From: https://rookiecoder.medium.com/react-button-click-navigate-to-new-page-6af7397ea220
import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import history from '../../components/history';

export default class Home extends Component {
    render() {
        return (
            <div className="Home">
                <div className="lander"
                     style={{
                         width:'40%',
                         align:'centre',
                         position:'absolute',
                         left:'30%',
                         scale: '130%',
                     }}>
                    <h1>Hello There</h1>

                    <form style={{paddingTop: 15}}>
                        <Button style={{left:-7.5, position:'relative'}}
                                variant="btn btn-success" onClick={() => history.push('/Interpreter')}>Number Interpreter</Button>
                    </form>
                </div>
            </div>
        );
    }
}