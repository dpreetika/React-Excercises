import React, { Component } from 'react';   
class ValidationSummaryComponenet extends Component {
    constructor(props) {
        super(props);
       
    }
    render() {
        return ( 
            <div className="container"> 
         
                     <label className="alert alert-danger">
                         {JSON.stringify(this.props.data)}
                     </label>
                     
                     </div>
         );
    }
}
 
export default ValidationSummaryComponenet;