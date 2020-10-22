import React, { Component } from 'react';
class SimpleCalculator extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            temp:'',
            result:0
         }
    }
    
    
    handleInputChange=(evt)=> {
        //alert(this.state.temp);
        this.state.temp +=  evt.target.value;
        this.setState({result:this.state.temp});  
       // alert(this.state.temp);
     }
    
    calculate=()=> {
        //alert(this.state.temp);
        this.setState({ result: (eval((this.state.temp)))});
        this.state.temp= '';
    }
    clear=()=>{
        this.state.temp= '';
        this.setState({ result:this.state.temp});
    }
    render() { 
        return ( 
            
 <div className="container" style={{marginLeft:'200px'}} > 
                <h3>&nbsp;&nbsp;Simple Calculator</h3>
                    <div className="form-group" style={{border: 'thin solid ', width:'200px',backgroundColor:'lightgray'}}>
                        <br/>
                        &nbsp;&nbsp;  <input type="text" value={this.state.result}></input><br></br><br/>
                        &nbsp;&nbsp;  <input type ="button" value="1" name="1"
                        onClick={this.handleInputChange.bind(this)}></input> &nbsp;
                    <input type ="button" value="2" name="2" 
                        onClick={this.handleInputChange.bind(this)}></input> &nbsp;
                     <input type ="button" value="3" name="3"
                        onClick={this.handleInputChange.bind(this)}></input> &nbsp;
                   <input type ="button" value="/" name="/"
                        onClick={this.handleInputChange.bind(this)}></input> &nbsp; <br/>
                  &nbsp;&nbsp;   <input type ="button" value="4" name="4"
                        onClick={this.handleInputChange.bind(this)}></input> &nbsp;
                    <input type ="button" value="5" name="5"
                        onClick={this.handleInputChange.bind(this)}></input> &nbsp;
                    <input type ="button" value="6" name="6"
                        onClick={this.handleInputChange.bind(this)}></input> &nbsp;
                    <input type ="button" value="*" name="*"
                        onClick={this.handleInputChange.bind(this)}></input> &nbsp; <br/>
                   &nbsp;&nbsp; <input type ="button" value="7" name="7"
                        onClick={this.handleInputChange.bind(this)}></input> &nbsp;
                    <input type ="button" value="8" name="8"
                        onClick={this.handleInputChange.bind(this)}></input> &nbsp;
                    <input type ="button" value="9" name="9"
                        onClick={this.handleInputChange.bind(this)}></input> &nbsp;
                    <input type ="button" value="+" name="+"
                        onClick={this.handleInputChange.bind(this)}></input> &nbsp; <br/>

&nbsp;&nbsp; <input type ="button" value="C" name="clear" title="Clear"
                        onClick={this.clear.bind(this)}></input> &nbsp;
                    <input type ="button" value="0" name="0"
                        onClick={this.handleInputChange.bind(this)}></input> &nbsp;
                    <input type ="button" value="=" name="=" 
                        onClick={this.calculate.bind(this)}></input> &nbsp;
                    <input type ="button" value="-" name="-"
                        onClick={this.handleInputChange.bind(this)}></input> &nbsp;
                   <br/><br/>
                    
                </div>

            </div>
           
           
           
         );
    }
}
 
export default SimpleCalculator;