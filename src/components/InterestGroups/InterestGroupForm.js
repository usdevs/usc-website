import React, { Component } from 'react'
import {
  Container, Row, Col,
  Alert, Button, Card, Jumbotron,
  Form, FormGroup, Label, Input, FormFeedback,
  InputGroup, InputGroupAddon
} from 'reactstrap';
import { config } from '../../resources/config'
import { getUserByEmail, getMyProfile } from '../../utils/actions'
import ImageUploader from '../reusable/ImageUploader'
import UserCard from '../Users/UserCard'
import _ from 'lodash'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

const originalMembers = () => {
  var members = []

  for(var i = 0; i < config.minimumIGMembers; i++) {
    members.push({
      email: '',
    })
  }

  return members
}

const newInterestGroup = {
  status: 'pending',
  name: '',
  type: '',
  category: '',
  logo: null,
  chat: '',
  description: '',
  activities: '',
  support: '',
  members: originalMembers(),
}

const originalMembersEntry = () => {
  var membersEntry = []

  for(var i = 0; i < config.minimumIGMembers; i++) {
    membersEntry.push(false)
  }

  return membersEntry
}

const originalState = {
  noOfMembers: config.minimumIGMembers,
  nameEntry: false,
  typeEntry: false,
  descriptionEntry: false,
  activitiesEntry: false,
  supportEntry: false,
  formSubmitting: false,
  membersEntry: originalMembersEntry(),
  membersIsLoading: originalMembersEntry(),
  submitFailure: false,
  logo: null,
  interestGroup: newInterestGroup,
}

class InterestGroupForm extends Component {
  constructor(props) {
    super(props);

    const { auth, firestore } = this.props

    this.state = originalState

    getMyProfile(firestore, auth.uid, () => {
      const { userProfiles } = this.props

      if(userProfiles) {
        const profile = userProfiles[auth.uid]
        this.handleFormChange({
          ...profile,
          id: auth.uid,
        }, 'memberProfile', 0)
      }
    })
  }

