import React, { Component } from 'react'
import { Button, Card, Container, Row, Col } from 'reactstrap';
import { config } from '../../resources/config'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'

class ModuleCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      fullDescription: false
    }
  }

  render() {
    const { fullDescription } = this.state
    const { module, history, hideButtons, hasShortDescription } = this.props
    const { name, code, description, prof, id, type } = module

    //Yes, i was too lazy to query the DB
    const isUSP = type === "5Ac0UEQRf2RwuZOOiP3d" || type === "Dgpuub6ek5271K5qckq6" || type === "vXT67zuF2DBLHpwu8MOM"

    return(<Card body>
      <Container className="m-0 p-0">
        <Row className="d-flex align-items-center">
          <Col xs="12">
            <h3 className="mb-0">{name}{' '}<small>({code})</small></h3>
            { prof ? <h5 className="mb-0">by {prof}</h5> : ''}
            <p>{ fullDescription ? description : _.truncate(description, { 'length': hasShortDescription ? config.descriptionPreviewLength : config.descriptionPreviewLength / 2 }) }
              <Button onClick={() => this.setState({fullDescription: !fullDescription})} className="d-inline m-0 p-0" color="link">{ fullDescription ? 'See Less' : 'See More' }</Button>
            </p>
            { hideButtons ? '' : <Button color="primary" onClick={() => history.push('/module/' + id)}>View</Button>}
            { hideButtons ? '' : <a href={(isUSP ? 'http://www.usp.nus.edu.sg/curriculum/module-timetable/' : 'https://nusmods.com/modules/') + code}><Button color="secondary" className="ml-2">View on { isUSP ? 'USP Website' : 'NUS Mods'}</Button></a>}
          </Col>
        </Row>
      </Container>
    </Card>)
  }
}

export default withRouter(ModuleCard)
