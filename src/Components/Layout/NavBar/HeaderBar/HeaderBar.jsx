import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import SigninLink from './Link/SigninLink'
import SignoutLink from './Link/SignoutLink'
import {connect} from 'react-redux'
import { compose } from 'redux'


import LoadingSpinner from "../../../../Plugin/LoadingSpinner"
import Axios from 'axios';

class HeaderBar extends Component {
  constructor(props) {
    super(props);
    var authKey = localStorage.getItem("authKey");
    authKey =JSON.parse(authKey)
    this.state = {
      authProfile:null,
      authKey: authKey,
    }        
  }

  
componentWillMount() { 

    console.log(this.state.authKey);
    var getAccount = "/account/"
    if ( this.state.authKey){
      Axios.post(getAccount, {
          public_key: this.state.authKey.publicKey,
      })
      .then((response) => {
          var data = response.data
          if ( data.error)  {
              this.props.history.push(data.redirect)
              localStorage.removeItem("authKey");
              localStorage.removeItem("authProfile");

          }
          else {
              var authProfile = {}
              localStorage.removeItem("authProfile") 

              authProfile.amount = data.amount;            
              authProfile.displayName = data.displayName? data.displayName : "Account";
              authProfile["followings"] = data.followings ? data.followings: new Object({ addresses: new Array()})
              authProfile["post"] = data.post? data.post : new Array()
              authProfile["avatar"] = data.picture? "data:image/jpg;base64, " + data.picture : null
              
              authProfile["publicKey"] = this.state.authKey.publicKey
              authProfile["privateKey"] = this.state.authKey.privateKey
              
              localStorage.setItem("authProfile",JSON.stringify(authProfile))
              
              this.setState({ 
                  isLoading: false,
                  authProfile: authProfile,
              })  
          }
      })
      .catch( (error) => {
          console.log(error);
      });
    }
  }

  handleSignOut() {
    Axios.get("/signout").then((response) => { 
        console.log(response.data);
        var data = response.data;
        
        localStorage.clear()
        alert(data.message + localStorage.length);
        
         
        window.location.replace(data.redirect);
       
    })
  }

  render() {
    const links = this.state.authProfile ? <SigninLink authProfile = {this.state.authProfile} handleSignOut = {this.handleSignOut.bind(this)}/> : <SignoutLink/>
    
    console.log(this.state.authProfile);
    
      return (
       <nav className="navbar navbar-expand-lg navbar-light bg-white shadow sticky-top">
          <div className = "container">
            <a className="navbar-brand mb-0 h1" href="/">Forest</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              
              <form className="form-inline my-2 my-lg-0">
             
                <input type="text" className="form-control" id="inlineFormInputGroupUsername2" placeholder="Search..."/>
              
              </form>
              <ul className="navbar-nav mr-auto "></ul>
              {links}
            </div>
        
          </div>
  
        </nav>
   
      )

  }
}

const mapStateToProps = (state) => { 
  console.log(state);
  return { 
      auth: state.firebase.auth
  }
}

export default compose(connect(mapStateToProps))(HeaderBar)
