import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Badge, Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
  UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
import { signOut } from '../../actions/UsersActions'
import { logo } from '../../resources/images'
import { getMyProfile, getUserType } from '../../actions/UsersActions'
import { getGroups } from '../../actions/GroupsActions'
import { getFile } from '../../actions/FilesActions'
import { formatFirestoreData } from '../../utils/utils'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import LoginModal from './LoginModal'
import ability from '../../utils/ability'
import _ from 'lodash'

var logoStyle = {
  width: '150px',
  height: '60px',
};

class SiteNavbar extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  loadProfile = false

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      loginIsOpen: false,
    };
  }

  componentDidMount() {
    const { groups } = this.props
    const { firestore } = this.context.store

    if(!groups.isLoaded) {
      getGroups(firestore)
    }
  }

  componentWillReceiveProps(newProps) {
    const { firestore } = this.context.store
    const { auth, myProfile, firebase } = newProps

    if (isLoaded(auth) && !isEmpty(auth) && !myProfile.isLoaded && !this.loadProfile) {
      this.loadProfile = true

      getMyProfile(firestore, auth, (snapshot) => {
        var profile = snapshot.data()
        var avatarUrl = null

        this.setAvatarUrl(profile.avatarUrl)

        getUserType(firestore, profile.type, (snapshot) => {
          var permissions = snapshot.data().permissions

          ability.update(permissions)
        } ,'myUserType')

        this.loadProfile = false
      })
    }

    if (this.props.myProfile.isLoaded && myProfile.isLoaded
      && this.props.myProfile.data.avatarUrl !== myProfile.data.avatarUrl) {
      this.setAvatarUrl(myProfile.data.avatarUrl)
    }
  }

  setAvatarUrl = (avatarUrl) => {
    if(avatarUrl.startsWith('http')) {
      this.setState({
        avatarUrl: avatarUrl,
      })
    } else {
      const { firebase } = this.props

      getFile(firebase, avatarUrl, (url) => {
        this.setState({
          avatarUrl: url,
        })
      })
    }
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

  navbarItems = [{
    display: 'About Us',
    link: '/about'
  }, {
    display: 'Events',
    link: '/events'
  }, {
    display: 'Spaces',
    link: '/spaces'
  }, {
    display: 'Groups',
    link: '/groups'
  }, {
    display: 'Contact Us',
    link: '/contactus'
  }]

  showNavbarItems = () => {
    const { isOpen, avatarUrl } = this.state
    const { auth, firebase, history, myProfile } = this.props;

    const signedIn = isLoaded(auth) && !isEmpty(auth)

    var items = []

    _.forEach(this.navbarItems, (item) => {
      items.push(<NavItem key={item.link}>
        <NavLink onClick={() => {
          if(isOpen) {
            this.toggle()
          }
          history.push(item.link)
        }}>{item.display}</NavLink>
      </NavItem>)
    })

    if (signedIn) {
      items.push(<NavItem key='/dashboard'>
        <NavLink onClick={() => {
          if(isOpen) {
            this.toggle()
          }
          history.push('/dashboard')
        }} className="border border-primary rounded text-primary" style={{fontWeight: 500}}><FontAwesomeIcon icon="columns" />{ ' ' }Dashboard</NavLink>
      </NavItem>)
    }

    if(!isLoaded(auth) || (signedIn && !myProfile.isLoaded)) {
      items.push(<div key='loading' className="d-flex align-items-center"><FontAwesomeIcon icon="spinner" spin /></div>)
    } else if (!signedIn) {
      items.push(
        <NavItem key='login'>
          <NavLink onClick={this.toggleLogin.bind(this)} className="border border-primary rounded text-primary" style={{fontWeight: 500}}><FontAwesomeIcon icon="sign-in-alt" />{ ' ' } Log In</NavLink>
        </NavItem>)
    } else {
      items.push(
        <UncontrolledDropdown nav inNavbar key='userSettings'>
          <DropdownToggle nav caret className="text-primary">
            <h4 className="d-inline" style={{fontWeight: 500}}>
              { myProfile.data.displayName }
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
              signOut(firebase, ()=>{
                history.push('/')
              })
            }}>
              <FontAwesomeIcon icon="sign-out-alt" />{ ' ' } Log Out
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>)
    }

    return items
  }

  render() {
    const { isOpen } = this.state
    const { history } = this.props

    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand onClick={() => {
          if(isOpen) {
            this.toggle()
          }
          history.push('/')
        }}>
          <img src={logo} style={logoStyle} alt="logo" />
          <Badge color="primary">Beta</Badge>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            { this.showNavbarItems() }
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
    myProfile: formatFirestoreData(state.firestore, 'myProfile'),
    groups: formatFirestoreData(state.firestore, 'groups'),
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
