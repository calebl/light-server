import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { browserHistory } from 'react-router'
import { _ } from 'meteor/underscore';
import { Meteor } from 'meteor/meteor';

class App extends Component{
  constructor(props){
    super(props);
    this.state = this.getMeteorData();
    this.logout = this.logout.bind(this);
  }

  getMeteorData(){
    return { isAuthenticated: Meteor.userId() !== null };
  }

  componentWillMount(){
    if (!this.state.isAuthenticated) {
      browserHistory.push('/login');
    }
  }

  componentDidUpdate(prevProps, prevState){
    if (!this.state.isAuthenticated) {
      browserHistory.push('/login');
    }
  }

  logout(e){
    e.preventDefault();
    Meteor.logout();
    browserHistory.push('/login');
  }

  render(){
    return (
      <div>
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <a className="navbar-brand" href="#">Auth App</a>
            </div>
            <div className="navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="#" onClick={this.logout}>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {this.props.children}
      </div>
    );
  }
}

export default AppContainer = createContainer(props => {
  // props here will have `main`, passed from the router
  // anything we return from this function will be *added* to it

  return {
    // user: Meteor.user(),
  };
}, App);
