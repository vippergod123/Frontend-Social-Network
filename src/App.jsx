import React, { Component } from 'react';

import {BrowserRouter ,Route, Switch} from 'react-router-dom';

import Navbar from "./Components/Layout/NavBar/HeaderBar/HeaderBar";
import Newfeed from './Components/Newsfeed/Newsfeed';
import Following from './Components/Layout/Follow/Following';



class App extends Component {
  render() {
    return (
        <div>
          <Navbar/>
          <BrowserRouter basename={process.env.PUBLIC_URL}>
              <div>
              <Switch>
                <Route exact path="/" component={Newfeed}/>
                <Route exact path="/:id/following" component={Following}/>
              </Switch>
              </div>
          </BrowserRouter>
        </div>
        
    );
  }
}

export default App;