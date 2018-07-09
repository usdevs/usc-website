import React, { Component } from 'react'
import { Card, Container, Row, Col } from 'reactstrap';
import { getUserProfile } from '../../utils/actions'
import UserCard from '../Users/UserCard'

class ModuleReviewCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      creator: null
    }

    const { firestore, moduleReview } = props

    if(!moduleReview.isAnon){
      getUserProfile(firestore, moduleReview.creator, (snapshot) => {
        this.setState({
          creator: {
            ...snapshot.data(),
            id: moduleReview.creator
          }
        })
      })
    }
  }

  render() {
    const { creator } = this.state
    const { moduleReview } = this.props
    const { review, semester, isAnon } = moduleReview

    return(<Card body>
      <Container className="m-0 p-0">
        <Row className="d-flex align-items-center">
          <Col xs="12">
            { creator || isAnon ?
              <div className="d-flex justify-content-end">
                <div>
                  { !isAnon ? <UserCard user={creator} /> : <h3 className="text-secondary mb-0">Anonymous</h3>}
                </div>
              </div>
              : ''
            }
            <div className="d-flex justify-content-end"><h4 className="mt-2 text-primary">taken in {semester}</h4></div>
            <p>{ review }</p>
          </Col>
        </Row>
      </Container>
    </Card>)
  }
}

export default ModuleReviewCard
