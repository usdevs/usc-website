import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import { Container, Row, Col } from 'reactstrap'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { createIntlProg } from '../../actions/IntlProgsActions'
import IntlProgForm from './IntlProgForm'

class CreateIntlProg extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  createIntlProg = (intlProg, callback) => {
    const { firestore } = this.context.store
    const { firebase } = this.props

    createIntlProg(firestore, firebase, intlProg, () => {
      callback(true)
    })
  }

  render() {
    const { history } = this.props

    return (
    <Container>
      <Row>
        <Col>
          <h1 style={{fontWeight: 300}} className="mt-3">Create International Programme</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <IntlProgForm
            submit={this.createIntlProg}
            btnText="Create"
            modal={{
              title: 'International Programme Created!',
              body: 'Details have been saved!',
              primaryBtnText: 'Dashboard',
              secondaryBtnText: 'Dismiss',
              onSubmit: () => history.push('/dashboard')
            }} />
        </Col>
      </Row>
    </Container>)
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(CreateIntlProg))
