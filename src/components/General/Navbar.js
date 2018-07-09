import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { signOut } from '../../utils/actions'
import { logo } from '../../resources/images'
import { getMyProfile, getFile } from '../../utils/actions'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import LoginModal from './LoginModal'

var logoStyle = {
  width: '150px',
  height: '60px',
};

class SiteNavbar extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      loginIsOpen: false,
      profile: null,
    };
  }

  componentWillMount() {
    const { auth } = this.props

    if(isLoaded(auth) && !isEmpty(auth)) {
      this.getProfile(auth)
    }
  }

  componentWillReceiveProps(newProps) {
    console.log(newProps)

    if (newProps.auth && newProps.auth.uid && newProps.myProfile && newProps.myProfile) {
      console.log("test")
      this.setUpProfile(newProps.myProfile, newProps.auth.uid)
    } else if (!isLoaded(this.props.auth) && isLoaded(newProps.auth)) {
      if(!isEmpty(newProps.auth)) {
        this.getProfile(newProps.auth)
      } else {
        this.props.history.push('/')
      }
    }
  }

  getProfile = (auth) => {
    const { firestore } = this.context.store

    getMyProfile(firestore, auth, (snapshot) => {
      var profile = snapshot.data()

      this.setUpProfile(profile, auth)
    })
  }

  setUpProfile = (profile, auth) => {
    var avatarUrl = null
    if(profile.avatarUrl.startsWith('http')) {
      avatarUrl = profile.avatarUrl
    } else {
      const { firebase } = this.props

      getFile(firebase, profile.avatarUrl, (url) => {
        this.setState({
          avatarUrl: url,
        })
      })
    }

    this.setState({
      avatarUrl: avatarUrl,
      profile: {
        ...profile,
        id: auth.uid
      }
    })
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleLogin() {
    this.setState({
      loginIsOpen: !this.state.loginIsOpen
    });
  }

  render() {
    const { isOpen, profile, avatarUrl } = this.state
    const { auth, firebase, history } = this.props;
    const signedIn = isLoaded(auth) && !isEmpty(auth)

    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/"><img src={logo} style={logoStyle} alt="logo" /></NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink onClick={() => {
                if(isOpen) {
                  this.toggle()
                }
                history.push('/about')
              }}>About Us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => {
                if(isOpen) {
                  this.toggle()
                }
                history.push('/events')
              }}>Events</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => {
                if(isOpen) {
                  this.toggle()
                }
                history.push('/spaces')
              }}>Spaces</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => {
                if(isOpen) {
                  this.toggle()
                }
                history.push('/interestgroups')
              }}>Interest Groups</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => {
                if(isOpen) {
                  this.toggle()
                }
                history.push('/contactus')
              }}>Contact Us</NavLink>
            </NavItem>
            {
              signedIn ?
              <NavItem>
                <NavLink onClick={() => {
                  if(isOpen) {
                    this.toggle()
                  }
                  history.push('/dashboard')
                }} className="border border-primary rounded text-primary" style={{fontWeight: 500}}><FontAwesomeIcon icon="columns" />{ ' ' }Dashboard</NavLink>
              </NavItem> : ''
            }
            {
              !isLoaded(auth) ?
                <div className="d-flex align-items-center"><FontAwesomeIcon icon="spinner" spin /></div>
              : signedIn ?
                !profile ? <div className="d-flex align-items-center"><FontAwesomeIcon icon="spinner" spin /></div> :
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret className="text-primary">
                    <h4 className="d-inline" style={{fontWeight: 500}}>
                      { profile.displayName }
                      { avatarUrl ? <img src={avatarUrl} className="rounded-circle mb-0 ml-2" alt="Avatar" style={{maxHeight: "30px"}} /> : '' }
                    </h4>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem onClick={() => {
                      if(isOpen) {
                        this.toggle()
                      }
                      history.push('/settings')
                    }}>
                      <FontAwesomeIcon icon="toolbox" />{ ' ' } Settings
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem onClick={() => {
                      if(isOpen) {
                        this.toggle()
                      }
                      signOut(firebase, ()=>{})
                    }}>
                      <FontAwesomeIcon icon="sign-out-alt" />{ ' ' } Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
                :
                <NavItem>
                  <NavLink onClick={this.toggleLogin.bind(this)} className="border border-primary rounded text-primary" style={{fontWeight: 500}}><FontAwesomeIcon icon="sign-in-alt" />{ ' ' } Log In</NavLink>
                </NavItem>
            }

          </Nav>
        </Collapse>
        <LoginModal isOpen={this.state.loginIsOpen} toggle={this.toggleLogin.bind(this)} />
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    myProfile: state.firestore.data.myProfile
  }
}

SiteNavbar.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired
  }),
  auth: PropTypes.object
}

export default withRouter(compose(
  firebaseConnect(), // withFirebase can also be used
  connect(mapStateToProps)
)(SiteNavbar))
