import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Container, Row, Col, UncontrolledCarousel } from 'reactstrap'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import _ from 'lodash'
import IntlProgReviewCard from './IntlProgReviewCard'
import { getIntlProg, getIntlProgReviews } from '../../actions/IntlProgsActions'
import { getFile } from '../../actions/FilesActions'
import { formatFirestoreData } from '../../utils/utils'

class IntlProg extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      intlProgID: this.props.match.params.intlProgID,
      intlProg: null,
      reviews: null,
    }
  }

  componentDidMount() {
    const { intlProgID } = this.state
    const { firestore } = this.context.store
    const { firebase, history } = this.props

    getIntlProg(firestore, intlProgID, (snapshot) => {
      if(!snapshot.exists) {
        history.push('/intlprogs')
      } else {
        const intlProgData = {
          ...snapshot.data(),
          id: intlProgID
        }

        this.setState({
          intlProg: intlProgData
        })

        getFile(firebase, intlProgData.displayImg, (url) => {
          this.setState({
            displayImg: url,
          })
        })

        getFile(firebase, intlProgData.flag, (url) => {
          this.setState({
            flag: url,
          })
        })

        var additionalImg = []

        if(intlProgData.additionalImg) {
          _.forEach(intlProgData.additionalImg, (addImg) => {
            getFile(firebase, addImg, (url) => {
              additionalImg.push(url)

              if(additionalImg.length === intlProgData.additionalImg.length) {
                this.setState({
                  additionalImg: additionalImg,
                })
              }
            })
          })
        }
      }
    })

    getIntlProgReviews(firestore, intlProgID)
  }

  showCarousell() {
    const { additionalImg } = this.state
    console.log(additionalImg)

    if(additionalImg) {
      var items = []
      _.forEach(additionalImg, (src) => {
        items.push({
          src: src,
          altText: src,
          caption: '',
          header: ''
        })
      })

      return <UncontrolledCarousel items={items} />
    }

    return
  }

  showReviews() {
    const { intlProgReviews } = this.props

    var reviewCards = []

    _.forEach(intlProgReviews.ordered, (review) => {
      reviewCards.push(<Col key={review.id} xs="4"><IntlProgReviewCard intlProgReview={review} /></Col>)
    })

    return reviewCards
  }

  render() {
    const { intlProg, displayImg, flag } = this.state
    const { intlProgReviews } = this.props

    return(<Container>
      {
        intlProg ?
          <Row className="mt-3">
            {
              displayImg ?
                <Col xs="12" md="4" className="d-block d-md-none mt-3">
                  <img src={displayImg} className="rounded img-fluid" alt="Display Img" />
                </Col>
              : ''
            }
            <Col xs="12" md="8">
              <Container className="m-0 p-0">
                <Row>
                  <Col xs="10">
                    <h2 className="mb-0" style={{fontWeight: 300}}>{ intlProg.name }</h2>
                    <h4 className="text-primary" style={{fontWeight: 300}}>{ intlProg.usualPeriod } - { intlProg.country }</h4>
                  </Col>
                  <Col xs="2">
                    {
                      flag ? <img src={flag} className="rounded img-fluid float-right" alt="Display Img" /> : ''
                    }
                  </Col>
                </Row>
              </Container>
              <p className="lead" style={{whiteSpace: 'pre-line'}}>{ intlProg.synopsis }</p>
              <p style={{whiteSpace: 'pre-line'}}>{ intlProg.description }</p>
              {
                intlProg.deliverables ?
                  <div>
                    <h3>Deliverables</h3>
                      <p style={{whiteSpace: 'pre-line'}}>{ intlProg.deliverables }</p>
                  </div>
                : ''
              }
              {
                intlProg.cost ?
                  <div>
                    <h3>Cost</h3>
                      <p style={{whiteSpace: 'pre-line'}}>{ intlProg.cost }</p>
                  </div>
                : ''
              }
            </Col>
            {
              displayImg ?
                <Col xs="12" md="4">
                  <img src={displayImg} className="rounded img-fluid d-none d-md-block" alt="Display Img" />
                  { this.showCarousell() }
                </Col>
              : ''
            }
            {
              intlProgReviews.isLoaded ?
                <Col xs="12">
                  <h3>Reviews</h3>
                  { this.showReviews() }
                </Col>
              : ''
            }
          </Row>
        : <Row><Col><h4><FontAwesomeIcon icon="spinner" spin /> Loading...</h4></Col></Row>
      }
    </Container>)
  }
}


const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    intlProgReviews: formatFirestoreData(state.firestore, 'intlProgReviews'),
  }
}

export default withRouter(compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(IntlProg))
