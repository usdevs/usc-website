import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { Card, Container, Row, Col } from 'reactstrap';
import { getUserProfile } from '../../actions/UsersActions'
import { firebaseConnect } from 'react-redux-firebase';
import UserCard from '../Users/UserCard'

class IntlProgReviewCard extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      creator: null
    }
  }

  componentDidMount() {
    const { firestore } = this.context.store
    const { intlProgReview } = this.props

    getUserProfile(firestore, intlProgReview.creator, (snapshot) => {
      this.setState({
        creator: {
          ...snapshot.data(),
          id: intlProgReview.creator
        }
      })
    })
  }

  render() {
    const { creator } = this.state
    const { intlProgReview } = this.props
    const { review, year, isAnon } = intlProgReview

    return(<Card body>
      <Container className="m-0 p-0">
        <Row className="d-flex align-items-center">
          <Col xs="12">
            <h4 className="text-primary">Went in { year }</h4>
            <p style={{whiteSpace: 'pre-line'}}>{ review }</p>
            { creator ?
                <UserCard user={creator} />
              : ''
            }
          </Col>
        </Row>
      </Container>
    </Card>)
  }
}

export default compose(
  firebaseConnect()
)(IntlProgReviewCard)
