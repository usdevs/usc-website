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
import GroupCard from './GroupCard'
import GroupGrid from './GroupGrid'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { getGroups } from '../../actions/GroupsActions'
import { formatFirestoreData } from '../../utils/utils'
import { firebaseConnect } from 'react-redux-firebase';
import { headerInterestGroups as header } from '../../resources/images.js'
import { withRouter } from 'react-router-dom'
import _ from 'lodash'

class Groups extends Component {
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

  componentDidMount() {
    const { firestore } = this.context.store
    const { groups } = this.props

    if(!groups.isLoaded) {
      getGroups(firestore)
    }
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

  filterGroups = (groups) => {
    const { filter } = this.state

    return _.orderBy(_.filter(groups.ordered, (group) => {
      return (_.startsWith(_.lowerCase(group.name), _.lowerCase(filter.name))) && !filter.types[group.type]
    }), ['name'], ['asc'])
  }

  render() {
    const { filter } = this.state
    const { groups, groupTypes } = this.props

    const filteredGroups = this.filterGroups(groups)

    return(
      <Container>
        <Row>
          <Col>
            <img src={header} className="img-fluid" alt="header" />
          </Col>
        </Row>
        <Row>
          <Col>
            <h1 style={{fontWeight: 300}}>Groups</h1>
          </Col>
        </Row>
        <Row>
          {
            groupTypes.isLoaded ?
              <Col>
                <Input type="text" className="mb-2" value={filter.name} placeholder="Filter Name" onChange={(event) => this.handleValueChanged(event.target.value, 'name')} />
                {
                  _.map(groupTypes.ordered, (groupType) => {
                    return <Button key={groupType.id} color={ filter.types[groupType.id] ? 'danger' : 'primary' } className="mb-2 mr-2" onClick={(event) => this.handleValueChanged(groupType.id, 'type')}>{groupType.name}</Button>
                  })
                }
              </Col>
            : ''
          }
        </Row>
        <Row>
          <GroupGrid groups={{
            ...groups,
            ordered: filteredGroups
          }} groupTypes={groupTypes} />
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
)(Groups))
