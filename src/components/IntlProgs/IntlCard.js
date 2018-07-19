import React, { Component } from 'react'
import _ from 'lodash'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import { Card, CardImg, CardBody, Button, Container, Row, Col } from 'reactstrap';
import { getFile } from '../../actions/FilesActions'
import { config } from '../../resources/config'
import { firebaseConnect } from 'react-redux-firebase';

class IntlCard extends Component {
  mounted = false

  constructor(props) {
    super(props)

    this.state = {
      displayImg: null,
      fullDescription: false
    }

    const { displayImg } = props.intlProg

    if (displayImg) {
      this.loadDisplayImg(displayImg)
    }
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
  }

  componentWillReceiveProps(newProps) {
    if (this.props.intlProg.displayImg !== newProps.intlProg.displayImg) {
      this.loadDisplayImg(newProps.intlProg.displayImg)
    }
  }

  loadDisplayImg = (displayImg) => {
    const { firebase } = this.props

    getFile(firebase, displayImg, (url) => {
      if(this.mounted) {
        this.setState({
          displayImg: url,
        })
      }
    })
  }

  render() {
    const { displayImg, fullDescription } = this.state
    const { intlProg, history, isHorizontal, hideButtons } = this.props

    return (
      <div>
      <Card>
        <Container className="m-0 p-0">
          <Row>
            <Col xs={isHorizontal ? "3" : "12"} className={isHorizontal ? "d-flex align-items-center" : ''}>
              { displayImg ? <CardImg top width="100%" src={displayImg} alt="Display Img" /> : ''  }
            </Col>
            <Col xs={isHorizontal ? "9" : "12"}>
              <CardBody>
                <h3 style={{fontWeight: 300}}>{intlProg.name}</h3>
                <h4 className="mb-0 text-primary">{intlProg.country}</h4>
                <h4 className="text-muted" style={{fontWeight: 300}}>{intlProg.usualPeriod}</h4>
                { intlProg.synopsis ?
                  <p>{ fullDescription ? intlProg.synopsis : _.truncate(intlProg.synopsis, { 'length': config.descriptionPreviewLength }) }
                    <Button onClick={() => this.setState({fullDescription: !fullDescription})} className="d-inline m-0 p-0" color="link">{ fullDescription ? 'See Less' : 'See More' }</Button>
                  </p>
                  : ''
                }
                { hideButtons ? '' :<Button color="primary" onClick={() => history.push('/intlProg/'+intlProg.id)}>Details</Button>}
              </CardBody>
            </Col>
          </Row>
        </Container>
      </Card>
    </div>
    )
  }
}

export default withRouter(compose(
  firebaseConnect()
)(IntlCard))
