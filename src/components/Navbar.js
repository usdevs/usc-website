import React, { Component } from 'react';
import { logo } from '../resources/images'
import LoginModal from './LoginModal'
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
    console.log(this.state.loginIsOpen)
    this.setState({
      loginIsOpen: !this.state.loginIsOpen
    });
  }

  render() {
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/"><img src={logo} style={logoStyle} alt="logo" /></NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink href="/about/">About Us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/events/">Events</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/spaces/">Spaces</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/contactus/">Contact Us</NavLink>
            </NavItem>
            {
              false ? <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Account
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Manage
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
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

export default SiteNavbar;
