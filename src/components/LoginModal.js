import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';

class LoginModal extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className={this.props.className}>
        <ModalHeader toggle={this.props.toggle}>Log In</ModalHeader>
        <ModalBody>
          <Button color="primary" onClick={this.props.toggle}>Log In</Button>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={this.props.toggle}>Close</Button>
        </ModalFooter>
      </Modal>)
  }
}

export default LoginModal
