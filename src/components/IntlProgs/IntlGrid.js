import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import IntlCard from './IntlCard'
import _ from 'lodash'

class IntlGrid extends Component {
  displayIntlProgs = () => {
    const { intlProgs } = this.props

    const intlProgCards = []

    _.forEach(intlProgs.ordered, (intlProg) => {
      intlProgCards.push(
        <Col xs="12" md="4" className="mb-3" key={intlProg.id}>
          <IntlCard intlProg={intlProg} />
        </Col>)
    })

    return intlProgCards
  }

  render() {
    const { intlProgs } = this.props
    return (
      <Container>
        <Row>
          {
            intlProgs.isLoaded ?
              this.displayIntlProgs()
            : <Col><h4><FontAwesomeIcon icon="spinner" spin /> Loading International Programmes...</h4></Col>
          }
        </Row>
      </Container>
    )
  }
}

export default IntlGrid
