import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  Button,
  Jumbotron,
  Form, FormGroup, Label, Input, FormFeedback
} from 'reactstrap';

class CreateIG extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      nameEntry: false,
    }
  }

  handleFormChange = (value, type) => {
    switch(type) {
      case 'name':
        this.setState({ nameEntry: true, name: value })
        break
      case 'description':
        this.setState({ description: value })
        break
      default: break
    }
  }

  validate = (clearEntryChecks) => {
    const { name, nameEntry } = this.state

    return {
      name: (nameEntry || clearEntryChecks) ? !name : false,
      description: false,
    }
  }

  render() {
    const { name, description, activities, support } = this.state
    const errors = {}

    return (
    <Container>
      <Row>
        <Col>
          <div className="d-flex">
            <div className="p-2"><h1 className="display-3">Create Interest Group</h1></div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <Jumbotron>
            <h3>Why Create an Interest Group?</h3>
            <p>Lorem Ipsum</p>
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form className="m-3">
            <FormGroup>
              <Label for="name"><h3>Name</h3></Label>
              <Input type="text" value={ name } id="name" placeholder="Interest Group Name" invalid={errors.name} onChange={(event) => this.handleFormChange(event.target.value, 'name')} />
              { errors.name ? <FormFeedback>Name cannot be empty.</FormFeedback> : ''}
            </FormGroup>
            <FormGroup>
              <Label for="description"><h3>Description</h3></Label>
              <Input type="textarea" value={ description } id="description" placeholder="Enter a short description of your intended Interest Group." invalid={errors.description} onChange={(event) => this.handleFormChange(event.target.value, 'description')} />
              { errors.description ? <FormFeedback>Please enter a description.</FormFeedback> : ''}
            </FormGroup>
            <FormGroup>
              <Label for="activities"><h3>Activities</h3></Label>
              <Input type="textarea" value={ activities } id="activities" placeholder="Please include both regular activities, and proposed one-off events (if applicable)." invalid={errors.activities} onChange={(event) => this.handleFormChange(event.target.value, 'activities')} />
              { errors.activities ? <FormFeedback>Please describe your activities.</FormFeedback> : ''}
            </FormGroup>
            <FormGroup>
              <Label for="support"><h3>Required Support</h3></Label>
              <Input type="textarea" value={ support } id="support" placeholder="Let us know what your interest group would benefit from: Funding, venues, professor’s contacts, etc." invalid={errors.support} onChange={(event) => this.handleFormChange(event.target.value, 'support')} />
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col xs={{size: 4, offset: 4}}>
          <Button color="primary" block>Submit Interest Group Application</Button>
        </Col>
      </Row>
    </Container>)
  }
}

export default CreateIG;
