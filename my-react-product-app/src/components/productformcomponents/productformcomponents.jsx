import React, { Component } from 'react'
import {Catergories, ErrorMsgs, Manufacturers} from './../../models/constants';
import {Logic} from '././../../models/logic';
import DropDownComponent from './../reusablecomponents/dropdowncomponents';
import ValidationSummaryComponent from './../reusablecomponents/validationsummarycomponent';
//import {HttpService} from './../../services/httpservice'
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
             columnHeaders:[],
             IsPriceValid: false,
             IsCategorySelected: false,
             IsManufacturerSelected:false,
             IsUpperCase: false,
             IsMandatory:false,
             IsUnique:false,
             errorMsgs: [],
             IsFormValid: false 
        }
        this.logic = new  Logic();
        //this.serv =  new HttpService();
    }

    // the lifecycle method of component that will be executed 
    // after the render() method is completing its 
    // execution
    componentDidMount=()=>{
          let prds = this.logic.getProducts();

        //  // read first record from array and read its schema
          var firstRecord = prds[0];
          var recProperties = Object.keys(firstRecord);
        //  // iterate over the properties and add in colunHeaders
          
          this.setState({columnHeaders: recProperties}, ()=> {
             
          });
        //  // async method will executes before
        //  // the product is completely excuted
        //  // to wait for products to update
        //  // add a callback to setState
          this.setState({products:prds}, ()=>{
             console.log(JSON.stringify(this.state.products)); 
          });

        this.getErrorMessage();
    }
 // call the method from the HttpService class 

    handleChanges=(evt)=>{
        this.setState({[evt.target.name]:evt.target.value},()=>{});
        this.validateForm(evt.target.name, evt.target.value);
        this.validate1(evt.target.name, evt.target.value);
        this.validateMandatory();
        this.validate();
        this.getErrorMessage();
    }


    validate1(name,value){
        if(name === "ProductId"){
        let flag = false;
            if(((this.state.products)).map((e,i)=>{
                if(flag){return;}
                var prd = e.ProductId;
              if(prd == value){
                  flag = true;
                 this.setState({ IsUnique: false });
              }
              
              else{
                  this.setState({ IsUnique: true });
              }
            }));
                 
          }
    }

    validateMandatory(){
          if(this.state.ProductId == 0 || 
            this.state.ProductName == ''||
            this.state.CategoryName == '' ||
            this.state.Manufacturer == '' ||
            this.state.Price==0 ){
                
                this.setState({IsMandatory:false});
                this.setState({IsFormValid:false});
                //alert(this.state.IsFormValid);
            }
            else{
                //alert(this.state.IsMandatory);
                this.setState({IsMandatory:true});
                this.setState({IsFormValid:true});
            }
    }
    validateForm(name, value){
                
         if(name === "ProductName"){
             
            var str = value;
            //alert(str);
            if(str.length >0  && str[0].toUpperCase() !== str[0])
            {
                 this.setState({IsUpperCase:false});
            }
            else{
                this.setState({IsUpperCase:true});
            }
         }
         if(name === "Price") {
            switch(this.state.CategoryName) {
                case "Electronics":
                    if(parseInt(value) < 2000) {
                        //alert("invalid");
                        this.setState({IsPriceValid:false});
                    } else {
                       this.setState({IsPriceValid:true});
                    }
                  break;
                case "Electrical":
                    if(parseInt(value) < 50) {
                        //alert("invalid");
                        this.setState({IsPriceValid:false});
                    } else {
                       this.setState({IsPriceValid:true});
                    }
                  break;
                case "Food":
                    if(parseInt(value) < 5) {
                        //alert("invalid");
                        this.setState({IsPriceValid:false});
                    } else {
                       this.setState({IsPriceValid:true});
                    }
                  break;
                default:
                  // code block
              } 
         
        }
           this.setState({IsUnique:this.state.IsUnique});
        
    }
    
    validate(){
        if(this.state.ProductId == 0 ||
            this.state.ProductName == '' ||
            this.state.CategoryName == '' ||
            this.state.Manufacturer == '' ||
            this.state.Price==0 ){
                this.state.IsMandatory = false;
                this.setState({IsFormValid:false});
            }
            else{
                this.state.IsMandatory = true;
                this.setState({IsFormValid:true});
            }
         if( this.state.CategoryName === "" || this.state.CategoryName === "Select Data"
         ){
           
            this.setState({IsCategorySelected:false});
            this.setState({IsFormValid:false});
            console.log(this.state.IsCategorySelected);
         }
         else{
            //this.state.IsCategorySelected = true;
            this.setState({IsCategorySelected:true});
            this.setState({IsFormValid:true});
         }
         if(this.state.Manufacturer === ""  || this.state.Manufacturer ==="Select Data"){
           // this.state.IsManufacturerSelected = false;
           this.setState({IsManufacturerSelected:false});
           this.setState({IsFormValid:false});
         }
         else{
           // this.state.IsManufacturerSelected = true;
           this.setState({IsManufacturerSelected:true});
           this.setState({IsFormValid:true});
         }
       
    }
    clear=()=>{
        this.setState({ProductId:0});
        this.setState({ProductName:''});
        this.setState({CategoryName:''});
        this.setState({Manufacturer:''});
        this.setState({Price:0});
    }
    getSelectedCategory=(val)=> {
      this.state.CategoryName = val;
        this.setState({CategoryName: val}, ()=>{});
        this.validate();
        this.getErrorMessage();
    }
    getSelectedManufacturer=(val)=> {
      this.state.Manufacturer = val;
        this.setState({Manufacturer: val}, ()=>{});
        this.validate();
        this.getErrorMessage();
    }

    getErrorMessage(){
      
      const errorMap= {
        "Price": ErrorMsgs[0],
        "Catergory": ErrorMsgs[1],
        "Manufacturer":ErrorMsgs[2],
        "ProductId":ErrorMsgs[3],
        "ProductName":ErrorMsgs[4]

      };
      var errors = [];

      if(!this.state.IsPriceValid){
        errors.push(ErrorMsgs[0]);
    }
    if(!this.state.IsCategorySelected){
      errors.push(ErrorMsgs[1]);
  }
  if(!this.state.IsManufacturerSelected){
    errors.push(ErrorMsgs[2]);
}
      if(!this.state.IsUnique){
          errors.push(ErrorMsgs[3]);
      }

     
     this.state.errorMsgs = errors;

    }
     
    
    
    save=()=>{
        
        this.validate();
         this.setState({IsMandatory:this.state.IsMandatory});
        if(this.state.IsCategorySelected && this.state.IsManufacturerSelected && this.state.IsMandatory){
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
           
       
    }

    delete(val){
        //console.log(val);
        this.state.products.splice(val,1)
        this.setState(this.state.products)
      }

     
    render() { 
        return (
            <div className="container">
             <form>
                 
                <div className="form-group ">
                    <label >Product Id</label>
                    <label className="asterisk_input">  </label>    
                    <input type="text" value={this.state.ProductId} 
                    name="ProductId" 
                    className="form-control" onChange={this.handleChanges.bind(this) }>
              
                    </input>
                    <div className="alert alert-danger"
                      hidden={this.state.IsUnique}>
                        Product Id must be unique
                      </div>
                </div>
                    

                <div className="form-group">
                    <label className="asterisk_input">Product Name</label>
                    <input type="text" value={this.state.ProductName} 
                    name="ProductName" 
                    className="form-control" onChange={this.handleChanges.bind(this)}/>
                     <div className="alert alert-danger"
                      hidden={this.state.IsUpperCase}>
                        Product Name must start upper case
                      </div>
                </div>
                <div className="form-group">
                    <label className="asterisk_input">Category Name</label>
                    <DropDownComponent data={this.state.CategoryName} 
                    dataSource={this.state.categories}
                    selectedValue={this.getSelectedCategory.bind(this)} name="CategoryName" 
                    
                    ></DropDownComponent>
                    <div className="alert alert-danger"
                      hidden={this.state.IsCategorySelected}>
                        Category must be selected
                      </div>
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
                    <label className="asterisk_input">Manufacturer Name</label>
                    <DropDownComponent data={this.state.Manufacturer} 
                    dataSource={this.state.manufacturers}
                    selectedValue={this.getSelectedManufacturer.bind(this)} name="Manufacturer"
                    ></DropDownComponent>
                    <div className="alert alert-danger"
                      hidden={this.state.IsManufacturerSelected}>
                        Manufacturer must be selected
                      </div>
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
                    <label className="asterisk_input">Base Price</label>
                    <input type="text" value={this.state.Price}
                    name="Price"
                    className="form-control" onChange={this.handleChanges.bind(this)}/>
                     <div className="alert alert-danger"
                      hidden={this.state.IsPriceValid}>
                        Price is must more for the selected category
                      </div>
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
                         <td> <input type="button" name={idx} value="Delete" className="btn btn-success"
                         onClick={() => this.delete(idx)}/> </td>
                       </tr> 
                    ))
                }
                   </tbody>
              </table>

              <ValidationSummaryComponent data={this.state.errorMsgs} 
                    dataSource={this.state.errorMsgs} 
                    ></ValidationSummaryComponent>
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