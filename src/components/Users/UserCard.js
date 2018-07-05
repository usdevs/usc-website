import React, { Component } from 'react'
import { Button, Card, CardText, Container, Row, Col } from 'reactstrap';

class UserCard extends Component {
  render() {
    const { user, leader } = this.props
    const { avatarUrl, displayName, email } = user

    return(<Card body className="h-100">
      <Container className="m-0 p-0">
        <Row className="d-flex align-items-center">
          {
            avatarUrl ?
            <Col xs="3" className="pr-0">
              <img src={avatarUrl} className="rounded-circle mb-0" alt="Avatar" />
            </Col>
            : ''
          }
          <Col xs="9">
            <h3 className="mb-0"><small>{displayName}</small></h3>
            <h5 className="mb-0">{email}</h5>
            { leader ? <h5 className="mb-0" style={{color: 'dodgerblue'}}>Leader</h5> : ''}
          </Col>
        </Row>
      </Container>
    </Card>)
  }
}

export default UserCard
