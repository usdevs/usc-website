import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { logo } from '../resources/images'
import LoginModal from './LoginModal'
import { withRouter } from 'react-router-dom'
import {
  Button,
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
import { Redirect } from 'react-router'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'
var logoStyle = {
  width: '150px',
  height: '60px',
};

class SiteNavbar extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
      loginIsOpen: false,
    };
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

    const { auth, firebase, history } = this.props;
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/"><img src={logo} style={logoStyle} alt="logo" /></NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink onClick={() => history.push('/about')}>About Us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => history.push('/events')}>Events</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => history.push('/spaces')}>Spaces</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => history.push('/contactus')}>Contact Us</NavLink>
            </NavItem>
            {
              !isLoaded(auth) ? '' : !isEmpty(auth) ? <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Account
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={() => history.push('/dashboard')}>
                    Dashboard
                  </DropdownItem>
                  <DropdownItem>
                    Manage
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => firebase.logout()}>
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown> :
              <Button color="primary" onClick={this.toggleLogin.bind(this)}>Login</Button>
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
