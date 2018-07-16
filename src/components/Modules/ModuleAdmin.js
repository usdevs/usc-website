import React, { Component } from 'react'
import axios from 'axios'
import { Button, Container, Row, Col, Form, FormGroup, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'
import { addModule } from '../../actions/ModulesActions'
import { firebaseConnect } from 'react-redux-firebase';

class ModuleAdmin extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      nusmodsAPI: 'https://api.nusmods.com/2017-2018/1/modules.json'
    }
  }

  btnOnClick = () => {
    const { nusmodsAPI } = this.state
    const { firestore } = this.context.store

    axios.get(nusmodsAPI)
      .then(function (response) {
        console.log(response.data);

        _.forEach(response.data, (module) => {
          addModule(firestore, module)
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { nusmodsAPI } = this.state

    return(<Container>
      <Row>
        <Col>
          <h1>Module Admin</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form className="m-3">
            <FormGroup>
              <Label for="type"><h3>Get Modules</h3></Label>
              <Input type="text" onChange={(event) => this.setState({
                nusmodsAPI: event.target.value
              })} value={nusmodsAPI} />
            </FormGroup>
            <Button onClick={this.btnOnClick}>Submit</Button>
          </Form>
        </Col>
      </Row>
    </Container>)
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    modules: state.firestore.ordered.modules,
    moduleTypes: state.firestore.data.moduleTypes
  }
}

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(ModuleAdmin)
