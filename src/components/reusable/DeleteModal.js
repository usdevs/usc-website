import React, { Component } from 'react'
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

class DeleteModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false
    }
  }

  toggle = () => {
    const { isOpen } = this.state

    this.setState({
      isOpen: !isOpen
    })
  }

  render() {
    const { isOpen } = this.state
    const { onDelete } = this.props

    return(<Modal isOpen={isOpen} toggle={this.toggle}>
      <ModalBody>
        <h3 style={{fontWeight: 300}}>Are You Sure?</h3>
        <p>You will delete this item forever! This action is irreversible.</p>
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={() => onDelete()}><FontAwesomeIcon icon="trash-alt" />{' '} Confirm Deletion</Button>{' '}
        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
      </ModalFooter>
    </Modal>)
  }
}

export default DeleteModal
