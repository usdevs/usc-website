import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux';
import { Button, Container, Row, Col } from 'reactstrap';
import { getInterestGroup, getFile } from '../../utils/actions'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { withRouter } from 'react-router-dom'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

class InterestGroup extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      igID: this.props.match.params.igID,
      logo: null
    }
  }

  componentWillMount() {
    const { igID } = this.state
    const { history } = this.props
    const { firestore } = this.context.store

    getInterestGroup(firestore, igID, (snapshot) => {
      if (!snapshot.exists) {
        history.push('/interestgroups')
      }
    })
  }

  showInterestGroup = () => {
    const { logo } = this.state
    const { interestGroup, igTypes, firebase, history } = this.props
    const { name, type, description, activities, leader } = interestGroup

    const isLeader = firebase.auth ? leader === firebase.auth.uid : false

    if (!logo && interestGroup.logo) {
      getFile(firebase, interestGroup.logo, (url) => {
        this.setState({
          logo: url,
        })
      })
    }

    return <Col>
      <Container>
        <Row>
          {
            logo ?
            <Col xs="3" className="pr-0">
              <img src={logo} className="mb-0" alt="Avatar" />
            </Col>
            : ''
          }
          <Col>
            <h2 style={{fontWeight: 300}}>{ name }</h2>
              <p className="lead">{ description }</p>
              <p>{ activities }</p>
            <hr className="my-2" />
          </Col>
        </Row>
      </Container>
    </Col>
  }

  render() {
    const { interestGroup, firebase, history, requesting } = this.props

    return(<Container>
      <Row className="mt-3 mb-3">
        {
          isLoaded(interestGroup) && interestGroup ?
            this.showInterestGroup()
          : <h4><FontAwesomeIcon icon="spinner" spin /> Loading...</h4>
        }
      </Row>
    </Container>)
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    interestGroup: state.firestore.data.interestGroup,
    igTypes: state.firestore.data.igTypes,
    requesting: state.firestore.status.requesting
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(InterestGroup))
