import React, { Component } from 'react'
import { compose } from 'redux'
import { Card, Container, Row, Col } from 'reactstrap';
import { firebaseConnect } from 'react-redux-firebase';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { getFile } from '../../actions/FilesActions'

class UserCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      avatar: null
    }
  }

  componentDidMount() {
    this.loadAvatar(this.props.user)
  }

  componentWillUnmount() {
    this.setState({
      avatar: null
    })
  }

  componentWillReceiveProps(newProps) {
    if (this.props.user.email !== newProps.user.email) {
      this.loadAvatar(newProps.user)
    }
  }

  loadAvatar = (user) => {
    const { avatarUrl } = user

    if(avatarUrl.startsWith('http')) {
      this.setState({
        avatar: avatarUrl
      })
    } else {
      const { firebase } = this.props

      getFile(firebase, avatarUrl, (url) => {
        this.setState({
          avatar: url
        })
      })
    }

  }

  render() {
    const { avatar } = this.state
    const { user, leader, hideContact } = this.props
    const { displayName, email, telegram } = user

    return(<Card body>
      <Container className="m-0 p-0">
        <Row className="d-flex align-items-center">
          {
            avatar ?
            <Col xs="3" className="pr-0">
              <img src={avatar} className="rounded-circle mb-0" alt="Avatar" />
            </Col>
            : ''
          }
          <Col xs="9">
            <h3 className="mb-0"><small>{displayName}</small></h3>
            { !hideContact ? <h4 className="mb-0">{email}</h4> : '' }
            { !hideContact && telegram ? <h4 className="mb-0 text-primary" style={{fontWeight: 300}}><FontAwesomeIcon icon={['fab', 'telegram']} className="mr-2" />@{telegram}</h4> : '' }
            { leader ? <h5 className="mb-0 text-info">Leader</h5> : ''}
          </Col>
        </Row>
      </Container>
    </Card>)
  }
}

export default compose(
  firebaseConnect()
)(UserCard)
