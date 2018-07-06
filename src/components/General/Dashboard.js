import React, { Component } from 'react';
import {
  Container,
  Row,
  Col
} from 'reactstrap';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

const categories = [
  {
    name: 'General',
    buttons: [{
      name: 'USP Life Hacks',
      icon: 'heart',
      link: '/',
      color: 'dodgerblue'
    }, {
      name: 'MC Minutes & AGM Report',
      icon: 'file-alt',
      link: '/',
      color: 'dodgerblue'
    }]
  },
  {
    name: 'Events',
    buttons: [{
      name: 'See All Events',
      icon: 'calendar-alt',
      link: '/events',
      color: 'tomato'
    }, {
      name: 'Create Event',
      icon: 'plus',
      link: '/createevent',
      color: 'tomato'
    }, {
      name: 'Manage My Events',
      icon: 'user-clock',
      link: '/manageevents',
      color: 'tomato'
    }]
  },
  {
    name: 'Interest Groups',
    buttons: [{
      name: 'See All Interest Groups',
      icon: 'users',
      link: '/interestgroups',
      color: 'mediumseagreen'
    }, {
      name: 'Create Interest Group',
      icon: 'plus',
      link: '/createinterestgroup',
      color: 'mediumseagreen'
    }, {
      name: 'Manage My Interest Groups',
      icon: 'file-alt',
      link: '/manageinterestgroups',
      color: 'mediumseagreen'
    }]
  }
]

class Dashboard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      login: this.props.match.params.login,
    }
  }

  createButton = (button) => {
    const { history } = this.props;
    const { name, icon, link, color } = button;

    return (
      <Col key={name+link} xs="4" md="2">
        <div onClick={() => history.push(link)} className="h-100 w-100 rounded d-flex align-items-center justify-content-center" style={{backgroundColor: color, maxWidth: '150px'}}>
          <div className="pt-3 pb-3">
            <div className="d-flex justify-content-center w-100 mb-2">
              <FontAwesomeIcon icon={icon} color="white" size="3x" />
            </div>
            <div className="d-flex justify-content-center w-100">
              <h4 className="text-center text-white mb-0 w-75">{name}</h4>
            </div>
          </div>
        </div>
      </Col>)
  }

  render() {
    const { login } = this.state
    const { auth, history } = this.props;

    if(!isLoaded(auth)) {
      return <p><FontAwesomeIcon icon="spinner" spin /> Loading...</p>
    } else if(isEmpty(auth) && !login) {
      history.push('/')
    }

    return(
      <Container className="mb-5">
        <Row>
          <Col>
            <h1 style={{fontWeight: 300}}>Dashboard</h1>
          </Col>
        </Row>
        {
          categories.map((category) =>
          <div key={category.name}>
              <Row>
                <Col>
                  <h2>{category.name}</h2>
                </Col>
              </Row>
              <Row className="mb-3">
                {
                  category.buttons.map((button) => this.createButton(button))
                }
              </Row>
          </div>)

        }
      </Container>
    )
  }

}

export default withRouter(compose(
  firebaseConnect(), // withFirebase can also be used
  connect(({ firebase: { auth } }) => ({ auth }))
)(Dashboard))
