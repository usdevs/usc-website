import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { Container, Row, Col, Button } from 'reactstrap'
import InterestGroupForm from './InterestGroupForm'
import DeleteModal from '../reusable/DeleteModal'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import _ from 'lodash'
import { getInterestGroup, updateInterestGroup, deleteGroup } from '../../actions/GroupsActions'
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom'

class CreateInterestGroup extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  deleteModal = null

  constructor(props) {
    super(props)

    this.state = {
      interestGroup: null
    }
  }

  componentDidMount() {
    const { firestore } = this.context.store
    const { igID } = this.props.match.params
    const { history, auth } = this.props

    getInterestGroup(firestore, igID, (snapshot) => {
      if (!snapshot.exists) {
        history.push('/manageinterestgroups')
      } else {
        var interestGroup = snapshot.data()

        if(isLoaded(auth) && interestGroup.leaderID === auth.uid) {
          var members = [interestGroup.leaderID]
          members.concat(_.keys(interestGroup.members))

          interestGroup = {
            ...interestGroup,
            id: igID,
            members: members,
            noOfMembers: members.length
          }
          this.setState({ interestGroup: interestGroup })
        } else {
          history.push('/manageinterestgroups')
        }
      }
    })
  }

  updateInterestGroup = (interestGroup, callback) => {
    const { firebase } = this.props
    const { firestore } = this.context.store
    const originalInterestGroup = this.state.interestGroup

    console.log(interestGroup)

    updateInterestGroup(firestore, firebase, interestGroup, originalInterestGroup, (interestGroup) => {
      callback(false)
    })
  }

  deleteGroup = () => {
    const { interestGroup } = this.state
    const { firebase, history } = this.props
    const { firestore } = this.context.store

    deleteGroup(firestore, firebase, interestGroup, () => history.push('/manageinterestgroups'))
  }

  render() {
    const { interestGroup } = this.state
    const { history } = this.props

    return (<Container>
      <DeleteModal ref={element => { this.deleteModal = element }} onDelete={() => this.deleteGroup()} />
      <Row>
        <Col>
          <div className="d-flex">
            <h1 className="display-3">Edit Interest Group</h1>
          </div>
        </Col>
      </Row>
      <Row>
        {
          interestGroup ?<Col>
            <InterestGroupForm
              submit={this.updateInterestGroup}
              initialValues={interestGroup}
              history={history}
              btnText="Update Interest Group"
              modal={{
                title: 'Details Updated!',
                body: 'Your Interest Group has been updated!',
                primaryBtnText: 'Manage Interest Groups',
                secondaryBtnText: 'Dismiss',
                onSubmit: () => history.push('/manageinterestgroups')
              }}/>
            <div className="d-flex justify-content-center">
              <Button className="w-75" color="danger" onClick={() => this.deleteModal.toggle()} block disabled={!window.gapi.client}>
                { !window.gapi.client ? <FontAwesomeIcon icon="spinner" spin /> : '' } <FontAwesomeIcon icon="trash-alt" />{' '}Delete Group
              </Button>
            </div>
            <div className="d-flex justify-content-center">
              <Button className="w-75 mt-3" color="secondary" onClick={() => history.push('/manageinterestgroups')} outline block>
                Back to Manage Interest Groups
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
)(CreateInterestGroup))
