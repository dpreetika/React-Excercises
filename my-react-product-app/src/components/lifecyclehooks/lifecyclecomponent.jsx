import React, { Component } from 'react';
class LifeCucleParentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            pValue = 0
         };
    }
    render() { 
        if(this.state.pValue % 2 == 0){
            return(
                <div>
                         <h1> Parent</h1>
                         <input type="text" value={this.state.pValue}
                        onChange={(evt)=> this.setState({pValue:evt.target.value})}></input>
                       
                </div>
            )
        }else{
            
        }
    }
}



class MyFirstChildComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            x1:0,
            y1:0
        };
    }

    grabMousePosition=(event)=>{
        this.setState({x1:event.clientX});
        this.setState({y1:event.clientY});
        console.log(`x = ${this.state.x1}  y = ${this.state.y1}`)
    }

    componentDidMount=()=>{
        console.log(`My child mounte`); 
        window.addEventListener('mousemove',this.grabMousePosition);
    }
    componentDidUpdate=()=>{
        console.log(`My child updated`);
    }

    componentWillUnmount=()=>{
        console.log(`My child unmounted`);
    }

    componentWillMount=()=>{
        console.log(`My child will mounted`); 
    }
    render() { 
        return ( 
            <div className="container">
                <h2>The first</h2>
        <div>Value from Parent {this.props.data}</div>
        <br/>
        <div>
            X Position -- {this.state.x1} &&& {this.state.y1}
        </div>
            </div>
         );
    }
}
 
class MySecondChild extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    componentDidMount=()=>{
        console.log(`My child mounte`); 
        window.addEventListener('mousemove',this.grabMousePosition);
    }
    componentDidUpdate=()=>{
        console.log(`My child updated`);
    }

    componentWillUnmount=()=>{
        console.log(`My child unmounted`);
    }

    componentWillMount=()=>{
        console.log(`My child will mounted`); 
    }
    render() { 
        return ( <div className="container">
            <h2>My second</h2>
            <div></div>
        </div> );
    }
}
 

 
export default LifeCucleParentComponent;