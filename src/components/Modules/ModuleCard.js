import React, { Component } from 'react'
import { Button, Card, CardText, Container, Row, Col } from 'reactstrap';
import { config } from '../../resources/config'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'

class ModuleCard extends Component {
  render() {
    const { module, history, hideButtons, hasShortDescription } = this.props
    const { name, code, description, prof, id } = module

    return(<Card body>
      <Container className="m-0 p-0">
        <Row className="d-flex align-items-center">
          <Col xs="12">
            <h3 className="mb-0">{name}{' '}<small>({code})</small></h3>
            <h5 className="mb-0">by {prof}</h5>
            <p>{ _.truncate(description, { 'length': hasShortDescription ? config.descriptionPreviewLength : config.descriptionPreviewLength / 2 }) }</p>
            { hideButtons ? '' : <Button onClick={() => history.push('/module/' + id)}>View</Button>} 
          </Col>
        </Row>
      </Container>
    </Card>)
  }
}

export default withRouter(ModuleCard)
