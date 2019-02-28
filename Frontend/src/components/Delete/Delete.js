import React, {Component} from 'react';
import axios from "axios";
import {Redirect} from "react-router";
class Delete extends Component{
    constructor(props){
    super(props);
        this.state={
            BookID : ""
        }
        this.bookidChangeHandler=this.bookidChangeHandler.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }

    bookidChangeHandler = (e)=>{
        this.setState({
            BookID: e.target.value
        })
    }
    onSubmit = (e)=>{
        e.preventDefault();
        const data ={
            BookID :this.state.BookID,
        }
    
    axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.delete('http://localhost:3001/delete/'+data.BookID)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 200){
                    this.setState({
                    redirectVar : <Redirect to = "/home"/>
                        //authFlag : true
                    })
                }else{
                    this.setState({
                       // authFlag : false
                       redirectVar :''
                    })
                }
            })
        //this.goHome();
        }


    render(){
        return(
            <div>
            {this.state.redirectVar}
            <div class="container">
                <form>
                    <div style={{width: "50%",float: "left"}} class="form-group">
                        <input  onChange={this.bookidChangeHandler} type="text" class="form-control" name="BookID" placeholder="Search a Book by Book ID"/>
                    </div>
                    <div style={{width: "50%", float: "right"}}>
                            <button onClick={this.onSubmit} class="btn btn-success" type="submit">Delete</button>
                    </div> 
                </form>
            </div>
            </div>
        )
    }

}

export default Delete;