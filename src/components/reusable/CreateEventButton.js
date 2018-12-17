import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const createEventLink = "createevent";

class CreateEventButton extends Component {
  render() {
    const { auth, history } = this.props;
    const signedIn = isLoaded(auth) && !isEmpty(auth);
    if (signedIn) {
      return (
        <Button color="primary" onClick={() => history.push(createEventLink)} className="d-none d-sm-block ml-2">
          <FontAwesomeIcon icon={'plus'} className="mr-2"/>
          Create Event
        </Button>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return { auth: state.firebase.auth }
};

export default withRouter(compose(
    firebaseConnect(),
    connect(mapStateToProps)
)(CreateEventButton))
