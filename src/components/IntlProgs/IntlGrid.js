import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import IntlCard from './IntlCard'

class IntlGrid extends Component {
  render() {
    return (
      <Container>
        <Row>
          <IntlCard />
        </Row>
      </Container>
    )
  }
}

export default IntlGrid
