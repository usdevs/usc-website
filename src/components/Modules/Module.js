import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  Container, Row, Col
} from 'reactstrap';
import { firebaseConnect } from 'react-redux-firebase';
import { getModule, getModuleReviews } from '../../actions/ModulesActions'
import { withRouter } from 'react-router-dom'
import ModuleReviewCard from './ModuleReviewCard'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

class Module extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  componentWillMount() {
    const { firestore } = this.context.store
    const { moduleID } = this.props.match.params

    getModule(firestore, moduleID)
    getModuleReviews(firestore, moduleID)
  }

  render() {
    const { firestore } = this.context.store
    const { module, moduleTypes, moduleReviews } = this.props

    return(<Container>
      <Row>
        {
          module && moduleTypes ?
            <Col>
              <h4 className="mb-0 mt-4 text-primary">{moduleTypes[module.type].name}</h4>
              <h1 style={{fontWeight: 300}}>{ module.name }{' '}<br/><small className="text-muted">{ module.code }</small></h1>
              { module.prof ? <h3>by { module.prof }</h3> : ''}
              <p className="lead">{ module.description }</p>
              {
                moduleReviews ?
                <Container>
                  <Row>
                    <h2>Reviews</h2>
                  </Row>
                  <Row className="mb-5">
                    { moduleReviews.length > 0 ?
                        moduleReviews.map((moduleReview) => <Col xs="12" key={moduleReview.id}><ModuleReviewCard firestore={firestore} moduleReview={moduleReview} /></Col>)
                      : <h3 className="mt-0 mb-3"><FontAwesomeIcon icon="frown" /><small> No reviews are available.</small></h3>
                    }
                  </Row>
                </Container>
                : ''
              }
            </Col>
          : <h3 className="mt-2"><FontAwesomeIcon icon="spinner" spin /> Loading Module...</h3>
        }
      </Row>
    </Container>)
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    module: state.firestore.data.module,
    moduleTypes: state.firestore.data.moduleTypes,
    moduleReviews: state.firestore.ordered.moduleReviews
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(Module))
