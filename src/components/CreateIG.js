import React, { Component } from 'react'
import {
  Container, Row, Col,
  Alert, Button, Card, Jumbotron,
  Form, FormGroup, Label, Input, FormFeedback
} from 'reactstrap';
import _ from 'lodash'

const newInterestGroup = {
  name: '',
  description: '',
  activities: '',
  support: '',
  members: [{
    name: '',
    email: '',
  },{
    name: '',
    email: '',
  },{
    name: '',
    email: '',
  },{
    name: '',
    email: '',
  },{
    name: '',
    email: '',
  }]
}

class CreateIG extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameEntry: false,
      noOfMembers: 5,
      interestGroup: newInterestGroup,
      membersEntry: [false, false, false, false, false],
    }
  }

  handleFormChange = (value, type, info) => {
    const { interestGroup, nameEntry } = this.state
    var { membersEntry } = this.state
    var { members } = interestGroup

    switch(type) {
      case 'name':
        this.setState({
          nameEntry: true,
          interestGroup: {
            ...interestGroup,
            name: value,
          }
        })
        break
      case 'description':
        this.setState({
          descriptionEntry: true,
          interestGroup: {
            ...interestGroup,
            description: value,
          }
        })
        break
      case 'activities':
        this.setState({
          activitiesEntry: true,
          interestGroup: {
            ...interestGroup,
            activities: value,
          }
        })
        break
      case 'support':
        this.setState({
          supportEntry: true,
          interestGroup: {
            ...interestGroup,
            support: value,
          }
        })
        break
      case 'memberName':
              console.log(info)
        members[info] = {
          ...members[info],
          name: value
        }

        membersEntry[info] = true


        this.setState({
          supportEntry: true,
          membersEntry: membersEntry,
          interestGroup: {
            ...interestGroup,
            members: members,
          }
        })
        break
      case 'memberEmail':
        members[info] = {
          ...members[info],
          email: value
        }

        membersEntry[info] = true

        this.setState({
          supportEntry: true,
          membersEntry: membersEntry,
          interestGroup: {
            ...interestGroup,
            members: members,
          }
        })
        break
      default: break
    }
  }

  validate = (clearEntryChecks) => {
    const { interestGroup, nameEntry, descriptionEntry, activitiesEntry, supportEntry, membersEntry } = this.state
    const { name, description, activities, support, members } = interestGroup

    return {
      name: (nameEntry || clearEntryChecks) ? !name : false,
      description: (descriptionEntry || clearEntryChecks) ? !description : false,
      activities: (activitiesEntry || clearEntryChecks) ? !activities : false,
      support: false,
      members: membersEntry.map((memberEntry, index) => {
        return (memberEntry || clearEntryChecks) ? !(members[index].name && members[index].email) : false
      })
    }
  }

  showIGMembers = (errors) => {
    const { noOfMembers, interestGroup } = this.state
    const { members } = interestGroup

    var igMembers = []

    for(var i = 0; i < noOfMembers; i++) {
      const index = i
      const igMember =
      <Col xs="12" md="6" key={i}>
        <Card className="p-3 mb-3" outline color="primary">
          <Input type="text" placeholder="Member Name" value={members[index].name} className="mb-3" invalid={errors.members[index]} onChange={(event) => this.handleFormChange(event.target.value, 'memberName', index)} />
          <Input type="email" placeholder="Member Email" value={members[index].email} invalid={errors.members[index]} onChange={(event) => this.handleFormChange(event.target.value, 'memberEmail', index)} />
          { errors.members[index] ? <FormFeedback>Enter both name and email.</FormFeedback> : ''}
        </Card>
      </Col>

      igMembers.push(igMember)
    }

    igMembers.push(<Col xs="12" md="6" key="addremove">
      <div className="d-flex justify-content-center" >
        {
          noOfMembers > 5 ?
            <Button outline color="danger" onClick={() => this.changeNoOfMember(false) } className="mr-3">Remove Member</Button>
          : ''
        }
        <Button outline color="primary" onClick={() => this.changeNoOfMember(true)}>Add Member</Button>
      </div>
    </Col>)

    return igMembers
  }

  changeNoOfMember = (increase) => {
    const { noOfMembers, interestGroup } = this.state
    const { members } = interestGroup

    this.setState({
      noOfMembers: increase ? noOfMembers + 1 : noOfMembers - 1,
      interestGroup: {
        ...interestGroup,
        members: increase ? members.push({
          name: '',
          email: ''
        }) : members.pop()
      }
    })
  }

  submitIG = () => {
    const { membersEntry } = this.state
    const errors = this.validate(true)
    const noErrors = _.every(_.values(errors), function(v) {return !v;});

    if(!noErrors) {
      this.setState({
        nameEntry: true,
        descriptionEntry: true,
        activitiesEntry: true,
        supportEntry: true,
        membersEntry: membersEntry.map(() => true),
        submitFailure: true,
      })
    } else {
      const { event } = this.state
      const { buttonOnSubmit } = this.props
      this.setState({
        formSubmitting: true,
      })

      buttonOnSubmit(event, () => this.resetForm(), (event) => this.clearSubmitting(event))
    }
  }

  render() {
    const { interestGroup, submitFailure } = this.state
    const { name, description, activities, support } = interestGroup
    const errors = this.validate()

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
              <Input style={{minHeight: '100px'}} type="textarea" value={ description } id="description" placeholder="Enter a short description of your intended Interest Group." invalid={errors.description} onChange={(event) => this.handleFormChange(event.target.value, 'description')} />
              { errors.description ? <FormFeedback>Please enter a description.</FormFeedback> : ''}
            </FormGroup>
            <FormGroup>
              <Label for="activities"><h3>Activities</h3></Label>
              <Input style={{minHeight: '100px'}} type="textarea" value={ activities } id="activities" placeholder="Please include both regular activities, and proposed one-off events (if applicable)." invalid={errors.activities} onChange={(event) => this.handleFormChange(event.target.value, 'activities')} />
              { errors.activities ? <FormFeedback>Please describe your activities.</FormFeedback> : ''}
            </FormGroup>
            <FormGroup>
              <Label for="support"><h3>Required Support (Optional)</h3></Label>
              <Input style={{minHeight: '100px'}} type="textarea" value={ support } id="support" placeholder="Let us know what your interest group would benefit from: Funding, venues, professor’s contacts, etc." invalid={errors.support} onChange={(event) => this.handleFormChange(event.target.value, 'support')} />
              { errors.support ? <FormFeedback>Please enter the type of required support or enter NIL if unneeded.</FormFeedback> : ''}
            </FormGroup>
            <FormGroup>
              <Label className="mb-0"><h3 className="mb-0">Member List</h3></Label>
              <br/>
              <Label><small>(at least 5)</small></Label>
              <Container>
                <Row>
                  {
                    this.showIGMembers(errors)
                  }
                </Row>
              </Container>
            </FormGroup>
          </Form>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <div className="d-flex justify-content-center" >
            <Button color="primary" onClick={() => this.submitIG() }>Submit</Button>
          </div>
          <div className="d-flex justify-content-center" >
            { submitFailure ? <Alert color="danger" className="mt-3">One or more inputs are invalid. Please check and try again.</Alert> : ''}
          </div>
        </Col>
      </Row>
    </Container>)
  }
}

export default CreateIG;
