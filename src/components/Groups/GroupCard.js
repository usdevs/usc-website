import React, { Component } from 'react'
import { Button, Card, Container, Row, Col } from 'reactstrap';
import { getFile } from '../../utils/actions'
import { config } from '../../resources/config'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import { statusColor } from '../../resources/config'

class GroupCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      logo: null,
    }

    const { logo } = props.group

    if (logo) {
      this.loadLogo(logo)
    }
  }

  componentWillReceiveProps(newProps) {
    if (this.props.group.logo !== newProps.group.logo) {
      this.loadLogo(newProps.group.logo)
    }
  }

  loadLogo = (logo) => {
    const { firebase } = this.props

    getFile(firebase, logo, (url) => {
      this.setState({
        logo: url,
      })
    })
  }

  render() {
    const { logo } = this.state
    const { group, groupTypes, firebase, history, hideButtons, manageMode } = this.props
    const { id, name, type, description, leader } = group

    const isLeader = firebase.auth ? leader === firebase.auth.uid : false
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
            <h5 className="mb-0">{groupTypes[type].subName}</h5>
            {
              manageMode ?
                <div className="d-flex align-items-left"><h5 className={"p-1 mb-2 mt-2 align-middle border rounded border-" + statusColor[group.status] +"  text-" + statusColor[group.status]}>Status: {_.capitalize(group.status)}</h5></div>
              : ''
            }
            { isLeader && manageMode ? <h5 className="mb-0" style={{color: 'dodgerblue'}}>You are the leader</h5> : ''}
            <p className="mb-2">
              { _.truncate(description, { 'length': config.descriptionPreviewLength }) }
            </p>
            {
              !hideButtons ?
                <Button color="primary" onClick={() => history.push('/group/'+id)}>Details</Button>
              : ''
            }
            { isLeader && manageMode && !hideButtons ? <Button outline color="info" className="ml-3" onClick={() => history.push('/editinterestgroup/'+id)}>Edit</Button> : ''}
          </Col>
        </Row>
      </Container>
    </Card>)
  }
}

export default withRouter(GroupCard)
