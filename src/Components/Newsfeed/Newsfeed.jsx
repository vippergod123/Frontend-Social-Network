import React, { Component } from 'react';
import {Col, Row, FormGroup,Form, FormControl, Button, Media} from "react-bootstrap";
import {postStatus} from '../../Store/Actions/postAction'
//Connect redux
import { connect } from 'react-redux';
//Plugin
import InfiniteScrool from "react-infinite-scroller"
import { compose } from 'redux'
import { isEmpty, firestoreConnect } from 'react-redux-firebase';
import Profile from "../Layout/NavBar/LeftBar/Profile";
import People from "../Layout/NavBar/RightBar/Followings";
import Post from "./Post";

import {CommentStatus} from '../../Store/Actions/commentsActions'

import axios from "axios"

const avatarUser = {
    height: "50px",
    width: "50px",
    borderRadius: "50%"
}

class Newfeed extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }     
    }

    handleOnClick() { 
        console.log("clicked");
        
        axios.post('/blockchain/?address1=duy&address2=dat&operation=share' , {
            
          })
          .then(function (response) {
            alert(response.data.message)
          })
          .catch(function (error) {
            alert(error)
          });
            
       
                
    }
    handleChange = (e) =>{
        this.setState({
            
            [e.target.id]: e.target.value
        })
    }
    handleComments(getPost){
      
    console.log(this.ref.tag.value)
        var text = "dfasdfasdf"
        //this.ref.tag.value = null
        console.log(text)
        this.props.CommentStatus(text,getPost)
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        
        var id = new Date()
        var post =  {
            //userPost: authUser,
           
            userPost: {
            
                firstName: "Dai",
               // lastName:"Nguyen",
                email: "asd@gmail",
                gender: "nam"
            },
         
            postedTime: new Date(),
            text: this.state.text,
            comments:[
                {
                   text: "Hello" ,
                   Profile:[{
                       id: "àdasfdasdf",
                       name: "ádfasfasfd"
                   }]
                },
                {
                    text: "Hello B" ,
                   Profile:[{
                       id: "àdasfdasdf",
                       name: "ádfasfasfd"
                   }]
                }
            ],
            images:[],
        }
        this.state.text = ""
        this.props.postStatus(post)
        this.props.history.replace('/')
        
    }
  render() {
    // console.log(this.props.fireStore.Post)
    var getPost = this.props.fireStore.Post

    console.log(this.props.fireStore.Post)
  
   if(getPost){
       console.log(getPost.uid);
       
    return (
        <Row>
           
            <Col xs= {6} md = {3}>
                <Profile Follower = {this.props.follower} Following = {this.props.following}/>
            </Col>
            <Col xs={6} md={6}>
            <Button onClick = {this.handleOnClick}></Button>
                <div className ="card bg-light">
                    <div className = "card-body">
                        <h5 className ="card-title text-secondary">Tạo bài viết</h5>
                        <div className = "card-text">
                            <Media>
                                <Media.Left>
                                    <a className="mr-3" href="/profile">
                                        <img alt=""  style ={avatarUser} src="https://znews-photo.zadn.vn/w1024/Uploaded/mdf_xqkxvu/2018_11_19/Lucern1.JPG"/>
                                    </a>
                                </Media.Left>
                                <Media.Body >
                                    <Form onSubmit = {this.handleSubmit}>
                                    <FormGroup controlId="formControlsTextarea" >
                                        <input className = "form-control" componentClass="textarea" id = "text" value = {this.state.text} onChange = {this.handleChange} placeholder = "What's up?..."/>
                                    </FormGroup>
                                    <Button type="submit" className ="float-right">Post</Button>
                                    </Form>
                                    
                                    <ul className="nav">
                                        <li className = "nav-item">
                                            <a className = "nav-link" href="/"><i className="fa fa-user"></i></a>
                                        </li>
                                        <li className = "nav-item">
                                            <a className = "nav-link" href="/"><i className="fa fa-map-marker"></i></a>
                                        </li>
                                        <li className = "nav-item">
                                          
                                            <a className = "nav-link" href="/"><i className="fa fa-camera"></i></a>
                                        </li>
                                        <li className = "nav-item">
                                            <a className = "nav-link" href="/"><i className="fa fa-smile-o"></i></a>
                                        </li>
                                    </ul>
                                </Media.Body>
                            </Media>
                        </div>
                    </div>  
                </div>
                <br/>
                {getPost.map ( each => {
                    console.log(each.id);
                    
                    return (
                        <div> 
                            <Post getPost = {each}/>
                           <br/>
                            <Form >
                                <FormGroup controlId="formControlsTextarea">
                                <input className = "form-control" name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3" name = "tag" ref= "tags"></input>
                                </FormGroup>
                                
                                <button  onClick = {()=>this.handleComments(each)} className ="float-right">Post</button>
                                <ul className="nav">
                                    <li className = "nav-item">
                                        <a className = "nav-link" href="/"><i className="fa fa-user"></i></a>
                                    </li>
                                    <li className = "nav-item">
                                        <a className = "nav-link" href="/"><i className="fa fa-map-marker"></i></a>
                                    </li>
                                    <li className = "nav-item">
                                        <a className = "nav-link" href="/"><i className="fa fa-camera"></i></a>
                                    </li>
                                    <li className = "nav-item">
                                        <a className = "nav-link" href="/"><i className="fa fa-smile-o"></i></a>
                                    </li>
                                </ul>
                                </Form>
                            <br/>

                        </div>
                    )
                })}

                
            </Col>
            <Col xs={6} md={3}>
                <People/>
            </Col>

            
        </Row>

        
    );
     
   }
   else {
    return( <div> Loading....</div>)
   }
    
  }
}



const  mapStateToProps = (state) => {
    console.log(state)
    return {
        
        follower: state.follower,
        following: state.following,
        fireStore: state.firestore.ordered
        
    };
}

const mapDispatchToProps = (dispatch) => { 
    return { 
       postStatus: (Post) => (dispatch(postStatus(Post))),
      CommentStatus: (text, Comments) => (dispatch(CommentStatus(text, Comments)))
    }
}


export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect((props) => [
        {collection: 'Profile'},
        {collection: 'Post'},
    ])   
)(Newfeed)
