import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import IntlGrid from './IntlGrid'

class IntlProgs extends Component {
  render() {
    return(<Container>
      <Row>
        <Col><h1 style={{fontWeight: 300}} className="mt-3">International Programmes</h1></Col>
      </Row>
      <Row>
        <Col>
          <IntlGrid />
        </Col>
      </Row>
    </Container>)
  }
}

export default IntlProgs
