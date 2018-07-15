import React, { Component } from 'react'
import { Card, Container, Row, Col, Button } from 'reactstrap';
import { config } from '../../resources/config'
import { getModule } from '../../actions/ModulesActions'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'

class UserReviewCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      module: null
    }

    const { firestore, moduleReview } = props
    getModule(firestore, moduleReview.module, (snapshot) => {
      this.setState({
        module: snapshot.data()
      })
    })
  }

  render() {
    const { module } = this.state
    const { moduleReview, history } = this.props
    const { review, semester, id } = moduleReview

    return(<Card body>
      <Container className="m-0 p-0">
        <Row className="d-flex align-items-center">
          <Col xs="12">
            { module  ?
              <h3 className="text-primary mb-0">{module.name}<small className="text-muted">{' '}({module.code})</small></h3>
              : ''
            }
            <h4 className="mt-2 text-secondary">taken in {semester}</h4>
            <p className="mb-2">{_.truncate(review, { 'length': config.descriptionPreviewLength })}</p>
            <Button outline onClick={() => history.push('/editreview/'+id)}>Edit</Button>
          </Col>
        </Row>
      </Container>
    </Card>)
  }
}

export default withRouter(UserReviewCard)
