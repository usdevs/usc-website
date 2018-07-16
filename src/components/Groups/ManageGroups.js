import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux';
import {
  Container, Row, Col,
} from 'reactstrap';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import GroupGrid from '../Groups/GroupGrid'
import { getUserGroups } from '../../actions/GroupsActions'
import { formatFirestoreData } from '../../utils/utils'
import { withRouter } from 'react-router-dom'

class ManageGroups extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { firestore } = this.context.store
    const { auth } = this.props

    if(isLoaded(auth) && !isEmpty(auth)) {
      getUserGroups(firestore, auth.uid)
    }
  }

  componentWillReceiveProps(nextProps) {
    const { firestore } = this.context.store
    const { auth } = this.props

    if(!isLoaded(auth) && isLoaded(nextProps.auth) && !isEmpty(nextProps.auth)) {
      getUserGroups(firestore, nextProps.auth.uid)
    }
  }

  render() {
    const { auth, history, groups, groupTypes } = this.props

    if(isLoaded(auth) && isEmpty(auth)) {
      history.push('/')
    }

    return(<Container>
      <Row>
        <Col>
          <h1 style={{fontWeight: 300}}>Manage Groups</h1>
        </Col>
      </Row>
      <Row>
          <Col>
            <GroupGrid
              groups={groups}
              groupTypes={groupTypes} />
          </Col>
      </Row>
    </Container>)
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    groups: formatFirestoreData(state.firestore, 'userGroups'),
    groupTypes: formatFirestoreData(state.firestore, 'groupTypes'),
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(ManageGroups))
