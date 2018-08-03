import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { firebaseConnect } from 'react-redux-firebase';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import _ from 'lodash'
import GroupCard from '../Groups/GroupCard'

class GroupGrid extends Component {
  displayInterestGroups = () => {
    const { groups, groupTypes } = this.props

    var groupCards = []

    _.forEach(groups.ordered, group => {
      groupCards.push(<Col className="mb-3" xs="12" md="6" key={group.id}>
        <GroupCard
          group={group}
          groupTypes={groupTypes}
          manageMode={true}
        />
        </Col>)
    })

    return groupCards
  }

  render() {
    const { groups, groupTypes } = this.props

    return(<Container>
      <Row>
          {
            groups.isLoaded && groupTypes.isLoaded ?
              groups.ordered.length > 0 ?
                this.displayInterestGroups()
              : <Col><h3><FontAwesomeIcon icon="frown" /> No Groups match your criteria </h3></Col>
            : <Col><h4><FontAwesomeIcon icon="spinner" spin /> Loading Groups...</h4></Col>
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
)(GroupGrid)
