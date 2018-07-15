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
import InterestGroupGrid from './InterestGroupGrid'
import { getUserInterestGroups } from '../../actions/GroupsActions'
import { formatFirestoreData } from '../../utils/utils'
import { withRouter } from 'react-router-dom'

class ManageInterestGroups extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentDidMount() {
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
          <Col>
            <InterestGroupGrid
              interestGroups={interestGroups}
              igTypes={igTypes} />
          </Col>
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
