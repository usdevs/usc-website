import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Button,
  Input
} from 'reactstrap';
import InterestGroupCard from './InterestGroupCard'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { getInterestGroups } from '../../utils/actions'
import { config } from '../../resources/config'
import { firebaseConnect, isLoaded } from 'react-redux-firebase';
import { headerInterestGroups as header } from '../../resources/images.js'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'

class InterestGroups extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      filter: {
        name: '',
        types: {},
      }
    }
  }

  componentWillMount() {
    const { firestore } = this.context.store

    getInterestGroups(firestore, config.igStatuses.active)
  }

  handleValueChanged = (value, type) => {
    const { filter } = this.state

    switch (type) {
      case 'name':
        this.setState({
          filter: {
            ...filter,
            name: value
          }
        })
        break
      case 'type':
        this.setState({
          filter: {
            ...filter,
            types: {
              ...filter.types,
              [value]: !filter.types[value]
            }
          }
        })
        break
      default:
        break
    }
  }

  filterGroups = (interestGroups) => {
    const { filter } = this.state

    return _.filter(interestGroups, (interestGroup) => {
      return (_.startsWith(_.lowerCase(interestGroup.name), _.lowerCase(filter.name))) && !filter.types[interestGroup.type]
    })
  }

  render() {
    const { firestore } = this.context.store
    const { filter } = this.state
    const { interestGroups, igTypes, firebase } = this.props

    const filteredGroups = this.filterGroups(interestGroups)

    return(
      <Container>
        <Row>
          <Col>
            <img src={header} className="img-fluid" alt="header" />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 style={{fontWeight: 300}}>Interest Groups</h1>
          </Col>
        </Row>
        <Row>
          {
            isLoaded(igTypes) ?
              <Col>
                <Input type="text" className="mb-2" value={filter.name} placeholder="Filter Name" onChange={(event) => this.handleValueChanged(event.target.value, 'name')} />
                {
                  _.map(igTypes, (igType, igTypeID) => {
                    return <Button key={igTypeID} color={ filter.types[igTypeID] ? 'danger' : 'primary' } outline={!filter.types[igTypeID]} className="mb-2 mr-2" onClick={(event) => this.handleValueChanged(igTypeID, 'type')}>{igType.subName}</Button>
                  })
                }
              </Col>
            : ''
          }
        </Row>
        <Row>
            {
              isLoaded(interestGroups) && isLoaded(igTypes) ?
                filteredGroups.length > 0 ?
                  filteredGroups.map((interestGroup) => <Col className="mb-3" xs="12" md="6" key={interestGroup.id}>
                    <InterestGroupCard
                      firebase={firebase}
                      firestore={firestore}
                      interestGroup={interestGroup}
                      igTypes={igTypes}
                    />
                  </Col>)
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
    interestGroups: state.firestore.ordered.interestGroups,
    igTypes: state.firestore.data.igTypes,
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(InterestGroups))
