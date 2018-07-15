import React, { Component } from 'react';
import {  Alert, Container, Row, Col } from 'reactstrap';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import Can from '../../utils/Can'
import { headerDashboard as header } from '../../resources/images.js'

const adminCategories = [{
  name: 'Events Admin Panel',
  icon: 'calendar-alt',
  link: '/eventsadmin',
  color: 'tomato'
}, {
  name: 'Add Group',
  icon: 'plus',
  link: '/creategroup',
  color: 'steelblue'
},{
  name: 'Group Admin Panel',
  icon: 'users',
  link: '/groupadmin',
  color: 'steelblue'
}, {
  name: 'Modules Admin Panel',
  icon: 'chalkboard-teacher',
  link: '/modulesadmin',
  color: 'sandybrown'
}, {
  name: 'Users Admin Panel',
  icon: 'chalkboard-teacher',
  link: '/useradmin',
  color: 'sandybrown'
}]

const categories = [
/*  {
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
  },*/
    {
      name: 'General',
      buttons: [{
        name: 'Feed-back',
        icon: 'comment',
        link: '/feedback',
        color: 'mediumseagreen'
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
      name: 'Groups',
      buttons: [{
        name: 'See All Groups',
        icon: 'users',
        link: '/groups',
        color: 'steelblue'
      }, {
        name: 'Create Interest Group',
        icon: 'plus',
        link: '/createinterestgroup',
        color: 'steelblue'
      }, {
        name: 'Manage My Groups',
        icon: 'users',
        link: '/managegroups',
        color: 'steelblue'
      }]
    }
/*  , {
    name: 'Modules',
    buttons: [{
      name: 'See All Modules',
      icon: 'chalkboard-teacher',
      link: '/modules',
      color: 'sandybrown'
    }, {
      name: 'Add Review',
      icon: 'plus',
      link: '/addreview',
      color: 'sandybrown'
    }, {
      name: 'Manage Your Reviews',
      icon: 'file-alt',
      link: '/managereviews',
      color: 'sandybrown'
    }]
  }*/
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
    const { auth, history, myProfile } = this.props;

    if(!isLoaded(auth)) {
      return <p><FontAwesomeIcon icon="spinner" spin /> Loading...</p>
    } else if(isEmpty(auth) && !login) {
      history.push('/')
    }

    return(
      <Container className="mb-5">
        <Row>
          <Col>
            <img src={header} className="img-fluid" alt="header" />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 style={{fontWeight: 300}}>Dashboard</h1>
            {
              myProfile && !myProfile.telegram ?
                <Alert color="primary">
                  Please add your <FontAwesomeIcon icon={['fab', 'telegram']} /> Telegram handle in <a onClick={()=>history.push('/settings')} className="alert-link">Settings!</a>
                </Alert>
              : ''
            }
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
        <Can I="manage" a="Admin">
          <div>
            <Row>
              <Col>
                <h2>Admin Functions</h2>
              </Col>
            </Row>
            <Row>
            {
              adminCategories.map((button) => this.createButton(button))
            }
            </Row>
          </div>
        </Can>
      </Container>
    )
  }

}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    myProfile: state.firestore.data.myProfile
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(Dashboard))
