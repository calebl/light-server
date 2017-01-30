import { createContainer } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { _ } from 'meteor/underscore';


class HomePage extends Component {
  constructor(props){
    super(props);

  }


  render() {


    var className = "module module--white intro ";

    return (
      <div id="home">

        <section className="module module--white intro" >
          <div className="row">
            <div className="medium-5 medium-centered columns">

              <h1>Hello World</h1>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

HomePage.propTypes = {
  user: React.PropTypes.object,
}

export default HomePageContainer = createContainer(props => {
  // props here will have `main`, passed from the router
  // anything we return from this function will be *added* to it



  return {
    user: Meteor.user(),
  };
}, HomePage);
