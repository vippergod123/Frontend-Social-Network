import React, { Component } from 'react';
import '../App.css';

class Header extends Component {
  render() {
    return (
        <div class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div class="navbar-collapse navbar-collapse-1 collapse" aria-expanded="true">
                    <ul class="nav navbar-nav">
                    <li class="active">
                        <a href="#fake"><span class="glyphicon glyphicon-home"></span> Home</a>
                    </li>
                    <li>
                        <a href="#fake"><span class="glyphicon glyphicon-bell"></span> Notifications</a>
                    </li>
                    <li>
                        <a href="#fake"><span class="glyphicon glyphicon-envelope"></span> Messages</a>
                    </li>
                    </ul>
                    <div class="navbar-form navbar-right">
                    <div class="form-group has-feedback">
                        <input type="text" class="form-control-nav" id="search" aria-describedby="search1"/>
                        <span class="glyphicon glyphicon-search form-control-feedback" aria-hidden="true"></span>
                    </div>

                    <button class="btn btn-primary" type="submit" aria-label="Left Align">
                        <span class="glyphicon glyphicon-pencil" aria-hidden="true"> </span> Tweet
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Header;