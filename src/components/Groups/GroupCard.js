import React, { Component } from 'react'
import { compose } from 'redux'
import { Badge, Button, Card, Container, Row, Col } from 'reactstrap';
import { getFile } from '../../actions/FilesActions'
import { config } from '../../resources/config'
import _ from 'lodash'
import { withRouter } from 'react-router-dom'
import { firebaseConnect } from 'react-redux-firebase';
import { groupStatuses } from '../../resources/config'
import ability from '../../utils/ability'


class GroupCard extends Component {
  mounted = false

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

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  componentWillReceiveProps(newProps) {
    if (this.props.group.logo !== newProps.group.logo) {
      this.loadLogo(newProps.group.logo)
    }
  }

  loadLogo = (logo) => {
    const { firebase } = this.props

    getFile(firebase, logo, (url) => {
      if(this.mounted) {
        this.setState({
          logo: url,
        })
      }
    })
  }

  render() {
    const { logo, fullDescription } = this.state
    const { group, groupTypes, firebase, history, hideButtons, manageMode } = this.props
    const { id, name, type, description, leaderID } = group

    const isLeader = firebase.auth ? leaderID === firebase.auth.uid : false

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
            <h5 className="mb-0">{groupTypes.data[type].subName}</h5>
            {
              manageMode ?
                <h4 className="mb-2"><Badge color={groupStatuses[group.status].colour}>{_.capitalize(group.status)}</Badge></h4>
              : ''
            }
            <p className="mb-2">{ fullDescription ? description : _.truncate(description, { 'length': config.descriptionPreviewLength }) }
              {
                config.descriptionPreviewLength < description.length ?
                  <Button onClick={() => this.setState({fullDescription: !fullDescription})} className="d-inline m-0 p-0" color="link">{ fullDescription ? 'See Less' : 'See More' }</Button>
                : ''
              }
            </p>
            {
              !hideButtons ?
                <Button color="primary" onClick={() => history.push('/group/'+id)}>Details</Button>
              : ''
            }
            { manageMode && !hideButtons && (isLeader || ability.can('manage', 'group')) ?
                <Button outline color="info" className="ml-3" onClick={() => history.push('/editgroup/'+id)}>Edit</Button>
              : ''}
          </Col>
        </Row>
      </Container>
    </Card>)
  }
}

export default withRouter(compose(
  firebaseConnect()
)(GroupCard))
