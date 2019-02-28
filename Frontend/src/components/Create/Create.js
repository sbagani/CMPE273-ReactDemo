import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import axios from "axios";
import {Redirect} from "react-router";
class Create extends Component{
    constructor(props) {
        super(props)
        this.state = {
                BookID: '',
                Title: '',
                Author: '',
                redirectVar:''
            }
            this.bookIdChangeHandler=this.bookIdChangeHandler.bind(this);
            this.titleChangeHandler=this.titleChangeHandler.bind(this);
            this.authorChangeHandler=this.authorChangeHandler.bind(this);
            this.onSubmit=this.onSubmit.bind(this);

      //  this.goHome = this.goHome.bind(this)
    //}
   // goHome() {
      //  this.props.history.push('/home')
    }
    bookIdChangeHandler= (e)=>{
        this.setState({
            BookID: e.target.value
        })
    }
    titleChangeHandler= (e)=>{
        this.setState({
            Title: e.target.value
        })
    }
        authorChangeHandler= (e)=>{
            this.setState({
                Author: e.target.value
            })
        }

    onSubmit = e => {
        e.preventDefault();
        //this.props.onSubmit(this.state);
        console.log(this.state);
        const data={
            BookID :this.state.BookID,
            Title: this.state.Title,
            Author:this.state.Author

        }
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        axios.put('http://localhost:3001/create',data)
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

    // sendData = () => {
    //     console.log(this.state);
    //     this.props.callbackFromParent(this.state);
    // }

    render(){

        return(
            <div>
            {this.state.redirectVar}
                <br/>
                <div class="container">
                    <form action="http://127.0.0.1:3000/create" method="post">
                        <div style={{width: '30%'}} class="form-group">
                            <input  type="text" class="form-control" name="BookID" placeholder="BookID"
                                value={this.state.BookID}
                                onChange={this.bookIdChangeHandler}
                                // onChange={this.handleChange}
                            />
                            {/* <Home Book={"rp"}/> */}
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                            <input  type="text" class="form-control" name="Title" placeholder="Title"
                                value={this.state.Title}
                                onChange={this.titleChangeHandler}
                            />
                        </div>
                        <br/>
                        <div style={{width: '30%'}} class="form-group">
                            <input  type="text" class="form-control" name="Author" placeholder="Author"
                                value={this.state.Author}
                                onChange={this.authorChangeHandler}
                            />
                        </div>
                        <br/>
                        <div style={{width: '30%'}}>
                            {/* <button onClick={this.goHome} class="btn btn-success" type="submit">Create</button> */}
                            <button onClick={this.onSubmit} class="btn btn-success" type="submit">Create</button>
                        </div> 
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Create);