import React, { Component } from 'react'
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap'

class LinkModal extends Component {
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
    const { history, title, body, primaryBtnText, secondaryBtnText, link } = this.props

    return(<Modal isOpen={isOpen} toggle={this.toggle}>
      <ModalBody>
        <h3 style={{fontWeight: 300}}>{ title }</h3>
        <p>{ body }</p>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => history.push({link})}>{ primaryBtnText }</Button>{' '}
        <Button color="secondary" onClick={this.toggle}>{ secondaryBtnText }</Button>
      </ModalFooter>
    </Modal>)
  }
}

export default LinkModal
