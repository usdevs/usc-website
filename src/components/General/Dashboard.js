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
}, {
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
}, {
  name: 'Add International Programme',
  icon: 'plus',
  link: '/createintlprog',
  color: 'steelblue'
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
    name: 'USC',
    buttons: [{
      name: 'MC Minutes & AGM Report',
      icon: 'file-alt',
      link: 'https://orgsync.com/134647/files/1302496',
      color: 'dodgerblue'
    }, {
      name: 'USC Constitution',
      icon: 'file-alt',
      link: 'https://orgsync.com/134647/files/1559870',
      color: 'dodgerblue'
    }, {
      name: 'USC + USP Logos',
      icon: 'file-alt',
      link: 'https://orgsync.com/134647/files/1066978',
      color: 'dodgerblue'
    }, {
      name: 'Logistics List',
      icon: 'box-open',
      link: 'http://gg.gg/USPlogs',
      color: 'dodgerblue'
    },{
      name: 'Welfare Pack Survey Results',
      icon: 'comment',
      link: 'https://orgsync.com/134647/files/1485601',
      color: 'dodgerblue'
    }]
  }, {
      name: 'Useful Links',
      buttons: [{
        name: 'Cinna Bot',
        icon: 'robot',
        link: 'http://t.me/cinnabot',
        color: 'darkorange'
      }, {
        name: 'USP Module Timetable',
        icon: 'chalkboard-teacher',
        link: 'http://www.usp.nus.edu.sg/curriculum/module-timetable',
        color: 'darkorange'
      }, {
        name: 'Dining Credit System',
        icon: 'utensils',
        link: 'http://gg.gg/hungrycinnamon',
        color: 'darkorange'
      }, {
        name: 'Room Fault Reporting',
        icon: 'wrench',
        link: 'http://gg.gg/faultycinnamon',
        color: 'darkorange'
      },{
        name: 'Site Feedback',
        icon: 'globe',
        link: '/feedback',
        color: 'darkorange'
      }]
    }, {
      name: 'Communication Channels',
      buttons: [{
        name: 'USChannel on Telegram',
        icon: ['fab', 'telegram'],
        link: 'http://t.me/USPChannel',
        color: 'steelblue'
      }, {
        name: 'USP Life on Facebook',
        icon: ['fab', 'facebook'],
        link: 'http://fb.com/groups/usplife',
        color: 'steelblue'
      }, {
        name: 'USP Group on LinkedIn',
        icon: ['fab', 'linkedin'],
        link: 'http://gg.gg/usplinkedin',
        color: 'steelblue'
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
    }, {
      name: 'Groups',
      buttons: [{
        name: 'See All Groups',
        icon: 'users',
        link: '/groups',
        color: 'mediumseagreen'
      }, {
        name: 'Create Interest Group',
        icon: 'plus',
        link: '/createinterestgroup',
        color: 'mediumseagreen'
      }, {
        name: 'Create Circle',
        icon: 'plus',
        link: '/createcircle',
        color: 'mediumseagreen'
      }, {
        name: 'Manage My Groups',
        icon: 'users',
        link: '/managegroups',
        color: 'mediumseagreen'
      }]
    },
  /*  {
      name: 'International Programmes',
      buttons: [{
        name: 'See All International Programmes',
        icon: 'globe',
        link: '/intlprogs',
        color: 'steelblue'
      }, {
        name: 'Add International Programme Review',
        icon: 'plus',
        link: '/createintlprogreview',
        color: 'steelblue'
      }]
    }*/
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
      {
        link.startsWith("http") ?
          <a href={link}>
            <div className="h-100 w-100 rounded d-flex align-items-center justify-content-center" style={{backgroundColor: color, maxWidth: '150px'}}>
              <div className="pt-3 pb-3">
                <div className="d-flex justify-content-center w-100 mb-2">
                  <FontAwesomeIcon icon={icon} color="white" size="3x" />
                </div>
                <div className="d-flex justify-content-center w-100">
                  <h4 className="text-center text-white mb-0 w-75">{name}</h4>
                </div>
              </div>
            </div>
          </a>
        :
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
      }

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
