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
import { getInterestGroups } from '../../actions/GroupsActions'
import { formatFirestoreData } from '../../utils/utils'
import { withRouter } from 'react-router-dom'

class InterestGroupAdmin extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { firestore } = this.context.store
    const { auth } = this.props

    getInterestGroups(firestore)
  }

  render() {
    const { auth, history, interestGroups, igTypes } = this.props

    if(isLoaded(auth) && isEmpty(auth)) {
      history.push('/')
    }

    return(<Container>
      <Row>
        <Col>
          <h1 style={{fontWeight: 300}}>Interest Groups Admin</h1>
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
    interestGroups: formatFirestoreData(state.firestore, 'interestGroups'),
    igTypes: formatFirestoreData(state.firestore, 'igTypes'),
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(InterestGroupAdmin))
