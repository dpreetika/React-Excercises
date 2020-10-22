import React from 'react';
const { Component } = require("react");


class SimpleComponent extends Component{
    constructor(props){
        super(props);
        
    }
    render(){
        return (
        <div>
            <h2>This is Simple Component : {this.props.value} </h2>
        </div>)
    }
}

export default SimpleComponent