  handleFormChange = (value, type, info) => {
    const { interestGroup, nameEntry } = this.state
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
      case 'type':
        const { igTypesUnordered } = this.props

        this.setState({
          typeEntry: true,
          interestGroup: {
            ...interestGroup,
            type: value,
            category: igTypesUnordered[value] ? igTypesUnordered[value].category : null
          }
        })
        break
      case 'logo':
        this.setState({
          logo: value ? value.preview : value,
          interestGroup: {
            ...interestGroup,
            logo: value
          }
        })
        break
      case 'chat':
        this.setState({
          interestGroup: {
            ...interestGroup,
            chat: value,
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
      case 'memberEmail':
        members[info] = {
          ...members[info],
          email: value
        }

        this.setState({
          interestGroup: {
            ...interestGroup,
            members: members,
          }
        })
        break
      case 'memberProfile':
        members[info] = {
          ...members[info],
          profile: value,
          id: value.id
        }

        this.setState({
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
    const { interestGroup, nameEntry, typeEntry, descriptionEntry, activitiesEntry, supportEntry, membersEntry } = this.state
    const { name, type, description, activities, support, members } = interestGroup

    return {
      name: (nameEntry || clearEntryChecks) ? !name : false,
      type: (typeEntry || clearEntryChecks) ? type === '' : false,
      description: (descriptionEntry || clearEntryChecks) ? !description : false,
      activities: (activitiesEntry || clearEntryChecks) ? !activities : false,
      support: false,
      members: membersEntry.map((memberEntry, index) => {
        return (memberEntry || clearEntryChecks) ? !(members[index].profile) : false
      })
    }
  }

  showIGMembers = (errors) => {
    const { noOfMembers, interestGroup, membersIsLoading } = this.state
    const { members } = interestGroup

    var igMembers = []

    igMembers.push(
      <Col xs="12" md="6" key="0">
        {
            members[0].profile ?
              <div className="mb-3">
                <UserCard user={members[0].profile} leader={true} />
              </div>
            : <p><FontAwesomeIcon icon="spinner" spin /> Loading Profile...</p>
        }
      </Col>)
    for(var i = 1; i < noOfMembers; i++) {
      const index = i
      const igMember =
      <Col xs="12" md="6" key={i}>
        {
          members[index].profile ?
            <div className="mb-3">
              <UserCard user={members[index].profile} />
            </div>
          : <Card className="p-3 mb-3" outline color="primary">
              <InputGroup>
                <Input type="email" placeholder="Member Email" value={members[index].email} invalid={errors.members[index]} onChange={(event) => this.handleFormChange(event.target.value, 'memberEmail', index)} />
                <InputGroupAddon addonType="append">
                  <Button color="info" disabled={membersIsLoading[index]} onClick={() => this.addMember(index, members[index].email)}>
                    { membersIsLoading[index] ? <FontAwesomeIcon icon="spinner" spin /> : ''} Add
                  </Button>
                </InputGroupAddon>
                { errors.members[index] ? <FormFeedback>Please add a valid member. Check if email is valid, a duplicate or if the member has registered on this site.</FormFeedback> : ''}
              </InputGroup>
            </Card>
        }
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

  addMember = (index, email) => {
    const { firestore } = this.props
    var { membersEntry, membersIsLoading, interestGroup } = this.state

    var emailExists = false
    _.forEach(interestGroup.members, (member) => {
      if(member.profile && member.profile.email === email) {
        emailExists = true
      }
    })

    if(emailExists) {
      membersEntry[index] = true

      this.setState({
        membersEntry: membersEntry,
      })

      return
    }

    membersIsLoading[index] = true

    this.setState({
      membersIsLoading: membersIsLoading,
    })

    getUserByEmail(firestore, email, (snapshot) => {
        const { userProfiles } = this.props

        membersEntry[index] = true
        membersIsLoading[index] = false

        this.setState({
          membersEntry: membersEntry,
          membersIsLoading: membersIsLoading,
        })

        const newUserProfiles = _.mapValues(userProfiles, (profile, profileKey) => {
          return ({
            ...profile,
            id: profileKey
          })
        })
        const userProfile = _.filter(newUserProfiles, (profile) => {return profile.email === email})

        if(userProfile.length > 0) {
          this.handleFormChange(userProfile[0], 'memberProfile', index)
        }
    })
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

  submitForm = () => {
    const { membersEntry } = this.state
    const errors = this.validate(true)

    const noErrors = _.every(_.values(errors), (value) => {
      if(_.isArray(value)) {
        var hasTrue = false

        _.forEach(value, (element) => {
          hasTrue = hasTrue || element
        })

        return !hasTrue
      } else {
        return !value;
      }
    });

    if(!noErrors) {
      this.setState({
        nameEntry: true,
        typeEntry: true,
        descriptionEntry: true,
        activitiesEntry: true,
        supportEntry: true,
        membersEntry: membersEntry.map(() => true),
        submitFailure: true,
      })
    } else {
      const { interestGroup } = this.state
      const { buttonOnSubmit } = this.props

      this.setState({
        formSubmitting: true,
      })

      buttonOnSubmit(interestGroup, () => this.resetForm(interestGroup), () => this.clearSubmitting(interestGroup))
    }
  }

  clearSubmitting = (interestGroup) => {
    const { firebase } = this.props

    this.setState({
      formSubmitting: false,
      interestGroup: {
        ...interestGroup,
        original: interestGroup
      },
    })

    /*if(event.poster) {
      this.loadPoster(firebase, event.poster)
    }*/
  }

  resetForm = (interestGroup) => {
    var newMembers = originalMembers()
    newMembers[0] = interestGroup.members[0]

    this.setState({
      ...originalState,
      membersEntry: originalMembersEntry(),
      membersIsLoading: originalMembersEntry(),
      interestGroup: {
        ...originalState.interestGroup,
        members: newMembers
      }
    })
  }

  render() {
    const { igTypes } = this.props
    const { interestGroup, submitFailure, logo, formSubmitting } = this.state
    const { name, type, chat, description, activities, support, leader } = interestGroup
    const errors = this.validate()

    return (
      <Form className="m-3">
        <FormGroup>
          <Label for="name"><h3>Name</h3></Label>
          <Input type="text" value={ name } id="name" placeholder="Interest Group Name" invalid={errors.name} onChange={(event) => this.handleFormChange(event.target.value, 'name')} />
          { errors.name ? <FormFeedback>Name cannot be empty.</FormFeedback> : ''}
        </FormGroup>
        <FormGroup>
          <Label for="type"><h3>Type</h3></Label>
          <Input type="select" invalid={errors.type} name="select" id="type" onChange={(event) => this.handleFormChange(event.target.value, 'type')} value={type}>
            <option value=''>Please Select a Type</option>
            {
              igTypes.map((type) => <option key={ type.id } value={ type.id }>{ type.subName }</option>)
            }
          </Input>
          { errors.type ? <FormFeedback>Please select an IG type.</FormFeedback> : ''}
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
          <Label for="name"><h3>Group Chat Join Link (Optional)</h3></Label>
          <Input type="text" value={ chat } placeholder="Telegram/Whatsapp Chat Link" onChange={(event) => this.handleFormChange(event.target.value, 'chat')} />
        </FormGroup>
        <FormGroup>
          <Label for="description"><h3>Logo (Optional)</h3></Label>
          <ImageUploader
              imageSrc={logo}
              onDrop={(file) => this.handleFormChange(file, 'logo')}
              onDelete={() => this.handleFormChange(null, 'logo')}
            />
        </FormGroup>
        <FormGroup>
          <Label className="mb-0"><h3 className="mb-0">Member List</h3></Label>
          <br/>
          <Label><small>(at least {config.minimumIGMembers})</small></Label>
          <Container>
            <Row>
              {
                this.showIGMembers(errors)
              }
            </Row>
          </Container>
        </FormGroup>
        <div className="d-flex justify-content-center" >
          <Button color="primary" onClick={this.submitForm} block disabled={formSubmitting}>
            { formSubmitting ? <FontAwesomeIcon icon="spinner" spin /> : '' } Submit
          </Button>
        </div>
        <div className="d-flex justify-content-center" >
          { submitFailure ? <Alert color="danger" className="mt-3">One or more inputs are invalid. Please check and try again.</Alert> : ''}
        </div>
      </Form>)
  }
}

export default InterestGroupForm
