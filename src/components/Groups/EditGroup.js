import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Container, Row, Col, Button } from 'reactstrap'
import GroupForm from './GroupForm'
import DeleteModal from '../reusable/DeleteModal'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import _ from 'lodash'
import { getGroup, updateGroup, deleteGroup } from '../../actions/GroupsActions'
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import ability from '../../utils/ability'
import { withRouter } from 'react-router-dom'

class EditGroup extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  deleteModal = null

  constructor(props) {
    super(props)

    this.state = {
      group: null
    }
  }

  componentDidMount() {
    const { firestore } = this.context.store
    const { groupID } = this.props.match.params
    const { history, auth } = this.props

    getGroup(firestore, groupID, (snapshot) => {
      if (!snapshot.exists) {
        history.push('/managegroups')
      } else {
        var group = snapshot.data()

        if((isLoaded(auth) && group.leaderID === auth.uid) || ability.can('manage', 'group')) {
          var members = [group.leaderID]
          members.concat(_.keys(group.members))

          group = {
            ...group,
            id: groupID,
            members: members,
            noOfMembers: members.length
          }
          this.setState({ group: group })
        } else {
          history.push('/managegroups')
        }
      }
    })
  }

  updateGroup = (group, callback) => {
    const { firebase } = this.props
    const { firestore } = this.context.store
    const originalGroup = this.state.group

    updateGroup(firestore, firebase, group, originalGroup, (group) => {
      callback(false)
    })
  }

  deleteGroup = () => {
    const { group } = this.state
    const { firebase, history } = this.props
    const { firestore } = this.context.store

    deleteGroup(firestore, firebase, group, () => history.push('/managegroups'))
  }

  render() {
    const { group } = this.state
    const { history } = this.props

    return (<Container>
      <DeleteModal ref={element => { this.deleteModal = element }} onDelete={() => this.deleteGroup()} />
      <Row>
        <Col>
          <div className="d-flex">
            <h1 className="display-3">Edit Group</h1>
          </div>
        </Col>
      </Row>
      <Row>
        {
          group ? <Col>
            <GroupForm
              submit={this.updateGroup}
              initialValues={group}
              history={history}
              btnText="Update Group"
              modal={{
                title: 'Details Updated!',
                body: 'Your Group has been updated!',
                primaryBtnText: 'Manage Groups',
                secondaryBtnText: 'Dismiss',
                onSubmit: () => history.push('/managegroups')
              }}/>
            <div className="d-flex justify-content-center">
              <Button className="w-75" color="danger" onClick={() => this.deleteModal.toggle()} block disabled={!window.gapi.client}>
                { !window.gapi.client ? <FontAwesomeIcon icon="spinner" spin /> : '' } <FontAwesomeIcon icon="trash-alt" />{' '}Delete Group
              </Button>
            </div>
            <div className="d-flex justify-content-center">
              <Button className="w-75 mt-3" color="secondary" onClick={() => history.push('/managegroups')} outline block>
                Back to Manage Groups
              </Button>
            </div>
          </Col>
          : <Col><h4><FontAwesomeIcon icon="spinner" spin /> Loading...</h4></Col>
        }
      </Row>
    </Container>)
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(EditGroup))
