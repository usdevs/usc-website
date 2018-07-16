import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux';
import {
  Container, Row, Col,
} from 'reactstrap';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import GroupGrid from '../Groups/GroupGrid'
import { getGroups } from '../../actions/GroupsActions'
import { formatFirestoreData } from '../../utils/utils'
import { withRouter } from 'react-router-dom'

class GroupAdmin extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { firestore } = this.context.store

    getGroups(firestore)
  }

  render() {
    const { auth, history, groups, groupTypes } = this.props

    if(isLoaded(auth) && isEmpty(auth)) {
      history.push('/')
    }

    return(<Container>
      <Row>
        <Col>
          <h1 style={{fontWeight: 300}}>Groups Admin</h1>
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
    groups: formatFirestoreData(state.firestore, 'groups'),
    groupTypes: formatFirestoreData(state.firestore, 'groupTypes'),
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(GroupAdmin))
