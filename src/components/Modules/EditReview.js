import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import {
  Container, Row, Col,
  Button, Modal, ModalBody, ModalFooter
} from 'reactstrap';
import { firebaseConnect } from 'react-redux-firebase';
import { getModuleReview, updateReview, deleteReview, getModule } from '../../actions/ModulesActions'
import { withRouter } from 'react-router-dom'
import ReviewForm from './ReviewForm'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

class EditReview extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      reviewID: this.props.match.params.reviewID
    }
  }

  componentWillMount() {
    const { firestore } = this.context.store
    const { reviewID } = this.props.match.params

    getModuleReview(firestore, reviewID, (snapshot) => {
      const review = snapshot.data()
      this.setState({
        review: {
          ...review,
          id: reviewID
        }
      })

      getModule(firestore, review.module, (modSnapshot) => {
        this.setState({
          module: modSnapshot.data()
        })
      })
    })
  }

  updateReview = (review, callback, optionalCallback) => {
    const { firestore } = this.context.store

    updateReview(firestore, review, () => {
      this.toggle('success')
      optionalCallback()
    })
  }

  successModal = () => {
    const { successModal } = this.state
    const { history } = this.props

    return(<Modal isOpen={successModal} toggle={() => this.toggle('success')}>
      <ModalBody>
        <h3 style={{fontWeight: 300}}>Review Updated!</h3>
        <p>Your review has been updated!</p>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={() => history.push('/managereviews/')}>To Your Reviews</Button>{' '}
        <Button color="secondary" onClick={() => {
          this.toggle('success')
        }}>Dismiss</Button>
      </ModalFooter>
    </Modal>)
  }

  deleteModal = () => {
    const { firestore } = this.context.store
    const { deleteModal, review } = this.state
    const { history } = this.props

    return(<Modal isOpen={deleteModal} toggle={() => this.toggle('delete')}>
      <ModalBody>
        <h3 style={{fontWeight: 300}}>Do You Want To Delete?</h3>
        <p>Please confirm that you would like to delete this Review?</p>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={() => {
          this.toggle('delete')
        }}>Cancel</Button>
        <Button color="danger" onClick={() => deleteReview(firestore, review, () => history.push('/managereviews'))}><FontAwesomeIcon icon="trash-alt" />{' '} Confirm Deletion</Button>{' '}
      </ModalFooter>
    </Modal>)
  }

  toggle = (type) => {
    switch(type) {
      case 'success':
        this.setState({
          successModal: !this.state.successModal
        });
        break
      case 'delete':
        this.setState({
          deleteModal: !this.state.deleteModal
        });
        break
      default:
        break
    }
  }

  render() {
    const { review, module } = this.state
    const { history } = this.props

    return(<Container>
      { this.successModal() }
      { this.deleteModal() }
      <Row>
        <Col>
          <h1 style={{fontWeight: 300}}>Add Review</h1>
        </Col>
      </Row>
      <Row>
        {
          review && module ?
            <Col>
              <ReviewForm
                buttonOnSubmit={this.updateReview}
                module={module}
                review={review}
                buttonText="Update Review" />
              <div className="d-flex justify-content-center">
                <Button className="w-75" color="danger" onClick={() => this.toggle('delete')} block>
                  <FontAwesomeIcon icon="trash-alt" />{' '}Delete Review
                </Button>
              </div>
              <div className="d-flex justify-content-center">
                <Button className="w-75 mt-3" color="secondary" onClick={() => history.push('/managereviews')} outline block>
                  Back to Your Reviews
                </Button>
              </div>
            </Col>
          : <h3 className="mt-2"><FontAwesomeIcon icon="spinner" spin /> Loading Review...</h3>
        }
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
)(EditReview))
