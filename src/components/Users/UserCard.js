import React, { Component } from 'react'
import { compose } from 'redux'
import { Card, Container, Row, Col } from 'reactstrap';
import { firebaseConnect } from 'react-redux-firebase';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { getFile } from '../../utils/actions'

class UserCard extends Component {
  constructor(props) {
    super(props)

    var avatar = null
    const { avatarUrl } = props.user

    if(avatarUrl.startsWith('http')) {
      avatar = avatarUrl
    } else {
      const { firebase } = this.props

      getFile(firebase, avatar, (url) => {
        this.setState({
          avatar: url,
        })
      })
    }

    this.state = {
      avatar: avatar,
    }
  }

  render() {
    const { avatar } = this.state
    const { user, leader, hideContact } = this.props
    const { displayName, email, telegram } = user

    console.log(telegram)

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
