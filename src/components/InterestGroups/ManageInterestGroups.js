import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux';
import {
  Container, Row, Col,
} from 'reactstrap';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import _ from 'lodash'
import GroupCard from '../Groups/GroupCard'
import { getUserInterestGroups } from '../../actions/GroupsActions'
import { formatFirestoreData } from '../../utils/utils'
import { withRouter } from 'react-router-dom'

class ManageInterestGroups extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentWillMount() {
    const { firestore } = this.context.store
    const { auth } = this.props

    if(isLoaded(auth) && !isEmpty(auth)) {
      getUserInterestGroups(firestore, auth.uid)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { firestore } = this.context.store
    const { auth } = this.props

    if(!isLoaded(auth) && isLoaded(nextProps.auth) && !isEmpty(nextProps.auth)) {
      getUserInterestGroups(firestore, nextProps.auth.uid)
    }
  }

  displayInterestGroups = () => {
    const { firestore } = this.context.store
    const { auth, interestGroups, igTypes, firebase } = this.props

    var igs = []

    _.forOwn(interestGroups.data, (interestGroup, igID) => {
      if(interestGroup) {
        igs.push(<Col className="mb-3" xs="12" md="6" key={igID}>
          <GroupCard
            group={{
              ...interestGroup,
              id: igID
            }}
            groupTypes={igTypes}
            manageMode={auth.uid === interestGroup.leaderID}
          />
          </Col>)
      }
    })

    return igs
  }

  render() {
    const { auth, history, interestGroups, igTypes } = this.props

    if(isLoaded(auth) && isEmpty(auth)) {
      history.push('/')
    }

    return(<Container>
      <Row>
        <Col>
          <h1 style={{fontWeight: 300}}>Manage Interest Groups</h1>
        </Col>
      </Row>
      <Row>
          {
            interestGroups.isLoaded && igTypes.isLoaded ?
              _.keys(interestGroups).length > 0 ?
                this.displayInterestGroups()
              : <Col><h3><FontAwesomeIcon icon="frown" /> No Interest Groups match your criteria </h3></Col>
            : <Col><h4><FontAwesomeIcon icon="spinner" spin /> Loading Interest Groups...</h4></Col>
          }
      </Row>
    </Container>)
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    interestGroups: formatFirestoreData(state.firestore, 'userInterestGroups'),
    igTypes: formatFirestoreData(state.firestore, 'igTypes'),
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(ManageInterestGroups))
