import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Container, Row, Col } from 'reactstrap';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { getIntlProgs } from '../../actions/IntlProgsActions'
import { formatFirestoreData } from '../../utils/utils'
import IntlGrid from './IntlGrid'

class IntlProgs extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentDidMount() {
    getIntlProgs(this.context.store.firestore)
  }

  render() {
    const { intlProgs } = this.props

    return(<Container className="mb-5">
      <Row>
        <Col className="mt-3">
          <h1 className="d-none d-md-block" style={{fontWeight: 300}}>International Programmes</h1>
          <h2 className="d-block d-md-none" style={{fontWeight: 300}}>International Programmes</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <IntlGrid intlProgs={intlProgs} />
        </Col>
      </Row>
    </Container>)
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    intlProgs: formatFirestoreData(state.firestore, 'intlProgs'),
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(IntlProgs))
