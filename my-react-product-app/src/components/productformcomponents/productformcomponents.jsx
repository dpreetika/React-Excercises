import React, { Component } from 'react'
import {Catergories, Manufacturers} from './../../models/constants';
import {Logic} from '././../../models/logic';
import DropDownComponent from './../reusablecomponents/dropdowncomponents';
class ProductFormComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  
             ProductId: 0,
             ProductName: '',
             CategoryName: '',
             Manufacturer: '',
             Price:0,   
             categories: Catergories,
             manufacturers:Manufacturers,
             products:[],
             columnHeaders:[]   
        }
        this.logic = new  Logic();
    }

    // the lifecycle method of component that will be executed 
    // after the render() method is completing its 
    // execution
    componentDidMount=()=>{
         let prds = this.logic.getProducts();

         // read first record from array and read its schema
         var firstRecord = prds[0];
         var recProperties = Object.keys(firstRecord);
         // iterate over the properties and add in colunHeaders
          
         this.setState({columnHeaders: recProperties}, ()=> {
             
         });
         // async method will executes before
         // the product is completely excuted
         // to wait for products to update
         // add a callback to setState
         this.setState({products:prds}, ()=>{
              console.log(JSON.stringify(this.state.products)); 
         });
          
    }


    handleChanges=(evt)=>{
        this.setState({[evt.target.name]:evt.target.value},()=>{});
    }
    clear=()=>{
        this.setState({ProductId:0});
        this.setState({ProductName:''});
        this.setState({CategoryName:''});
        this.setState({Manufacturer:''});
        this.setState({Price:0});
    }
    getSelectedCategory=(val)=> {
        this.setState({CategoryName: val}, ()=>{});
    }
    getSelectedManufacturer=(val)=> {
        this.setState({Manufacturer: val}, ()=>{});
    }
    save=()=>{
        // to read product values and update it in products array
        var prd = {
             ProductId: this.state.ProductId,
             ProductName: this.state.ProductName,
             CategoryName: this.state.CategoryName,
             Manufacturer: this.state.Manufacturer,
            Price: this.state.Price   
        };
        let prds = this.logic.addProduct(prd);
        this.setState({products:prds}, ()=>{
            console.log(JSON.stringify(this.state.products)); 
       });
    }

    delete(val){
        console.log(val);
        this.state.products.splice(val,1)
        this.setState(this.state.products)
      }

     
    render() { 
        return (
            <div className="container">
             <form>
                <div className="form-group">
                    <label>Product Id</label>
                    <input type="text" value={this.state.ProductId} 
                    name="ProductId"
                    className="form-control" onChange={this.handleChanges.bind(this)}/>
                </div>
                <div className="form-group">
                    <label>Product Name</label>
                    <input type="text" value={this.state.ProductName} 
                    name="ProductName"
                    className="form-control" onChange={this.handleChanges.bind(this)}/>
                </div>
                <div className="form-group">
                    <label>Category Name</label>
                    <DropDownComponent data={this.state.CategoryName} 
                    dataSource={this.state.categories}
                    selectedValue={this.getSelectedCategory.bind(this)}
                    ></DropDownComponent>
                   {/*  <select type="text" value={this.state.CategoryName} 
                    name="CategoryName"
                    className="form-control" onChange={this.handleChanges.bind(this)}>
                      {
                          this.state.categories.map((cat,idx)=> (
                              <option key={idx}>{cat}</option>
                          ))
                      }
                    </select>*/}
                </div>
                <div className="form-group">
                    <label>Manufacturer Name</label>
                    <DropDownComponent data={this.state.Manufacturer} 
                    dataSource={this.state.manufacturers}
                    selectedValue={this.getSelectedManufacturer.bind(this)} 
                    ></DropDownComponent>
                   {/* <select type="text" value={this.state.Manufacturer} 
                    name="Manufacturer"
                    className="form-control" onChange={this.handleChanges.bind(this)}>
                    {
                        this.state.manufacturers.map((man,idx)=> (
                            <option key={idx}>{man}</option>
                        ))
                    }
                </select> */}
                </div>
                <div className="form-group">
                    <label>Base Price</label>
                    <input type="text" value={this.state.Price}
                    name="Price"
                    className="form-control" onChange={this.handleChanges.bind(this)}/>
                </div>
                <div className="form-group">
                <input type="button" value="Clear" className="btn btn-warning"
                  onClick={this.clear.bind(this)}/>
                <input type="button" value="Save" className="btn btn-success"
                onClick={this.save.bind(this)}/>
              </div>
              </form>
              <br/>
              <table className="table table-bordered table-striped table-dark">
                   <thead>
                      <tr>
                        {
                            this.state.columnHeaders.map((col,idx)=> (
                                <th key={idx}>{col}</th>
                            ))
                        }
                      </tr>
                   </thead> 
                   <tbody>
                   {
                    this.state.products.map((prd,idx) => (
                       <tr id={idx} key={idx}>
                          {
                              this.state.columnHeaders.map((col,i)=> (
                                  <td key={i}>{prd[col]}</td>
                              ))
                          } 
                         <input type="button" name={idx} value="Delete" className="btn btn-success"
                         onClick={() => this.delete(idx)}/>
                       </tr> 
                    ))
                }
                   </tbody>
              </table>

              
           {/*   <table className="table table-bordered table-striped table-dark">
                 <thead>
                   <tr>
                     <th>
                       Product Id
                     </th>
                     <th>
                     Product Name
                   </th>
                   </tr>
                 </thead>
                 <tbody>
                 {
                     this.state.products.map((prd,idx) => (
                        <tr key={idx}>
                        <td>{prd.ProductId}</td>
                        <td>{prd.ProductName}</td>
                      </tr> 
                     ))
                 }
                   
                 </tbody>
              </table>*/}
            </div>
        );
    }
}
 
export default ProductFormComponent;