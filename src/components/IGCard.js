import React, { Component } from 'react'
import { Button, Card, CardText, Container, Row, Col } from 'reactstrap';
import { getUserProfile, getFile } from '../utils/actions'
import { config } from '../resources/config'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import _ from 'lodash'

class IGCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      logo: null,
    }

    const { interestGroup, firebase } = props
    const { logo } = interestGroup

    if(logo) {
      getFile(firebase, logo, (url) => {

        this.setState({
          logo: url,
        })
      })
    }
  }

  componentWillMount() {
    const { firestore, interestGroup } = this.props
    const { leader } = this.props

    getUserProfile(firestore, leader)
  }

  render() {
    const { logo } = this.state
    const { interestGroup, igTypes, userProfiles } = this.props
    const { name, type, description, activities } = interestGroup

    return(<Card body className="h-100">
      <Container className="m-0 p-0">
        <Row className="d-flex align-items-center">
          {
            logo ?
            <Col xs="3" className="pr-0">
              <img src={logo} className="mb-0" alt="Avatar" />
            </Col>
            : ''
          }
          <Col xs="9">
            <h3 className="mb-0"><small>{name}</small></h3>
            <h5 className="mb-0">{igTypes[type].subName}</h5>
            <p className="mb-2">
              { _.truncate(description, { 'length': config.descriptionPreviewLength }) }
            </p>
          </Col>
        </Row>
      </Container>
    </Card>)
  }
}

export default IGCard
