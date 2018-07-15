import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { firebaseConnect } from 'react-redux-firebase';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import _ from 'lodash'
import GroupCard from '../Groups/GroupCard'

class InterestGroupGrid extends Component {
  displayInterestGroups = () => {
    const { auth, interestGroups, igTypes } = this.props

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
    const { interestGroups, igTypes } = this.props

    return(<Container>
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
  }
}

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(InterestGroupGrid)
